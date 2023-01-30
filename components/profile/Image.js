import React, { useState } from "react";

import axios from "axios";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import { ModalBody } from "react-bootstrap/ModalBody";
import Image from "next/image";
import Assets from "../../public";

const PhotoProfile = ({ token, onClick }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [photo, setPhoto] = useState(null);

  const tokenUser = {
    headers: {
      Authorization: `Bearer ${token}`,
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
      .put(
        process.env.NEXT_PUBLIC_BACKEND_API + `users/edit`,
        formData,
        tokenUser,
        {
          "content-type": "multipart/form-data",
        }
      )
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
      {photo?.photo === undefined ? (
        // <Image
        //   show={show}
        //   onHide={handleClose}
        //   style={{
        //     borderRadius: "100%",
        //     borderColor: "gray",
        //     backgroundColor: "gray",
        //   }}
        //   className="picture-user mb-5"
        //   src={Assets.pizza}
        //   alt="pict profil"
        //   width="128"
        //   height="128"
        // />
        "..."
      ) : (
        <Image
          show={show}
          onHide={handleClose}
          style={{
            borderRadius: "100%",
            borderColor: "gray",
            backgroundColor: "gray",
          }}
          className="picture-user"
          src={profile.photo ? profile.photo : "image"}
          alt="pict profil"
          width="128"
          height="128"
        />
      )}
      <button
        title="Choose photo"
        btn="btn-choose-photo"
        onClick={onClick}
        style={{ width: "200px" }}
      >
        Change Photo
      </button>
      <input
        type="file"
        name="photo"
        // ref={hiddenFileInput}
        onChange={handlePhotoChange}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default PhotoProfile;
