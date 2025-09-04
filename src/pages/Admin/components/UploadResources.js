import {apiAuth, apiJsonAuth} from 'api';
import {useFormik} from 'formik'
import {pop2, Popup} from 'utils/Popup'
import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom';
import {DeleteForever, EditTwoTone} from "@mui/icons-material";
import {IconButton} from '@mui/material';
import Swal from 'sweetalert2';
import ArticleIcon from '@mui/icons-material/Article';
import moment from 'moment';
import {useGlobalContext} from 'global/context';

function UploadResources() {
    let [edit, setEdit] = useState(false);
    let [openeditForm, setOpenEditForm] = useState(false);
    let [resourcesData, setResourcesData] = useState([])
    let [update, setupdate] = useState(0);
    let [Title, setTitle] = useState();
    let [resourceLink, setResourceLink] = useState();
    let [Id, setId] = useState();
    let [openAddForm, setOpenAddForm] = useState(false);
    const {adminRoles} = useGlobalContext();

    let id = useParams();
    const getResourcesById = async () => {
        // console.log("Fetching Resources Data ", id.id);
        try {

            const res = await apiAuth.get(`admin/institute-resources/${id.id}`);
            console.log(`admin/institute-resources/${id.id}`);

            if (res.status == 200) {
                console.log(res?.data?.result);
                setResourcesData(res?.data?.result);

            }
        } catch (error) {
            console.log("All Quotes Error: ", error);
        }
    };
    useEffect(() => {
        getResourcesById();
    }, [update])
    console.log()

    const Formik = useFormik({
        initialValues: {
            title: "",
            resource_link: "",
            resource_file: ""
        },
        onSubmit: async function (values, actions) {
            Popup("loading...");
            console.log(values);
            if (values.title && values.resource_link && values.resource_file) {
                try {
                    const res = await apiAuth.post(`admin/institute-resources/${id.id}`, values);
                    if (res.status == 200) {
                        actions.resetForm();
                        setupdate(update + 1);
                    }

                } catch (err) {

                    Popup("error", err?.response?.data?.message)
                }
            } else {
                pop2.warning({title: "please fill all the fields"})
            }
        }
    })

    const Editformik = useFormik({
        initialValues: {
            id: Id ? Id : "",
            title: Title ? Title : "",
            resource_link: resourceLink ? resourceLink : "",
            resource_file: ""
        },
        enableReinitialize: true,
        onSubmit: async function (values, actions) {
            Popup("loading...");

            try {
                const res = await apiAuth.put('admin/institute-resources', values);
                if (res.status == 200) {
                    actions.resetForm();
                    setupdate(update + 1);
                    pop2.success({title: "Data Updated Succesfully"})
                }
            } catch (err) {
                Popup("error", err?.response?.data?.message)
            }
        }
    })

    return (

        <div>
            <div className="d-flex align-items-center justify-content-between">
                <h4>Resources Table</h4>
                <button className='btn btn-primary' hidden={!(adminRoles() === 1)} onClick={() => {
                    openAddForm ? setOpenAddForm(false) : setOpenAddForm(true);
                }}>Add Resources</button>
            </div>
            <div className="resources-data table-responsive border rounded-3 mt-2">
                <table className="table">
                    <thead className="table-danger">
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">title</th>
                            <th scope="col">resource_link</th>
                            <th scope="col">resource_file</th>
                            <th scope="col">instituteId</th>
                            <th scope="col">createdAt</th>
                            <th scope="col">updatedAt</th>
                            <th hidden={adminRoles() === 5} scope="col">action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {resourcesData?.map((data, index) => {

                            return (
                                <tr>

                                    <td>{data?.id}</td>
                                    <td>{data?.title}</td>
                                    <td>{data?.resource_link}</td>
                                    <td> <a href={data?.resource_file}><ArticleIcon /></a> </td>
                                    <td>{data?.instituteId}</td>
                                    <td>{moment(data?.createdAt).fromNow()}</td>
                                    <td>{moment(data?.updatedAt).fromNow()}</td>
                                    <td hidden={adminRoles() === 5} >

                                        <IconButton onClick={() => {
                                            setTitle(data?.title)
                                            setResourceLink(data?.resource_link)
                                            setId(data?.id)
                                            setEdit(true);
                                        }}><EditTwoTone /></IconButton>

                                        <IconButton hidden={adminRoles() === 3}
                                            sx={{color: "tomato"}}
                                            onClick={async () => {
                                                // Updation("delete", undefined,ele?.id);
                                                Swal.fire({
                                                    title: "Are you sure?",
                                                    text: "You wanted to delete this Resouorce!",
                                                    icon: "warning",
                                                    showCancelButton: true,
                                                    confirmButtonColor: "#3085d6",
                                                    cancelButtonColor: "#d33",
                                                    confirmButtonText: "Yes, delete it!",
                                                }).then(async (result) => {
                                                    if (result.isConfirmed) {
                                                        try {
                                                            console.log(data.id)
                                                            const res = await apiJsonAuth.delete(`admin/institute-resources?id=${data?.id}`);
                                                            if (res?.status == 200) {
                                                                Swal.fire({
                                                                    title: res.data.message,
                                                                    icon: "success",
                                                                });
                                                                setupdate(update + 1);
                                                            }
                                                        } catch (error) {
                                                            Swal.fire({
                                                                width: 400,
                                                                title: error?.response?.data?.message
                                                                    ? error?.response?.data?.message
                                                                    : "Something Went Wrong Check  your Network Connection",
                                                                icon: "error",
                                                            });
                                                        }
                                                    }
                                                });
                                            }}
                                        >
                                            <DeleteForever />
                                        </IconButton>

                                    </td>





                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {openAddForm ?
                <div>
                    {!edit ?
                        <div hidden={!(adminRoles() === 1)} className='border rounded-4 p-3 mt-4'>
                            <h2 className="fs-3">Upload Resources</h2>

                            <form onSubmit={Formik.handleSubmit}>

                                <div class="mb-3">
                                    <label for="title" class="form-label">Title</label>
                                    <input type="text" name='title' className="form-control " id="title" value={Formik.values.title} onChange={Formik.handleChange} />
                                </div>
                                <div class="mb-3">
                                    <label for="upload-resources-link" class="form-label">Resource Link</label>
                                    <input type="text" name='resource_link' className="form-control " id="upload-resources-link" value={Formik.values.resource_link} onChange={Formik.handleChange}
                                    />
                                </div>

                                <div class="mb-3">
                                    <label for="upload-resources-file" class="form-label">Resource File</label>
                                    <input type="file" name='resource_file' className="form-control pt-3" id="upload-resources-file" onChange={(e) => {
                                        if (e.target.files.length) {
                                            Formik.setFieldValue("resource_file", e.target.files[0]);
                                        }
                                    }} />
                                </div>
                                <button type="submit" class="btn btn-primary">Submit</button>

                            </form>
                        </div>
                        :
                        <div className='border rounded-4 p-3 mt-4'>
                            <div className="d-flex align-items-center justify-content-between p-4">
                                <h2 className="fs-3">Edit Resources</h2>
                                <button
                                    className="btn btn-primary col-2 me-1 mt-3 text-center"
                                    onClick={() => {
                                        setEdit(false);
                                    }}
                                >
                                    Cancel
                                </button>

                            </div>

                            <form onSubmit={Editformik.handleSubmit}>
                                <div class="mb-3">
                                    <label for="id" class="form-label">id</label>
                                    <input type="text" name='id' className="form-control " id="id" value={Editformik.values.id} onChange={Formik.handleChange} />
                                </div>

                                <div class="mb-3">
                                    <label for="title" class="form-label">Title</label>
                                    <input type="text" name='title' className="form-control" value={Editformik?.values?.title} id="title" onChange={Editformik.handleChange} />
                                </div>

                                <div class="mb-3">
                                    <label for="upload-resources-link" class="form-label">Resource Link</label>
                                    <input type="text" name='resource_link' className="form-control" id="upload-resources-link" value={Editformik?.values?.resource_link} onChange={Editformik.handleChange} />
                                </div>
                                <div class="mb-3">
                                    <label for="upload-resources-file" class="form-label">Resource File</label>
                                    <input type="file" name='resource_file' className="form-control pt-3" id="upload-resources-file" onChange={(e) => {
                                        if (e.target.files.length) {
                                            Editformik.setFieldValue("resource_file", e.target.files[0]);
                                        }
                                    }} />
                                </div>
                                <button type="submit" class="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    }
                </div>
                : ""}
        </div>
    )
}

export default UploadResources
