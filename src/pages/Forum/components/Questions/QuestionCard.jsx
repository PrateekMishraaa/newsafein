import React, { useEffect, useState } from 'react';
import WriteAnswer from '../../components/Comments/WriteAnswer';
import Answers from '../../components/Answers/Answers';
import Questions from '../../components/Questions/Questions';
import { apiForum } from 'api';

const QuestionCard = ({ question, getQuestions }) => {
    const [showAnswer, setShowAnswer] = useState(false);
    const [answers, setAnswers] = useState();

    const showAnswerHandler = () => {
        if (showAnswer) {
            setShowAnswer(false);
        } else {
            setShowAnswer(true);
        }
    }

    const getAnswers = async () => {
        try {
            const res = await apiForum.get(`/v1/api/answer?id=${question?.id}`);
            if (res.status === 200) {
                setAnswers(res?.data?.results);
                // console.log("Answer Data: ", res);
            }
        } catch (error) {
            // console.log(error.response.data.error);
        }
    }

    useEffect(() => {
        getAnswers();
    }, []);

    return (
        <>
            <div className='rounded-4 border mb-3 shadow-sm'>
                <Questions
                    showAnswerHandler={showAnswerHandler}
                    showAnswer={showAnswer}
                    question={question}
                    className='border rounded-4'
                    getQuestions={getQuestions}
                    isAnswered={answers?.length}
                />
                {/* {
                    answers?.map((answer) => {
                        return <Answers showAnswer={showAnswer} answer={answer} getQuestions={getQuestions}/>
                    })
                }
                <WriteAnswer questionId={question?.id} getQuestions={getQuestions}/> */}
            </div>
        </>
    )
}

export default QuestionCard;