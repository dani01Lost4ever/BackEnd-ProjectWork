import "reflect-metadata";
import app from "./app";
import mongoose from "mongoose";

require("dotenv").config();
mongoose.set("debug", true);
mongoose
  .connect("mongodb+srv://username:password@dani01backend.pcjwsdb.mongodb.net/ApiBackend?retryWrites=true&w=majority&appName=AtlasApp")
  .then((_) => {
    console.log("Connected to db");
    app.listen(8080, () => {
      console.log("Server listening on port 8080");
    });
  })
  .catch((err) => {
    console.error(err);
  });
