import React from "react";
import "./Checkout.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import InjectedCheckoutForm from '../../Components/CheckoutForm/InjectedCheckoutForm';
import { useLocation } from "react-router-dom";

// test key
const stripePromise = loadStripe("pk_test_35p114pH8oNuHX72SmrvsFqh00Azv3ZaIA");

function Checkout(props) {
  const location = useLocation();
  return (
    <div className="Checkout">
      <div className="product">
        <img
          src="https://media.istockphoto.com/id/1083622428/vector/car-parking-icon.jpg?s=612x612&w=0&k=20&c=Z6VydNYDHrBq6gujhSuC6eIaCXQn_eMHNBFf8Co0ul4="
          alt="laptop"
          style={{ width: "100%", height: "auto" }}
        />
        <div>
          <Elements stripe={stripePromise}>
            <InjectedCheckoutForm 
             price = {location.state.price}
             parkingId = {location.state.parkingId}
             bookedSlots = {location.state.bookedSlots}
             userId = {location.state.userId}  />
          </Elements>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
