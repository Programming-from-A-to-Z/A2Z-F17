PROGRAMING FROM A TO Z
======================

**Doing a Learn with Daniel Shiffman**
_This course focuses on programming strategies and techniques behind procedural analysis and generation of text-based data. We'll explore topics ranging from evaluating text according to its statistical properties to the automated production of text with probabilistic methods to text visualization. Student's will learn server-side and client-side JavaScript programming and develop projects that can be shared and interacted with online._

**TABLE OF CONTENTS**
<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

	- [1 - Intro](#1-intro)
	- [2 - Regular Expressions](#2-regular-expressions)
	- [3 - Data/API Workshop](#3-dataapi-workshop)
	- [4 - Bots! Bots! Bots!](#4-bots-bots-bots)
	- [5 - Text Analysis Workshop](#5-text-analysis-workshop)
	- [6 - Show Bots](#6-show-bots)
	- [7 - Text Generation: Word2Vec and Grammars](#7-text-generation-word2vec-and-grammars)
	- [8 - Text Generation: N-Grams, Markov chains, and LSTMs](#8-text-generation-n-grams-markov-chains-and-lstms)
	- [9 - Building your own API in Node](#9-building-your-own-api-in-node)
	- [10 - Chrome Extensions](#10-chrome-extensions)
	- [11 - Final Project Proposals part 1](#11-final-project-proposals-part-1)
	- [12 - Final Project Proposals part 2](#12-final-project-proposals-part-2)
	- [13 - User Testing](#13-user-testing)
	- [14 - Final Presentations](#14-final-presentations)
	- [References and Inspiration](#references-and-inspiration)
	- [Tools](#tools)
	- [JS reference books](#js-reference-books)
	- [Learning / Intro](#learning-intro)

<!-- /TOC -->

## 1 - Intro
- [Notes and Examples](http://shiffman.net/a2z/intro/)
- [Glitch Example](https://glitch.com/edit/#!/a2z-diastic)
- Git, Github, Github pages
- DOM manipulation in p5.js
- Strings in JS
- Text input (from user, from file)
- Client-side vs. Server-side programming
- Workflow videos:
  - [Sublime Text and Python Server](https://www.youtube.com/watch?v=UCHzlUiDD10)
  - [Atom and Node Server](https://www.youtube.com/watch?v=d3OcFexe9Ik)
  - [Brackets](https://www.youtube.com/watch?v=nmZbhManVcY)
  - [Codepen](https://www.youtube.com/watch?v=5gfUgNpS6kY)
- [Homework Assignment](https://github.com/shiffman/A2Z-F17/wiki/Week-1-Homework)

**__Field Notes__**

## 2 - Regular Expressions
- [Notes and Examples](http://shiffman.net/a2z/regex/)
- Also
  - multiple DOMs + multiple event
  - rita.js -- similar and rhyming, etc.
- Regular Expressions
  - meta-characters
    - position
    - single character
    - quantifiers
    - character classes
    - alternation
    - capturing groups and back reference
  - Regex in atom editor
  - Regex in JS:
    - Regex: `test()`, `exec()`
    - String: `match()`
  - Splitting with regex: `split()`
  - Replace with regex: `replace()`
  - [randexp.js](http://fent.github.io/randexp.js/)
- [Homework Assignment](https://github.com/shiffman/A2Z-F17/wiki/Week-2-Homework)

**__Field Notes__**

## 3 - Data/API Workshop
- [Notes and Examples](http://shiffman.net/a2z/data-apis/)
- JSON basics
  - [Corpora maintained by tinysubversions](https://github.com/dariusk/corpora)
- JavaScript libraries
  - [rita.js](https://github.com/dhowe/RiTaJS)
  - [nlp-compromise](https://github.com/nlp-compromise/nlp_compromise)
- Getting data from APIs
  - [wordnik](http://developer.wordnik.com/)
  - [nytimes api](https://developer.nytimes.com/)
  - [wikipedia api](https://en.wikipedia.org/w/api.php)
- Working with google sheets: [tabletop.js](https://github.com/jsoma/tabletop)
- machine learning as service: [clarafai](https://www.clarifai.com/)
- [Homework Assignment](https://github.com/shiffman/A2Z-F17/wiki/Week-3-Homework)

**__Field Notes__**

## 4 - Bots! Bots! Bots!
- [ChatBot Slides](https://docs.google.com/presentation/d/1NCeg8WJnH2RFU-VTMpYCffPGHkFRDAoED4LwK6affvI/edit?usp=sharing)
- [TwitterBot Slides](https://docs.google.com/presentation/d/1rL95AggCb0EG6sBhZ47OWWgI_t7Hllqbyt4AnD2c3-4/edit?usp=sharing)
- [Notes on Node](http://shiffman.net/a2z/server-node/)
- [Notes on Twitter Bots](http://shiffman.net/a2z/twitter-bots/)
 - [Notes on deploy to heroku](http://shiffman.net/a2z/bot-heroku/)
 - [Notes on deploy to amazon ec2](http://shiffman.net/a2z/bot-ec2/)
- ChatBots
 - [RiveScript](https://www.rivescript.com/)
 - [RiveScript video tutorial](https://www.youtube.com/watch?v=wf8w1BJb9Xc)
 - [RiveScript + p5.js video tutorial](https://www.youtube.com/watch?v=zGe1m_bLOFk)
- Voice Synthesis and Speech Recognition
 - [p5.Speech from Ability Project](http://ability.nyu.edu/p5.js-speech/)
- Conversational Interfaces
 - Alexa
 - [Hello Alexa Videos](https://www.youtube.com/watch?v=QxgdPI1B7rg)
 - [Offical Amazon Node Package](https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs)
  - [Fact Skill Walkthrough](https://github.com/alexa/skill-sample-nodejs-fact/blob/master/step-by-step/1-voice-user-interface.md)
 - [Alex-JS Node Package](https://github.com/alexa-js/alexa-app)
  - [video walkthrough](https://www.youtube.com/watch?v=pzM4jv7k7Rg)
  - [walkthrough code and notes](https://github.com/dblock/alexa-parrot)
 - [Google AIY](https://aiyprojects.withgoogle.com/)
 - [Google Assistant](https://developers.google.com/assistant/sdk/)
- Reading and References
  - [12 Weird, Excellent Twitter Bots Chosen by Twitter’s Best Bot-Makers](http://nymag.com/following/2015/11/12-weirdest-funniest-smartest-twitter-bots.html)
  - [Some Strategies of Bot Poetics](https://harrygiles.org/2016/04/06/some-strategies-of-bot-poetics/)
  - [How to Make a Bot That Isn't Racist](http://motherboard.vice.com/read/how-to-make-a-not-racist-bot)
  - [Queer Your Bots: The Bot Builder Roundtable](http://www.autostraddle.com/queer-your-bots-the-bot-builder-roundtable-333806/)
  - [Twitter: Automation rules and best practices](https://support.twitter.com/articles/76915)
- [Homework Assignment](https://github.com/shiffman/A2Z-F17/wiki/Bot-Project)

**__Field Notes__**

## 5 - Text Analysis Workshop
- [Notes on text analysis](http://shiffman.net/a2z/text-analysis/)
- In class, we'll build a simple concordance together as well as demonstrate and discuss TF/IDF, Bayesian analysis, and word2vec.
- Simple Concordance
- TF/IDF
- [Bayesian Classification Library](https://github.com/shiffman/bayes-classifier-js)
- Node text analysis packages

**__Field Notes__**

## 6 - Show Bots

**__Field Notes__**

## 7 - Text Generation: Word2Vec and Grammars
- Word2Vec
  - [Allison Parrish Word2Vec Tutorial](https://gist.github.com/aparrish/2f562e3737544cf29aaf1af30362f469)
  - [JavaScript Word2Vec Library](https://github.com/shiffman/p5-word2vec)
- Grammars
  - [Notes on Context-Free Grammar](http://shiffman.net/a2z/cfg)
  - [Tracery by Kate Compton](http://tracery.io/)
- [Homework Assignment](https://github.com/shiffman/A2Z-F17/wiki/Week-7-Homework)

**__Field Notes__**

## 8 - Text Generation: N-Grams, Markov chains, and LSTMs
- [Notes on N-Grams and Markov Chains](http://shiffman.net/a2z/markov)
- [Notes on RNN/LSTM](https://github.com/shiffman/A2Z-F17/tree/master/week8-markov-lstm/README.md)
- What is an N-Gram?
- What is Markov Chain?
  - order
  - source text and output design
  - char vs. word n-grams
  - client-side vs. server-side generation
- [Homework Assignment](https://github.com/shiffman/A2Z-F17/wiki/Week-8-Homework)

**__Field Notes__**

## 9 - Building your own API in Node
- [All examples](https://github.com/shiffman/A2Z-F17/tree/master/week9-node-api)
- [Notes on Node](http://shiffman.net/a2z/server-node/)
- [Notes on API in Node](http://shiffman.net/a2z/node-api/)
- [Notes on Firebase](http://shiffman.net/a2z/firebase)
- Express
  - serving files
- data persistence
  - local json files, databases?
  - [Firebase](https://firebase.google.com/)
- html scraping, request package
- routes
  - query string vs. "RESTian"
  - CORS
  - sending back JSON
- Text APIs
  - Your own API (concordance, markov, etc.)
  - AFINN-111 sentiment analysis ([sentiment node package](https://github.com/thisandagain/sentiment))
  - spellcheck (with [node natural](https://github.com/NaturalNode/natural))
  - Bayesian text classification (with [node natural](https://github.com/NaturalNode/natural))

**__Field Notes__**

## 10 - Chrome Extensions
- [Notes on chrome extensions](http://shiffman.net/a2z/chrome-ext/)

**__Field Notes__**

## 11 - Final Project Proposals part 1
- [Proposal links and schedule](https://github.com/shiffman/A2Z-F17/wiki/Final-Project-Proposals)

**__Field Notes__**

## 12 - Final Project Proposals part 2
- [Proposal links and schedule](https://github.com/shiffman/A2Z-F17/wiki/Final-Project-Proposals)

**__Field Notes__**

## 13 - User Testing
- [User Testing](https://github.com/shiffman/A2Z-F17/wiki/User-Testing)

**__Field Notes__**

## 14 - Final Presentations

**__Field Notes__**

## References and Inspiration
- Moved to [references wiki](https://github.com/shiffman/A2Z-F17/wiki/References)

## Tools
- [p5.js](http://p5js.org)
- [p5.js on GitHub](https://github.com/processing/p5.js)
- [p5.js CDN](http://cdnjs.com/libraries/p5.js)
- [Node](http://nodejs.org/)
- [RitaJS](https://github.com/dhowe/RiTaJS)
- Firebug ([tutorial](http://www.developerfusion.com/article/139949/debugging-javascript-with-firebug/))
- Sharing code snippets and asking questions: [gist.github.com](http://gist.github.com)

## JS reference books
- [JavaScript: The Definitive Guide](http://shop.oreilly.com/product/9780596000486.do)
- [Eloquent JavaScript](http://eloquentjavascript.net/contents.html), Marijn Haverbeke
- [Beginning JavaScript](http://www.amazon.com/Beginning-JavaScript-Paul-Wilton/dp/0470525932), Paul Wilton and Jeremy McPeak

## Learning / Intro
- [CodeAcademy: JavaScript](http://www.codecademy.com/tracks/javascript)
- [How to learn JavaScript properly](http://javascriptissexy.com/how-to-learn-javascript-properly/)
- [JavaScript the right way](http://www.jstherightway.org/)
- [Code School](https://www.codeschool.com/paths/javascript)
- [JavaScript garden](http://bonsaiden.github.io/JavaScript-Garden/)
- [A re-introduction to JS by Mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript)
- [JavaScript 101 from JQuery](https://learn.jquery.com/javascript-101/)
