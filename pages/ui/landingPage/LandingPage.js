import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Footer } from "../../../components/footer";
import { Layouts } from "../../../components/layouts";
import Assets from "../../../public";
import Page1 from "./page1";
import Page2 from "./page2";
import Page3 from "./Page3";
import axios from "axios";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import styles from "../../../styles/landing.module.css";
import RecipeCard from "../../../components/layouts/RecipeCard";

const css = { maxWidth: "100%", height: "50vw" };

const LandingPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [data, setData] = useState("");
  const [search, setSearch] = useState("");
  const router = useRouter();
  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_URL_ROUTE}recipe?search=${router.query.keyword}`
        );
        setData(result.data);
        setRecipes(result.data.data);
        setSearch(router.query.keyword);
      } catch (error) {
        console.log(error);
        if (error.response.data.message === "Data not found") {
          setRecipes(`Data not found`);
          setData("");
          setSearch("");
        }
        return Swal({
          title: "Warning!",
          text: `${error.response.data.message}`,
          icon: "warning",
        });
      }
    };
    if (router.query.keyword !== undefined) {
      console.log(router.query.keyword);
      fetch();
    }
  }, [router.query.keyword]);

  const handleSearchInput = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    if (search === router.query.keyword) {
      return Swal({
        title: "Warning!",
        text: `This is the result of ${search}`,
        icon: "warning",
      });
    }
    router.push(`search?keyword=${search}`);
  };

  return (
    <>
      <div style={{ backgroundColor: "#FFF5EC" }}>
        <Layouts />
        <section className="d-flex" style={css}>
          <div className="col-sm-8 container ">
            <div className="d-flex">
              <form
                className=" p-5 d-flex flex-column align-items-center"
                style={{ maxWidth: "50vw" }}
                onSubmit={handleSubmitSearch}
              >
                <h1
                  className="d-inline-flex p-5"
                  style={{ color: "#2E266F", fontWeight: "bold" }}
                >
                  Discovery Recipe & Delicious Food
                </h1>

                <input
                  type="search"
                  className="form-control p-3"
                  id="search"
                  placeholder="Search Recipe"
                  defaultValue={router.query.keyword}
                  onChange={handleSearchInput}
                />
              </form>
            </div>
          </div>

          <div
            className="container col-sm-4 d-flex justify-content-end"
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

        <section className="mb-5">
          <div className={`${styles.titleSection}  mb-4 mb-md-5`}>
            <h1>Search Result</h1>
          </div>
          <div className="row">
            {recipes.length >= 1 &&
              recipes.map((item) => {
                return (
                  <RecipeCard
                    key={item.id}
                    photo={item.image}
                    title={item.title}
                    // type='edit'
                    path={() => router.push(`/recipe/${item.id}`)}
                  />
                );
              })}
          </div>
        </section>
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

export default LandingPage;
