import React, { useState } from "react";

export const CheckoutSteps = () => {
  const [allSteps, setAllSteps] = useState([
    {
      label: "DELIVERY",
      name: "shippingAndHandling",
      current: true,
      component: "",
    },
    { label: "PAYMENT", name: "payment", current: false, component: "" },
    {
      label: "CONFIRMATION",
      name: "confirmation",
      current: false,
      component: "",
    },
  ]);

  

  return (
    <div>
      <div></div>
    </div>
  );
};
