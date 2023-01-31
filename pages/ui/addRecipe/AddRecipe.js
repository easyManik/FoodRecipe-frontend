import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Footer } from "../../../components/footer";
import { Layouts2 } from "../../../components/layouts/Layout2";
import Assets from "../../../public";
import style from "../../../styles/AddRecipe.module.css";
import axios from "axios";
import { getCookies } from "cookies-next";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const AddRecipe = ({ isLogin, token }) => {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState({});
  const [title, setTitle] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [video, setVideo] = useState([]);

  const handleImage = (e) => {
    setImage({
      file: e.target.files[0],
      preview: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handleVideo = (e) => {
    setVideo({
      file: e.target.files[0],
      preview: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handleAdd = async () => {
    try {
      setUploading(true);
      const data = new FormData();
      data.append("title", title);
      data.append("image", image.file);
      data.append("ingredient", ingredient);
      data.append("video", video.file);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        // withCredentials : true
      };
      const result = await axios.post(
        process.env.NEXT_PUBLIC_BACKEND_API + "recipes/add",
        data,
        config
      );
      setUploading(false);
      console.log("data add", data);
      console.log("data add status", result.data.message);

      Swal.fire("Good Job", "Add New Recipe Success", "success");
      router.push("/search");
    } catch (error) {
      Swal.fire("Failed", "Add Recipes Fails", "error");
      console.log(error);
    }
  };

  return (
    <div>
      <header>
        <Layouts2 isLogin={isLogin} />
      </header>
      <main>
        <form className="py-5 container flex-column justify-content-md-center">
          <div className="flex-column pb-4">
            <div className={style.dropzone_wrapper}>
              <div className={style.dropzone_desc}>
                <i className="glyphicon glyphicon-download-alt"></i>

                {image.preview ? (
                  <img src={image.preview} alt="prev" width={100} height={40} />
                ) : (
                  <Image
                    src={Assets.UploadPhoto}
                    alt=",,,"
                    width="70"
                    height="40"
                  />
                )}
                <p>Add photo</p>
              </div>

              <input
                type="file"
                id="image"
                name="image"
                className={style.dropzone}
                onChange={handleImage}
                accept="image/*"
              />
            </div>

            <div className="py-4">
              <input
                type="text"
                className="form-control"
                name="title"
                placeholder="name_recipe"
                required
                onChange={(e) => setTitle(e.target.value)}
                style={{ backgroundColor: "#F6F5F4" }}
              />
            </div>
            <div className="pb-4">
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                name="ingredient"
                rows="10"
                placeholder="Ingredient"
                required
                onChange={(e) => setIngredient(e.target.value)}
                style={{ backgroundColor: "#F6F5F4" }}
              ></textarea>
            </div>
            <div className={style.video_wrapper}>
              <div className={style.video_desc}>
                <i className="glyphicon glyphicon-download-alt"></i>
                {video.preview ? (
                  <img src={video.preview} alt="-" width="100" height="40" />
                ) : (
                  <Image
                    src={Assets.UploadPhoto}
                    alt=",,,"
                    width="70"
                    height="40"
                  />
                )}
                <input
                  type="file"
                  className={style.dropzone_video}
                  style={{ backgroundColor: "#F6F5F4" }}
                  name="video"
                  // value={video}
                  placeholder="Video"
                  onChange={handleVideo}
                  accept="video/*"
                />
                <p>Add Video</p>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center pb-5">
            <button
              onClick={handleAdd}
              // title=
              style={{
                backgroundColor: "#EFC81A",
                borderRadius: "10px",
                width: "150px",
                borderColor: "#EFC81A",
                color: "white",
              }}
            >
              {uploading ? "Uploading..." : "Post"}
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
export default AddRecipe;
