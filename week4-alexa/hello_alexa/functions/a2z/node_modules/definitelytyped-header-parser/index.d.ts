/// <reference types="parsimmon" />
import pm = require("parsimmon");
export declare type TypeScriptVersion = "2.0" | "2.1" | "2.2" | "2.3" | "2.4";
export declare namespace TypeScriptVersion {
    const all: ReadonlyArray<TypeScriptVersion>;
    const lowest = "2.0";
    /** Latest version that may be specified in a `// TypeScript Version:` header. */
    const latest = "2.4";
    /** True if a package with the given typescript version should be published as prerelease. */
    function isPrerelease(_version: TypeScriptVersion): boolean;
    function range(min: TypeScriptVersion): ReadonlyArray<TypeScriptVersion>;
    /** List of NPM tags that should be changed to point to the latest version. */
    function tagsToUpdate(typeScriptVersion: TypeScriptVersion): ReadonlyArray<string>;
}
export interface Header {
    readonly libraryName: string;
    readonly libraryMajorVersion: number;
    readonly libraryMinorVersion: number;
    readonly typeScriptVersion: TypeScriptVersion;
    readonly projects: ReadonlyArray<string>;
    readonly contributors: ReadonlyArray<Author>;
}
export interface Author {
    name: string;
    url: string;
    githubUsername: string | undefined;
}
export interface ParseError {
    readonly index: number;
    readonly line: number;
    readonly column: number;
    readonly expected: ReadonlyArray<string>;
}
export declare function parseHeaderOrFail(mainFileContent: string): Header;
export declare function validate(mainFileContent: string): ParseError | undefined;
export declare function renderExpected(expected: ReadonlyArray<string>): string;
export declare function parseTypeScriptVersionLine(line: string): TypeScriptVersion;
declare module "parsimmon" {
    type Pr<T> = pm.Parser<T>;
    function seqMap<T, U, V, W, X, Y, Z, A, B, C>(p1: Pr<T>, p2: Pr<U>, p3: Pr<V>, p4: Pr<W>, p5: Pr<X>, p6: Pr<Y>, p7: Pr<Z>, p8: Pr<A>, p9: Pr<B>, cb: (a1: T, a2: U, a3: V, a4: W, a5: X, a6: Y, a7: Z, a8: A, a9: B) => C): Pr<C>;
}
