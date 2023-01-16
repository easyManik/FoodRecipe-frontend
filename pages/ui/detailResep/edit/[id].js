import React, { useEffect, useState } from "react";
import style from "../../../../styles/recipes.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import { Footer } from "../../../../components/footer";
import Assets from "../../../../public";
import { Layouts2 } from "../../../../components/layouts/Layout2";
import Swal from "sweetalert2";
import Image from "next/image";

const Edit = ({ isLogin, token }) => {
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState({});
  const [title, setTitle] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [video, setVideo] = useState({});
  const [data, setData] = useState();

  const router = useRouter();
  const { id } = router.query;
  console.log("id edit recipe", id);
  const fetchdata = async (id) => {
    const result = await axios.get(
      // process.env.NEXT_PUBLIC_BACKEND_API + `/recipes/`
      `http://localhost:3000/recipes/${id}`
    );
    const data = result.data.data[0];
    setData(data);
    console.log("data=", data);
  };
  useEffect(() => {
    fetchdata(id);
  }, []);

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
      const dataUpdate = new FormData();
      dataUpdate.append("title", title);
      dataUpdate.append("image", image.file);
      dataUpdate.append("ingredient", ingredient);
      dataUpdate.append("video", video.file);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.put(
        `http://localhost:3000/recipes/${id}`,
        dataUpdate,
        config
      );

      setUploading(false);
      console.log("data update", dataUpdate);
      Swal.fire("Good Job", "Edit Recipe Success", "success");
      router.push("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Layouts2 isLogin={isLogin} />
      <main className={style.main}>
        <h3 style={{ margin: "20px auto" }}>
          {data?.title ? data.title : "Edit Recipes"}
        </h3>
        <form className="py-5 container flex-column justify-content-md-center">
          <div className="flex-column pb-4">
            <div className={style.dropzone_wrapper}>
              <div className={style.dropzone_desc}>
                <i className="glyphicon glyphicon-download-alt"></i>

                {image.preview ? (
                  <Image src={image.preview} alt="-" width="100" height="40" />
                ) : (
                  <img
                    src={data?.image ? data.image : "..."}
                    alt=",,,"
                    width="70"
                    height="40"
                  />
                )}
                <p>Add photo </p>
              </div>

              <input
                type="file"
                id=" "
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
                placeholder={data?.title ? data.title : "...."}
                required
                onChange={(e) => setTitle(e.target.value)}
                style={{ backgroundColor: "#F6F5F4" }}
              />
            </div>
            <div className="pb-4">
              <textarea
                className="form-control"
                id=" "
                name="ingredient"
                rows="10"
                placeholder={data?.ingredient ? data.ingredient : "...."}
                required
                onChange={(e) => setIngredient(e.target.value)}
                style={{ backgroundColor: "#F6F5F4" }}
              ></textarea>
            </div>
            <div className={style.video_wrapper}>
              <div className={style.video_desc}>
                <i className="glyphicon glyphicon-download-alt"></i>

                {video.preview ? (
                  <Image src={video.preview} alt="-" width="100" height="40" />
                ) : (
                  <img
                    src={data?.video ? data.video : "..."}
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
              style={{
                backgroundColor: "#EFC81A",
                borderRadius: "10px",
                width: "150px",
                borderColor: "#EFC81A",
                color: "white",
              }}
            >
              {uploading ? "Uploading..." : "Update"}
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </>
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

export default Edit;
