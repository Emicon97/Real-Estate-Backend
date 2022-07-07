const axios = require("axios");

async function createPayment({ email, items }:any) {
   const url = "https://api.mercadopago.com/preapproval";

   const body = {
      reason: "Subscripción premium",
      auto_recurring: {
         frequency: 1,
         frequency_type: "months",
         transaction_amount: 10,
         currency_id: "ARS"
      },
      back_url: "https://yoursite.com.ar/success",
      payer_email: email
      // payer_email: email,
      // items,
      // back_urls: {
      //   failure: "/failure",
      //   pending: "/pending",
      //   success: "https://techmarketfront.vercel.app/successbuy"
      // }
   };

   const subscription = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
      }
   });

   return subscription.data.init_point;
  }

export {
    createPayment
}