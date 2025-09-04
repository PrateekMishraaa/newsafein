import { ArrowForwardOutlined, Facebook, FormatQuote, Instagram, LinkedIn, Pinterest, Twitter } from '@mui/icons-material'
import React from 'react'
import { SwiperSlide, Swiper } from 'swiper/react'
import { Pagination, Navigation } from "swiper";
import { Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

const Banner = () => {
    const content = [
        {
            id: 1,
            quote: "Social Media is addictive precisely because it gives something which the real-world lacks: it gives immediacy, direction, and value as an individual.",
            person_name: "David Amerland"
        },
        {
            id: 2,
            quote: "Engage, Enlighten, Encourage; just be yourself! Social media is a community effort and everyone is an asset.",
            person_name: "Susan Cooper"
        },
        {
            id: 3,
            quote: " see social media as an important tool to engage youth and provide better accessibility into the democratic process.",
            person_name: "Shri Narendra Modi"
        }
    ]
    return (
        <Swiper
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            spaceBetween={0}
            slidesPerView={1}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
        >
            {content?.map((banner, index) => {
                return (
                    <SwiperSlide key={index}  >
                        <div className={`d-flex align-items-center justify-content-center carousel-item text-center bg-primary`}>
                            <div className="container p-3 p-lg-4 py-lg-3 px-xl-5" style={{ maxWidth: "900px" }}>
                                <div className="card p-3 p-lg-4 py-5 rounded-3 shadow bg-white border-light">
                                    <p className='lh-sm'>
                                        <FormatQuote
                                            sx={{
                                                rotate: "180deg",
                                                translate: "0px -10px",
                                                color: "var(--main-color)",
                                            }}
                                        />{" "}
                                        <span className='fs-4 lh-md'>{banner?.quote}</span>
                                        <FormatQuote
                                            sx={{
                                                fontSize: 18,
                                                translate: "0px -10px",
                                                color: "var(--main-color)",
                                            }}
                                        />
                                    </p>
                                    <span className="fs-6 text-dark d-block">
                                        -{banner?.person_name}
                                    </span>
                                    {/* <span className="fs-6 text-secondary d-block">
                                                    ( {position} )
                                                </span> */}
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                )
            })}
        </Swiper>
    )
}
const SocialRow = ({ img, heading, subheading, content, button, dir }) => {
    console.log("Content")
    return (
        <div className='bg-light'>
            <div className="container py-4">
                <div className="row row-cols-1 row-cols-lg-2 g-3">
                    <div className={`col-12 col-lg-5 ${dir === "left" ? "" : "order-1 order-lg-2"}`}>
                        <img src={img} alt="" className='w-100 h-100 shadow-sm' style={{ minHeight: "400px", objectFit: "cover" }} />
                    </div>
                    <div className={`col-12 col-lg-7 ${dir === "left" ? "" : "order-2 order-lg-1"}`}>
                        <div className="p-3 p-lg-4 p-xl-5 bg-white h-100 shadow-sm">
                            <h3 className='fs-2 lh-1'> {heading} <br /> {subheading ? <span className="text-secondary fs-6 fw-regular"><i> {"<"} {subheading} {">"}</i></span> : ""} </h3>
                            <div >{content}</div>
                            {button ?
                                <Link to={button?.link}><Button variant='outlined' color='warning' className='rounded-4 p-3 px-4'>{button?.text} <ArrowForwardOutlined /></Button></Link> : ""
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
const SocialWall = () => {
    const pointers = [
        {
            img: "https://cdn-icons-png.flaticon.com/512/745/745205.png",
            text: "Engage with our community members on global issues or"
        },
        {
            img: "https://cdn-icons-png.flaticon.com/512/1968/1968666.png",
            text: "Contribute as our social media ambassadors"
        },
        {
            img: "https://cdn-icons-png.flaticon.com/512/1455/1455689.png",
            text: "Post a selfie or two as G20 delegates"
        },
        {
            img: "https://cdn-icons-png.flaticon.com/512/4823/4823743.png",
            text: "Showcase your artwork @ youth pop art display"
        },
        {
            img: "https://cdn-icons-png.flaticon.com/512/3261/3261308.png",
            text: "Participate in G20 summit quiz contests, etc."
        }
    ]
    return (
        <div>
            <div className='bg-primary rounded-3'>
                <div className="container py-4">
                    <div className="row row-cols-1 row-cols-lg-2 align-items-center">
                        <div className="col">
                            <div>
                                <h3 className='text-white fs-2'>Hi y ‘all!</h3>
                                <p className='text-white'>We at Yuvamanthan haven’t forgotten the impact of social media on our youth members, readers
                                    and YMG20 participants. Having said that, this page is dedicated to the colourful ‘social fest’ around
                                    G20 and YMG20 events across the nation
                                </p>
                            </div>
                        </div>
                        <div className="col">
                            <Banner />
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <h5>Read Our Social Media Guidelines <Link to={"/social-media-guideliness"}>Social-media-guidelines</Link></h5>
            <div className="bg-light p-3 p-lg-4 py-lg-5 rounded-3 border border-warning">
                <div className="text-center ">
                    <h3 className='text-dark'>Use <span className="text-warning">#YMG20</span> and <span className="text-warning">#Yuvamanthan</span></h3>
                </div>
            </div>
            <div className="container my-2">
                <div className="py-4">
                    <h5>If you’re looking to</h5>
                    <div className="row row-cols-1 row-cols-lg-2 g-3">
                        <div className="col">
                            <ul className='row row-cols-1 row-cols-2 g-3'>
                                {
                                    pointers?.map((point, index) => {
                                        return (
                                            <li className='col'>
                                                <div className='h-100 text-center flex-column flex-lg-row d-flex border align-items-center rounded-3'>
                                                    <div className='p-2'>
                                                        <img src={point?.img} alt={point?.text} style={{ width: "100%", height: "80px", objectFit: "contain" }} />
                                                    </div>
                                                    <div className='p-2'>
                                                        {point?.text}
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div className="col">
                            <h3 className="fs-2">THIS IS THE PLACE TO BE! </h3>
                            <p>As our active and ambitious collaborators, you guys can join us on our plethora of social activities,
                                YMG20 initiatives and more to be a part of something Bigger and Better!
                                <br /> <br />
                                Sounds interesting, right?
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <SocialRow
                dir={"left"}
                img={"https://glcloud.in/images/static/images/discussion.webp"}
                heading={"YMG20’s Ice Breakers"}
                subheading={"A Discussion Forum"}
                content={<>
                    <p className='fs-6'>
                        The Ice Breakers is a virtual discussion forum where you have the opportunity to strike up intuitive debate sessions amongst our readers, members and YMG20 enthusiasts. You can list out your ideas, and opinions in the blank space below and wait for others to join in and let the panel session begin
                    </p>
                </>
                }
                button={{ link: "/dashboard/forum", text: "Go to Discussion" }}
            />
            <SocialRow
                dir={"right"}
                img={"https://glcloud.in/images/static/images/smartphone.webp"}
                heading={"Pose & Post"}
                subheading={"YMG20 Picture Contest"}
                content={<>
                    <div className='fs-6'>
                        <p className='fs-6'>
                            They say a picture can tell a million stories....well, we sure note that! <br />
                            Get together, dress up as country leaders, G20 delegates or Sherpa speakers and click a selfie or
                            groupie (group picture) with a thematic background of your choice for our Pose & Post contest.
                            Check out the details as follows.
                        </p>
                        <h4 className='mt-4'>
                            How, Why, and When about the Contest?
                        </h4>
                        <ul className='mb-4'>
                            <li className='mt-2 fs-6'>
                                Pose, click a fantastic shot on YMG20 themes, India’s cultural diversity, or as any global country
                                leader of your choice.
                            </li>
                            <li className='mt-2 fs-6'>
                                After getting it sanctioned by your social media team, upload the picture on any of
                                Yuvamanthan’s social handles: Facebook, Instagram, and Twitter. (*add hyperlink)
                            </li>
                            <li className='mt-2 fs-6'>
                                Once the upload is done successfully, you will receive word from our YMG20 team via
                                WhatsApp/registered email that your entry is chosen as a winner within 24-48 hours.
                            </li>
                            <li className='mt-2 fs-6'>
                                Then what, if you are deemed as the winner, then your clicked snapshot will be displayed on our
                                official website and you will receive certificates and honourary mementoes too, exciting, right?
                            </li>
                            <li className='mt-2 fs-6'>
                                <IconButton target='_blank' href='https://www.facebook.com/' sx={{ background: "whitesmoke", color: "navy", marginInlineEnd: "5px" }}>
                                    <Facebook />
                                </IconButton>
                                <IconButton target='_blank' href='https://www.instagram.com/' sx={{ background: "whitesmoke", color: "tomato", marginInlineEnd: "5px" }}>
                                    <Instagram />
                                </IconButton>
                                <IconButton target='_blank' href='https://twitter.com/' sx={{ background: "whitesmoke", color: "skyblue", marginInlineEnd: "5px" }}>
                                    <Twitter />
                                </IconButton>
                                <IconButton target='_blank' href='https://www.linkedin.com/' sx={{ background: "whitesmoke", color: "blue", marginInlineEnd: "5px" }}>
                                    <LinkedIn />
                                </IconButton>
                                <IconButton target='_blank' href='https://in.pinterest.com/' sx={{ background: "whitesmoke", color: "red", marginInlineEnd: "5px" }}>
                                    <Pinterest />
                                </IconButton>
                            </li>
                        </ul>
                    </div>
                </>
                }
            />
            <SocialRow
                dir={"left"}
                img={"https://glcloud.in/images/static/images/leader.webp"}
                heading={"YMG20 ka Ambassador"}
                subheading={"A Social Ambassadorship Programme"}
                content={<>
                    <div>
                        <p className="fs-6">
                            There’s nothing more significant and value-based than having a quintessential leadership experience,
                            don’t you agree? <br />
                            At Yuvamanthan, we understand that and try our best to engage youth communities in creative
                            leadership roles to imbibe confidence, social reputation and of course beneficiary incentives. So,
                            here we present a cool opportunity for all YMG20 participants, members, and students to take part
                            in our in-house social ambassadorship programme, ‘YMG20 ka Ambassador.’
                        </p>
                        <h4 className='mt-4'>
                            How it will happen?
                        </h4>
                        <ul className='mb-4'>
                            <li className='mt-2 fs-6'>
                                Firstly, you will have to register here (*add google form link here) with our social media team
                                sharing basic details about you, your studies, interest, etc.
                            </li>
                            <li className='mt-2 fs-6'>
                                Once the registration is done, you will post an assigned number of YMG20-related content on
                                your social media handles tagging Yuvamanthan and relative hashtags and keywords.
                            </li>
                            <li className='mt-2 fs-6'>
                                At least 15-20 social posts need to be published for you to qualify for the main ambassadorship
                                test.
                            </li>
                            <li className='mt-2 fs-6'>
                                Lastly, you will compete with the top 5 fellow contenders by sharing your YMG20 video output
                                which could be on opinion sharing, taking student interviews, promoting G20 in your campus,
                                etc.
                            </li>
                            <li className='mt-2 fs-6'>
                                Our team will choose the best social ambassador candidate after a thorough review and
                                announce the winner on our official Instagram page.
                            </li>
                            <li className='mt-2 fs-6'>
                                If you are the lucky winner, then you will receive an official offer to be our ‘YMG20 ka Ambassador for
                                one month followed by a sweet cash prize and Yuvamanthan’s customised goody bag.
                            </li>
                            <li className='mt-2 fs-6'>
                                So, if you’re interested, register for the social ambassadorship programme today!
                            </li>
                            <li className='mt-2 fs-6'>
                                <IconButton target='_blank' href='https://www.facebook.com/' sx={{ background: "whitesmoke", color: "navy", marginInlineEnd: "5px" }}>
                                    <Facebook />
                                </IconButton>
                                <IconButton target='_blank' href='https://www.instagram.com/' sx={{ background: "whitesmoke", color: "tomato", marginInlineEnd: "5px" }}>
                                    <Instagram />
                                </IconButton>
                                <IconButton target='_blank' href='https://twitter.com/' sx={{ background: "whitesmoke", color: "skyblue", marginInlineEnd: "5px" }}>
                                    <Twitter />
                                </IconButton>
                                <IconButton target='_blank' href='https://www.linkedin.com/' sx={{ background: "whitesmoke", color: "blue", marginInlineEnd: "5px" }}>
                                    <LinkedIn />
                                </IconButton>
                                <IconButton target='_blank' href='https://in.pinterest.com/' sx={{ background: "whitesmoke", color: "red", marginInlineEnd: "5px" }}>
                                    <Pinterest />
                                </IconButton>
                            </li>
                        </ul>
                    </div>
                </>
                }
            />
            <SocialRow
                dir={"right"}
                img={"https://glcloud.in/images/static/images/kalakriti.webp"}
                heading={"Kalakriti Exhibition"}
                subheading={"A Virtual Pop Art Display Event"}
                content={<>
                    <div>
                        <p className="fs-6">
                            Our country thrives on its stupendous and mesmerising history filled with traditional artistry,
                            paintings, artworks from the Madhubani district in Bihar to Tanjore in Tamil Nadu. <br />
                            We have specially curated a virtual art display event every Friday for you all where you can share,
                            observe, enjoy the best forms of art, craft, paintings, posters, etc. by the members of our youth
                            community.
                        </p>
                        <h4 className='mt-4'>
                            How to participate?
                        </h4>
                        <ul className='mb-4'>
                            <li className='mt-2 fs-6'>
                                Share your creative works (AT LEAST 2) on any social issue, global concern or G20 theme, etc.
                                with us at our email address: <a href='mailto:modelg20@yuvamanthan.org' ><i className="bi bi-envelope text-danger"></i> modelg20@yuvamanthan.org</a> <br />
                                Add the subject line: ‘Kalakriti Art YMG20’
                            </li>
                            <li className='mt-2 fs-6'>
                                Then, fill up this pop art display form here.
                            </li>
                            <li className='mt-2 fs-6'>
                                If your entry is shortlisted, we will display your work at our ‘Friday Pop Art Display Event’
                            </li>
                            <li className='mt-2 fs-6'>
                                Lastly, you will compete with the top 5 fellow contenders by sharing your YMG20 video output
                                which could be on opinion sharing, taking student interviews, promoting G20 in your campus,
                                etc.
                            </li>
                            <li className='mt-2 fs-6'>
                                Our team will choose the best social ambassador candidate after a thorough review and
                                announce the winner on our official Instagram page.
                            </li>
                            <li className='mt-2 fs-6'>
                                If you are the lucky winner, then you will receive an official offer to be our ‘YMG20 ka Ambassador for
                                one month followed by a sweet cash prize and Yuvamanthan’s customised goody bag.
                            </li>
                            <li className='mt-2 fs-6'>
                                So, if you’re interested, register for the social ambassadorship programme today!
                            </li>
                            <li className='mt-2 fs-6'>
                                <IconButton target='_blank' href='https://www.facebook.com/' sx={{ background: "whitesmoke", color: "navy", marginInlineEnd: "5px" }}>
                                    <Facebook />
                                </IconButton>
                                <IconButton target='_blank' href='https://www.instagram.com/' sx={{ background: "whitesmoke", color: "tomato", marginInlineEnd: "5px" }}>
                                    <Instagram />
                                </IconButton>
                                <IconButton target='_blank' href='https://twitter.com/' sx={{ background: "whitesmoke", color: "skyblue", marginInlineEnd: "5px" }}>
                                    <Twitter />
                                </IconButton>
                                <IconButton target='_blank' href='https://www.linkedin.com/' sx={{ background: "whitesmoke", color: "blue", marginInlineEnd: "5px" }}>
                                    <LinkedIn />
                                </IconButton>
                                <IconButton target='_blank' href='https://in.pinterest.com/' sx={{ background: "whitesmoke", color: "red", marginInlineEnd: "5px" }}>
                                    <Pinterest />
                                </IconButton>
                            </li>
                        </ul>
                    </div>
                </>
                }
            />
            <SocialRow
                dir={"left"}
                img={"https://glcloud.in/images/static/images/socialmaster.webp"}
                heading={"Social Master Blaster of the Week"}
                content={<>
                    <p>
                        In this space, we will put up 2-3 social media interfaces banners like IG, FB, and Twitter. The idea is to
                        showcase a winning student’s social media post/picture/video here for a week.
                        <h4 className='mt-4'>Social Master Blaster of the Week
                            How it will happen?
                        </h4>
                        <ul>
                            <li className='mt-2'>
                                We will post the 3 best carousel posts, pictures or tweets of the community
                                members/participants or students.
                            </li>
                            <li className='mt-2'>
                                A digital voting meter/opinion poll graphic will display on the right side where users can click to
                                vote for the best entry.
                            </li>
                            <li className='mt-2'>
                                They will receive a customised ‘vote is successfully recorded’ message via WhatsApp.
                            </li>
                            <li className='mt-2'>
                                At the end of the week’s voting, the winner’s name, winning social media post and picture will be
                                displayed under the title ‘ Social Master Blaster.’
                            </li>
                            <li className='mt-2 fs-6'>
                                <IconButton target='_blank' href='https://www.facebook.com/' sx={{ background: "whitesmoke", color: "navy", marginInlineEnd: "5px" }}>
                                    <Facebook />
                                </IconButton>
                                <IconButton target='_blank' href='https://www.instagram.com/' sx={{ background: "whitesmoke", color: "tomato", marginInlineEnd: "5px" }}>
                                    <Instagram />
                                </IconButton>
                                <IconButton target='_blank' href='https://twitter.com/' sx={{ background: "whitesmoke", color: "skyblue", marginInlineEnd: "5px" }}>
                                    <Twitter />
                                </IconButton>
                                <IconButton target='_blank' href='https://www.linkedin.com/' sx={{ background: "whitesmoke", color: "blue", marginInlineEnd: "5px" }}>
                                    <LinkedIn />
                                </IconButton>
                                <IconButton target='_blank' href='https://in.pinterest.com/' sx={{ background: "whitesmoke", color: "red", marginInlineEnd: "5px" }}>
                                    <Pinterest />
                                </IconButton>
                            </li>
                        </ul>
                    </p>
                </>
                }
            />

        </div>
    )
}

export default SocialWall