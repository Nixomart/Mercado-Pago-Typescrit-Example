import { Request, Response, Router } from "express";
import mercadopago from "mercadopago";

const router = Router();

router.get("/generar", (req: Request, res: Response) => {
  let preference = {
    back_urls: {
      success: 'http://localhost:3000/success'
    },
    items: [
      {
        title: "Subscripcion Standar",
        unit_price: 5,
        quantity: 1,
      },
    ],
    notification_url: 'https://4f49-170-84-124-24.sa.ngrok.io/notificar'
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

router.use('/success',(req: Request, res: Response) => {
  res.send('TODOBIEN1')
})

router.use('/notificar',(req: Request, res: Response) => {
  console.log('notificarr')
  const {body, query} = req;
  console.log({body, query})
  res.send('notificado')
})


export default router;
