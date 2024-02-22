const express = require('express')
const mongoose = require("mongoose")
const cors = require("cors")
const app = express()
const userroute = require("./Routes/UserRoute.js")
const productroute = require("./Routes/ProductRoute.js");
const orderroute = require("./Routes/OrdersRoute.js");
const paymentRoute = require("./Routes/PaymentRoutes.js");
const adminRoute = require("./Routes/adminRoute.js")
require('dotenv').config()
const port = process.env.PORT || 8000




app.use(cors());
app.use(express.json());

app.use(express.urlencoded({extended:true}))
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("DB CONNECTED");
  });
  



app.use("/",userroute)
app.use("/",productroute)
app.use("/",orderroute)
app.use("/",paymentRoute)
app.use("/",adminRoute)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})