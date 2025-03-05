import Express from "express";
import route from "./routes/route.js";
import Cors from "cors";



const app = Express();

const port = 5000;
app.use(Cors());
app.use(Express.json());
app.use(route);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})