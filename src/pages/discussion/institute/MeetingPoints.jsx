import { useGlobalContext } from 'global/context';
import React, { useRef } from 'react'
import { useParams } from 'react-router-dom';
import useChat from '../useChat';
import MessageItem from './ChatRoom/MessageItem';

const MeetingPoints = ({ roomId }) => {
    const { userData, token } = useGlobalContext();
    const chatDiv = useRef();
    const params = useParams()
    const { messages,  reloader } = useChat(params?.meetingid);
    return (
        <div className="messages-container" ref={chatDiv}>
            <ol className="messages-list p-0">
                {messages?.map((point, i) => (
                    <MessageItem const={userData} reloader={reloader} message={point} />
                ))}
            </ol>
        </div>
    )
}

export default MeetingPoints