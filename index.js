const app = require('./app');
const database = require('./Database/mongooseDatabase')
const port = process.env.PORT || 5000;
const cloudinary = require("cloudinary").v2;
require("dotenv").config();
// database or pictue uplode server configration
database()
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
