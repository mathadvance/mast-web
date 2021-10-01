import { User, UserError } from "@/utils/server/User";
import clientPromise from "@/utils/server/mongodb";

export default async (req, res) => {
  const user: User = JSON.parse(req.body);
  user.roles = ["UNVERIFIED"];
  if (UserError(user)) {
    res.status(400).send(UserError(user));
    return;
  } else {
    const db = clientPromise.db();
    const collection = db.collection("users");
    collection.insertOne({
      user: user.username,
      pwd: user.password,
      customData: {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        graduation_year: user.graduation_year
      },
      roles: user.roles
    }).then(results => {
      console.log(results);
    })
    res.status(200).send("User successfully created.");
  }
}
