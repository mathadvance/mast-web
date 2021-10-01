import { User, UserError } from "@/utils/server/User";
import clientPromise from "@/utils/server/mongodb";

export default async (req, res) => {
  const user: User = JSON.parse(req.body);
  user.roles = [];
  if (UserError(user)) {
    const error: string = UserError(user).toString(); // will never be false so this is OK
    res.status(400).send(error);
    return;
  } else {
    clientPromise.db().createUser({
      user: user.username,
      pwd: user.password,
      customData: {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        graduation_year: user.graduation_year,
      },
      roles: user.roles,
    });
    res.status(200).send("User successfully created.");
  }
};
