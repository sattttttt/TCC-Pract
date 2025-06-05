import Express from "express";
import route from "./routes/route.js";
import Cors from "cors";
import db from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import cookieParser from "cookie-parser";

const app = Express();
const PORT = process.env.PORT || 5000;

// Tambahkan error handling
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

app.use(Cors());
app.use(cookieParser());
app.use(Express.json());
app.use("/user", userRoute);
app.use("/notes", route);

db.sync({alter: true}).then(() => {
    console.log("table created");
}).catch((error) => {
    console.log("error creating table", error)
})

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle shutdown gracefully
process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Server terminated');
    process.exit(0);
  });
});