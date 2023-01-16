import React, { useState } from "react";

import axios from "axios";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import { ModalBody } from "react-bootstrap/ModalBody";
import Image from "next/image";
import Assets from "../../public";

const PhotoProfile = ({ user }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [photo, setPhoto] = useState(null);

  const tokenUser = {
    headers: {
      Authorization: `Bearer ${user}`,
    },
  };
  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
    console.log(e.target.files[0]);
  };
  const handleData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("photo", photo);
    console.log(formData, "data dari handle data update");
    axios
      .put(`http://localhost:3000/users/edit`, formData, tokenUser, {
        "content-type": "multipart/form-data",
      })
      .then((res) => {
        console.log("Update photo succes");
        console.log(res);
        window.location.reload(false);
        Swal.fire("Success", "update photo profile success", "success");
      })
      .catch((err) => {
        console.log("update photo profile failed");
        console.log(err);
        Swal.fire("Warning", "update photo profile failed", "error");
      });
  };
  return (
    <div className="d-flex align-items-center flex-column" onClick={handleShow}>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Foto Profile</Modal.Title>
        </Modal.Header>
        <ModalBody>
          <Form>
            <Form.Group className="mb-3">
              <input type="file" name="photo" onChange={handlePhotoChange} />
            </Form.Group>
          </Form>
        </ModalBody>
        <Modal.Footer>
          <button className="btn" onClick={handleClose}>
            Close
          </button>
          <button
            className="btn "
            style={{ backgroundColor: "#EFC81A", color: "white" }}
            onClick={(e) => handleData(e)}
          >
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PhotoProfile;
