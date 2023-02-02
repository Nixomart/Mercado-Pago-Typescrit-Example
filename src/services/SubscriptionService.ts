import axios from "axios";
import { ACCES_TOKEN } from "../config";

export default class SubscriptionService {
  async createBasicSubscription() {
    const url = "https://api.mercadopago.com/preapproval";

    const body = {
      reason: "Suscripción Basica",
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        transaction_amount: 10,
        currency_id: "ARS",
      },
      back_url: "https://google.com.ar",
      payer_email: "test_user_1295243383@testuser.com",
      notification_url: "https://6245-170-84-124-24.sa.ngrok.io/notificar",
    };

    const subscription = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCES_TOKEN}`,
      },
    });

    return subscription.data;
  }
}
