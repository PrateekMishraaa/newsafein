import { Button, TextField } from '@mui/material';
import { apiAuth, apiJsonAuth } from 'api';
import { useGlobalContext } from 'global/context';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function QuizControl() {
  const navigate = useNavigate();
  const [quizList, setQuizList] = useState();
  const [show, setShow] = useState(true);
  const { token } = useGlobalContext();
  const [quiz, setQuiz] = useState({
    title: "",
    duration: "",
    level: "Easy",
    passing_criteria: "",
    sectionId: "",
    desc: "",
  });
  function fetchQuizs() {
    if (token)
      apiAuth.get("/course/quiz/fetch").then((res) => {
        // console.log(res?.data.result)
        setQuizList(res?.data.result)
      }).catch((err) => {
        console.error(err);
      })
  }
  useEffect(() => {
    fetchQuizs(); 
  }, [token])

  function createQuiz() {
    // console.log(quiz);
    if (quiz.title && quiz.level && quiz.duration, quiz.sectionId) {
      toast.loading("Creating Quiz.")
      apiJsonAuth.post("/course/quiz/create", quiz).then((res) => {
        // console.log(res);
        if (res.data.status === 200) {
          toast.dismiss();
          toast.success("Quiz is Created!");
          setQuiz({
            title: "",
            duration: "",
            level: "Easy",
            passing_criteria: "",
            sectionId: "",
            desc: "",
          });
          setShow(!show);
          fetchQuizs();
        } else {
          toast.dismiss();
          toast.warning("Something Went Wrong!");
        }
      }).catch((err) => {
        toast.dismiss();
        console.error(err);
      })
    } else {
      toast.warning("All Fileds are required..")
    }

  }




  return (
    <div className='py-4'>
      <h6>QuizControl</h6>
      <div className='position-relative'>
        <Button variant='outlined' onClick={() => { setShow(!show) }} >Add Quiz</Button>
        <div hidden={show} className='card position-absolute shadow-lg border p-3 rounded-3'>
          <span className='position-absolute top-0 end-0 mx-2 fs-5' style={{ cursor: "pointer" }} onClick={() => {
            setShow(!show);
          }}  > &#10006; </span>
          <p>Create Quiz</p>
          <div hidden={show} className='container'>
            <TextField className='my-2' size='small' label="Title" name="title" fullWidth value={quiz.title} onChange={e => setQuiz(value => { return { ...value, title: e.target.value } })} />
            <TextField className='my-2' maxRows={3} multiline size='small' label="Descriptions" name="title" fullWidth value={quiz.desc} onChange={e => setQuiz(value => { return { ...value, desc: e.target.value } })} />
            <TextField type='number' className='my-2 px-1 w-50' size='small' label="Duration (Min)" name="title" value={quiz.duration} onChange={e => setQuiz(value => { return { ...value, duration: e.target.value } })} />
            <TextField type='number' className='my-2 px-1 w-50' size='small' label="Passing Criteria (%)" name="title" value={quiz.passing_criteria} onChange={e => setQuiz(value => { return { ...value, passing_criteria: e.target.value } })} />
            <TextField type='number' className='my-2 px-1 w-50' size='small' label="Section Id" name="title" value={quiz.sectionId} onChange={e => setQuiz(value => { return { ...value, sectionId: e.target.value } })} />

            <select className='text-dark w-50 px-4 border-1 rounded-2 border-secondary p-2 m-2' value={quiz.level} onChange={e => setQuiz(value => { return { ...value, level: e.target.value } })} defaultValue="" >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
            <Button className='px-4 p-2' onClick={createQuiz} variant='outlined' >Create</Button>
          </div>
        </div>
      </div>
      <div className='mt-3'>
        <table class="table table-lg table-bordered overflow-scroll table-hover">
          <thead>
            <tr>
              <th>Quiz&nbsp;Id</th>
              <th>Section&nbsp;Id</th>
              <th>Title</th>
              <th>desc</th>
              <th>Duration(Min)</th>
              <th>Level</th>
              <th>Passing(%)</th>
            </tr>
          </thead>
          <tbody>
            {quizList?.map(item => (
              <tr onClick={() => { navigate(`/admin/quiz/${item.id}`, { state: item }) }}>
                <td>{item.id}</td>
                <td>{item.sectionId}</td>
                <td>{item.title}</td>
                <td>{item.desc}</td>
                <td>{item.duration}</td>
                <td>{item.level}</td>
                <td>{item.passing_criteria}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div >
  )
}

export default QuizControl