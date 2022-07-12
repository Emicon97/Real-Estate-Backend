const axios = require("axios");
import dotenv from "dotenv";
import propertyModel from "../models/properties";
dotenv.config({ override: true });

async function getPaymentById(id: string) {
  const url = "https://api.mercadopago.com/checkout/preferences";

  const payment = await axios.get(`${url}/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
  });

  for (let item of payment.data.items) {
    await propertyModel.findByIdAndUpdate(item.title, {
      status: "hot",
    });
  }
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
      success: "https://mikasa-nueva.vercel.app/purchase",
    },
  };

  const payment = await axios.post(url, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
  });
  for (let item of payment.data.items) {
    await propertyModel.findByIdAndUpdate(item.title, {
      payment: payment.data.id,
    });
  }
  return payment.data.init_point;
}

export { getPaymentById, createPayment };
