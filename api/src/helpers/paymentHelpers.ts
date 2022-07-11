const axios = require("axios");
import dotenv from "dotenv";
dotenv.config({ override: true });

async function getPaymentById(id: string) {
  const url = "https://api.mercadopago.com/checkout/preferences";
  console.log('holaaa')
  const payment = await axios.get(`${url}/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
  });

  return payment.data;
}

async function createPayment({
  email,
  items,
}: {
  email: string;
  items: string[];
}) {
  const url = "https://api.mercadopago.com/checkout/preferences";

  const body = {
      payer_email: email,
      items,
      back_urls: {
      failure: "/failure",
      pending: "/pending",
      success: "https://mikasa-nueva.vercel.app/success"
      }
  };

  const payment = await axios.post(url, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
  });
  return payment.data.init_point;
}

export {
  getPaymentById,
  createPayment,
};
