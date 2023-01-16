import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Assets from "../../public";

const style = { color: "#2E266F", fontWeight: "bold", marginRight: "30px" };
export const Layouts2 = ({ isLogin, profile }) => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const result = await fetch("/api/logout");
      const { logout } = await result.json();
      if (logout) {
        Swal.fire("Success", "User Logout", "success");
        router.push("/ui/auth/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <nav className="d-flex">
        <div className=" py-3 col-sm-8 navbar navbar-expand  d-flex flex-row text-dark justify-content-start px-5 ">
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
        <div className="d-flex justify-content-end">
          {" "}
          {!isLogin ? (
            <div className="py-3 col-sm-4 d-flex justify-content-center">
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
              <p className="d-flex align-items-center mx-3">
                <Link
                  style={{
                    marginLeft: "10px",
                    display: "flex",
                    alignItems: "center",
                    color: "black",
                  }}
                  href="/ui/auth/login"
                >
                  <b>Login</b>
                </Link>
              </p>
            </div>
          ) : (
            <div className="py-3 col-sm-4 d-flex justify-content-center">
              <Link href="/ui/profile/Profile">
                <Image
                  className="d-flex align-items-center"
                  src={Assets.profile}
                  width="55"
                  height="55"
                  alt="photo"
                  style={{
                    backgroundColor: "gray",
                    borderRadius: "100%",
                    borderColor: "gray",
                  }}
                />
              </Link>
              <p
                className="d-flex align-items-center mx-3"
                onClick={handleLogout}
                style={{
                  cursor: "pointer",
                }}
              >
                <b>Logout</b>
              </p>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};
