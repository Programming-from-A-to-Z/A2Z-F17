// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// An LSystem has a starting sentence
// An a ruleset
// Each generation recursively replaces characteres in the sentence
// Based on the rulset


// LSystem Rule object

class Rule {

  constructor(a_, b_) {
    this.a = a_;
    this.b = b_;
  }

  getA() {
    return this.a;
  }

  getB() {
    return this.b;
  }
}


// Construct an LSystem with a startin sentence and a ruleset
class LSystem {

  constructor(axiom, r) {
    this.sentence = axiom; // The sentence (a String)
    this.ruleset = r; // The ruleset (an array of Rule objects)
    this.generation = 0; // Keeping track of the generation #
  }

  // Generate the next generation
  generate() {
    // An empty StringBuffer that we will fill
    var nextgen = '';
    // For every character in the sentence
    for (var i = 0; i < this.sentence.length; i++) {
      // What is the character
      // We will replace it with itself unless it matches one of our rules
      var replace = this.sentence.charAt(i);
      // Check every rule
      for (var j = 0; j < this.ruleset.length; j++) {
        var a = this.ruleset[j].getA();
        // if we match the Rule, get the replacement String out of the Rule
        if (a === replace) {
          replace = this.ruleset[j].getB();
          break;
        }
      }
      // Append replacement String
      nextgen += replace;
    }
    // Replace sentence
    this.sentence = nextgen;
    // Increment generation
    this.generation++;
  }

  getSentence() {
    return this.sentence;
  }

  getGeneration() {
    return this.generation;
  }
}
