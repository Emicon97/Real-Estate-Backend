const { Router } = require("express");

import loginRoutes from "./login";
import signUpRoutes from "./signup";
import logoutRoutes from "./logout";
import propertyRoutes from "./property";
import userRoutes from "./user";
import contactRoutes from "./contact";
import calendarRoutes from "./calendar";
import subscriptionRoutes from "./subscription";
import paymentRoutes from "./payment";
import flagRoutes from "./flag";
import commentRoutes from "./comment";
import emailRoutes from "./email";

const router = Router();

router.use("/login", loginRoutes);
router.use("/signup", signUpRoutes);
router.use("/logout", logoutRoutes);
router.use("/property", propertyRoutes);
router.use("/user", userRoutes);
router.use("/contact", contactRoutes);
router.use("/subscription", subscriptionRoutes);
router.use("/calendar", calendarRoutes);
router.use("/payment", paymentRoutes);
router.use("/flag", flagRoutes);
router.use("/comment", commentRoutes);
router.use("/email", emailRoutes);

export = router;
