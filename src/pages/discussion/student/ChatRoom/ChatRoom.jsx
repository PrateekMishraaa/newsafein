import React, { useEffect, useRef, useState } from "react";

import "../../ChatRoom.css";
import useChat from "../../useChat";
import { Button, Modal, TextField, Typography, Box } from "@mui/material";
import { useGlobalContext } from "global/context";
import MessageItem from "./MessageItem";
import { apiJsonAuth } from "api";
import { useParams } from "react-router-dom";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  borderRadius: 5,
  transform: 'translate(-50%, -50%)',
  maxWidth: 500,
  bgcolor: 'background.paper',
  border: '1px solid lightgrey',
  boxShadow: 24,
  p: 4,
};

const ChatRoom = ({ open, setOpen, showVote }) => {
  const { userData, token } = useGlobalContext();
  const chatDiv = useRef();
  const params = useParams();
  const roomId = params?.meetingid;
  const { messages, sendMessage } = useChat(roomId);
  const [newMessage, setNewMessage] = React.useState("");
  const [votesArr, setVotesArr] = useState([]);
  const handleClose = () => setOpen(false);
  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };
  const handleSendMessage = () => {
    sendMessage(newMessage, userData);
    setNewMessage("");
    handleClose()
  };
  const scrollDown = () => {
    chatDiv.current.scrollTo(0, chatDiv.current.scrollHeight);
  };
  const fetchVotes = async () => {
    const response = await apiJsonAuth.get("/discussion/points/vote", {
      headers: {
        Authorization: token
      }
    });
    if (response.status === 200) {
      setVotesArr(response.data.result);
    }
  };
  useEffect(() => {
    fetchVotes();
  }, []);
  useEffect(() => {
    scrollDown();
  }, [messages]);
  return (
    <div className="chat-room-container">
      <div className="messages-container" ref={chatDiv}>
        <ol className="messages-list">
          {messages?.map((point, i) => (
            <MessageItem reloadVote={fetchVotes} voted={votesArr.includes(point?.id)} message={point} key={i} i={i} showVote={showVote} />
          ))}
        </ol>
      </div>
      {/* Answer Modal  */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <h6>Note:</h6>
            <ol className="p-0">
              <li style={{ listStyle: "none" }}>You Can Add Total 4 points to the Discussion.</li>
              <li style={{ listStyle: "none" }}>Each Point will be voted by other members of track and leaders track.</li>
            </ol>
          </div>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Write your suggested point
          </Typography>
          <TextField
            value={newMessage}
            fullWidth
            multiline
            rows={4}
            size="large"
            onChange={handleNewMessageChange}
            placeholder="Click to write..."
            className="new-message-input-field pe-0"
          />
          <Button variant="contained" color="warning" size="large" fullWidth className="rounded mt-3 py-3 text-capitalize" onClick={handleSendMessage}>
            Add point to Discussion
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ChatRoom;
