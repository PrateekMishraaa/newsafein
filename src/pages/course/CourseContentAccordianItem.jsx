import { PictureAsPdfTwoTone, QuizTwoTone, VideoCameraBackTwoTone } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import { api } from 'api';

const CourseContentAccordianItem = ({ section }) => {
    const [contents, setContents] = useState([]);
    const fetchSectionContent = async () => {
        const response = await api.get("/course/v2/contents?sectionId=" + section?.sectionId);
        if (response?.data?.status == "success") {
            setContents(response?.data?.contents);
        }
    }
    useEffect(() => {
        fetchSectionContent();
    }, [])
    return (
        <>
            <ul className="module-sublist ps-0">
                {contents?.map((content, index) => (
                    <li key={index} className={"rounded"} style={{ cursor: "pointer" }}>
                        <div className="p-3 rounded-1 p-relative d-flex align-items-center mb-2 bg-light shadow-sm">
                            {content?.type === 1 ? (
                                <VideoCameraBackTwoTone sx={{ color: "blue" }} />
                            ) : content?.type === 2 ? (
                                <PictureAsPdfTwoTone sx={{ color: "red" }} />
                            ) : (
                                <QuizTwoTone sx={{ color: "green" }} />
                            )}
                            <span className="fs-6 ms-2">{content?.title}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default CourseContentAccordianItem