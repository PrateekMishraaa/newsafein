import React, { useEffect, useState } from 'react';
import ThumbDownTwoTone from '@mui/icons-material/ThumbDownTwoTone';
import ThumbUpTwoTone from '@mui/icons-material/ThumbUpTwoTone';
import ForumTwoTone from '@mui/icons-material/ForumTwoTone';
import ShareTwoTone from '@mui/icons-material/ShareTwoTone';
import { Avatar, Button, IconButton, Tooltip, Menu, MenuItem } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Comments from '../../components/Comments/Comments';
import moment from 'moment';

import {
    EmailShareButton,
    FacebookShareButton,
    HatenaShareButton,
    InstapaperShareButton,
    LineShareButton,
    LinkedinShareButton,
    LivejournalShareButton,
    MailruShareButton,
    OKShareButton,
    PinterestShareButton,
    PocketShareButton,
    RedditShareButton,
    TelegramShareButton,
    TumblrShareButton,
    TwitterShareButton,
    ViberShareButton,
    VKShareButton,
    WhatsappShareButton,
    WorkplaceShareButton
} from "react-share";
import { apiForum } from 'api';
import { useGlobalContext } from 'global/context';
import { pop2 } from 'utils/Popup';
import { QuestionAnswer, Report } from '@mui/icons-material';
import ReportTwoTone from '@mui/icons-material/ReportTwoTone';
import EditTwoTone from '@mui/icons-material/EditTwoTone';
import DeleteTwoTone from '@mui/icons-material/DeleteTwoTone';
import EditQuestion from '../Modals/EditQuestion'
import ReportContent from '../Modals/ReportContent';
import ViewAnswer from '../Modals/ViewAnswer';
import ViewComments from '../Modals/ViewComments';
import { Link } from 'react-router-dom';

const Questions = ({ showAnswerHandler, showAnswer, question, getQuestions, isAnswered, isSingle }) => {
    const [alignment, setAlignment] = React.useState('left');
    const [showQuestionComments, setShowQuestionComments] = useState(false);
    const [showAnswerComments, setShowAnswerComments] = useState(false);
    const [upVote, setUpVote] = useState(0);
    const [downVote, setDownVote] = useState(0);
    const { userData } = useGlobalContext();
    const [viewDescription, setViewDescription] = useState(false);
    const [editOpen, setEditOpen] = React.useState(false);
    const [openReport, setOpenReport] = React.useState(false);
    const [layout, setLayout] = React.useState(undefined);
    const [commentLayout, setCommentLayout] = React.useState(undefined);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [commentLength, setCommentLength] = useState(question?.comments?.length);
    const [answerLength, setAnswerLength] = useState(isAnswered);
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
            questionId: question?.id,
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

    const getVotes = async () => {

        try {
            const res = await apiForum.get(`/v1/api/votes/${question?.id}?type=question`);
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

    const handleViewDesc = () => {
        if (viewDescription) {
            setViewDescription(false);
        } else {
            setViewDescription(true);
        }
    }

    function stringToColor(string) {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }

    function stringAvatar(name) {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }

    useEffect(() => {
        setUpVote(question?.votes?.upVoteCount);
        setDownVote(question?.votes?.downVoteCount);

        if (isSingle) {
            setViewDescription(true);
        } else {
            setViewDescription(false);
        }
    }, []);

    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    };
    return (
        <React.Fragment>
            <div className="questions">
                <div className="block-box post-view p-0">
                    <div className="question">
                        <div className="post-header p-2 p-lg-3 pb-0 pb-lg-0">
                            <div className="media d-flex">
                                <div className="user-img">
                                    {/* <img src={require("../../media/figure/chat_5.jpg")} alt="Santosh" /> */}
                                    <Avatar
                                        src={question?.auther?.profile_pic}
                                        alt={question?.auther?.name}
                                    />
                                </div>
                                <div className="media-body">
                                    <div className="user-title"><a>{question?.auther?.name}</a> ~ <span className='fst-italic fw-normal'>asked {moment(question?.created_at).fromNow()}</span></div>
                                    <ul className="text-warning">
                                        {question?.auther?.delegate_country ?
                                            <li className="meta-privacy d-inline-block text-secondary fs-6"><small>{question?.auther?.delegate_designation}, {question?.auther?.delegate_country},&nbsp;
                                            </small></li> : ""
                                        }
                                        <li className="meta-privacy d-inline-block text-secondary fs-6"> <small> {question?.auther?.institute_name}</small></li>
                                        {/* <li className="meta-time">{moment(question?.created_at).fromNow()}</li> */}
                                    </ul>
                                </div>
                            </div>
                            {/* <div>
                                <Tooltip title="Report this question">
                                    <IconButton>
                                        <ReportTwoToneIcon color='error' />
                                    </IconButton>
                                </Tooltip>
                            </div> */}

                            <div className="dropdown">
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
                                        question?.auther?.email === userData?.email ?

                                            <div>
                                                <MenuItem onClick={() => {
                                                    setEditOpen(true);
                                                    handleClose();
                                                }}>
                                                    <EditTwoTone color="info" style={{ marginRight: "10px" }} /> Edit
                                                </MenuItem>
                                                {/* <MenuItem onClick={handleClose}>
                                                    <DeleteTwoTone color="error" style={{ marginRight: "10px" }} /> Delete
                                                </MenuItem> */}
                                            </div>
                                            : <MenuItem onClick={() => {
                                                setOpenReport(true);
                                                handleClose();
                                            }}>
                                                <ReportTwoTone color='warning' style={{ marginRight: "10px" }} /> Report
                                            </MenuItem>
                                    }


                                </Menu>
                            </div>
                            {/* ===============Context Menu Controls============ */}
                            {/* <div className="dropdown">
                                <button className="dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                                    ...
                                </button>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <a className="dropdown-item">Close</a>
                                    <a className="dropdown-item">Edit</a>
                                    <a className="dropdown-item">Delete</a>
                                </div>
                            </div> */}
                        </div>
                        <div className="post-body p-2 p-lg-3">
                            <div>
                                <Link to={!isSingle ? question?.slug : ''} className='fs-5 text-dark mb-0 fw-semibold' >{question?.title}
                                </Link>
                                <div className={viewDescription ? '' : 'line-clamp'}
                                    dangerouslySetInnerHTML={{
                                        __html: question?.body,
                                    }}
                                /><span className='btn-link' style={{ cursor: 'pointer' }}
                                    onClick={handleViewDesc}
                                >
                                    {
                                        viewDescription ? "Collapse description" : "Expand description"
                                    }
                                </span>
                            </div>
                            <div className="post-meta-wrap py-0 mt-2 flex-wrap">
                                <div className="post-meta mb-1">
                                    {/* <div className="post-reaction">
                                                <div>
                                                    <ThumbUpTwoTone color='success' />
                                                </div>
                                                <div className="meta-text">25</div>
                                                <Divider orientation="vertical" flexItem />
                                                <div className='px-3'>
                                                    <ThumbDownTwoTone color='error' />
                                                    <div className="meta-text">25</div>
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
                                <div className="post-meta mb-1">

                                    {
                                        isSingle ? '' :
                                            <Tooltip title="Show/Hide Answers">
                                                <Button variant='outlined' size='small'
                                                    className='text-capitalize fw-semibold rounded'
                                                    onClick={() => setLayout('center')}
                                                >
                                                    {!isAnswered ? 'Write first answer' :
                                                        showAnswer ? 'Hide Answers' : `Show ${answerLength} Answers`}
                                                </Button>
                                            </Tooltip>
                                    }
                                    <Button variant='outlined' size='small'
                                        className='text-capitalize fw-semibold rounded'
                                        onClick={() => setCommentLayout('center')}
                                        style={{
                                            marginLeft: "10px"
                                        }}
                                    >
                                        {!question?.comments?.length ? 'Write first comment' :
                                            showQuestionComments ? 'Hide Comments' : `Show ${ commentLength } Comments`}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <EditQuestion open={editOpen} setOpen={setEditOpen} title={question?.title} description={question?.body} id={question?.id} />
                    <ReportContent
                        open={openReport}
                        setOpen={setOpenReport}
                        itemType='question'
                        itemId={question?.id}
                    />
                    <ViewAnswer layout={layout} setLayout={setLayout} id={question?.id} question={question} setAnswerLength={setAnswerLength}/>
                    <ViewComments
                        layout={commentLayout} setLayout={setCommentLayout}
                        showComments={true}
                        commentList={question?.comments}
                        setCommentLength={setCommentLength}
                        // questionId={question?.id}
                        // getQuestions={getQuestions}
                        id={question?.id}
                        itemType='question'
                    />
                    {/* <Comments
                        showComments={showQuestionComments}
                        comments={question?.comments}
                        questionId={question?.id}
                        getQuestions={getQuestions}
                    /> */}
                </div>
            </div>
        </React.Fragment>
    )
}

export default Questions;