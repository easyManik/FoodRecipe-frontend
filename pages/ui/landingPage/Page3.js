import Image from "next/image";
import Assets from "../../../public";

const css = { maxWidth: "60%", height: "auto", minWidth: "30%" };

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
      <div className="row gap-3 row-cols-4 px-5 d-flex justify-content-center">
        <div className="mx-0">
          <Image src={Assets.pizza} alt="" style={css} />

          <h4
            style={{
              marginTop: "-40px",
              marginLeft: "13px",
              color: "#3F3A3A",
              maxWidth: "60%",
              height: "auto",
              minWidth: "20%",
            }}
          >
            Pizza
          </h4>
        </div>
        <div className="mx-0">
          <Image
            src={Assets.pizza}
            alt=""
            style={{ maxWidth: "60%", height: "auto", minWidth: "20%" }}
          />
          <h4
            style={{
              marginTop: "-40px",
              marginLeft: "13px",
              color: "#3F3A3A",
            }}
          >
            Pizza
          </h4>
        </div>
        <div className="mx-0">
          <Image
            src={Assets.pizza}
            alt=""
            style={{ maxWidth: "60%", height: "auto", minWidth: "20%" }}
          />
          <h4
            style={{
              marginTop: "-40px",
              marginLeft: "13px",
              color: "#3F3A3A",
            }}
          >
            Pizza
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Page3;
