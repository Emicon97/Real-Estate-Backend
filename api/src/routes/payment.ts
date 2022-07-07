const { Router } = require('express');
import { Request, Response } from "express";
import { createPayment } from "../controllers/paymentControllers";
require('dotenv').config();

const router = Router();

router.post("/", async  function (req:Request, res:Response) {
   let data=req.body;
   
   try {
      const payment = await createPayment(data);
  
      return res.json(payment);
   } catch (error) {
      console.log(error);
      return res.status(500).json({ error: true, msg: "Failed to create payment" });
   }
});

export default router;