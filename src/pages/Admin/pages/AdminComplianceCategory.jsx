import { Delete, Edit } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Modal, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';

const AdminComplianceCategory = () => {
  const { id } = useParams();

  const Navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState([])
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const navigateToQuestion = (id) => {
    Navigate("/admin/compliance/questions/" + id)
  }

  const handleToggleModal = () => {
    setShowModal(!showModal);

  };
  const handleEditToggleModal = () => {
    setShowModal(!showModal);

  };

  const handleDelete = (id) => {
    axios.delete(process.env.REACT_APP_API_BASE_URL +"admin/compliance_question/categoryId/"+id)
        .then((res)=>console.log("successfully delete")).catch((err)=>console.log(err.message))
    axios.delete(process.env.REACT_APP_API_BASE_URL + "admin/compliance_category/" + id)
      .then(() => {
        
        toast.dismiss();
        toast.success("Category Deleted");
        getAllCategoriesByComplianceId();
        setTitle('');
        setIsEdit(false);
        setDescription('');
        // Hide the modal
        setShowModal(false);
      }).catch((error) => {
        toast.dismiss();
        toast.error(error.message);
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      axios.put(process.env.REACT_APP_API_BASE_URL + "admin/compliance_category/" + editId, {
        complianceId: id,
        title: title,
        description: description,

      }).then(() => {
        toast.dismiss();
        toast.success("successfully updated category")
        getAllCategoriesByComplianceId();
        // Reset the form
        setTitle('');
        setIsEdit(false);
        setDescription('');
        // Hide the modal
        setShowModal(false);
      }).catch((error) => {
        toast.dismiss();
        toast.error("something went wrong");
      })
    }
    else {
      axios.post(process.env.REACT_APP_API_BASE_URL + "admin/compliance_category", {
        complianceId: id,
        title: title,
        description: description,

      }).then(() => {
        toast.dismiss();
        toast.success("successfully created category")
        getAllCategoriesByComplianceId();
        // Reset the form
        setTitle('');
        setIsEdit(false);
        setDescription('');
        // Hide the modal
        setShowModal(false);
      }).catch((error) => {
        toast.dismiss();
        toast.error("something went wrong");
      })
    }
  }

  const getAllCategoriesByComplianceId = () => {
    axios.get(process.env.REACT_APP_API_BASE_URL + "admin/compliance_category/compliance/" + id)
      .then((response) => {
        setCategory(response.data.result)
        console.log("done fetche", response.data.result);
      }).catch((error) => {
        console.log(error.message);
      })
  }

  useEffect(() => {
    getAllCategoriesByComplianceId();
  }, [])

  return (
    <div style={{margin:'12px'}} className='m-4'>
      <button onClick={() => {
        handleToggleModal();
        setIsEdit(false);
      }} className='btn btn-outline-success rounded'>
        Create Category
      </button>
      <Modal show={showModal} onHide={handleToggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? "Edit Compliance" : "Add Compliance"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <Button variant="primary" type="submit">
              Add
            </Button>
          </form>
        </Modal.Body>
      </Modal>

      <div className='row g-2 mt-2 row-cols-1 row-cols-lg-3'>
        {
          category.map((i, index) => {
            return (
              <div className='col' key={index}>
                <Card className='' style={{ minHeight: '200px' }} >
                  <Card.Body>
                    <div className='d-flex justify-content-between align-items-center'>
                      <span style={{
                        color: 'black',
                        fontSize: '14px',
                        fontWeight: '700px',
                      }} className='text-capitalize'>{i.title}</span>
                      <div className='d-flex'>
                        <IconButton onClick={() => {
                          setIsEdit(true)
                          handleToggleModal();
                          setEditId(i.id);
                        }} className=''><Edit /></IconButton>
                        <IconButton onClick={() => handleDelete(i.id)} className=''><Delete /></IconButton>
                      </div>
                    </div>
                    <hr />
                    <div>
                      <span>{i.description}</span>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            )
          })
        }
      </div>

      <div className='d-flex justify-content-end mt-5'>
        {
          category.length > 0 ? <button className='btn rounded btn-primary d-block ' onClick={() => { navigateToQuestion(id) }}>Continue</button> : null
        }
      </div>

    </div>
  )
}

export default AdminComplianceCategory
