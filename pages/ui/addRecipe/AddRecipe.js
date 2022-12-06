import React from "react";
import { Footer } from "../../../components/footer";
import { Layouts } from "../../../components/layouts";

const AddRecipe = () => {
  return (
    <div>
      <header>
        <Layouts />
      </header>
      <main>
        <form className=" container flex-column justify-content-md-center">
          <div className="flex-column pb-4">
            <div className="pb-4">
              <input
                type="file"
                className="form-control"
                id="inputGroupFile01"
                rows="7"
                placeholder="Add Photo"
              />
            </div>
            <div className="pb-4">
              <input
                type="text"
                className="form-control"
                id="inputTitle"
                placeholder="Title"
              />
            </div>
            <div className="pb-4">
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="7"
                placeholder="Ingredients"
              ></textarea>
            </div>
            <div className="pb-4">
              <input type="file" className="form-control" placeholder="Video" />
            </div>
          </div>
          <div className="d-flex justify-content-center pb-5">
            <button
              style={{
                backgroundColor: "#EFC81A",
                borderRadius: "10px",
                width: "150px",
                borderColor: "#EFC81A",
                color: "white",
              }}
            >
              Post
            </button>
          </div>
        </form>
      </main>

      <footer className="align-self-end">
        <Footer />
      </footer>
    </div>
  );
};

export default AddRecipe;
