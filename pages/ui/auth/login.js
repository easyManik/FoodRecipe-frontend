import React, { useState } from "react";
import Image from "next/image";
import style from "../../../styles/auth.module.css";
import Assets from "../../../public";
import { login } from "../../../Redux/action/login";

const Login = () => {
  const [login, setLogin] = useState([]);
  const [loginUser, setLoginuser] = useState("");

  const fetchLogin = async () => {
    const res = await fetch("http://localhost:3000/login");
    const data = await res.json();
    setLogin(data);
  };
  const submitData = async () => {
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      body: JSON.stringify({ loginUser }),
      headers: {
        "Content-Type": "apllications/json",
      },
    });
    const data = await res.json();
    console.log(data);
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
              height: "100%",
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
          <h1 className="d-flex justify-content-center">Welcome</h1>
          <p className="d-flex justify-content-center">
            Log in into your exiting account
          </p>
          <div className="container kotak_login mt-5 d-flex justify-content-center">
            <form onSubmit={submitData} className="col">
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Masukkan alamat email"
                  value={email}
                  name="email"
                  onChange={(e) => setEmail(e.target.ariaValueText)}
                />
              </div>
              <div className="form-group mt-2">
                <label>Kata Sandi</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Masukkan kata sandi"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="my-3 d-flex justify-content-start">
                <input type="checkbox" style={{ backgroundColor: "#EFC81A" }} />
                I agree to term & conditions
              </div>
              <button
                onClick={fetchLogin}
                type="submit"
                className="btn "
                style={{ backgroundColor: "#EFC81A", color: "white" }}
              >
                Masuk
              </button>
              <p className="my-3 d-flex justify-content-end">
                Forget Password?
              </p>
            </form>
          </div>
          <div className="container mt-5 d-flex justify-content-center">
            <div className="card-text d-flex">
              Dont have an account?
              <div to="/registerPekerja" style={{ color: "#EFC81A" }}>
                Sign Up
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
