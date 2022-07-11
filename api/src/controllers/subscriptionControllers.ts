import { Request, Response } from "express";
import { createSubscription, getSubscriptionById, updateSubscriptionById } from "../helpers/subscriptionHelpers";

async function getSubscription (req:Request, res:Response) {
   try {
      let { id } = req.params;
      const payment = await getSubscriptionById(id);
  
      return res.json(payment);
   } catch (error) {
      console.log(error);
      return res.status(500).json({ error: true, msg: "Failed to create payment" });
   }
}

async function postSubscription (req:Request, res:Response) {
   try {
      const data = req.body;
      const payment = await createSubscription(data);
  
      return res.json(payment);
   } catch (error) {
      console.log(error);
      return res.status(500).json({ error: true, msg: "Failed to create payment" });
   }
}

async function updateSubscription (req:Request, res:Response) {
   try {
      const { id } = req.params;
      let data=req.body;
      const payment = await updateSubscriptionById(id, data);
  
      return res.json(payment);
   } catch (error) {
      console.log(error);
      return res.status(500).json({ error: true, msg: "Failed to create payment" });
   }
}

export {
   getSubscription,
   postSubscription,
   updateSubscription
}