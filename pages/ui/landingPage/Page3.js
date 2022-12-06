import React from "react";
import Image from "next/image";
import Assets from "../../../public";
const css = { maxWidth: "500px", height: "auto" };

const Page3 = () => {
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
        <h1>Popular Recipe</h1>
      </div>
      <div className="row gap-3 px-5  row-cols-3 d-flex justify-content-md-center">
        <div
          style={{
            backgroundImage: `url(${Assets.pizza.src})`,
            maxWidth: "500px",
            height: "auto",
          }}
          className="d-flex align-items-end"
        >
          <p>satu</p>
        </div>
        <Image src={Assets.pizza} alt="satu" style={css} />
        <Image src={Assets.pizza} alt="" style={css} />
        <Image src={Assets.pizza} alt="" style={css} />
        <Image src={Assets.pizza} alt="" style={css} />
        <Image src={Assets.pizza} alt="" style={css} />
        <Image src={Assets.pizza} alt="" style={css} />
      </div>
    </div>
  );
};

export default Page3;
