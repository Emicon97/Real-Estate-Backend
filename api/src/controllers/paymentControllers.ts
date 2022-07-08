import { Request, Response } from "express";
import { createPayment, getPaymentById } from "../helpers/paymentHelpers";

async function getPayment (req:Request, res:Response) {
   try {
      let { id } = req.params;
      const payment = await getPaymentById(id);
  
      return res.json(payment);
   } catch (error) {
      console.log(error);
      return res.status(500).json({ error: true, msg: "Failed to create payment" });
   }
}

async function postPayment (req:Request, res:Response) {
   try {
      const data = req.body;
      const payment = await createPayment(data);
  
      return res.json(payment);
   } catch (error) {
      console.log(error);
      return res.status(500).json({ error: true, msg: "Failed to create payment" });
   }
}

async function updatePayment (req:Request, res:Response) {
   try {
      let data=req.body;
      const payment = await createPayment(data);
  
      return res.json(payment);
   } catch (error) {
      console.log(error);
      return res.status(500).json({ error: true, msg: "Failed to create payment" });
   }
}

export {
   getPayment,
   postPayment,
   updatePayment
}