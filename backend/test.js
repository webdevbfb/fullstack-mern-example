import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";

// const secret = crypto.randomBytes(32).toString("hex");
// console.log(secret)

// const playload = { userId: "89jkjk390", email: "test@gmail.com" }
// const token = jwt.sign(playload, process.env.JWT_SECRET_KEY);
// console.log(token);

// const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
// console.log(decoded);

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImthdGhpIiwiaWF0IjoxNzMxNDgyOTkxfQ.-IULFzlYGgVyzXJ6hdphDDpWqcLmAv6ZJvel27Kqp9g";
console.log(token);

const decoded = jwt.verify(token,"8d640ec7e423c74eaf4f933e28a0f3be3c34b044f5b50bac054bbedcbbb8d5dc");
console.log(decoded);

// const password = "katze1";

// const hashedPassword = await bcrypt.hash(password, 10);

// console.log(hashedPassword);

// const passwordCorrect = await bcrypt.compare("katze1", hashedPassword);

// console.log(passwordCorrect);
