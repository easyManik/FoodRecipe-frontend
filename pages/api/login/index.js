import { login } from "../../../data/login";

export default function handler(req, res) {
  if (re.method === "GET") {
    res.status(200).json(login);
  } else if (req.method === "POST") {
    const loginData = req.body.loginData;
    const datas = {
      email: email,
      password: password,
    };
    login.push(datas);
    res.status(201).json(datas);
  }
}
