require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');

const ProtectedRouter = require('./Routes/ProRouter');
const path = require("path");

require('./Models/db');
const PORT = process.env.PORT || 8080;



app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);

app.use('/protected',ProtectedRouter);

// Serve static files from /uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})