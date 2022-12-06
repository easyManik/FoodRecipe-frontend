import React from "react";
import Image from "next/image";
import Assets from "../../../public";
const css = { maxWidth: "100%", height: "auto" };
const Page2 = () => {
  return (
    <div>
      <div className="d-flex p-3 align-items-center " style={css}>
        <Image
          className="mx-4"
          src={Assets.rectangleYellow}
          alt=""
          width={25}
          height={140}
        />
        <h1>New Recipe</h1>
      </div>
      <div className="d-flex">
        <div className="col-sm-6">
          <Image className="mx-4 " src={Assets.pizza} alt="" style={css} />
        </div>

        <div>
          <h1>Healthy Bone Broth Ramen (Quick & Easy)</h1>
          <hr style={{ width: "100px" }} />
          <p>
            Quick + Easy Chicken Bone Broth Ramen- Healthy chicken ramen in a
            hurry? That`s right
          </p>
          <button
            style={{
              backgroundColor: "#EFC81A",
              color: "white",
              borderRadius: "10px",
              borderColor: "#EFC81A",
              width: "200px",
              height: "50px",
            }}
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page2;
