import formidable from "formidable";
import mv from "mv";
import path from "path";

import { mastDB } from "@/utils/server/mongodb";

const maxFileSize = 512 * 1024; // 512 KB, very generous limit for LaTeX

export default async (req, res) => {
  const form = formidable({ maxFileSize });
  form.onPart = function (part) {
    if (!part.filename || !part.mime) {
      form.handlePart(part);
    } else {
      console.log(part);
      if (part.mime === "application/pdf") {
        // Can get spoofed by renaming file on client desktop, but doesn't pose any real issue besides annoyance
        form.handlePart(part);
      }
    }
  };
  form.parse(req, (err, fields, files) => {
    console.log(fields);
    if (err) {
      console.log(err);
      if (err.toString().indexOf("maxFileSize exceeded") > -1) {
        if (!res.headerSent) {
          return res.status(400).send("Maximum file size of 512 KB exceeded.");
        }
      } else {
        return res.status(500).send(err);
      }
    }
    if (!files.PDF) {
      return res.status(400).send("The file sent is not a valid PDF.");
    }

    // at this point we know everything succeeds, write stuff to disk

    mastDB.collection("users").updateOne(
      { username: fields.username },
      {
        $set: {
          "data.applied": true,
        },
      }
    );

    mastDB.collection("applications").insertOne({
      fields,
    });

    mv(
      files.PDF.path,
      path.join(
        process.env.UPLOAD_DIR,
        "applications",
        `${fields.username}.PDF`
      ),
      { mkdirp: true },
      (err) => {
        if (err) console.log(err);
      }
    );

    return res.status(200).send("Application successfully submitted.");
  });
};

export const config = {
  api: {
    bodyParser: false,
  },
};
