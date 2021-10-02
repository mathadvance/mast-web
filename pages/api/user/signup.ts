import { User, UserError } from "@/utils/server/User";
import client from "@/utils/server/mongodb";

export default async (req, res) => {
  const user: User = JSON.parse(req.body);
  user.power = 0;
  if (UserError(user)) {
    const error: string = UserError(user).toString(); // will never be false so this is OK
    res.status(400).send(error);
    return;
  } else {
    client.connect()
    client.db(process.env.MONGODB_DB).collection("users").insertOne(
      {
        username: user.username,
        password: user.password,
        power: user.power,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        graduation_year: user.graduation_year,
      },
    );
    res.status(200).send("User successfully created.");
  }
};
