import './AvailableSlots.css';
import { useState } from "react";

const AvailableSlots = (props) => {

  const [isChecked, setIsChecked] = useState(false);

  const handleOnChange = () => {
    setIsChecked(!isChecked);

    if (isChecked) {
      props.removeCount(props.slotInfo._id);
    } else {
      props.addCount(props.slotInfo._id);
    }
  };

  return (
    <div>
      <table class="w3-table-all ">
        <tr id="SlotBox">
          <td class="w3-col s4 w3-center">
            {" "}
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleOnChange}
            />{" "}
          </td>
          <td class="w3-col s4 w3-center">{props.slotInfo.space}</td>
          <td class="w3-col s4 w3-center">{props.slotInfo.time}</td>
        </tr>
      </table>
    </div >
  )
}

export default AvailableSlots;