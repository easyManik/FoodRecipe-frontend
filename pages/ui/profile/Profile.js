import React, { useEffect, useState, useRef } from "react";
import { Footer } from "../../../components/footer";
import { Layouts2 } from "../../../components/layouts/Layout2";
import axios from "axios";
import ProfileRecipe from "./ProfileRecipe";
import Link from "next/link";
import PhotoProfile from "../../../components/profile/Image";
import style from "../../../styles/profile.module.css";
import Image from "next/image";
import Assets from "../../../public";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

const css = { maxWidth: "100%", height: "auto", minWidth: "30%" };

const Profile = ({ isLogin, token }) => {
  const [edit, setEdit] = useState(false);
  const [selected, setSelected] = useState("my recipe");
  const [data, setData] = useState([]);
  const [dataSave, setDataSave] = useState([]);
  const [dataLike, setDataLike] = useState([]);

  const [profile, setProfile] = useState({});
  const [key, setKey] = useState("myrecipe");

  const fetchProfile = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const result = await axios.get(
        process.env.NEXT_PUBLIC_BACKEND_API + "/users/profile",
        {
          ...config,
        }
      );
      setProfile(result.data.data);
      console.log("data user profile", result.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchData = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const result = await axios.get(
        process.env.NEXT_PUBLIC_BACKEND_API + "/profile/recipes",
        {
          // withCredentials : true,
          ...config,
        }
      );
      setData(result.data.data);
      console.log("data get recipe liked profile", result.data.data);
      console.log("data profile saved", data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchSaved = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const result = await axios.get(
        process.env.NEXT_PUBLIC_BACKEND_API + "/recipes/?saved/",
        {
          // withCredentials : true,
          ...config,
        }
      );
      setDataSave(result.data.data);
      console.log("data get recipe liked profile", result.data.data);
      console.log("data profile saved", data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchLiked = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const result = await axios.get(
        process.env.NEXT_PUBLIC_BACKEND_API + "/recipes/?liked",
        {
          // withCredentials : true,
          ...config,
        }
      );
      setDataLike(result.data.data);
      console.log("data get recipe liked profile", result.data.data);
      console.log("data profile saved", data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
    fetchProfile();
    fetchSaved();
    fetchLiked();
  }, []);

  const handleDeleteRecipe = async (id) => {
    const config = {
      Authorization: `Bearer ${token}`,
      // withCredentials : true
    };
    try {
      console.log(id);
      const result = await axios.delete(
        process.env.NEXT_PUBLIC_BACKEND_API + `/recipes/${id}`,
        {
          headers: {
            ...config,
          },
        }
      );
      Swal.fire("Good Job", "Delete Success", "success");
      router.push((e) => e.preventDefault);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteSavedRecipe = async (id) => {
    const config = {
      Authorization: `Bearer ${token}`,
      // withCredentials : true
    };
    try {
      console.log(id);
      const result = await axios.delete(
        process.env.NEXT_PUBLIC_BACKEND_API + `/recipes/?saved/${id}`
      );
      Swal.fire("Good Job", "Delete Success", "success");
      router.push((e) => e.preventDefault);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteLikedRecipe = async (id) => {
    const config = {
      Authorization: `Bearer ${token}`,
      // withCredentials : true
    };
    try {
      console.log(id);
      const result = await axios.delete(
        process.env.NEXT_PUBLIC_BACKEND_API + `/recipes/?liked/${id}`
      );
      Swal.fire("Good Job", "Delete Success", "success");
      router.push((e) => e.preventDefault);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(dataSave);

  return (
    <>
      <div>
        <Layouts2 isLogin={isLogin} />
        <div style={{ minHeight: "80vh" }}>
          <div
            className={style.profile}
            style={{
              position: "relative",
              margin: "50px auto",
            }}
          >
            <div>
              <Image
                src={Assets.profile}
                alt=""
                width={150}
                height={150}
                style={{
                  borderRadius: "50%",
                  width: "150px",
                  height: "150px",
                  backgroundColor: "gray",
                }}
              />
              <Image
                src={Assets.edit}
                className={style.edit}
                alt=""
                width={30}
                height={30}
                style={{ cursor: "pointer" }}
                onClick={() => setEdit((edit) => !edit)}
              />
            </div>

            <div className={edit ? style.menu : style.menuActive}>
              <p>
                <Link href="/ui/profile/edit">Change photo profile</Link>
              </p>
              <hr style={{ margin: "0" }} />
              <p>
                <Link href="/ui/profile/edit">Change password</Link>
              </p>
            </div>
          </div>
          <h1 className="d-flex justify-content-center">
            {profile?.name ? profile.name : "...."}
          </h1>

          <div className={style.navigation}>
            <div className="row  rounded-3">
              <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
              >
                <Tab
                  eventKey="myrecipe"
                  title="My Recipe"
                  // className={selected == "my recipe" ? style.recipeActive : ""}
                  // onClick={() => setSelected("my recipe")}
                >
                  <div for="nyRecipe" className={style.area}>
                    {data ? (
                      data.map((recipe) => (
                        <ProfileRecipe
                          key={recipe.id}
                          title={recipe.title}
                          id={recipe.id}
                          image={recipe?.image}
                          token={token}
                          deleteAction={(e) => handleDeleteRecipe(recipe.id)}
                        />
                      ))
                    ) : (
                      <h2>Recipe kamu kosong</h2>
                    )}
                  </div>
                </Tab>
                <Tab eventKey="savedrecipe" title="Saved Recipe">
                  <div for="nyRecipe" className={style.area}>
                    {dataSave.length > 0 ? (
                      dataSave.map((recipe) => (
                        <ProfileRecipe
                          key={recipe.id}
                          title={recipe.title}
                          id={recipe.id}
                          image={recipe?.image}
                          token={token}
                          deleteAction={() =>
                            handleDeleteSavedRecipe(recipe.id)
                          }
                        />
                      ))
                    ) : (
                      <h2>Tidak ada resep yang kamu simpan</h2>
                    )}
                  </div>
                </Tab>
                <Tab eventKey="likedrecipe" title="Liked Recipe">
                  <div for="nyRecipe" className={style.area}>
                    {dataLike ? (
                      dataLike.map((recipe) => (
                        <ProfileRecipe
                          key={recipe.id}
                          title={recipe.title}
                          id={recipe.id}
                          image={recipe?.image}
                          token={token}
                          deleteAction={() =>
                            handleDeleteLikedRecipe(recipe.id)
                          }
                        />
                      ))
                    ) : (
                      <h2>Tidak ada reseo yang kamu suka</h2>
                    )}
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
};
export const getServerSideProps = async (context) => {
  const { token } = context.req.cookies;

  if (!token) {
    return {
      redirect: {
        destination: "/ui/auth/login",
        permanent: false,
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
export default Profile;
