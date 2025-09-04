import { Avatar, Button, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import React from 'react';
import moment from 'moment';
import ReportTwoToneIcon from '@mui/icons-material/ReportTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useGlobalContext } from 'global/context';
import ReportContent from '../Modals/ReportContent';
import EditQuestion from '../Modals/EditQuestion';
import EditReply from '../Modals/EditReply';

const Reply = ({ handleShowReplyBox, reply }) => {
    const { userData } = useGlobalContext();
    const [openReport, setOpenReport] = React.useState(false);
    const [editOpen, setEditOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <React.Fragment>
            <li className="main-comments">
                <div className="each-comment">
                    <div className="post-header">
                        <div className="media d-flex align-items-center">
                            <div className="user-img">
                                {/* <img src={require("../../media/figure/notifiy_1.png")} alt="Aahat" /> */}
                                <Avatar
                                    src={reply?.auther?.profile_pic}
                                    alt={reply?.auther?.name}
                                />
                            </div>
                            <div className="media-body">
                                <div className='d-flex'>
                                    <div className="user-title"><a className='fs-6'>{reply?.auther?.name}</a></div>
                                    <ul className="entry-meta">
                                        <li className="meta-time px-2 fst-italic"> ~ replied {moment(reply?.created_at).fromNow()}</li>
                                    </ul>
                                </div>
                                <div className='media-body'>
                                    <ul className="entry-meta">
                                        {reply?.auther?.delegate_country ?
                                            <li className="meta-privacy"><i className="bi bi-people-fill"></i>{reply?.auther?.delegate_designation}, {reply?.auther?.delegate_country}</li> : null
                                        }
                                        <li className="meta-privacy"><i className="bi bi-people-fill"></i>{reply?.auther?.institute_name}</li>

                                    </ul>
                                </div>
                            </div>
                        </div>
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
                                    reply?.auther?.email === userData?.email ?
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
                    <div className="post-body">
                        <p>{reply?.reply}</p>
                    </div>
                    <div className="post-footer">
                        <ul>
                            <li className="react-icon">
                                <img src={require("../../media/figure/reaction_1.png")} alt="icon" />
                                <img src={require("../../media/figure/reaction_3.png")} alt="icon" />
                            </li>
                            <li className="post-react">
                                <a ><i className="bi bi-hand-thumbs-up-fill"></i>React!</a>
                                <ul className="react-list">
                                    <li><a ><img src={require("../../media/figure/reaction_1.png")} alt="Like" /></a></li>
                                    <li><a ><img src={require("../../media/figure/reaction_3.png")} alt="Like" /></a></li>
                                    <li><a ><img src={require("../../media/figure/reaction_4.png")} alt="Like" /></a></li>
                                    <li><a ><img src={require("../../media/figure/reaction_2.png")} alt="Like" /></a></li>
                                    <li><a ><img src={require("../../media/figure/reaction_7.png")} alt="Like" /></a></li>
                                    <li><a ><img src={require("../../media/figure/reaction_6.png")} alt="Like" /></a></li>
                                    <li><a ><img src={require("../../media/figure/reaction_5.png")} alt="Like" /></a></li>
                                </ul>
                            </li>
                            <li>
                                <a onClick={handleShowReplyBox}><i className="bi bi-reply-fill"></i>Reply</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <EditReply open={editOpen} setOpen={setEditOpen} title={reply?.title} description={reply?.body} id={reply?.id} />
                <ReportContent
                    open={openReport}
                    setOpen={setOpenReport}
                    itemType='reply'
                    itemId={reply?.id}
                />
            </li>
        </React.Fragment>
    )
}

export default Reply;