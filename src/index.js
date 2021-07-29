import './style.css';

const api = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/wzWC5pdBI4Y9dgslTrV2/scores/';

const tbodySelector = document.querySelector('tbody');

const refreshScore = async () => {
  await fetch(api)
    .then((response) => response.json())
    .then((json) => {
      tbodySelector.innerHTML = '';
      json.result.forEach((element) => {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.innerHTML = `${element.user}: ${element.score}`;
        tr.appendChild(td);
        tbodySelector.appendChild(tr);
      });
    });
};
refreshScore();
const refreshBtn = document.querySelector('#refresh');
refreshBtn.addEventListener('click', refreshScore);

const addScores = async () => {
  const userInput = document.querySelector('#user');
  const scoreInput = document.querySelector('#score');
  await fetch(api, {
    method: 'POST',
    body: JSON.stringify({
      user: userInput.value,
      score: Number(scoreInput.value),
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  userInput.value = '';
  scoreInput.value = '';
  refreshScore();
};

const submitBtn = document.querySelector('#submit');
submitBtn.addEventListener('click', addScores);
