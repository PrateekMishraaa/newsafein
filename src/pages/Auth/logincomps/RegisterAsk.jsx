import { ButtonBase } from '@mui/material'
import React from 'react'
import { Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const RegisterAsk = ({ handleClose }) => {
    return (
        <Modal show={true} onHide={handleClose}>
            <Modal.Header closeButton className='border-bottom-0'>
                <Modal.Title className=" fs-4 text-dark ms-auto">Register As</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row row-cols-1 row-cols-md-2 g-3 justify-content-around pb-4">
                    {[{ icon: "https://cdn-icons-png.flaticon.com/512/9978/9978957.png", label: "INSTITUTE", link: "" }, { icon: "https://cdn-icons-png.flaticon.com/512/3650/3650049.png", label: "TEACHER", link: "teacher" }].map((item, index) => {
                        return <div className="col">
                            <Link to={"/registration/" + item?.link}>
                                <ButtonBase variant="outlined" onClick={handleClose} color="warning" fullWidth className="p-2 p-lg-3 rounded-0 hover-primary bg-light w-100">
                                    <div>
                                        <img src={item?.icon} alt="" style={{height: "80px", objectFit: "contain" }} />
                                        <span className="text-dark fw-semibold">{item?.label}</span>
                                    </div>
                                </ButtonBase>
                            </Link>
                        </div>
                    })}
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default RegisterAsk