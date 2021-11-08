import fs from "fs";

const path = require("path");
require("dotenv").config({
  path: path.resolve(".env.local"),
});

function makeDir(pathArray) {
  fs.mkdir(
    path.join(process.env.RESOURCE_DIR, ...pathArray),
    { recursive: true },
    (err) => {
      if (err) {
        return console.error(err);
      }
    }
  );
}

// Make content dir
// We don't make internal dirs because that structure is handled in the mast repository, not here

makeDir("content");

// All dirs in upload dir

makeDir("uploads", "applications");
makeDir("uploads", "units");
