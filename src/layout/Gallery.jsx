import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Pagination } from "swiper";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import FsLightbox from 'fslightbox-react';
import { ButtonBase } from '@mui/material';

const SingleColumnGallery = ({ imgColArr, handleToggle }) => {
    return (
        <div className="col">
            <div className="row g-2">
                {imgColArr?.map((img, i) => {
                    return (
                        <div onClick={() => handleToggle(img)} className="col-12" key={i}>
                            <ButtonBase>
                                <img src={img} alt="" loading='lazy' className="d-block w-100 rounded-3 shadow" />
                            </ButtonBase>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
const SingleSlideGallery = ({ imgpageArr, handleToggle }) => {
    return (
        <div className='container-fluid px-1'>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-2">
                {imgpageArr?.map((imgColArr, i) => {
                    return <SingleColumnGallery handleToggle={handleToggle} imgColArr={imgColArr} key={i} />
                })}
            </div>
        </div>
    )
}
export default function SimpleGallery({ imgArray, heading, className }) {
    const [toggler, setToggler] = React.useState(true);
    const [lightBoxArr, setLightBoxArr] = useState([])
    const [img, setImage] = React.useState(1);
    const handleToggle = (img) => {
        setToggler(!toggler);
        const index = lightBoxArr.findIndex((image) => image === img);
        setImage(index + 1);
    }
    const ArrayMaker = async () => {
        const data = await imgArray.flatMap((arr) => { let list = arr.flatMap((list) => { return list }); return list });
        setLightBoxArr(data);
    }
    useEffect(() => {
        ArrayMaker();
    }, [imgArray]);

    return (
        <div>
            <div className={className}>
                <div className="container-fluid px-0 py-5">
                    <div className="text-center">
                        <img src="/images/header-line.png" className="attachment-large size-large" alt="" loading="lazy" width="92" height="12"></img>
                        <h3 className="text-dark">{heading ? heading : <>Featured Summit <span className="text-warning">Photos</span></>}</h3>
                        <div className='mt-5'>
                            <Swiper
                                slidesPerView={1}
                                spaceBetween={0}
                                freeMode={true}
                                loop={true}
                                grabCursor={true}
                                autoplay={{
                                    delay: 1,
                                    disableOnInteraction: false,
                                }}
                                speed={16000}
                                pagination={{
                                    clickable: true,
                                }}
                                freemodemomentum={"false"}
                                modules={[Autoplay, FreeMode, Pagination]}
                                className="galleryswiper"

                            >
                                {imgArray?.map((imgpageArr, i) => {
                                    return (
                                        <SwiperSlide key={i}>
                                            <SingleSlideGallery handleToggle={handleToggle} key={i} imgpageArr={imgpageArr} />
                                        </SwiperSlide>
                                    )
                                })}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
            <FsLightbox toggler={toggler} type={"image"} slide={img} sources={lightBoxArr} />
        </div>
    );
}
