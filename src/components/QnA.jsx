// src/components/QnA.jsx
import { useState } from 'react';
import parse from 'html-react-parser';
import useSWR from 'swr';
import shuffleAnswers from './shuffle.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { setScore } from '../store/actions/quizActions';
import { useAxios } from '../AxiosContext';

const QnA = (props) => {
  const [disabled, setDisabled] = useState(false);
  const [result, setResult] = useState('');
  const [question, setQuestion] = useState(0);
  const [difficulty] = useState({
    easy: [2, 10],
    medium: [5, 5],
    hard: [10, 2]
  });

  const { token, loggedIn, userID } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const axiosInstance = useAxios();

  const { data, error, isValidating } = useSWR(
    props.category ? [`quiz-${props.category}`, props.category] : null,
    ([_, category]) => getter(`https://opentdb.com/api.php?amount=50&category=${category}`),
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
      shouldRetryOnError: true,
      errorRetryCount: 3
    }
  );

  const getter = async (url) => {
    try {
      const response = await fetch(url);
      const json = await response.json();

      if (json.response_code !== 0) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        return await getter(url);
      }
      return shuffleAnswers(json);
    } catch (error) {
      throw error;
    }
  };

  const updateScore = async (newScore) => {
    try {
      if (!loggedIn || !token) {
        console.log("User not logged in, skipping score update");
        return;
      }

      console.log(`Updating score to: ${newScore}`);

      const response = await axiosInstance.post('/users/updateScore', {
        score: newScore
      });

      if (response.status === 200) {
        console.log("Score updated successfully:", response.data);
      }
    } catch (error) {
      console.error('Error updating score:', error);
      if (error.response) {
        console.error('Server response:', error.response.data);
      }
    }
  };

  const check = async (answer) => {
    if (data) {
      let changeInScore = 0;
      if (answer === data.results[question].correct_answer) {
        changeInScore = difficulty[data.results[question].difficulty][0];
        setResult('Correct');
      } else {
        changeInScore = -difficulty[data.results[question].difficulty][1];
        setResult(`No, it's ${parse(data.results[question].correct_answer)}`);
      }

      const newTotalScore = Math.max(props.score + changeInScore, 0);
      dispatch(setScore(newTotalScore));

      if (loggedIn && token && changeInScore !== 0) {
        console.log(`Updating score in backend. New total: ${newTotalScore}`);
        await updateScore(newTotalScore);
      }

      const timer = setTimeout(() => {
        if (question === 49) {
          console.log('Hit 50 questions, resetting to 0');
          setQuestion(0);
        } else {
          setQuestion(prev => prev + 1);
        }
        setResult('');
        setDisabled(false);
      }, 1000);
    }
  };

  const handleClick = (answer, e) => {
    setDisabled(true);
    check(answer);
    e.target.blur();
  };

  return (
    <>
      {data ? (
        <div className="flex flex-col items-center gap-4">
          <h3 className="text-lg font-semibold text-navy-blue">{result}</h3>
          <h6 className="text-sm text-neutral">Question {question + 1}/50</h6>
          <h3 className="text-xl mb-4 text-navy-blue">{parse(data.results[question].question)}</h3>
          <div className="grid grid-cols-2 gap-2 w-full">
            {data.results[question].answers?.map((answer, index) => (
              <button
                type='button'
                onClick={(e) => handleClick(answer, e)}
                key={index}
                disabled={disabled}
                className='btn btn-primary text-powder normal-case h-auto min-h-[3rem] p-2 hover:scale-105 transition-transform text-sm'
              >
                {parse(answer)}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="loading loading-spinner loading-lg"></div>
      )}
    </>
  );
};

export default QnA;
