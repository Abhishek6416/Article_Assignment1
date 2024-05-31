const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const user_router = require("./router/user-router");
const { CreateError, ErrorHandle } = require("./middleware/ErrorHandle");
const DB_CONNECT = require("./config/db");
const article_routes=require("./router/article-router")
// const fileUploader = require("express-fileupload");
// const { ADD_ALL_BOOKS } = require("./controllers/all-books-controller");
// const books_router = require("./routers/books-router");
// const fav_router = require("./routers/favbook-rotuer");
// const cart_router = require("./routers/cart-rotuer");
// const forgot_router = require("./routers/forgot-router");
dotenv.config();
const app = express();
// middleware
app.use(cors());
app.use(express.json());
// app.use(fileUploader({ useTempFiles: true }));
app.use("/api/v1/user", user_router);
app.use("/api/v1", article_routes);
// app.use("/api/v1/books", books_router);
// app.use("/api/v1/fav", fav_router);
// app.use("/api/v1/cart", cart_router);
// app.use("/api/v1/forgot", forgot_router);

app.use("/",async(req,res)=>{
  res.send("wlcm to abk backend");
})
app.use("*", async (req, res, next) =>
  next(
    CreateError(`${req.originalUrl} this url is not valid`, 500, "global error")
  )
);
app.use(ErrorHandle);
const port = process.env.SERVER_PORT;
const server = app.listen(port, () =>
  console.log(`server run on port ${port}`)
);
DB_CONNECT();
// ADD_ALL_BOOKS();
server.on("listening", () => console.log("connected"));
server.on("error", (error) => console.log(error));
