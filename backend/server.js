import Express from "express";
import route from "./routes/route.js";
import Cors from "cors";

const app = Express();
const PORT = process.env.PORT || 5000;  // Use environment variable

app.use(Cors());
app.use(Express.json());
app.use(route);

// Add root route for health check
app.get('/', (req, res) => {
  res.json({ status: "Backend running", port: PORT });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});