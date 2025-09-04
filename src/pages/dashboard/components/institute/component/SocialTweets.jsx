import React, { useState } from 'react'
import { CheckCircle, CopyAllTwoTone, Share } from '@mui/icons-material'
import { Button, IconButton } from '@mui/material'
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    LinkedinIcon,
    PinterestIcon,
    PinterestShareButton,
    TelegramIcon,
    TelegramShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton,
} from "react-share";

const ShareTweet = ({ heading, content, setOpen, open }) => {
    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>
                <span className="font-ubd">Share</span>
            </DialogTitle>
            <DialogContent>
                <DialogContentText className="fs-5 ">
                    <span>
                        Click this Social Media Icons to Share On your handles
                    </span>
                </DialogContentText>
                <div className="mt-4">
                    <EmailShareButton
                        subject={heading}
                        url={content}
                        quote={"Yuvamanthan"}
                        className="m-1"
                    >
                        <EmailIcon size={42} round />
                    </EmailShareButton>
                    <IconButton
                        target='_blank'
                        href='https://www.facebook.com/'
                        className="m-1"
                    >
                        <FacebookIcon size={42} round />
                    </IconButton>
                    <TwitterShareButton
                        url={content}
                        className="m-1"
                    >
                        <TwitterIcon size={42} round />
                    </TwitterShareButton>
                    <IconButton
                        target='_blank'
                        href='https://www.linkedin.com/'
                        className="m-1"
                    >
                        <LinkedinIcon size={42} round />
                    </IconButton>
                    <WhatsappShareButton
                        url={content}
                        quote={"Model g20 India"}
                        className="mx-1"
                    >
                        <WhatsappIcon size={42} round />
                    </WhatsappShareButton>
                    <TelegramShareButton
                        url={content}
                        quote={"Model g20 India"}
                        className="m-1"
                    >
                        <TelegramIcon size={42} round />
                    </TelegramShareButton>
                    <PinterestShareButton
                        url={content}
                        quote={"Model g20 India"}
                        className="m-1"
                    >
                        <PinterestIcon size={42} round />
                    </PinterestShareButton>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};


const TweetCard = ({ review, index, selectedText, setSelectedText }) => {
    const [socialShare, setSocialShare] = useState(false)
    return (
        <div className="item col-md-6 col-xl-4">
            <div className="card border-0 rounded-4 shadow p-3 p-lg-4">
                <div className="card-body">
                    <div className="icon mb-0 mt-3">
                        <p className="fs-6">{review?.review}</p>
                        <Button variant='outlined' color='success' className='rounded-0' onClick={() => { navigator?.clipboard?.writeText(review?.review); setSelectedText(review?.review) }} >{selectedText === review?.review ? <><CheckCircle/> Copied</> : <><CopyAllTwoTone />&nbsp;Copy</>}</Button>&nbsp;&nbsp;
                        <Button variant='outlined' color='error' className='rounded-0' onClick={() => setSocialShare(true)}><Share />&nbsp;Share</Button>
                    </div>
                </div>
            </div>
            <ShareTweet heading={"Model G20 india"} content={review?.review} setOpen={setSocialShare} open={socialShare} />
        </div >
    )

}
const testJson = [
    {
        "user": {
            "name": "Shivam Rathore",
            "img": "https://glcloud.in/images/data/onboard/1680276798070IMG_20230310_110943_093.webp",
            "position": "Student MBA"
        },
        "rating": 4.5,
        "review": "Yuvamanthan Model G20 Summit is a truly mesmerizing experience. I am not an intellectual type of person and usually shy away from participating in such activities. But now I feel I was wrong, this platform has changed my mindset and I believe that the youth must engage in activities like YMG20 not just for the sake of experience but for finding your inner leader. Thank you Yuvamanthan for helping me find my strengths through this awesome activity. Hope it happens more often in our school."
    },
    {
        "user": {
            "name": "Vijay Singh",
            "img": "",
            "position": "Student BSc"
        },
        "rating": 4.2,
        "review": "For the first time ever I participated in a debate cum discussion and realized that you don't need any specific skillset to be a participant apart from advanced general knowledge. My constant surfing of social media came in handy and I was able to contribute to the event through my ideas which were appreciated by one and all."
    },
    {
        "user": {
            "name": "Samantha Patel",
            "img": "https://glcloud.in/images/static/media/360_F_68921781_CNvWxI6HCmYKs6DxmKv0KC2jnaI5ll4o.webp",
            "position": "Student BA"
        },
        "rating": 4.7,
        "review": "I attended the Yuvamanthan summit event and was impressed with the quality of design it offers to learn new things. I enjoyed voting for and against resolutions and my points were chosen to be included in the communique. The discussion forums were a great way to connect with other learners and learn from their experiences. Overall, I would definitely recommend YMG20 to every educational institution in India."
    },
    {
        "user": {
            "name": "Viraj Mkhij",
            "img": "https://glcloud.in/images/static/media/2122-135-TrueTritonHonoree-500x500-Khan-v1.webp",
            "position": "Student BS"
        },
        "rating": 2.5,
        "review": "The Model G20 summit event on Yuvamanthan's platform was a great way to learn more about global economic issues. The event was well-organized and provided a good balance of theory and practical applications of diplomacy and leadership. Our teachers were knowledgeable and responsive to questions, and the activity was a valuable tool for connecting with other young minds. Overall, a positive experience."
    },
    {
        "user": {
            "name": "Sughanda Gupta ",
            "img": "https://glcloud.in/images/static/media/sugandha-gupta_computer-science.webp",
            "position": "Student B.TECH CSE (HONS.)"
        },
        "rating": 4.8,
        "review": "I recently attended the Model G20 summit event at Hansraj College at am in awe at the sheer knowledge one can get by simply attending a summit. The students were knowledgeable and the debate was engaging, and all this provided a good foundation for understanding global economic issues. The discussion forums were a valuable tool for connecting with other learners and sharing ideas. Overall, I would highly recommend this platform to anyone interested in learning about global economics."
    },
    {
        "user": {
            "name": "Simran Tirpathi",
            "img": "https://glcloud.in/images/static/media/indhulekkha_manoj_kumar.webp",
            "position": "Student BSc"
        },
        "rating": 4.5,
        "review": "I learned about the Yuvamanthan Model G20 summit through Yuvamanthan's social media handles and found out that it is a great way to learn more about global economic issues. Though my college is yet to organise the summit, I am looking forward to participating in it whenever it happens. I have also applied for the Campus Sherpa programme and I look forward to connecting with students and teachers from other institutions and supporting Team Yuvamanthan in this great endevour."
    },
    {
        "user": {
            "name": "Rolin Masih",
            "img": "",
            "position": "Student BBA"
        },
        "rating": 4.5,
        "review": "Yuvamanthan's online module for the G20 summit was a fantastic experience. The modules were engaging and insightful, and the live events were both informative and entertaining. Highly recommend it!",
    },
    {
        "user": {
            "name": "Vinay Dubey",
            "img": "https://glcloud.in/images/static/media/ac1850ddee8ed3b5864a4a68612a12d3.webp",
            "position": "Student B.com"
        },
        "rating": 4.0,
        "review": "I was impressed with how one can manage a live activity through software and the level of engagement it provides to participants of the Model G20 summit. The orientation course and quiz made me learn a bunch of new things about the G20 forum. I particularly enjoyed the interactive discussions with other learners.",

    },
    {
        "user": {
            "name": "Samantha Semwal",
            "img": "",
            "position": "Student Bsc"
        },
        "rating": 4.8,
        "review": "Yuvamanthan's Model G20 summit exceeded my expectations. The activity was an exciting opportunity from different backgrounds and cultures to provide their insights into topics such as climate change, the future of work, and the discussion forums provided a great opportunity to connect with other learners. Overall, a great learning experience!",

    },
]

const SocialTweets = () => {
    const [selectedText, setSelectedText] = useState("")
    return (
        <div section className="wrapper py-5" >
            {navigator.clipboard.readText}
            <div className="container py-5">
                <div className="row">
                    <div className="col-md-10 offset-md-1 col-lg-8 offset-lg-2 mx-auto text-center">
                        <h2 className="fs-3 mb-3 fw-bold">Share the follwing social templates <span className="text-primary"> #Hashtags</span></h2>
                    </div>
                    {/* /column */}
                </div>
                {/* /.row */}
                <div className="grid">
                    <div className="row isotope gy-3 my-4">
                        {testJson?.map((review, i) => {
                            return <TweetCard review={review} key={i} selectedText={selectedText} setSelectedText={setSelectedText} />
                        })}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default SocialTweets