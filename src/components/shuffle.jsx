function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function shuffleAnswers(json) {
  for (let i = 0; i < json.results.length; i++) {
    let allAnswers = shuffleArray([...json.results[i].incorrect_answers, json.results[i].correct_answer]);
    json.results[i]['answers'] = allAnswers;
  }
  return json;
}

export default shuffleAnswers;
