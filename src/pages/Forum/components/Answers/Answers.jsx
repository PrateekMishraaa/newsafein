import React, { useEffect, useState } from 'react';
import ThumbDownTwoTone from '@mui/icons-material/ThumbDownTwoTone';
import ThumbUpTwoTone from '@mui/icons-material/ThumbUpTwoTone';
import ForumTwoTone from '@mui/icons-material/ForumTwoTone';
import { Avatar, Chip, Divider, ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ReportTwoToneIcon from '@mui/icons-material/ReportTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import Comments from '../Comments/Comments';
import moment from 'moment';
import { apiForum } from 'api';
import { useGlobalContext } from 'global/context';
import { pop2 } from 'utils/Popup';
import EditAnswer from '../Modals/EditAnswer';
import ReportContent from '../Modals/ReportContent';

const Answers = ({ showAnswer, answer }) => {
    const [alignment, setAlignment] = React.useState('left');
    const [showAnswerComments, setShowAnswerComments] = useState(false);
    const { userData } = useGlobalContext();
    const [editOpen, setEditOpen] = React.useState(false);
    const [openReport, setOpenReport] = React.useState(false);
    const [upVote, setUpVote] = useState(0);
    const [downVote, setDownVote] = useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [comments, setComments] = useState(answer?.comments);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const handleVote = async (voteType) => {
        const formData = {
            email: userData?.email,
            answerId: answer?.id,
            voteType: voteType
        }
        try {
            const res = await apiForum.post(`/v1/api/vote`, formData);
            if (res.status === 200) {
                console.log("Vote Res: ", res?.data);
                getVotes();
            }
        } catch (error) {
            console.log(error?.response?.data?.message);
            pop2.error("Something went wrong!")
        }
    }

    const getComments = async () => {
        let id = answer?.id;
        let type = 'answer';
        // if (answer?.id) {
        //     id = answer?.id;
        //     type = 'answer';
        // } else if (questionId) {
        //     id = questionId;
        //     type = 'question';
        // }
        try {
            const res = await apiForum.get(`/v1/api/comment?id=${id}&type=${type}`);
            if (res?.status === 200) {
                // console.log("Fetched Comments:", res.data);
                // console.log(res?.data?.message);
                setComments(res?.data?.comments);
            }
        } catch (error) {
            // console.log(error?.response?.data?.message);
        }
    }

    const getVotes = async () => {

        try {
            const res = await apiForum.get(`/v1/api/votes/${answer?.id}?type=answer`);
            if (res.status === 200) {
                console.log("Votes Res: ", res?.data);
                // getQuestions();
                setUpVote(res?.data?.upvotes);
                setDownVote(res?.data?.downvotes);
            }
        } catch (error) {
            console.log(error?.response?.data?.message);
            pop2.error("Something went wrong!")
        }
    }

    useEffect(() => {
        setUpVote(answer?.votes?.upVoteCount);
        setDownVote(answer?.votes?.downVoteCount);
    }, []);

    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    return (
        <React.Fragment>
            <div className="answers">
                <div className={`answer-container ${showAnswer ? '' : 'd-none'}`}>
                    <Divider>

                        <Chip
                            avatar={<Avatar alt={answer?.auther?.name} src={answer?.auther?.profile_pic} />}
                            label={answer?.auther?.name}
                            variant="outlined"
                            className='btn btn-outline-success'
                        />
                        <span className='fst-italic'> ~ answered {moment(answer?.created_at).fromNow()}  </span>
                    </Divider>
                    <div className="block-box post-view mt-3">
                        <div className="answer">
                            <div className="post-body">
                                <div className="post-no-thumbnail d-flex">
                                    <div>
                                        <h4 className='text-success border p-2 rounded-3' style={{ height: '50px !important', width: '50px !important' }}>A</h4>
                                    </div>
                                    <div style={{ paddingLeft: '20px' }}>
                                        <h5 className='fw-bold'>{answer?.title}</h5>
                                        {/* <p className='fs-6'>{answer?.body}</p> */}
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: answer?.body,
                                            }}
                                        />
                                    </div>
                                    <div className="dropdown ms-auto">
                                        <Tooltip title="Menu">
                                            <IconButton
                                                aria-label="more"
                                                id="long-button"
                                                aria-controls={open ? 'long-menu' : undefined}
                                                aria-expanded={open ? 'true' : undefined}
                                                aria-haspopup="true"
                                                onClick={handleClick}
                                            >
                                                <MoreVertIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Menu
                                            id="long-menu"
                                            MenuListProps={{
                                                'aria-labelledby': 'long-button',
                                            }}
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleClose}
                                            PaperProps={{
                                                style: {
                                                    width: '14ch',
                                                },
                                            }}
                                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                        >
                                            {
                                                answer?.auther?.email === userData?.email ?
                                                    <div>
                                                        <MenuItem onClick={() => {
                                                            setEditOpen(true);
                                                            handleClose();
                                                        }}>
                                                            <EditTwoToneIcon color="info" style={{ marginRight: "10px" }} /> Edit
                                                        </MenuItem>
                                                        <MenuItem onClick={handleClose}>
                                                            <DeleteTwoToneIcon color="error" style={{ marginRight: "10px" }} /> Delete
                                                        </MenuItem>
                                                    </div> :
                                                    <MenuItem onClick={() => {
                                                        setOpenReport(true);
                                                        handleClose();
                                                    }}>
                                                        <ReportTwoToneIcon color='warning' style={{ marginRight: "10px" }} /> Report
                                                    </MenuItem>
                                            }
                                        </Menu>
                                    </div>
                                </div>

                                <div className="post-meta-wrap">
                                    <div className="post-meta">
                                        {/* <div className="post-reaction">
                                            <div>
                                                <ThumbUpTwoTone color="success"
                                                    onClick={() => handleVote('upvote')}
                                                />
                                            </div>
                                            <div className="meta-text">{answer?.votes?.upVoteCount}</div>
                                            <Divider orientation="vertical" flexItem />
                                            <div className='px-3'>
                                                <ThumbDownTwoTone color="error" onClick={() => handleVote('downvote')} />
                                                <div className="meta-text">{answer?.votes?.downVoteCount}</div>
                                            </div>
                                        </div> */}

                                        <ToggleButtonGroup
                                            value={alignment}
                                            exclusive
                                            size='small'
                                            onChange={handleAlignment}
                                            aria-label="text alignment"
                                            className='rounded-3'
                                        >
                                            <ToggleButton value="left"
                                                onClick={() => handleVote('upvote')}
                                                aria-label="left aligned" style={{ p: 1 }}>
                                                <div>
                                                    <ThumbUpTwoTone className={"fs-6"} color='success'

                                                    />
                                                </div>
                                                <div className="meta-text">{upVote}</div>
                                            </ToggleButton>
                                            <ToggleButton value="center" aria-label="centered"
                                                onClick={() => handleVote('downvote')}
                                            >
                                                <div>
                                                    <ThumbDownTwoTone className={"fs-6"} color='error' />
                                                    <div className="meta-text">{downVote}</div>
                                                </div>
                                            </ToggleButton>
                                        </ToggleButtonGroup>
                                    </div>
                                    <div className="post-meta">
                                        <div className="meta-text" onClick={
                                            () => {
                                                if (showAnswerComments) {
                                                    setShowAnswerComments(false)
                                                } else {
                                                    setShowAnswerComments(true);
                                                }
                                            }
                                        }><ForumTwoTone color='info' /> {comments?.length} Comments</div>
                                        {/* <div className="meta-text"><ShareTwoTone color='primary' />{answer?.share_count ? answer?.share_count : 0} Shares</div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <EditAnswer open={editOpen} setOpen={setEditOpen} title={answer?.title} description={answer?.body} id={answer?.id} />
                        <ReportContent
                            open={openReport}
                            setOpen={setOpenReport}
                            itemType='answer'
                            itemId={answer?.id}
                        />
                        <Comments showComments={showAnswerComments} comments={comments} answerId={answer?.id} getComments={getComments} />
                    </div>

                </div>
            </div>
        </React.Fragment>
    )
}

export default Answers;