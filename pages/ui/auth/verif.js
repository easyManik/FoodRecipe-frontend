import React, { useState } from "react";
import Image from "next/image";
import style from "../../../styles/auth.module.css";
import Assets from "../../../public";
import Message from "../../../components/ui/Message";
import Swal from "sweetalert2";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useRouter } from "next/router";

const InfoWrapper = (props) => {
  const { status } = props;

  if (status !== null) {
    if (status === false) {
      return <Message type="error" text="something wrong" />;
    }
    return <Message type="success" text="Login success" />;
  }
  return <></>;
};

const Login = () => {
  const router = useRouter();
  const [isSuccess, setIssuccess] = useState(null);

  const [auth, setAuth] = useState({
    email: "",
    otp: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        withCredentials: true,
      };
      const result = await axios.post(
        "http://localhost:3000/users/verif",
        auth,
        config
      );
      console.log(auth);
      if (result.data.message === "email not found") {
        Swal.fire(
          "Warning",
          "Email Not Found, Please check if your email are registered",
          "error"
        );
        //router push
      } else if (result.data.message === "wrong otp") {
        Swal.fire("Warning", "Wrong otp", "error");
      } else {
        const token = result.data.token;
        const data = {
          token: token,
        };
        const cookie = await fetch("/api/login", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const checkJwt = await cookie.json();
        if (!checkJwt) {
          return Swal.fire("Warning", "fail to verification account", "error");
        }
        Swal.fire("Success", "verification account success", "success");
        router.push("/ui/auth/login");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleChange = (e) => {
    setAuth({
      ...auth,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="align-self-stretch">
        <div className="row">
          <div className="col-sm-6 ">
            <div
              style={{
                backgroundImage: `url(${Assets.bg.src})`,
                backgroundColor: "#EFC81A",
                height: "100vh",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100nh",
                }}
                className="col p-4 d-flex flex-column align-items-center justify-content-center"
              >
                <Image src={Assets.barbacue} width={80} height={80} alt="" />
                <p style={{ color: "white" }}>Mama Recipe</p>
              </div>
            </div>
          </div>
          <div className="col-sm-6 p-5" id={style.row2}>
            <h1 className="d-flex justify-content-center">Welcome</h1>
            <p className="d-flex justify-content-center">
              Log in into your exiting account
            </p>
            <InfoWrapper status={isSuccess} />
            <div className="container kotak_login mt-5 d-flex justify-content-center">
              <form className="col">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Masukkan alamat email"
                    required
                    value={auth.email}
                    name="email"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group mt-2">
                  <label>Otp</label>
                  <input
                    type="number"
                    name="otp"
                    className="form-control"
                    placeholder="Masukkan otp"
                    value={auth.otp}
                    required
                    onChange={handleChange}
                  />
                </div>

                <div className="my-3  d-flex justify-content-center">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="btn px-5"
                    style={{ backgroundColor: "#EFC81A", color: "white" }}
                  >
                    Masuk
                  </button>
                </div>
              </form>
            </div>
            <div className="container mt-5 d-flex justify-content-center">
              <div className="card-text d-flex">
                Dont have an account?
                <div style={{ color: "#EFC81A" }}>
                  <Link href="/ui/auth/register">Sign Up</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { jwt } = context.req.cookies;
  console.log(jwt);
  if (jwt) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    return {
      props: {
        isLogin: false,
      },
    };
  }
};

export default Login;
