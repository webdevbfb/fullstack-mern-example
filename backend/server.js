import express from "express";
import User from "./models/User.js";
import Post from "./models/Post.js";
import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import crypto from 'node:crypto';
import { Resend } from 'resend';
import cors from "cors";
import jwt from "jsonwebtoken";
import post from "./routes/posts.js";

await mongoose.connect(process.env.DB_URI);

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(express.json());
app.use(cors());

// app.use('/api/auth', authRouter);
app.use('/api', postRouter);


// TODO schreibe einen Endpunkt /reports, wo die authMiddleware verwendet wird
// denn nur eingeloggt User kriegen diese Daten
// die Endpunkt Handler macht erstmal nichts, uns gehts nur darum, dass die Middleware
// eingebunden ist
app.get("/reports", authMiddleware, (req, res) => {
  console.log(req.user.userId)
  res.send("hier sind die geheimen Daten");
})


function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send();
  }
  // Beispiel Inhalt: Bearer bGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFydGVtQG.sdfsodkfpoksd
  // nehme dir den letzten Teil aus dem String, denn das ist der token
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).send();
  }

  try {
    var user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = user;
    next();
  } catch(err) {
    return res.status(401).send();
  }
}


app.listen("3000", () => console.log("server started on port 3000"));