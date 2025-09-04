import React from 'react';
import ReplyList from './ReplyList';

const ReplyContainer = ({replies}) => {
    return (
        <>
            {
                replies?.map(reply => {
                    return <ReplyList key={reply.id} reply={reply}/>
                })
            }
        </>
    )
}

export default ReplyContainer;