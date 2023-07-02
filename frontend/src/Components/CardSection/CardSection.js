import React from "react";
import { CardElement } from "@stripe/react-stripe-js";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#303238",
      fontSize: "16px",
      fontFamily: "sans-serif",
      fontSmoothing: "antialiased",
      "::placeholder": {
        color: "#CFD7DF"
      }
    },
    invalid: {
      color: "#e5424d",
      ":focus": {
        color: "#303238"
      }
    }
  }
};

function CardSection() {
  return (
    <div>
      {/* <label>
      Email
     </label>
     <input
        type="email"
        id="email"
        name="email"
        placeholder="Name"
        autoComplete="cardholder"
        className="sr-input"
        /> */}
        <CardElement options={CARD_ELEMENT_OPTIONS} />
    </div>
  );
}

export default CardSection;
