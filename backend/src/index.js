const express = require("express");
const cors = require("cors");
const taxAPI = require("../routes/taxApi");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(taxAPI);

app.listen(3030);
