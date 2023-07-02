import './ProvideParking.css';
import ProvidedParkings from '../../Components/ProvidedParkings/ProvidedParkings';
import NavBar from '../../Components/NavBar/NavBar';
import { useLocation, Link, useRouteLoaderData } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import "./ProvideParking.css";
const ProvideParking = () => {
    const location = useLocation()
    const [allProvidedParkings, setAllProvidedParkings] = useState();
    //const [load, setLoad] = useState(false);

    useEffect(() => {
        getAllParkings();
    }, [])

    // useEffect(() => {
    //     if(load){
    //         window.location.reload(true);
    //         setLoad(false)
    //     }
    // }, [load])

    const getAllParkings = () => {
        axios.get(`http://localhost:3001/getAllProviderParkings`, { params: { "providerId": location.state.providerId } }).then(res => {
            // console.log(res.data)
            setAllProvidedParkings(res.data)
        })
            .catch(err => {
                console.log(err);
            })
    }
    let showAllProvidedParkings;
    if (allProvidedParkings) {
        showAllProvidedParkings = allProvidedParkings.map((parking) => {
            return <ProvidedParkings
                city= {parking.city}
                price= {parking.pricePerHour}
                address= {parking.address}
                space = {parking.space}
                startTime = {parking.startTime}
                endTime = {parking.endTime}
                id = {parking._id}
            />
        })
    }
    return (
        <div>
            <NavBar category = 'provider'/>
            <div style ={{ textAlign : "center"}}>
                <Link class="w3-button w3-indigo w3-border w3-round-large" style ={{padding : "1%"}}
                  to={{
                    pathname: "/addparking",
                }} state={{
                    providerId: location.state.providerId
                }}> Add Parking </Link>
            </div>

            <div class ="w3-container">
            <table class="w3-table-all w3-center">
             <thead>
              <tr class="w3-red">
               <th class = "w3-col s2 w3-center">Address</th>
               <th class = "w3-col s2 w3-center">City</th>
               <th class = "w3-col s2 w3-center">Start Time</th>
               <th class = "w3-col s2 w3-center">End Time</th>
               <th class = "w3-col s2 w3-center">Space</th>
               <th class = "w3-col s2 w3-center">Price</th>
              </tr>
            </thead>
            </table> 
            
            {showAllProvidedParkings}
            
            </div>
        </div>
    )
}

export default ProvideParking;