import React, { useEffect, useState } from "react";
import { Layouts2 } from "../../../components/layouts/Layout2";
import Image from "next/image";
import { Footer } from "../../../components/footer";
import { useRouter } from "next/router";
import axios from "axios";
import ReactPlayer from "react-player";
import { getCookies } from "cookies-next";
import Assets from "../../../public";
import Link from "next/link";
import Swal from "sweetalert2";

const css = { maxWidth: "100%", height: "auto", maxHeight: "500px" };
const buttonstyle = {
  backgroundColor: "#EFC81A",
  width: "200px",
  borderRadius: "10px",
  borderColor: "#EFC81A",
  height: "40px",
  color: "white",
};

const Detail = ({ isLogin, token }) => {
  const router = useRouter();
  const { id } = router.query;
  console.log("id detail recep=", id);
  const [data, setData] = useState();

  const fetchdata = async (id) => {
    const result = await axios.get(
      process.env.NEXT_PUBLIC_BACKEND_API + `recipes/${id}`
      // `http://localhost:3000/recipes/`
    );
    const data = result.data.data[0];
    setData(data);
    console.log("data=", data);
  };
  useEffect(() => {
    fetchdata(id);
  }, []);

  //handle save recipe
  const fetchSaved = async (id) => {
    try {
      console.log("id recipes saved", id);
      const param = { id_recipe: `${id}` };

      await axios.post(
        process.env.NEXT_PUBLIC_BACKEND_API + `recipes/saved`,
        param,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire("success", "berhasil simpan recipe", "success");
    } catch (e) {
      console.log(e);
    }
  };

  const fetchLiked = async (id_recipe) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const param = { id_recipe: `${id_recipe}` };
      console.log("id liked", param);

      await axios.post(
        process.env.NEXT_PUBLIC_BACKEND_API + `recipes/liked`,
        param,
        config
      );
      Swal.fire("success", "berhasil simpan recipe", "success");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <Layouts2 isLogin={isLogin} />
      <div className="container py-5">
        <div className="d-flex align-items-center flex-column">
          <h1 style={{ color: "#2E266F" }}>
            {data?.title ? data.title : "No Title"}
          </h1>
          <img
            className="pt-5 col-sm-5"
            src={data?.image ? data.image : "/pizza.png"}
            width="600"
            height="400"
            alt="image"
            style={css}
          />
        </div>
        <button
          className="btn"
          onClick={() => router.push("/ui/detailResep/edit/" + data?.id)}
        >
          <Image src={Assets.edit} alt="edit" width={30} height={30} />
        </button>
        <button className="btn" onClick={() => fetchLiked(data.id)}>
          <Image src={Assets.liked} alt="liked" width={30} height={30} />
        </button>
        <button className="btn" onClick={() => fetchSaved(data.id)}>
          <Image src={Assets.saved} alt="saved" width={30} height={30} />
        </button>

        <div className="py-5">
          <h1>Ingredients</h1>
          <p>
            {data?.ingredient ? data.ingredient : "...."}
            {data?.ingredient
              ? data.ingredient.map((item) => <p key={item}>{item}</p>)
              : "No Ingredient"}{" "}
          </p>
        </div>
        <div className="py-3 video-step">
          <h1>Video Step</h1>
          {data?.video ? (
            <video width="100%" controls height={700}>
              <source src={data?.video} type="video/mp4" />
              Your browser does not support HTML video.
            </video>
          ) : (
            <h1>Loading Video...</h1>
          )}
        </div>
        <form className="py-5 flex-column">
          <textarea
            name="comment"
            className="form-control"
            id="comment"
            rows="7"
          >
            Comment
          </textarea>
          <div className="pt-3 d-flex justify-content-center">
            <button style={buttonstyle}>Send</button>
          </div>
        </form>
        <div className="py-5">
          <h2>Comment</h2>
          <div className="d-flex align-items-center justify-content-start">
            <Image
              style={{
                borderRadius: "100%",
                borderColor: "gray",
                backgroundColor: "gray",
              }}
              src="/pizza.png"
              width="65"
              height="65"
              alt="{user.name}"
            />
            <div className="p-2 d-flex flex-column  ">
              <h5>name</h5>
              <p>Comments</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
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
export default Detail;
