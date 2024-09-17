const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
require("dotenv").config();

const PORT = 3000;
let app = express();
app.use(express.json());
app.use(cors())

app.use((err, req, res, next) => {
    // console.error(err.stack);
    console.log("Something went wrong")
    res.status(500).json({ error: 'Internal Server Error' });
})

function connectToDataBase() {
    mongoose
        .connect(process.env.dbURI)
        .then(() => {
            console.log("Successfully connected to database");
        })
        .catch((err) => {
            console.error(err);
            process.exit(1);
        });
}
app.use("/api/v1", require("./routes/index"))

app.listen(PORT, () => {
    connectToDataBase();
});
