import axios from "axios";
export default async function profile(req, res) {
  const data = await axios.get(
    process.env.NEXT_PUBLIC_BACKEND_API + `profile`,
    {
      withCredentials: true,
    }
  );
  console.log(data);
  res.send(data.data);
}
