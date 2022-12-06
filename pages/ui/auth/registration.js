import Image from "next/image";
import Assets from "../../../public";
import style from "../../../styles/auth.module.css";

const registration = () => {
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
          <h1 className="d-flex justify-content-center">Let`s Get Started</h1>
          <p className="d-flex justify-content-center">
            Create new account to access all features
          </p>
          <div className="container kotak_login mt-5 d-flex justify-content-center">
            <form className="col">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Name"
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Masukkan alamat email"
                />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="number"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="08*********"
                />
              </div>
              <div className="form-group mt-2">
                <label>Create new password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Create New Password"
                />
              </div>
              <div className="form-group mt-2">
                <label>New password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="New Password"
                />
              </div>

              <div className="my-3 d-flex justify-content-start">
                <input type="checkbox" style={{ backgroundColor: "#EFC81A" }} />
                I agree to term & conditions
              </div>
              <button
                type="submit"
                className="btn "
                style={{ backgroundColor: "#EFC81A", color: "white" }}
              >
                Register Account
              </button>
            </form>
          </div>
          <div className="container mt-5 d-flex justify-content-center">
            <div className="card-text d-flex">
              Already have account?
              <div to="/registerPekerja" style={{ color: "#EFC81A" }}>
                Log in here
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default registration;
