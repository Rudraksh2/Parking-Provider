import React from "react";
import axios from 'axios';
import { CardElement } from "@stripe/react-stripe-js";
import { useNavigate } from 'react-router-dom';

import CardSection from "../CardSection/CardSection";

function CheckoutForm(props) {
  const navigate = useNavigate();
  console.log(props.bookedSlots)

  const data = { parkingId : props.parkingId, slotsId : props.bookedSlots };

  const updateSlots = async () => {
    await axios.post('http://localhost:3001/updateParking', data)
  } 

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { stripe, elements } = props;
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);

    if (result.error) {
      console.log(result.error.message);
    } else {
      console.log(result.token);
      alert("Payment Successful");
      // Navigate back to dashboard
      console.log("ParkingId : " + props.parkingId + "\nBookedSlots:" + props.bookedSlots)
      updateSlots();
      navigate('/bookparking', { state: { userId: props.userId } })
    }
  }
    return (
      <div>
        <div class="product-info">
          <h3 className="product-title">Parking Provider</h3>
          <h4 className="product-price">Rs. {props.price}</h4>
        </div>
        <form onSubmit={handleSubmit}>
          <CardSection />
          <button disabled={!props.stripe} className="btn-pay">
            Pay Now
          </button>
        </form>
      </div>
    );
}

export default CheckoutForm;

// export default function InjectedCheckoutForm() {
//   return (
//     <ElementsConsumer>
//       {({ stripe, elements }) => (
//         <CheckoutForm stripe={stripe} elements={elements} />
//       )}
//     </ElementsConsumer>
//   );
// }
