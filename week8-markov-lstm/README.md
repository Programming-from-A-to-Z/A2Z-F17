# Additional Notes and Resources

## Markov 
* http://shiffman.net/a2z/markov

## LSTM

### p5-deeplearn-js
* [p5-deeplearn-js LSTM example 1](https://github.com/ITPNYU/p5-deeplearn-js/tree/master/examples/plainjs/lstm_1), [p5-deeplearn-js LSTM example 2](https://github.com/ITPNYU/p5-deeplearn-js/tree/master/examples/plainjs/lstm_2)
* [Notes on how to train your own LSTM for p5-deeplearn-js](https://github.com/ITPNYU/p5-deeplearn-js/blob/master/training/lstm/README.md)

### Articles
* [The Unreasonable Effectiveness of Recurrent Neural Networks](http://karpathy.github.io/2015/05/21/rnn-effectiveness/) by Andrej Karpathy
* [Rohan & Lenny #3: Recurrent Neural Networks & LSTMs](https://ayearofai.com/rohan-lenny-3-recurrent-neural-networks-10300100899b)
* [Recurrent Neural Networks in Tensorflow](https://www.tensorflow.org/versions/r0.10/tutorials/recurrent/)
* [Siraj's RNN video](https://www.youtube.com/watch?v=cdLUzrjnlr4), [code on github](https://github.com/llSourcell/recurrent_neural_net_demo/blob/master/rnn.py)

### Creative Projects
* [Writing with the Machine](https://www.robinsloan.com/notes/writing-with-the-machine/)
* [Magenta: Make Music and Art Using Machine Learning](https://magenta.tensorflow.org/)
* [Sketch-RNN](https://magenta.tensorflow.org/sketch-rnn-demo)
* [Handwriting Generation with RNN and p5.js](http://blog.otoro.net/2017/01/01/recurrent-neural-network-artist/)
* [Experiments in handwriting](http://distill.pub/2016/handwriting/)
* [RNN for generating Baroque Music](https://www.youtube.com/watch?v=SacogDL_4JU)

### RNN Parameters
* `maxlen` - length of a "sentence" for inputting into RNN.
* temperature (aka "diversity"): A number in the range of 0-1 (cannot be 0). The temperature is divides probabilities before applying softmax. Lower temperature will result in more "expected" outcomes (high probabilities are even higher). A higher temperature increases the "diversity" of outcomes, but may produce less "correct-sounding" results.

### RNN architectures
* one to one (ANN)
* one to many (captioning)
* many to one (sentiment analysis)
* many to many (text, music generation, language translation)

### Python
* [Environment Setup](https://github.com/shiffman/A2Z-F17/wiki/Python-Environment-for-LSTM-example)
* `open()` and `read()` for reading in a text file: [python docs](https://docs.python.org/2/tutorial/inputoutput.html)
* [dictionaries in python](https://docs.python.org/3/tutorial/datastructures.html#tut-dictionaries) for looking up characters by index, and index by characters.
* `enumerate()`: [docs](https://docs.python.org/2.3/whatsnew/section-enumerate.html) for iterating over all characters.
