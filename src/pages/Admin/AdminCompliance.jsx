import { apiAuth } from "api";
import axios from "axios";
import { ComplianceTable } from "components/admin";
import React, { useState } from "react";
import { Modal, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminCompliance = () => {
  const Navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [reload, setReload] = useState(0);
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [img, setImg] = useState("");

  const fileHandler = () => {
    document.getElementById("img").click();
  };
  const fileChangeHandler = (e) => {
    const file = e.target.files[0];
    apiAuth
      .post("/admin/temp", { img: e.target.files[0] })
      .then((res) => {
        setImg(res.data?.file?.Location);
      })
      .catch((error) => console.log(error));
    let object = {
      file: file,
      name: file.name,
      link: URL.createObjectURL(file),
    };
    setThumbnail(object);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || title.trim() === "") {
      toast.dismiss();
      toast.error("Title cannot be blank");
      return;
    }
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}admin/compliance`, {
        title,
        description,
        thumbnail: img,
      });
      console.log("Compliance created:", response.data.result);
      setTitle("");
      setDescription("");
      setShowModal(false);
      setReload(reload + 1);
    } catch (error) {
      console.error("Error creating compliance:", error);
    }
  };
  const handleToggleModal = () => {
    setShowModal(!showModal);
    setTitle("");
    setDescription("");
    setThumbnail({});
  };

  return (
    <>
      <button className="btn btn-sm btn-primary" onClick={handleToggleModal}>
        Add Compliance
      </button>
      <Modal show={showModal} onHide={handleToggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Compliance</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="mb-3">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  fileHandler();
                }}
                className="btn btn-success btn-sm">
                Add Thumbnail
              </button>
              <input type="file" className="form-control" id="img" style={{ display: "none" }} onChange={fileChangeHandler} />
            </div>
            {thumbnail && thumbnail.name && (
              <Card>
                <Card.Body>
                  <div>{thumbnail.name}</div>
                  <div
                    style={{
                      height: "350px",
                      overflow: "hidden",
                      justifyContent: "center",
                      alignItems: "center",
                    }}>
                    <img
                      style={{
                        height: "100%",
                        objectFit: "contain",
                      }}
                      src={thumbnail.link}
                      alt="alt"
                    />
                  </div>
                </Card.Body>
              </Card>
            )}

            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <Button variant="primary" type="submit">
              Add
            </Button>
          </form>
        </Modal.Body>
      </Modal>
      {/* Compliance Table  */}
      <ComplianceTable reload={reload} />
    </>
  );
};

export default AdminCompliance;
