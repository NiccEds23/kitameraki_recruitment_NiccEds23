const express = require("express");
const app = express();
const cors = require("cors");
const taxAPI = require("../routes/taxApi");

app.use(cors());
app.use(taxAPI);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3030);
