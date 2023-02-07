import indexRoute from "./routes/index";
import express, { json } from "express";
import mercadopago from "mercadopago";
import bodyParser from "body-parser";
import { ACCES_TOKEN, PORT } from "./config";
const app = express();

mercadopago.configure({
  access_token:
    <string>ACCES_TOKEN
});

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(indexRoute);
app.use(express.json())
const puerto = PORT || 3000
app.listen(puerto, ()=>{
  console.log('isiiss')
});
export default app;
