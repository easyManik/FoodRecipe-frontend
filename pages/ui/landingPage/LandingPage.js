import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Footer } from "../../../components/footer";
import { Layouts2 } from "../../../components/layouts/Layout2";
import Assets from "../../../public";
import Page1 from "./page1";
import Page2 from "./page2";
import Page3 from "./Page3";
import axios from "axios";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import styles from "../../../styles/landing.module.css";
import RecipeCard from "../../../components/layouts/RecipeCard";
import Sorter from "../../../components/module/sorter";
import Pagination from "../../../components/module/Pagination/Pagination";
import CardHome from "../../../components/module/cardLandingPage";

const css = { maxWidth: "100%", height: "50vw" };

const LandingPage = ({ data, isLogin, pagination }) => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search) {
      return router.push({
        pathname: "/index.js",
        query: {
          search: search,
        },
      });
    }
    console.log("handlesearch");
    router.push({
      pathname: "/index.js",
      hash: "recipes",
      query: {
        search: search,
      },
    });
  };

  return (
    <>
      <div style={{ backgroundColor: "#FFF5EC" }}>
        <Layouts2 isLogin={isLogin} />
        <section className="d-flex" style={css}>
          <div className="col-sm-8 container ">
            <div className="d-flex">
              <form
                className=" p-5 d-flex flex-column align-items-center"
                style={{ maxWidth: "50vw" }}
                onSubmit={(e) => handleSearch(e)}
              >
                <h1
                  className="d-inline-flex p-5"
                  style={{ color: "#2E266F", fontWeight: "bold" }}
                >
                  Discovery Recipe & Delicious Food
                </h1>

                <input
                  type="text"
                  className="form-control p-3"
                  id="search"
                  placeholder="Search Recipe"
                  defaultValue={router.query.keyword}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </form>
            </div>
          </div>

          <div
            className=" col-sm-4 d-flex justify-content-end"
            style={{ backgroundColor: "#EFC81A" }}
          >
            <Image
              src={Assets.sayuran}
              alt=""
              className="p-5"
              style={{
                maxWidth: "800px",
                height: "auto",
                maxHeight: "800px",
              }}
            />
          </div>
        </section>

        <main className={styles.main} id="recipes">
          <h1>
            Recently Recipe <Sorter />
          </h1>
          <div className={styles.container}>
            {data?.length > 0 ? (
              data.map((recipe) => (
                <CardHome
                  key={recipe.id}
                  title={recipe.title}
                  id={recipe.id}
                  image={recipe.image}
                />
              ))
            ) : (
              <h2>Sorry No Recipe Found</h2>
            )}
          </div>
          <div className={styles.pagination}>
            <Pagination
              totalPage={pagination?.totalPage}
              currentPage={pagination?.page}
            />
          </div>
        </main>
        <div className="py-5">
          <Page1 />
        </div>
        <div className="py-5">
          <Page2 />
        </div>
        <div className="py-5">
          <Page3 />
        </div>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
};
export const getServerSideProps = async (context) => {
  const search = context.query.search || "";
  const page = context.query.page || 1;
  const sortby = context.query.sortby || "title";
  const sort = context.query.sort || "asc";
  const data = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_API +
      `recipes?page=${page}&sortby=${sortby}&sort=${sort}&search=${search}`
  );
  const result = await data.json();
  const { token } = context.req.cookies;
  return {
    props: {
      data: result.data,
      isLogin: token ? true : false,
      pagination: result.pagination,
    },
  };
};
export default LandingPage;
