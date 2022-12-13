import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Footer } from "../../../components/footer";
import { Layouts2 } from "../../../components/layouts/Layout2";
import Assets from "../../../public";
import style from "../../../styles/AddRecipe.module.css";
import Router from "next/router";
import axios from "axios";
import { getCookies } from "cookies-next";

export const getServerSideProps = async (context) => {
  const { token } = context.req.cookies;

  if (!token) {
    return {
      redirect: {
        destination: "/ui/auth/login",
        permanent: true,
      },
    };
  }

  return {
    props: {
      isLogin: true,
      token: token,
    },
  };
};

const AddRecipe = ({ verif, token }) => {
  const [ingredients, setIngredients] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getCookies("token");
    const formData = new FormData();
    formData.append("ingredients", ingredients);
    formData.append("title", title);
    formData.append("image", image);
    formData.append("video", video);
    await axios
      .post(
        "http://localhost:3000/recipes/",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
        {
          "content-type": "multipart/form-data",
        }
      )
      .then((res) => {
        console.log(res);
        Router.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  const handleVideo = (e) => {
    const file = e.target.files[0];
    setVideo(file);
  };

  useEffect(() => {
    const token = getCookies("token");
    token;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <header>
        <Layouts2 />
      </header>
      <main>
        <form
          onSubmit={handleSubmit}
          className="py-5 container flex-column justify-content-md-center"
        >
          <div className="flex-column pb-4">
            <div className={style.dropzone_wrapper}>
              <div className={style.dropzone_desc}>
                <i className="glyphicon glyphicon-download-alt"></i>
                <Image src={Assets.UploadPhoto} width="40" height="40" alt="" />
                <p>Add photo</p>
              </div>
              <input
                type="file"
                id="photo"
                className={style.dropzone}
                onChange={(e) => handleImage(e)}
                accept="image/*"
              />
            </div>

            <div className="py-4">
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ backgroundColor: "#F6F5F4" }}
              />
            </div>
            <div className="pb-4">
              <textarea
                className="form-control"
                id="ingredients"
                rows="10"
                placeholder="Ingredients"
                required
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                style={{ backgroundColor: "#F6F5F4" }}
              ></textarea>
            </div>
            <div className={style.video_wrapper}>
              <div className={style.video_desc}>
                <i className="glyphicon glyphicon-download-alt"></i>
                <input
                  type="file"
                  className={style.dropzone_video}
                  style={{ backgroundColor: "#F6F5F4" }}
                  id="video"
                  placeholder="Video"
                  onChange={(e) => handleVideo(e)}
                  accept="video/*"
                />
                <p>Video</p>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center pb-5">
            <button
              type="submit"
              style={{
                backgroundColor: "#EFC81A",
                borderRadius: "10px",
                width: "150px",
                borderColor: "#EFC81A",
                color: "white",
              }}
            >
              Post
            </button>
          </div>
        </form>
      </main>

      <footer className="align-self-end">
        <Footer />
      </footer>
    </div>
  );
};

export default AddRecipe;
