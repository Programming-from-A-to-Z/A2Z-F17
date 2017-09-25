"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pm = require("parsimmon");
var TypeScriptVersion;
(function (TypeScriptVersion) {
    TypeScriptVersion.all = ["2.0", "2.1", "2.2", "2.3", "2.4"];
    TypeScriptVersion.lowest = "2.0";
    /** Latest version that may be specified in a `// TypeScript Version:` header. */
    TypeScriptVersion.latest = "2.4";
    for (const v of TypeScriptVersion.all) {
        if (v > TypeScriptVersion.latest) {
            throw new Error("'Latest' not properly set.");
        }
    }
    /** True if a package with the given typescript version should be published as prerelease. */
    function isPrerelease(_version) {
        return false;
    }
    TypeScriptVersion.isPrerelease = isPrerelease;
    function range(min) {
        return TypeScriptVersion.all.filter(v => v >= min);
    }
    TypeScriptVersion.range = range;
    const allTags = ["ts2.0", "ts2.1", "ts2.2", "ts2.3", "ts2.4", "ts2.5", "latest"];
    /** List of NPM tags that should be changed to point to the latest version. */
    function tagsToUpdate(typeScriptVersion) {
        // A 2.0-compatible package is assumed compatible with TypeScript 2.1
        // We want the "2.1" tag to always exist.
        const idx = allTags.indexOf(`ts${typeScriptVersion}`);
        if (idx === -1) {
            throw new Error();
        }
        return allTags.slice(idx);
    }
    TypeScriptVersion.tagsToUpdate = tagsToUpdate;
})(TypeScriptVersion = exports.TypeScriptVersion || (exports.TypeScriptVersion = {}));
function parseHeaderOrFail(mainFileContent) {
    const header = parseHeader(mainFileContent, /*strict*/ false);
    if (isParseError(header)) {
        throw new Error(renderParseError(header));
    }
    return header;
}
exports.parseHeaderOrFail = parseHeaderOrFail;
function validate(mainFileContent) {
    const h = parseHeader(mainFileContent, /*strict*/ true);
    return isParseError(h) ? h : undefined;
}
exports.validate = validate;
function renderExpected(expected) {
    return expected.length === 1 ? expected[0] : `one of\n\t${expected.join("\n\t")}`;
}
exports.renderExpected = renderExpected;
function renderParseError({ line, column, expected }) {
    return `At ${line}:${column} : Expected ${renderExpected(expected)}`;
}
function isParseError(x) {
    // tslint:disable-next-line strict-type-predicates
    return x.expected !== undefined;
}
/** @param strict If true, we allow fewer things to be parsed. Turned on by linting. */
function parseHeader(text, strict) {
    const res = headerParser(strict).parse(text);
    return res.status
        ? res.value
        : { index: res.index.offset, line: res.index.line, column: res.index.column, expected: res.expected };
}
function headerParser(strict) {
    return pm.seqMap(pm.string("// Type definitions for "), parseLabel(strict), pm.string("// Project: "), projectParser, pm.regexp(/\r?\n\/\/ Definitions by: /), contributorsParser(strict), definitionsParser, typeScriptVersionParser, pm.all, // Don't care about the rest of the file
    // tslint:disable-next-line:variable-name
    (_str, label, _project, projects, _defsBy, contributors, _definitions, typeScriptVersion) => ({
        libraryName: label.name,
        libraryMajorVersion: label.major,
        libraryMinorVersion: label.minor,
        projects, contributors, typeScriptVersion,
    }));
}
/*
Allow any of the following:

// Project: https://foo.com
//          https://bar.com

// Project: https://foo.com,
//          https://bar.com

// Project: https://foo.com, https://bar.com

Use `\s\s+` to ensure at least 2 spaces, to  disambiguate from the next line being `// Definitions by:`.
*/
const separator = pm.regexp(/(, )|(,?\r?\n\/\/\s\s+)/);
const projectParser = pm.sepBy1(pm.regexp(/[^,\r\n]+/), separator);
function contributorsParser(strict) {
    const contributor = strict
        ? pm.seqMap(pm.regexp(/([^<]+) /, 1), pm.regexp(/\<https\:\/\/github\.com\/([a-zA-Z\d\-]+)\>/, 1), (name, githubUsername) => ({ name, url: `https://github.com/${githubUsername}`, githubUsername }))
        : pm.seqMap(pm.regexp(/([^<]+) /, 1), pm.regexp(/<([^>]+)> */, 1), (name, url) => {
            const rgx = /^https\:\/\/github.com\/([a-zA-Z\d\-]+)$/;
            const match = rgx.exec(url);
            // tslint:disable-next-line no-null-keyword
            return ({ name, url, githubUsername: match === null ? undefined : match[1] });
        });
    return pm.sepBy1(contributor, separator);
}
// TODO: Should we do something with the URL?
const definitionsParser = pm.regexp(/\r?\n\/\/ Definitions: [^\r\n]+/);
function parseLabel(strict) {
    return pm.Parser((input, index) => {
        // Take all until the first newline.
        const endIndex = regexpIndexOf(input, /\r|\n/, index);
        if (endIndex === -1) {
            return fail("EOF");
        }
        // Index past the end of the newline.
        const end = input[endIndex] === "\r" ? endIndex + 2 : endIndex + 1;
        const tilNewline = input.slice(index, endIndex);
        // Parse in reverse. Once we've stripped off the version, the rest is the libary name.
        const reversed = reverse(tilNewline);
        // Last digit is allowed to be "x", which acts like "0"
        const rgx = /((\d+|x)\.(\d+)(\.\d+)?(v)? )?(.+)/;
        const match = rgx.exec(reversed);
        if (match === null) {
            return fail();
        }
        const [, version, a, b, c, v, nameReverse] = match;
        let majorReverse;
        let minorReverse;
        if (version !== undefined) {
            if (c !== undefined) {
                // There is a patch version
                majorReverse = c;
                minorReverse = b;
                if (strict) {
                    return fail("patch version not allowed");
                }
            }
            else {
                majorReverse = b;
                minorReverse = a;
            }
            if (v !== undefined && strict) {
                return fail("'v' not allowed");
            }
        }
        else {
            if (strict) {
                return fail("Needs MAJOR.MINOR");
            }
            majorReverse = "0";
            minorReverse = "0";
        }
        const [name, major, minor] = [reverse(nameReverse), reverse(majorReverse), reverse(minorReverse)];
        return pm.makeSuccess(end, { name, major: intOfString(major), minor: minor === "x" ? 0 : intOfString(minor) });
        function fail(msg) {
            let expected = "foo MAJOR.MINOR";
            if (msg !== undefined) {
                expected += ` (${msg})`;
            }
            return pm.makeFailure(index, expected);
        }
    });
}
const typeScriptVersionLineParser = pm.regexp(/\/\/ TypeScript Version: (2.(\d))/, 1).chain(v => {
    switch (v) {
        case "2.1":
        case "2.2":
        case "2.3":
        case "2.4":
            return pm.succeed(v);
        default:
            return pm.fail(`TypeScript ${v} is not yet supported.`);
    }
});
const typeScriptVersionParser = pm.regexp(/\r?\n/)
    .then(typeScriptVersionLineParser)
    .fallback("2.0");
function parseTypeScriptVersionLine(line) {
    const result = typeScriptVersionLineParser.parse(line);
    if (!result.status) {
        throw new Error(`Could not parse version: line is '${line}'`);
    }
    return result.value;
}
exports.parseTypeScriptVersionLine = parseTypeScriptVersionLine;
function reverse(s) {
    let out = "";
    for (let i = s.length - 1; i >= 0; i--) {
        out += s[i];
    }
    return out;
}
function regexpIndexOf(s, rgx, start) {
    const index = s.slice(start).search(rgx);
    return index === -1 ? index : index + start;
}
function intOfString(str) {
    const n = Number.parseInt(str, 10);
    if (Number.isNaN(n)) {
        throw new Error(`Error in parseInt(${JSON.stringify(str)})`);
    }
    return n;
}
