import shuffleAnswers from './shuffle.jsx'

async function getQuiz(category) {
  try {
    const response = await fetch(`https://opentdb.com/api.php?amount=50&category=${category}`)
    const json = await response.json()

    if (json.response_code != 0) {
      await new Promise(resolve => setTimeout(resolve, 5000))
      return await getQuiz(category)
    }
    else {
      return shuffleAnswers(json)
    }
  }
  catch (error) {
    console.error(error)
    return null
  }
}

export default getQuiz
