import Express from "express";
import route from "./routes/route.js";
import Cors from "cors";



const app = Express();

const PORT =  3000;
app.use(Cors());
app.use(Express.json());
app.use(route);


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });