export default async (req, res) => {
  const session = req.headers.cookie.session;
  if (session) {
    res.status(200).send("Logged out.");
  } else {
    res.status(400).send("There is no session to log out of.");
  }
};
