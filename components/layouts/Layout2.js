import Image from "next/image";
import Link from "next/link";
import Assets from "../../public";

const style = { color: "#2E266F", fontWeight: "bold", marginRight: "30px" };
export const Layouts2 = ({ children }) => {
  return (
    <>
      <nav className="d-flex">
        <div className=" py-3 col-sm-8 navbar navbar-expand  d-flex flex-row text-dark justify-content-start px-5 ">
          <Link style={style} href="/ui/landingPage/LandingPage">
            Home
          </Link>
          <Link style={style} href="/ui/addRecipe/AddRecipe">
            Add Recipe
          </Link>
          <Link style={style} href="/ui/profile/Profile">
            Profile
          </Link>
        </div>
      </nav>
      <div>{children}</div>
    </>
  );
};
