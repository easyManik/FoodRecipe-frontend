import React from "react";
import { Layouts } from "../../../components/layouts";
import Image from "next/image";
import { Footer } from "../../../components/footer";

const Detail = () => {
  return (
    <div>
      <Layouts />
      <div className="container">
        <div className="d-flex align-items-center flex-column">
          <h1>Loream Sandwich</h1>
          <Image src="/pizza.png" width="600" height="400" alt="" />
        </div>

        <div className="py-5">
          <h1>Ingredients</h1>
          <p>resep</p>
        </div>
        <div className="py-3">
          <h1>Video Step</h1>
          <li>video</li>
          <button>video</button>
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
            <button>Send</button>
          </div>
        </form>
        <div className="py-5">
          <h1>Comment</h1>
          <div className="d-flex justify-content-start">
            <Image
              style={{
                borderRadius: "100%",
                borderColor: "gray",
                backgroundColor: "gray",
              }}
              src="/pizza.png"
              width="100"
              height="100"
              alt="{user.name}"
            />
            <div className="p-2">
              <h2 className="d-flex justify-content-center">name</h2>
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
