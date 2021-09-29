import { User, UserError } from "@/utils/server/User";
import clientPromise from "@/utils/server/mongodb";
import router from "next/router";

export default function handler(req, res) {
  const user = JSON.parse(req.body);
}
