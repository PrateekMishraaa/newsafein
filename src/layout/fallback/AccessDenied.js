import React from 'react'
import { Link } from 'react-router-dom';

const AccessDenied = ({ message, img, title, contact, link }) => {
    return (
        <div className='message p-5 container' style={{ maxWidth: "800px" }}>
            <div className="d-flex flex-column justify-content-center align-items-center w-100">
                <h3 className='fs-2'>{title}</h3>
                <img class="w-100" src={img ? img : "https://glcloud.in/images/static/Wavy_Bus-26_Single-12%5B1%5D.webp"} style={{ maxWidth: 400 }} />
                <p className='text-center'>{message}
                    {
                        contact ?
                            <span>Or you can write us at <a href={`mailto:${contact}`}>{contact}</a></span> : null
                    }
                </p>
                {link && <Link to={link} className="text-capitalize btn btn-warning rounded-0 btn-sm py-3">
                    View Courses
                </Link>}
            </div>
        </div>
    )
}

export default AccessDenied;