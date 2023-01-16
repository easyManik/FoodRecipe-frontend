import Image from "next/image";
import React, { useState } from "react";
import Assets from "../../../public";
import style from "../../../styles/auth.module.css";
import Message from "../../../components/ui/Message";
import axios from "axios";
import Swal from "sweetalert2";
import Link from "next/link";
import Router from "next/router";

const InfoWrapper = (props) => {
  const { status } = props;

  if (status !== null) {
    if (status === false) {
      return <Message type="error" text="Something Wrong" />;
    }
    return <Message type="succes" text="Register success, you can login now" />;
  }
  return <></>;
};

const Register = () => {
  const [password, setPassword] = useState("");
  const [isConfirm, setIsConfirm] = useState(true);
  const [register, setRegister] = useState({
    name: "",
    email: "",
    phonenumber: "",
    password: "",
  });
  const handleChange = (e) => {
    e.persist();
    setRegister({
      ...register,
      [e.target.name]: e.target.value,
    });
  };
  const handlePassword = (e) => {
    e.persist();
    setPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password !== register.password) {
        setIsConfirm(false);
        Swal.fire("", err.response.data.message, "error");
        return;
      } else {
        const res = await axios.post(
          "http://localhost:3000/users/register",
          register
        );
        console.log(res.data.data);
        Swal.fire({
          position: "center",
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
        });
        Router.push("/ui/auth/verif");
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: error.response.data.message,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="align-self-stretch">
      <div className="row">
        <div className="col-sm-6 ">
          <div
            style={{
              backgroundImage: `url(${Assets.bg.src})`,
              backgroundColor: "#EFC81A",
              width: "100%",
              height: "100vh",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
              }}
              className="col p-4 d-flex flex-column align-items-center justify-content-center"
            >
              <Image src={Assets.barbacue} width={80} height={80} alt="" />
              <p style={{ color: "white" }}>Mama Recipe</p>
            </div>
          </div>
        </div>
        <div className="col-sm-6 p-5" id={style.row2}>
          <h1 className="d-flex justify-content-center">Let`s Get Started</h1>
          <p className="d-flex justify-content-center">
            Create new account to access all features
          </p>
          {/* <InfoWrapper status={isSuccess} /> */}
          <div className="container kotak_login mt-5 d-flex justify-content-center">
            <form className="col" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Name"
                  required
                  value={register.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Masukkan alamat email"
                  required
                  value={register.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="number"
                  name="phonenumber"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="08*********"
                  required
                  value={register.phonenumber}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group mt-2">
                <label>Create new password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Create New Password"
                  required
                  value={register.password}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group mt-2">
                <label>New password</label>
                <input
                  type="password"
                  name="confirmpassword"
                  className="form-control"
                  placeholder="New Password"
                  required
                  // value={register.confirm}
                  onChange={handlePassword}
                />
                {isConfirm === false && (
                  <p style={{ color: "red" }}>Password wrong!</p>
                )}
              </div>

              <div className="my-3 d-flex justify-content-start">
                <input type="checkbox" style={{ backgroundColor: "#EFC81A" }} />
                I agree to term & conditions
              </div>
              <div className="my-3 d-flex justify-content-center">
                <button
                  title="Signup"
                  type="submit"
                  className="btn px-5"
                  style={{ backgroundColor: "#EFC81A", color: "white" }}
                >
                  Register Account
                </button>
              </div>
            </form>
          </div>
          <div className="container mt-5 d-flex justify-content-center">
            <p className="d-flex justify-content-center mt-3">
              Already have an account ?
              <Link href="/ui/auth/login">
                <span style={{ color: "#EFC81A" }}>&nbsp;Login</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
