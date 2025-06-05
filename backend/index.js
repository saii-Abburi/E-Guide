const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routes = require("./routes/routes");
const adminRoutes = require("./routes/admin");
const path = require("path");
const fileRoutes = require('./routes/files')
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch((err) => console.error('❌ MongoDB Connection Error:', err));

const port = 5000;

app.get('/',(req,res)=>{
  res.send("App is running on the port")
})




app.use('/view/uploads', fileRoutes)
app.use('/downloads', fileRoutes)

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/api/materials", routes);
app.use("/api", adminRoutes);


app.listen(port, () => {
  console.log("App is listening on the port");
});
