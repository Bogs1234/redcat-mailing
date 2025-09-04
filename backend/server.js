import express from "express";
import helmet from "helmet";
import morgan from "morgan";

const app = express();

//helmet is a security middleware that helps you protect your your app by setting various HTTP headers
app.use(helmet());

//log the request
app.use(morgan("dev"));

app.get("/test", (req, res) => {
    console.log(res.getHeaders());
    res.send("Hello from the backend test");
})

app.listen(3000, () => {
    console.log("Server is running on port 3000"); 
});