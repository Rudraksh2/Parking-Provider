import './BookSlot.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import AvailableSlots from '../../Components/AvailableSlots/AvailableSlots';
import NavBar from '../../Components/NavBar/NavBar';
import { useLocation, useNavigate } from 'react-router-dom';
const BookSlot = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const [parking, setParking] = useState();
    const [checkedSlots, setCheckedSlots] = useState(0);
    const [enableButton, setEnableButton] = useState(true);
    const [bookedSlots, setBookedSlots] = useState([]);

    const addCount = (slotId) => {
        let currentBookedSlots = bookedSlots;
        currentBookedSlots.push(slotId);
        setBookedSlots(currentBookedSlots)
        setCheckedSlots(checkedSlots + 1);
        // console.log(enableButton);
        // console.log(checkedSlots);
        if (checkedSlots === 0) {
            setEnableButton(false);
        }
    };

    const removeCount = (slotId) => {
        let currentBookedSlots = bookedSlots.filter((id) => {
            return id != slotId
        });
        setBookedSlots(currentBookedSlots)
        setCheckedSlots(checkedSlots - 1);
        // console.log(enableButton);
        // console.log(checkedSlots);
        if (checkedSlots === 1) {
            setEnableButton(true);
        }
    };

    useEffect(() => {
        getParking()
    }, [])

    const getParking = () => {
        axios.get(`http://localhost:3001/getParkingById`, { params: { "parkingId": location.state.parkingId } }).then(res => {
            setParking(res.data[0])
            console.log(res.data[0])
        })
            .catch(err => {
                console.log(err);
            })
    }

    const checkoutHandler = () => {
        navigate('/checkout', { state: { parkingId: location.state.parkingId, price: checkedSlots * parking.pricePerHour, bookedSlots: bookedSlots, userId : location.state.userId } })
    }

    let slots;
    if (parking) {
        slots = parking.slots.map((slot) => {
            console.log(slot)
            return <AvailableSlots
                slotInfo={slot}
                addCount={addCount}
                removeCount={removeCount}
            />
        })
    }

    return (
        <div id="container">
            {/* <div id='navBar'>
                <div style={{ color: 'white' }} >This is a nav bar</div>
                <Link to={{
                    pathname: "/searchparking",
                }} state={{
                    userId: location.state.userId
                }}>Search Parkings</Link>
            </div> */}

            <NavBar category="user" />
            <div className="w3-container" style={{ marginTop: "2%" }}>
                <table className="w3-table-all w3-center">
                    <thead >
                        <tr className="w3-red">
                            <th className="w3-col s4 w3-center">Select Slot</th>
                            <th className="w3-col s4 w3-center">Space Available</th>
                            <th className="w3-col s4 w3-center">Time Slot</th>
                        </tr>
                    </thead>
                </table>

                {slots}

            </div>
            {console.log(checkedSlots)}
            <div id="button" className="w3-tag w3-round w3-indigo" style={{ padding: "3px" }}>
                <div class="w3-tag w3-round w3-indigo">
                    Your Total : Rs. {!enableButton && checkedSlots * parking.pricePerHour}
                </div>
                <button disabled={enableButton} className="w3-button w3-blue w3-round-large" onClick={checkoutHandler}>Checkout</button>
            </div>


        </div >
    )
}

export default BookSlot;