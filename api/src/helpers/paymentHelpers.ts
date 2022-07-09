const axios = require("axios");
import dotenv from "dotenv";
dotenv.config({ override: true });

async function getPaymentById(id: string) {
  const url = "https://api.mercadopago.com/preapproval";

  const subscription = await axios.get(`${url}/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
  });

  return subscription.data.init_point;
}

async function createPayment({
  email,
  reason,
}: {
  email: string;
  reason: string;
}) {
  const url = "https://api.mercadopago.com/preapproval";

  const body = {
    reason,
    auto_recurring: {
      frequency: 1,
      frequency_type: "months",
      transaction_amount: reason === "Mikasa Nueva Premium" ? 100 : 200,
      currency_id: "ARS",
    },
    back_url: "https://mikasa-nueva.vercel.app/success",
    payer_email: email,
    // payer_email: email,
    // items,
    // back_urls: {
    //   failure: "/failure",
    //   pending: "/pending",
    //   success: "https://mikasa-nueva.vercel.app/success"
    // }
  };

  const subscription = await axios.post(url, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
  });
  console.log(subscription.data);
  return subscription.data.init_point;
}

async function updateSubscription(
  id: string,
  {
    status,
    reason,
  }: {
    status: string;
    reason?: string;
  }
) {
  const url = "https://api.mercadopago.com/preapproval";

  const body = {
    reason,
    auto_recurring: {
      frequency: 1,
      frequency_type: "months",
      transaction_amount: 10,
      currency_id: "ARS",
    },
    back_url: "https://mikasa-nueva.vercel.app/success",
    status,
  };

  const subscription = await axios.put(`${url}/${id}`, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
  });
  console.log(subscription.data);
  return subscription.data.init_point;
}

export { getPaymentById, createPayment };
