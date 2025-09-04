import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import mailRoutes from "./routes/mailRoutes.js";
import { sql } from "./config/db.js";

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

async function initDB(params) {
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS mails (
                id SERIAL PRIMARY KEY,
                reference_no VARCHAR(255) NOT NULL,
                sender INTEGER NOT NULL,
                recipient INTEGER NOT NULL,
                mail_type INTEGER NOT NULL,
                delivery_mode INTEGER NOT NULL,
                courier INTEGER NOT NULL,
                quantity INTEGER NOT NULL,
                remarks VARCHAR(255),
                status INTEGER NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                created_by INTEGER NOT NULL
            )
        `;

        console.log("Database Initialized Successfuly");
    } catch (error) {
        console.log("Error Initializing DB", error);
    }
}

initDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running on port 3000"); 
    });
});
