import React from "react";
import Assets from "../../../public";
import Image from "next/image";

const css = { maxWidth: "100%", height: "auto" };

const page1 = () => {
  return (
    <div>
      <div className="d-flex p-3 align-items-center ">
        <Image
          className="mx-4"
          src={Assets.rectangleYellow}
          alt=""
          width={25}
          height={140}
        />
        <h1>Popular For You !</h1>
      </div>
      <div className="d-flex">
        <Image
          className="mx-4 col-sm-4"
          src={Assets.pizza}
          alt=""
          style={css}
        />
        <Image
          className="mx-4 col-sm-4"
          src={Assets.pizza}
          alt=""
          style={css}
        />
      </div>
    </div>
  );
};

export default page1;
