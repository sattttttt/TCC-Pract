import Express from "express";
import route from "./routes/route.js";
import Cors from "cors";

const app = Express();
const PORT = process.env.PORT || 5000;  // Tetap gunakan env.PORT

app.use(Cors());
app.use(Express.json());
app.use(route);

app.get('/', (req, res) => {
  res.json({ 
    status: "Backend running",
    port: PORT,
    note: "Cloud Run automatically sets PORT env"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});