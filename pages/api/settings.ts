import client from "@/utils/server/mongodb";

export default async (req, res) => {
  const reqObject = JSON.parse(req.body);
  if (reqObject.username) {
    client
      .db(process.env.MONGODB_DB)
      .collection("users")
      .updateOne(
        {
          username: { $eq: reqObject.username },
        },
        {
          $set: {
            Settings: reqObject.Settings,
          },
        }
      );
    res.status(200).send("Successfully updated user settings.");
  } else {
    res
      .status(400)
      .send(
        "Somehow, you sent this request without being authenticated as a valid user."
      );
    return;
  }
};
