import { Avatar, Button, Divider } from '@mui/material';
import { apiForum } from 'api';
import { useFormik } from 'formik';
import { useGlobalContext } from 'global/context';
import React, { useState } from 'react'
import Reply from './Reply';

const Replies = ({ showReplyBox, handleShowReplyBox, replies, commentId, getReplies }) => {
    const { userData } = useGlobalContext();
    const formik = useFormik({
        initialValues: {
            email: userData?.email,
            commentId: commentId,
            replyText: ""
        },
        onSubmit: async (values, action) => {
            // console.log("Reply Values: ", values);
            try {
                const res = await apiForum.post(`/v1/api/reply`, values);
                if (res.status === 201) {
                    // console.log("Reply Res: ", res?.data);
                    action.resetForm();
                    getReplies();
                }
            } catch (error) {
                // console.log(error?.response?.data?.message)
            }
        }
    });
    return (
        <React.Fragment>
            <div>
                <ul className="children">

                    {
                        replies?.map((reply) => {
                            return <Reply handleShowReplyBox={handleShowReplyBox} reply={reply} />
                        })
                    }
                </ul>
                <Divider />
                <div className={`comment-reply bg-light-maroon-grad rounded  ${showReplyBox ? '' : 'd-none'}`}>
                    <div className="user-img">
                        {/* <img src={require("../../media/figure/chat_15.jpg")} alt="Aahat" /> */}
                        <Avatar
                            className='bg-white'
                            src={userData?.profile}
                            alt={userData?.first_name + " " + userData?.last_name}
                        />
                    </div>
                    <form className="input-box input-group" onSubmit={formik.handleSubmit}>
                        <input type="text" name="replyText"
                            className="form-control"
                            placeholder="Add your reply"
                            value={formik.values.replyText}
                            onChange={formik.handleChange} />
                        <Button variant='contained' className='text-capitalize rounded-end' type="submit">Reply</Button>
                    </form>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Replies;