import { Request, Response } from "express";

export default class SubscriptionController {
  SubscriptionService: any;
  constructor(SubscriptionService: any) {
    this.SubscriptionService = SubscriptionService;
  }

  async getSubscriptionLinkB(req: Request, res: Response) {
    try {
      const subscription =
        await this.SubscriptionService.createBasicSubscription();

      return res.json(subscription);
    } catch (error) {
      console.log(error + 'hola');

      return res
        .status(500)
        .json({ error: true, msg: "Failed to create subscription" });
    }
  }
}
