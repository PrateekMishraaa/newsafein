
import React, { useState } from 'react'
import Replies from './Replies';
import moment from 'moment';
import { Avatar, Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import ReportTwoToneIcon from '@mui/icons-material/ReportTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditComment from '../Modals/EditComment';
import { useGlobalContext } from 'global/context';
import ReportContent from '../Modals/ReportContent';
import { apiForum } from 'api';


const Comment = ({ comment }) => {
    const [showReplyBox, setShowReplyBox] = useState(false);
    const [showReplies, setShowReplies] = useState(false);
    const [replies, setReplies] = useState(comment?.replies);
    const [editOpen, setEditOpen] = React.useState(false);
    const [openReport, setOpenReport] = React.useState(false);
    const { userData } = useGlobalContext();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleShowReplyBox = () => {
        if (showReplyBox) {
            setShowReplyBox(false);
        } else {
            setShowReplyBox(true);
        }
    }

    const handleReply = () => {
        handleShowReplyBox();
        if (showReplies) {
            setShowReplies(false);
        } else {
            setShowReplies(true);
        }
    }

const getReplies = async () => {
    try {
        const res = await apiForum.get(`/v1/api/reply?id=${comment?.id}`);
        if (res?.status === 200) {
            setReplies(res?.data?.replies);
        }
    } catch (error) {
        console.log(error?.response?.data?.message);
    }
}

    return (
        <React.Fragment>
            <li className="main-comments">
                <div className="each-comment">
                    <div className="post-header p-2">
                        <div className="media d-flex align-items-center">
                            <div className="user-img">
                                {/* <img src={require("../../media/figure/chat_14.jpg")} alt="Aahat" className='comment-avatar' /> */}
                                <Avatar
                                    src={comment?.auther?.profile_pic}
                                    alt={comment?.auther?.name}
                                />
                            </div>
                            <div className="media-body">
                                <div className='d-flex'>
                                    <div className="user-title"><a className='fs-6'>{comment?.auther?.name}</a></div>
                                    <ul className="entry-meta">
                                        <li className="meta-time px-2 fst-italic"> ~ commented {moment(comment?.created_at).fromNow()}</li>
                                    </ul>
                                </div>
                                <div className='media-body'>
                                    <ul className="entry-meta">
                                        {comment?.auther?.delegate_country ?
                                            <li className="meta-privacy"><i className="bi bi-people-fill"></i>{comment?.auther?.delegate_designation}, {comment?.auther?.delegate_country}</li> : null
                                        }
                                        <li className="meta-privacy"><i className="bi bi-people-fill"></i>{comment?.auther?.institute_name}</li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* <div className="dropdown">
                            <button className="dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                                ...
                            </button>
                            <div className="dropdown-menu dropdown-menu-right">
                                <a className="dropdown-item" >Close</a>
                                <a className="dropdown-item" >Edit</a>
                                <a className="dropdown-item" >Delete</a>
                            </div>
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
                                    comment?.auther?.email === userData?.email ?
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
                    <div className="post-body p-2">
                        <p>{comment?.comment_text}</p>
                    </div>
                    <div className="post-footer p-2">
                        <ul>
                            <li><a onClick={handleReply}><i className="bi bi-reply-fill"></i>{replies?.length ? replies?.length : null} Reply</a></li>
                        </ul>

                    </div>
                </div>
                <EditComment open={editOpen} setOpen={setEditOpen} commentText={comment?.comment_text} id={comment?.id} />
                <ReportContent
                    open={openReport}
                    setOpen={setOpenReport}
                    itemType='comment'
                    itemId={comment?.id}
                />
                {showReplies ?
                    <Replies
                        showReplyBox={showReplyBox}
                        handleShowReplyBox={handleShowReplyBox}
                        replies={replies}
                        commentId={comment?.id}
                        getReplies={getReplies}
                    /> : null}
            </li>
        </React.Fragment>
    )
}

export default Comment;