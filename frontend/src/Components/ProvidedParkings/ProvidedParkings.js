import './ProvidedParkings.css'
import axios from 'axios';

const ProvidedParkings = (props) => {
    //console.log(props.id)

    const delParking = (event,id) => {
        event.preventDefault();
        console.log(id);
        axios.delete(`http://localhost:3001/deleteParking/${id}`).then(res => {
            console.log("Success");
        })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        < div >
              <table class="w3-table-all ">
               <tr id = "previousProvidedBox">
                <td class = "w3-col s2 w3-center">{props.address}</td>
                <td class = "w3-col s2 w3-center">{props.city}</td>
                <td class = "w3-col s2 w3-center">{props.startTime}</td>
                <td class = "w3-col s2 w3-center">{props.endTime}</td>
                <td class = "w3-col s2 w3-center">{props.space}</td>
                <td class = "w3-col s2 w3-center">{props.price}</td>
                <td class = "w3-col s2 w3-center"><button 
                class="w3-button w3-red w3-round-large"
                onClick={(e) => delParking(e,props.id)}
                >Delete Parking</button></td>
                </tr>
              </table>
        </div >
    )
}

export default ProvidedParkings;