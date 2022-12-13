import React, { useEffect, useState } from "react";
import { Layouts2 } from "../../../components/layouts/Layout2";
import Image from "next/image";
import { Footer } from "../../../components/footer";
import { useRouter } from "next/router";
import axios from "axios";
import ReactPlayer from "react-player";
import { getCookies } from "cookies-next";

const css = { maxWidth: "100%", height: "auto", maxHeight: "500px" };
const buttonstyle = {
  backgroundColor: "#EFC81A",
  width: "200px",
  borderRadius: "10px",
  borderColor: "#EFC81A",
  height: "40px",
  color: "white",
};

const Detail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [dataDetail, setDataDetail] = useState();
  const fetchDetail = async (id) => {
    const token = getCookies("token");
    const result = await axios.get(
      `${process.env.REACT_APP_URL_ROUTE}recipes/detail/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log(result);
    const data = result.data.data[0];
    setDataDetail(data);
    console.log(data);
  };
  useEffect(() => {
    fetchDetail(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Layouts2 />
      <div className="container py-5">
        <div className="d-flex align-items-center flex-column">
          <h1 style={{ color: "#2E266F" }}>Loream Sandwich</h1>
          <Image
            className="pt-5 col-sm-5"
            src={dataDetail ? dataDetail.image : "/pizza.png"}
            width="600"
            height="400"
            alt="image"
            style={css}
          />
        </div>

        <div className="py-5">
          <h1>Ingredients</h1>
          <p>{dataDetail ? dataDetail.ingredients : " Ingredient"}</p>
        </div>
        <div className="py-3 video-step">
          <h1>Video Step</h1>
          <div className="py-3 d-flex flex-column">
            <ReactPlayer url={dataDetail && dataDetail.video} controls={true} />
          </div>
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
export default Detail;
