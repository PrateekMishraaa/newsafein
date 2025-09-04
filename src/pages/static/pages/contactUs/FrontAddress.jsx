
import React from 'react'
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import EmailIcon from '@mui/icons-material/Email';
import { LocationOn } from '@mui/icons-material';
const FrontAddress = () => {
  return (
    <div className="container-fluid p-0">
      <div className="row">
        <div className="col">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14016.779907254726!2d77.20313751233896!3d28.563907298535444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce242fc34a911%3A0x4e89e7b171989f21!2sSouth%20Extension%20II%2C%20New%20Delhi%2C%20Delhi%20110049!5e0!3m2!1sen!2sin!4v1680685716565!5m2!1sen!2sin"
            width="600" style={{ minHeight: "450px" }} className='d-block w-100 h-100'
          ></iframe>
        </div>
        <div className="col p-3">
          <div className="h-100 container">
            <img src="./assets/img/icons/lineal/telemarketer.svg" class="svg-inject icon-svg icon-svg-md mb-4" alt="" />
            <h2 class="fs-3 mb-4">We are excited about meeting new people and exploring opportunities. Let’s create a better future together.</h2>
            <div class="d-flex flex-row w-100 align-items-center mb-3">
              <div className="p-2">
                <div className="border p-2 rounded">
                  <LocationOn className='text-secondary' style={{ fontSize: "50px" }} />
                </div>
              </div>
              <div className='text-start'>
                <h5 class="mb-1">Address</h5>
                <p className='fs-5 text-secondary mb-0 lh-sm'>A 92 (First Floor) South Extension Part II <br /> New Delhi- 110049</p>
              </div>
            </div>
            <div class="d-flex flex-row w-100 align-items-center mb-3">
              <div className="p-2">
                <div className='border p-2 rounded'>
                  <AddIcCallIcon className='text-secondary' style={{ fontSize: "50px" }} />
                </div>
              </div>
              <a href='tel:919650631134' className='text-start'>
                <h5 class="mb-1">Phone</h5>
                <p className='fs-5 text-secondary mb-0'>+91 9650631134</p>
              </a>
            </div>
            <div class="d-flex flex-row w-100 align-items-center mb-3">
              <div className="p-2">
                <div className='border p-2 rounded'>
                  <EmailIcon className='text-secondary' style={{ fontSize: "50px" }} />
                </div>
              </div>
              <a href="mailto:modelg20@yuvamanthan.org" className='text-start'>
                <h5 class="mb-1">E-mail</h5>
                <p class="mb-0 fs-5 mb-0"><span class="link-body text-secondary">modelg20@yuvamanthan.org</span></p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
//   

export default FrontAddress