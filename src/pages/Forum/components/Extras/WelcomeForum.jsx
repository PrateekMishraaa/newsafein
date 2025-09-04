import { Button } from '@mui/joy';
import React from 'react'
import { Link } from 'react-router-dom';

const WelcomeForum = () => {
    return (
        <>
            {/* <div className="mb-3 p-5 rounded-4 border shadow-4"> */}
                <div className="d-flex flex-column align-items-center mb-3 justify-content-center">
                    <h3 className='fs-4 text-warning text-center'>Welcome to Yuvamanthan Q&A Wall</h3>
                    <p className='text-secondary'>Powered By <Link to="https://www.eksathi.com/" target='_blank' className='text-info fw-bold'>EkSathi</Link></p>
                </div>
                <div className="row mb-3">
                    <h5>This is open discussion forum to discuss about your views for model G20.</h5>
                    <ul >
                        <li>
                            <i class="bi bi-arrow-right-circle text-primary"></i> You can ask your queries about any topic
                        </li>
                        <li>
                            <i class="bi bi-arrow-right-circle text-primary"></i> Search answers posted by other members participating in model G20 across the globe
                        </li>
                        <li>
                            <i class="bi bi-arrow-right-circle text-primary"></i> Share your comments for the answers posted by individual
                        </li>
                        <li>
                            <i class="bi bi-arrow-right-circle text-primary"></i> Like or dislike the views
                        </li>
                    </ul>
                </div>
                <div className="row mb-3">
                    <h5>Terms of Use</h5>
                    <ul>
                        <li>
                            <i class="bi bi-arrow-right-circle text-primary"></i> While posting any query, comments, try to be specific and alligned to the topic
                        </li>
                        <li>
                            <i class="bi bi-arrow-right-circle text-primary"></i> Try to answer with fact, to get max weightage
                        </li>
                        <li>
                            <i class="bi bi-arrow-right-circle text-primary"></i> Be polite while responding
                        </li>
                    </ul>
                </div>
                <div className="row d-flex flex-column align-items-center justify-content-center fs-6" style={{
                    fontSize: "12px"
                }}>
                    <p className='fs-5 text=center'>
                        To get your query solved by experts, explore our free platform <Link href="http://www.eksathi.com" target="_blank">eksathi.com</Link>
                    </p>
                    <p className='text-center mt-0'>Please click here to join</p>
                </div>
                    <Button className='text-center text-capitalize fw-bold mx-3 rounded-3' variant='outlined' color="success" onClick={()=> {
                        window.open("https://www.eksathi.com", '_blank');
                    }}>Connect to EkSathi</Button>
            {/* </div> */}
        </>
    )
}

export default WelcomeForum;