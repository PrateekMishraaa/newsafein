import React, { useState, useEffect } from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Switch from '@mui/joy/Switch';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalOverflow from '@mui/joy/ModalOverflow';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Answers from '../Answers/Answers';
import { apiForum } from 'api';
import { Divider } from '@mui/material';
import WriteAnswer from '../Comments/WriteAnswer';

export default function ViewAnswer({ layout, setLayout, id, question, setAnswerLength }) {
  // const [layout, setLayout] = React.useState(undefined);
  const [answers, setAnswers] = useState();
  const [showAnswer, setShowAnswer] = useState(true);

  const [scroll, setScroll] = React.useState(true);
  const [showWriteAnswerBox, setShowWriteAnswerBox] = useState(true);
    const showAnswerBoxHandler = () => {
        if (showWriteAnswerBox) {
            setShowWriteAnswerBox(false);
        } else {
            setShowWriteAnswerBox(true);
        }
    }

  const getAnswers = async () => {
    try {
      const res = await apiForum.get(`/v1/api/answer?id=${question?.id}`);
      if (res.status === 200) {
        setAnswers(res?.data?.results);
        setAnswerLength(res?.data?.results?.length);
        console.log("Answer Data: ", res);
      }
    } catch (error) {
      console.log(error.response.data.error);
    }
  }

  useEffect(() => {
    getAnswers();
  }, []);


  return (
    <React.Fragment>
      {/* <Stack direction="row" spacing={1}>
        <Button
          variant="outlined"
          color="neutral"
          onClick={() => {
            setLayout('center');
          }}
        >
          Center
        </Button>
        <Button
          variant="outlined"
          color="neutral"
          onClick={() => {
            setLayout('fullscreen');
          }}
        >
          Full screen
        </Button>
      </Stack> */}
      <Modal
        open={!!layout}
        onClose={() => {
          setLayout(undefined);
        }}
      >
        <ModalOverflow>
          <ModalDialog aria-labelledby="modal-dialog-overflow" layout={layout}>
            <ModalClose />
            <Typography id="modal-dialog-overflow" component="h2">
              Answers ({answers?.length})
            </Typography>
            {/* <Typography id="modal-dialog-overflow" component="h2">
              question?.title
            </Typography> */}
            {/* <FormControl
              orientation="horizontal"
              sx={{ bgcolor: 'background.level2', p: 1, borderRadius: 'sm' }}
            >
              <FormLabel>Long content</FormLabel>
              <Switch
                checked={scroll}
                onChange={(event) => setScroll(event.target.checked)}
                sx={{ ml: 'auto' }}
              />
            </FormControl> */}
            {scroll && (
              // <List>
              //   {[...Array(100)].map((item, index) => (
              //     <ListItem key={index}>Item number ({index})</ListItem>
              //   ))}
              // </List>
              <>
                {
                    answers?.map((answer) => {
                        return <Answers showAnswer={showAnswer} answer={answer}/>
                    })
                }
                <WriteAnswer questionId={question?.id} showWriteAnswerBox={showWriteAnswerBox} setShowWriteAnswerBox={setShowWriteAnswerBox} showAnswerBoxHandler={showAnswerBoxHandler} getAnswers={getAnswers} />
              </>
            )}
          
          </ModalDialog>
        </ModalOverflow>
      </Modal>
    </React.Fragment>
  );
}