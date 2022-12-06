import React from "react";
import Image from "next/image";
import { Footer } from "../../../components/footer";
import { Layouts } from "../../../components/layouts";
import Assets from "../../../public";
import Page1 from "./page1";
import Page2 from "./page2";
import Page3 from "./Page3";

const css = { maxWidth: "100%", height: "50vw" };

const LandingPage = () => {
  return (
    <div className="" style={{ backgroundColor: "#FFF5EC" }}>
      <div className="d-flex" style={css}>
        <div className="col-sm-8 container ">
          <Layouts />
          <div className="d-flex">
            <div className=" p-5" style={{ maxWidth: "50vw" }}>
              <h1 className="d-inline-flex p-5">
                Discovery Recipe & Delicious Food
              </h1>

              <input
                type="email"
                className="form-control"
                placeholder="Search Recipe"
              />
            </div>
            <Image
              src={Assets.sayuran}
              alt=""
              style={{ maxWidth: "600px", height: "auto" }}
            />
          </div>
        </div>
        <div
          className="container col-sm-4 d-flex justify-content-end"
          style={{ backgroundColor: "#EFC81A" }}
        >
          <h4 className="p-4">login</h4>
        </div>
      </div>

      <div className="py-5">
        <Page1 />
        <Page2 />
        <Page3 />
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default LandingPage;
