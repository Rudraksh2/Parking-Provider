import './PreviousParkings.css'
const PreviousParkings = (props) => {
    console.log(props.parkingInfo)
    return (
        < div >
            <table class="w3-table-all ">
               <tr id = "previousParkingBox">
                <td class = "w3-col s6 w3-center">{props.parkingInfo.parkingID}</td>
                <td class = "w3-col s6 w3-center">{props.parkingInfo.time}</td>
                </tr>
              </table>
           
        </div >
    )
}

export default PreviousParkings;