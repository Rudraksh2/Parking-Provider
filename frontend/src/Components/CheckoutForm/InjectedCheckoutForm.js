import React from "react";
import { ElementsConsumer } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

function InjectedCheckoutForm(props) {
    return (
      <ElementsConsumer>
        {({ stripe, elements }) => (
          <CheckoutForm 
            stripe={stripe}
            elements={elements}
            price = {props.price}
            parkingId = {props.parkingId}
            bookedSlots = {props.bookedSlots}
            userId = {props.userId} 
            />
        )}
      </ElementsConsumer>
    );
  }

export default InjectedCheckoutForm;