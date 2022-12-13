import React, { useEffect, useState } from "react";
import { Footer } from "../../../components/footer";
import { Layouts2 } from "../../../components/layouts/Layout2";
import Assets from "./../../../public/index";
import Image from "next/image";
import axios from "axios";
import NavTabs from "./../../../components/profile/Tabs";
import { getCookies } from "cookies-next";

// export async function getStaticProps() {
//   const res = await fetch("http://localhost:3000/users/");
//   const data = await res.json();
//   return {
//     props: {
//       data,
//     },
//   };
// }

const Profile = ({ data }) => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const token = getCookies("token");
    axios
      .get(`${process.env.REACT_APP_URL_ROUTE}users/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        setProfile(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div>
        <Layouts2 />
        <div>
          <div className="d-flex justify-content-center">
            <Image
              style={{
                borderRadius: "100%",
                borderColor: "gray",
                backgroundColor: "gray",
              }}
              src={profile.photo}
              width="128"
              height="128"
              alt="{user.name}"
            />
          </div>

          <h1 className="d-flex justify-content-center">{profile.name}</h1>
          <div className="py-5">
            <NavTabs />
          </div>
        </div>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default Profile;
