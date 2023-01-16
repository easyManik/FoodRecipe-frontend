export default function loginnext(req, res) {
  console.log(req.method);
  if (req.method == "POST") {
    console.log("add token to cookie");
    const user = req.body.user;
    res.setHeader(
      "Set-Cookie",
      `tokenLoginNext=${token}; Path=/ ; httpOnly ; Max-Age : 9000000000; Secure ; SameSite=None`
    );
    res.send({
      logout: false,
      login: true,
    });
  } else {
    res.send({
      logout: true,
    });
  }
}
