import React, { useState } from 'react';
import Send from '@mui/icons-material/Send';
import { Avatar, Button, Chip, Divider, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { apiForum } from 'api';
import { useGlobalContext } from 'global/context';
import MyCKEditor from 'utils/CKEditor';

const WriteAnswer = ({ questionId, getQuestions, showWriteAnswerBox, setShowWriteAnswerBox, showAnswerBoxHandler, getAnswers }) => {
    const [value, setValue] = useState('');
    const { userData } = useGlobalContext();
    const formik = useFormik({
        initialValues: {
            email: userData?.email,
            questionId: questionId,
            title: ''
        },
        onSubmit: async (values, action) => {
            values = { ...values, body: value };
            // console.log({values});
            try {
                const res = await apiForum.post(`v1/api/answer`, values);
                if (res.status === 200) {
                    // console.log(res.data.message);
                    action.resetForm();
                    setValue('');
                    // getQuestions();
                    getAnswers();
                }
            } catch (error) {
                // console.log(error);
            }
        }
    });

    const charactersLeft = 150 - formik.values.title.length;

    return (
        <React.Fragment>
            <div className="write-answer mb-3">
                <Divider>
                    <Chip
                        avatar={<Avatar src={userData?.profile} />}
                        label={<span className='fw-bold fs-6'>Write your own answer here</span>}
                        variant="outlined"
                        color="info"
                        className='btn btn-outline-info shadow'
                        onClick={showAnswerBoxHandler}
                    />
                </Divider>
                <div className={`block-box post-view mt-3 your-answer ${showWriteAnswerBox ? '' : 'd-none'}`}>
                    <div className="post-body">
                        <form onSubmit={formik.handleSubmit}>
                            <TextField fullWidth label="Answer title..." id="fullWidth"
                                className='mb-3 rounded-3' 
                                name='title'
                                onChange={formik.handleChange}
                                value={formik.values.title}
                                inputProps={{ maxLength: 150 }}
                                helperText={`${charactersLeft} characters left`}
                            />
                            <MyCKEditor content={value} setContent={setValue} />
                            <br />
                            <Button variant="outlined" endIcon={<Send />} type='submit'
                                className='rounded-3 text-capitalize'
                                disabled={formik.isSubmitting || !formik.values.title || !value || value === "<p><br></p>" ? true : false}
                            >
                                Submit Answer
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default WriteAnswer;