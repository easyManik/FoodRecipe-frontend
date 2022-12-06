import React from "react";
import { Footer } from "../../../components/footer";
import { Layouts } from "../../../components/layouts";
import Assets from "./../../../public/index";
import Image from "next/image";
import Tabs from "./../../../components/profile/Tabs";
import NavTabs from "./../../../components/profile/Tabs";

export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/profile");
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}

const Profile = ({ data }) => {
  return (
    <>
      <div>
        <Layouts />
        <div>
          <div className="d-flex justify-content-center">
            <Image
              style={{
                borderRadius: "100%",
                borderColor: "gray",
                backgroundColor: "gray",
              }}
              src={Assets.pizza}
              width="128"
              height="128"
              alt="{user.name}"
            />
          </div>

          <h1 key={data.id} className="d-flex justify-content-center">
            {data ? data[0].name : "data not found"}
          </h1>
          <div className="py-5">
            <NavTabs />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Profile;
