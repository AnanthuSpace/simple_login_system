import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js"; 
import { dbConnection } from "./util/db_connect.js";

const app = express();

app.use(cors());
app.use(express.json());

dbConnection()

app.use("/auth", authRoutes);

export default app;
