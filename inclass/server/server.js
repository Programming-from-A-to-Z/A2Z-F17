const questions = [
  'Who am I?',
  'Who are you?'
];

const express = require('express');
const app = express();

app.listen(3000);
app.use(express.static('talktoserver'));

app.get('/question', newQuestion);

function newQuestion(request, response) {
  const index = Math.floor(Math.random() * questions.length);
  response.send({
    question: questions[index]
  });
}
