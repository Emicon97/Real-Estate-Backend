const axios = require("axios");
import dotenv from "dotenv";
import propertyModel, { Property } from "../models/properties";
import { User } from "../models/users";
import userModel from "./../models/users";
dotenv.config({ override: true });

async function rangeManager(id: string): Promise<User | null> {
  const user: User | null = await userModel
    .findById(id)
    .populate({ path: "properties" });
  if (user?.subscription) {
    const updated: Promise<User | null> = getSubscriptionById(
      user.subscription
    ).then(async (response) => {
      if (response.status === "pending" || response.status === "cancelled") {
        await propertyStatusManager(user, "free");
        return await userModel.findByIdAndUpdate(id, { range: "free" });
      }
      if (response.reason === "Mikasa Nueva Premium") {
        await propertyStatusManager(user, "premium");
        return await userModel.findByIdAndUpdate(id, { range: "premium" });
      } else {
        await propertyStatusManager(user, "vip");
        return await userModel.findByIdAndUpdate(id, { range: "vip" });
      }
    });
    return updated;
  }
  throw new Error("Algo salió mal.");
}

async function propertyStatusManager(user: User, status: string) {
  if (status === "free") {
    for (let property of user.properties) {
      const prop = property as any;
      if (prop.status !== "hot") {
        await propertyModel.findByIdAndUpdate(prop?._id, {
          status: "invisible",
        });
      }
    }
  } else if (status === "premium") {
    const visible: Property[] = [];
    for (let property of user.properties) {
      const prop = property as any;
      if (
        (prop.status === "vipHot" || prop.status === "invisible") &&
        visible.length < 3
      ) {
        const vis: Property | null = await propertyModel.findByIdAndUpdate(
          prop?._id,
          { status: "available" }
        );
        if (vis) visible.push(vis);
      } else if (prop.status === "vipHot") {
        const vis: Property | null = await propertyModel.findByIdAndUpdate(
          prop?._id,
          { status: "invisible" }
        );
      }
    }
  } else if (status === "vip") {
    for (let property of user.properties) {
      const prop = property as any;
      if (prop.status !== "hot") {
        await propertyModel.findByIdAndUpdate(prop?._id, { status: "vipHot" });
      }
    }
  } else if (status === "banned") {
    for (let property of user.properties) {
      const prop = property as any;
      await propertyModel.findByIdAndUpdate(prop?._id, {
        status: "invisible ",
      });
    }
  }
}

async function getUserBySubscription(subscription: string) {
  const user: any = await userModel.findOne({ subscription });
  if (user) {
    const updated: User | null = await rangeManager(user._id);
    return updated;
  }
}

async function getSubscriptionById(id: string) {
  const url = "https://api.mercadopago.com/preapproval";

  const subscription = await axios.get(`${url}/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
  });

  return subscription.data;
}

async function createSubscription({
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
      transaction_amount: reason === "Mikasa Nueva Premium" ? 1500 : 20000,
      currency_id: "ARS",
    },
    back_url: "https://mikasa-nueva.vercel.app/success",
    payer_email: email,
  };

  const subscription = await axios.post(url, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
  });
  return subscription.data.init_point;
}

async function updateSubscriptionById(
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

  if (status !== "cancelled") {
    const body = {
      reason,
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        transaction_amount: reason === "Mikasa Nueva Premium" ? 1500 : 20000,
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
    return subscription.data.init_point;
  } else {
    const body = {
      reason,
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        transaction_amount: 0,
        currency_id: "ARS",
      },
      back_url: `https://mikasa-nueva.vercel.app/goodbye/${id}`,
      status,
    };
    const subscription = await axios.put(`${url}/${id}`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    });
    return subscription.data.init_point;
  }
}

export {
  getUserBySubscription,
  propertyStatusManager,
  createSubscription,
  updateSubscriptionById,
};
