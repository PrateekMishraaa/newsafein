import React from 'react'
import TestimonialCard from './TestimonialCard'
import { FormatQuoteTwoTone } from '@mui/icons-material'
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


const TestimonialGrid = () => {
    return (
        <div className="wrapper py-5" >
            <div className="container py-5">
                <div className="row">
                    <div className="col-md-10 offset-md-1 col-lg-8 offset-lg-2 mx-auto text-center">
                        <h2 className="fs-3 mb-3 fw-bold">Words From the <span className="text-primary"> Youth G20 Delegates</span></h2>
                    </div>
                    {/* /column */}
            </div>
                {/* /.row */}
                {/* Border Data  */}
                <div>
                    <section>
                        <div className="container py-5">
                            <div className="row gx-lg-8 gx-3  align-items-center">
                                <div className="col-lg-7 position-relative">
                                    <div className="shape bg-dot primary rellax w-18 h-18" data-rellax-speed={1} style={{ top: 0, left: '-1.4rem', zIndex: 0 }} />
                                    <div className="row gx-md-3 gy-3">
                                        <div className="col-md-6">
                                            <figure className="rounded mt-md-10 position-relative w-100 h-100"><img src="https://glcloud.in/images/static/events/hansraj/img22.webp" alt="" className="w-100 rounded-4 h-100" style={{ objectFit: "cover" }} /></figure>
                                        </div>
                                        {/*/column */}
                                        <div className="col-md-6">
                                            <div className="row g-3">
                                                <div className="col-md-12 order-md-2">
                                                    <figure className="rounded h-100">
                                                        <img src="https://glcloud.in/images/static/events/hansraj/img24.webp" alt="" style={{ objectFit: "cover" }} className="w-100 h-100 rounded-4" />
                                                    </figure>
                                                </div>
                                                {/*/column */}
                                                <div className="col-md-10">
                                                    <div className="card border border-dark border-2 bg-white shadow  rounded-4 text-center m-0">
                                                        <div className="card-body py-5 counter-wrapper">
                                                            <h3 className="counter text-nowrap">1857+</h3>
                                                            <p className="mb-0">Schools Participated</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-5 mt-5">
                                    <div className="text-center border border-dark border-2 bg-white py-5 rounded-4 shadow">
                                        <FormatQuoteTwoTone sx={{ fontSize: 80, color: "tomato" }} />
                                        <p>As young academics, we too would like to contribute and make 🇮🇳 presidency of G20 a pathbreaking one!!. As a middle power 🇮🇳= solutions to 🌎 issues!”</p>
                                        <div className="div-details justify-content-center text-center">
                                            <div className="info ps-0">
                                                <h5 className="mb-1">Saurabh Sharma</h5>
                                                <p className="mb-0">Bsc Student</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*/column */}
                            </div>
                            {/*/.row */}
                        </div>
                        {/* /.container */}
                    </section>
                    {/* /section */}

                </div>
                <div className="grid">
                    <div className="row isotope gy-3 my-4">
                        {testJson?.map((review, i) => {
                            return <TestimonialCard review={review} key={i} />
                        })}

                    </div>
                </div>
            </div>
        </div >
    )
}

export default TestimonialGrid