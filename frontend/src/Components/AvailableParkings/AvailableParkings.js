import './AvailableParkings.css'
import { Link } from 'react-router-dom';

const AvailableParkings = (props) => {
    return (
        < div >
            <table class="w3-table-all">
                <tr id="parking">
                    <td class="w3-col s2 w3-center" >{props.address}</td>
                    <td class="w3-col s2 w3-center" >{props.city}</td>
                    <td class="w3-col s2 w3-center" >{props.space}</td>
                    <td class="w3-col s2 w3-center" >{props.price}</td>
                    <td class="w3-col s2 w3-center" ><Link class="w3-button w3-deep-orange w3-round-large" to={{
                        pathname: "/bookslot",
                    }} state={{
                        parkingId: props.parkingId,
                        userId : props.userId
                    }}> Book Now</Link></td>
                </tr>

            </table>
        </div >
    )
}
export default AvailableParkings;