const fs = require("fs");

function writeFileJSON(filename, content) {
  fs.writeFileSync(filename, JSON.stringify(content), "utf-8", (err) => {
    if (err) {
      console.error(err);
    }
  });
}

function readFileJSON(filePath) {
  fs.readFileSync(filePath, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
    }
    return data;
  });
}

function getNewID(array) {
  if (array.length == 0) {
    return 1;
  } else {
    return array[array.length - 1].id + 1;
  }
}

function findByID(array, id) {
  let data;
  array.forEach((element) => {
    if (element.id == id) {
      data = element;
    }
  });
  return data;
}

module.exports = {
  writeFileJSON,
  readFileJSON,
  getNewID,
  findByID,
};
