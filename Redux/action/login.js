import axios from "axios";
export const login = (data, navigate) => async (dispact) => {
  try {
    const result = await axios.post(
      process.env.REACT_APP_URL_ROUTE + `/login`,
      data
    );
    const user = result.data.data;
    console.log(user);
    localStorage.setItem("Token", user.token);
    dispact({ type: "USER_LOGIN_SUCCESS", payload: user });
    navigate("/ui/landingPage/LandingPage");
    console.log("Login success");
  } catch (e) {
    console.log("Login fail");
    console.log(e);
  }
};
