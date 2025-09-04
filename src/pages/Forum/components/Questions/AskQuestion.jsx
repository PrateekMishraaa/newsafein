import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Divider, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useFormik } from 'formik';
import { useGlobalContext } from 'global/context';
import { apiForum } from 'api';
import { pop2 } from 'utils/Popup';
import { useNavigate } from 'react-router-dom';
import MyCKEditor from 'utils/CKEditor';

export default function AskQuestion({ open, handleClose, getQuestions, categories }) {
    const [value, setValue] = React.useState('');
    const { userData } = useGlobalContext();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: userData?.email,
            title: "",
            categoryId: null
        },
        onSubmit: async (values, action) => {
            values = { ...values, body: value };
            // console.log("Submiting Question: ", { values });
            // console.log("UserData: ", userData);
            try {
                const res = await apiForum.post(`/v1/api/questions`, values);
                if (res.status === 200) {
                    // console.log("Success: ", res);
                    handleClose();
                    // pop2.success(res?.data?.message);
                    // getQuestions()
                    navigate(`/dashboard/forum/${res?.data?.slug}`);
                }
            } catch (error) {
                handleClose();
                // console.log(error.response.data.message);
                pop2.error(error.response.data.message);
            }
        }
    });
    const charactersLeft = 150 - formik.values.title.length;

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Ask Question

                </DialogTitle>
                <DialogContent className='border rounded-4 p-4 mx-3 mb-3 bg-light'>
                    <DialogContentText>
                        To ask your question, please enter your question details here. Our team will update the answers as soon as possible.
                    </DialogContentText>
                    <FormControl fullWidth className='mt-3' variant="standard">
                        <InputLabel id="category-select-label" className='fw-bold'>Choose Category</InputLabel>
                        <Select
                            labelId="category-select-label"
                            id="category-select"
                            value={formik.values.categoryId}
                            label="Choose Category"
                            name='categoryId'
                            className='fw-bold text-secondary'
                            onChange={formik.handleChange}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {categories?.map((category) => {
                                return <MenuItem value={category?.id}>{category?.name}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    <Divider className='py-2' />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label={<h6 className='text-secondary'>Question Title</h6>}
                        type="text"
                        placeholder='Ex- What is yuvamanthan? Can I participate?'
                        fullWidth
                        variant="standard"
                        onChange={formik.handleChange}
                        inputProps={{ maxLength: 150 }}
                        helperText={`${charactersLeft} characters left`}
                    />
                    <MyCKEditor content={value} setContent={setValue} placeholder='Describe your question....' />
                    <br />
                    <Divider />
                    <div className='mt-3 d-flex align-items-center'>
                        <div className="col controls">
                            <Button onClick={formik.handleSubmit} variant='outlined' className='text-capitalize fw-bold' disabled={formik.isSubmitting || !formik.values.title || !value || value === "<p><br></p>" || !formik.values.categoryId ? true : false}>Post Now</Button>
                            <Button onClick={handleClose} variant='outlined' className='mx-3 text-capitalize fw-bold'>Cancel</Button>
                        </div>
                        <div className="col brand text-end">
                            <p className='fs-6'>Powered by <a href="https://www.eksathi.com" target="_blank" className='text-info fw-bolder'>EkSathi</a></p>
                        </div>

                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}