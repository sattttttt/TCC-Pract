import Express from "express";
import route from "./routes/route.js";
import Cors from "cors";

const app = Express();
const PORT = process.env.PORT || 5000;

// Tambahkan error handling
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

app.use(Cors());
app.use(Express.json());
app.use(route);

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