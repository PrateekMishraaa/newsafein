import { Button, Checkbox, FormControl, FormHelperText, Link, Typography } from '@mui/joy';
// import { useGlobalContext } from 'global/context';
import React, { useState } from 'react';

const RegisterForum = ({createUser}) => {
    // const { token } = useGlobalContext();
    const [checkedYuvaTNC, setCheckedYuvaTNC] = useState(false);
    const [checkedEksathiTNC, setCheckedEksathiTNC] = useState(false);

    const handleSubmit = () => {
        createUser(checkedEksathiTNC);
    };

    return (
        <>
            <div className="border rounded-4 p-5 ">
                <div className="mb-3">
                    <h3 className='text-center'>Forum Activation</h3>
                    <h6 className='text-center text-secondary'>Powered By <a href="https://www.eksathi.com">EkSathi</a></h6>
                </div>
                <div className='d-flex flex-column justify-content-center'>
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
                </div>
                <form className=''>
                    <FormControl size="sm">
                        <Checkbox
                        onChange={(e)=> setCheckedYuvaTNC(e.target.checked)}
                            label={
                                <React.Fragment>
                                    I have read and agree to the{' '}
                                    <Typography fontWeight="md">terms and conditions of Yuvamanthan Q&A Wall.</Typography>.
                                </React.Fragment>
                            }
                        />
                        <FormHelperText>
                            <Typography level="body2">
                                Read our <Link href="#link">terms and conditions</Link>.
                            </Typography>
                        </FormHelperText>
                    </FormControl>
                    <FormControl size="sm">
                        <Checkbox
                            className='mt-2'
                            onChange={(e)=> setCheckedEksathiTNC(e.target.checked)}
                            disabled={!checkedYuvaTNC}
                            label={
                                <React.Fragment>
                                    Also, Create my EkSathi Account on www.eksathi.com, I have read the {' '}
                                    <Typography fontWeight="md">EkSathi terms and conditions</Typography>.
                                </React.Fragment>
                            }
                        />
                        <FormHelperText>
                            <Typography level="body2">
                                Read EkSathi's <Link href="#link">terms and conditions</Link>.
                            </Typography>
                        </FormHelperText>
                    </FormControl>
                    <Button disabled={!checkedYuvaTNC} className='mt-3 text-center' label="Activate and Continue..." variant="outlined" onClick={handleSubmit}>Activate and Continue...</Button>
                </form>
            </div>
        </>
    )
}

export default RegisterForum;