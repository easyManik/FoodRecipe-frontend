import Image from "next/image";
import Link from "next/link";
import Assets from "../../public";

const style = { color: "#2E266F", fontWeight: "bold", marginRight: "30px" };
export const Layouts = ({ children, profile, isAuthenticated }) => {
  return (
    <>
      <nav className="d-flex">
        <div
          className="col-sm-8 navbar navbar-expand  d-flex flex-row text-dark justify-content-start px-5 "
          style={{ backgroundColor: "#FFF5EC" }}
        >
          <Link style={style} href="/">
            Home
          </Link>
          <Link style={style} href="/ui/addRecipe/AddRecipe">
            Add Recipe
          </Link>
          <Link style={style} href="/ui/profile/Profile">
            Profile
          </Link>
        </div>

        <div
          className="py-3 col-sm-4 d-flex justify-content-center"
          style={{ backgroundColor: "#EFC81A" }}
        >
          <Link
            href="/ui/profile/Profile"
            style={{
              backgroundColor: "gray",
              borderRadius: "100%",
              borderColor: "gray",
            }}
          >
            <Image
              className="d-flex align-items-center"
              src={Assets.pizza}
              width="55"
              height="55"
              alt="photo"
            />
          </Link>

          <Link
            style={{
              marginLeft: "10px",
              display: "flex",
              alignItems: "center",
              color: "white",
            }}
            href="/ui/auth/login"
          >
            Login
          </Link>
        </div>

        {/* {isAuthenticated && (
          <li onClick={deauthenticate}>
            <a>Sign Out</a>
          </li>
        )} */}
      </nav>
      <div>{children}</div>
    </>
  );
};
