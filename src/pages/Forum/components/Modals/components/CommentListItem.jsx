import { Avatar, CardOverflow, IconButton, Input, Link, ListItem, ListItemContent, ListItemDecorator, Typography } from '@mui/joy';
import React, { useEffect, useState } from 'react';
import ReplyContainer from './ReplyContainer';
import moment from 'moment';
import { useGlobalContext } from 'global/context';
import { useFormik } from 'formik';
import { apiForum } from 'api';

const CommentListItem = ({ id, comment }) => {
    const [viewReplies, setViewReplies] = useState(false);
    const {userData} = useGlobalContext();
    const [replies, setReplies] = useState([]);
    const formik = useFormik({
        initialValues: {
            email: userData?.email,
            commentId: id,
            replyText: ""
        },
        onSubmit: async (values, action) => {
            console.log("Reply Values: ", values);
            try {
                const res = await apiForum.post(`/v1/api/reply`, values);
                if (res.status === 201) {
                    console.log("Reply Res: ", res?.data);
                    action.resetForm();
                    // getQuestions();
                    getReplies();
                }
            } catch (error) {
                console.log(error?.response?.data?.message)
            }
        }
    });

    const getReplies = async () => {
        try {
            const res = await apiForum.get(`/v1/api/reply?id=${comment?.id}`);
            if (res.status === 200) {
                setReplies(res.data.replies);
                console.log("Replies updated: ", res.data.replies);
            }
        } catch (error) {
            console.log(error?.response?.data?.message)
        }
    }

    const handleViewReplies = () => {
        if (viewReplies) {
            setViewReplies(false);
            return;
        } else {
            setViewReplies(true);
        }
    }

    useEffect(()=> {
        console.log('Setting Initial Values of Replies'); 
        setReplies(comment?.replies);
    }, []);

    return (
        <>
            <ListItem>
                <ListItemDecorator sx={{ alignSelf: 'flex-start' }}>
                    <Avatar size="sm" src={comment?.auther?.profile_pic} />
                </ListItemDecorator>

                <ListItemContent>
                    <Link color='info'>{comment?.auther?.name}</Link> <span style={{
                        fontSize:'12px',
                        fontStyle:'italic'
                    }}>{moment(comment?.created_at).fromNow()}</span>
                    <Typography level="body2" >
                        {comment?.comment_text}
                    </Typography>
                    {/* <Link
                        component="button"
                        underline="none"
                        fontSize="sm"
                        startDecorator="…"
                        sx={{ color: 'text.tertiary' }}
                    >
                        more
                    </Link> */}
                    <div className='ms-auto'>
                        <Link

                            component="button"
                            underline="none"
                            fontSize="sm"
                            startDecorator=" "
                            sx={{ color: 'text.link' }}
                            onClick={handleViewReplies}
                        >
                            {
                                replies?.length ?
                                replies?.length + " replies" : "reply"
                            }
                            {/* {comment?.replies?.length} replies */}
                        </Link>
                        {
                            viewReplies ?
                                <>
                                    <ReplyContainer replies={replies} />
                                    <CardOverflow sx={{ p: 'var(--Card-padding)', display: 'flex' }}>
                                        <IconButton size="sm" variant="plain" color="neutral" sx={{ ml: -1 }}>
                                            {/* <Face /> */}
                                            <Avatar size="small" src={userData?.profile} style={{height: '24px', width: '24px'}}/>
                                        </IconButton>
                                        <Input
                                            variant="plain"
                                            size="sm"
                                            placeholder="Add a reply…"
                                            sx={{ flexGrow: 1, mr: 1, '--Input-focusedThickness': '0px' }}
                                            id='replyText'
                                            name='replyText'
                                            value={formik.values.replyText}
                                            onChange={formik.handleChange}
                                            onKeyDown={(e) => {
                                              if (e.key === 'Enter') {
                                                formik.handleSubmit();
                                              }
                                            }}
                                        />
                                        <Link disabled underline="none" role="button">
                                            Post
                                        </Link>
                                    </CardOverflow>
                                </> : null
                        }

                    </div>
                </ListItemContent>
            </ListItem>
        </>
    )
}

export default CommentListItem