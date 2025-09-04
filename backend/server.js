import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import mailRoutes from "./routes/mailRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
//helmet is a security middleware that helps you protect your your app by setting various HTTP headers
app.use(helmet());
//log the request
app.use(morgan("dev"));

app.use("/api/mails", mailRoutes);

app.listen(PORT, () => {
    console.log("Server is running on port 3000"); 
});