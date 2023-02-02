import axios from "axios";
import { Request, Response, Router } from "express";
import mercadopago from "mercadopago";
import { ACCES_TOKEN } from "../config";
import SubscriptionController from "../controllers/SubscriptionController";
import SubscriptionService from "../services/SubscriptionService";

const router = Router();

//create to try subscription

const SubscriptionInstance = new SubscriptionController(
  new SubscriptionService()
);

router.get("/generarSub",async (req: Request, res: Response) => {
  /* SubscriptionInstance.getSubscriptionLinkB(req, res); */

  const url = "https://api.mercadopago.com/preapproval";

  const body = {
    reason: "Suscripción Basica",
    auto_recurring: {
      frequency: 1,
      frequency_type: "months",
      transaction_amount: 10,
      currency_id: "ARS",
    },
    notification_url: "https://6a5b-170-84-124-24.sa.ngrok.io/notificarr",
    back_url: "https://google.com.ar",
    payer_email: "test_user_1295243383@testuser.com",
  };

  const subscription = await axios.post(url, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ACCES_TOKEN}`,
    },
  });
  
  res.send(`<a href=${subscription.data.init_point} >PAGAR SUBS</a>`)

});

router.get("/generar", (req: Request, res: Response) => {
  let preference = {
    back_urls: {
      success: "http://localhost:3000/success",
    },
    items: [
      {
        title: "Subscripcion Standar",
        unit_price: 5,
        quantity: 1,
      },
    ],
    notification_url: "https://admin.piedrasuma.com",
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      /* console.log("response", response); */
      res.send(`<a href=${response.body.init_point}>PAGAR</a>`);
      // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
    })
    .catch(function (error) {
      console.log(error);
    });
});

router.use("/success", (req: Request, res: Response) => {
  res.send("TODOBIEN1");
});

router.use("/notificarr", (req: Request, res: Response) => {
  res.send("TODOBIEN1");
  console.log('req.query', req.query)
});

router.use("/notificar", async (req: Request, res: Response) => {
  console.log("######################notificarr####################################");
  const {query} = req
  const topic = query.topic || query.type;
  console.log("#############topic################", topic);

  switch (topic) {  
    case "payment":
      const paymentId = query.id || query["data.id"];
      console.log(topic, "getting payment", paymentId);
      
      const payment = await mercadopago.payment.findById(+paymentId!);
      console.log(payment);
      var {body} = await mercadopago.merchant_orders.findById(
        payment.body.order.id
      );
      break;
    case "merchant_order":
      const orderId = query.id;
      console.log(topic, "getting payment", orderId);
      var {body} = await mercadopago.merchant_orders.findById(+orderId!);
      break;
  }
  //esto seria la informacion real y nesesaria para saber el estado de la orden
  console.log('merchantOrder###################### ### ###', body.payments)
  var paidAmount = 0

  body.payments.forEach((payment: { status: string; transaction_amount: number; })  => {
    if (payment.status === 'approved'){
      paidAmount += payment.transaction_amount;
    }
  });
  if(paidAmount >= body.total_amount){
    console.log('PAGADOOOOO')
  }else{
    console.log('NOOO PAGADOOOOO')
  }

  res.send()
});

export default router;
