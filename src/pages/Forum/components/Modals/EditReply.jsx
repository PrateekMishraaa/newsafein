import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Divider from '@mui/joy/Divider';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { useGlobalContext } from 'global/context';
import { apiForum } from 'api';

export default function EditReply({ open, setOpen, replyText, id }) {
    const { userData } = useGlobalContext();
    const formik = useFormik({
        initialValues: {
            email: userData?.email,
            replyText: replyText,
        },
        onSubmit: async (values, action) => {
            // console.log("Edit Values: ", values);
            try {
                const res = await apiForum.put(`/v1/api/reply/${id}`, values);
                if (res?.status === 200) {
                    // console.log("Edit Res: ", res);
                    setOpen(false);
                    action.resetForm();
                }
            } catch (err) {
                // console.log(err);
                setOpen(false);
            }
        }
    });
    return (
        <React.Fragment>

            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                onClose={() => setOpen(false)}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <Sheet
                    variant="outlined"
                    sx={{
                        maxWidth: 500,
                        borderRadius: 'md',
                        p: 3,
                        boxShadow: 'lg',
                        width: 500,
                    }}
                >
                    <ModalClose
                        variant="outlined"
                        sx={{
                            top: 'calc(-1/4 * var(--IconButton-size))',
                            right: 'calc(-1/4 * var(--IconButton-size))',
                            boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                            borderRadius: '50%',
                            bgcolor: 'background.body',
                        }}
                    />
                    <Typography
                        component="h2"
                        id="modal-title"
                        level="h4"
                        textColor="inherit"
                        fontWeight="lg"
                        mb={1}
                    >
                        Edit your reply
                    </Typography>
                    {/* <Typography id="modal-desc" textColor="text.tertiary">
                    Edit your comment
                </Typography> */}
                    <TextField
                        autoFocus
                        margin="dense"
                        minRows={2}
                        maxRows={4}
                        id="replyText"
                        name="replyText"
                        // label={<h6 className='text-secondary'>Comment</h6>}
                        type="text"
                        placeholder='Ex- Hmmm, we can still chat here...'
                        fullWidth

                        value={formik.values.replyText}
                        onChange={formik.handleChange}
                    />
                    <br />
                    <Divider />
                    <div className='mt-3 d-flex align-items-center'>
                        <div className="col controls">
                            <Button onClick={formik.handleSubmit} variant='outlined' className='text-capitalize fw-bold' >Submit</Button>
                            <Button onClick={() => setOpen(false)} variant='outlined' color="danger" className='mx-3 text-capitalize fw-bold'>Cancel</Button>
                        </div>

                    </div>
                </Sheet>
            </Modal>
        </React.Fragment>
    );
}