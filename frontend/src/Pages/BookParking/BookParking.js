import './BookParking.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import 'w3-css/w3.css';

import PreviousParkings from '../../Components/PreviousParkings/PreviousParkings';
import NavBar from '../../Components/NavBar/NavBar';


import HistoryIcon from "@mui/icons-material/History";

const BookParking = () => {

    const location = useLocation();
    const [allPreviousParkings, setAllPreviousParkings] = useState();
    
    useEffect(() => {
        getPreviousParkings()
    }, [])

    const getPreviousParkings = () => {
        axios.get(`http://localhost:3001/parkings/${location.state.userId}`).then(res => {
            setAllPreviousParkings(res.data)
        })
            .catch(err => {
                console.log(err);
            })
    }

    let previousParkings;
    if (allPreviousParkings) {
        previousParkings = allPreviousParkings.map((parking) => {
            return <PreviousParkings
                parkingInfo={parking}
            />
        })
    }

    return (
        <div>
            <NavBar category = "user" />
                <div style ={{ textAlign : "center"}}>
                <Link class="w3-button w3-indigo w3-border w3-round-large" style ={{padding : "1%"}}
                   to={{
                    pathname: "/searchparking",
                }} state={{
                    userId: location.state.userId
                }}>Search Parkings</Link>
                </div>

            <div class="w3-panel">
              <h4 class="w3-text-orange" style={{textShadow:'1px 1px 0 #444'}}> <HistoryIcon fontSize='large' /> Parking History : </h4>
            </div>

            <div class ="w3-container">
            <table class="w3-table-all w3-center">
             <thead>
              <tr class="w3-red">
               <th>Parking Id</th>
               <th>Time</th>
              </tr>
            </thead>
            </table> 
            
            {previousParkings}
            
            </div>

        </div>
    )
}

export default BookParking;