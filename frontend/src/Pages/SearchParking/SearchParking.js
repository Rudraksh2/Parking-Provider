import { useState, useEffect } from 'react';
import './SearchParking.css'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import AvailableParkings from '../../Components/AvailableParkings/AvailableParkings'
import NavBar from '../../Components/NavBar/NavBar';
import "./SearchParking.css";
const SearchParking = () => {

    useEffect(() => {
        getAllParkings();
    }, [])

    const location = useLocation();
    const [allRegisteredParkings, setAllRegisteredParkings] = useState();
    const [filteredCity, setFilteredCity] = useState('');

    const getAllParkings = () => {
        axios.get(`http://localhost:3001/getAllParkings`).then(res => {
            setAllRegisteredParkings(res.data)
        })
            .catch(err => {
                console.log(err);
            })
    }

    const getSearchCity = (e) => {
        let city = e.target.value;
        setFilteredCity(city)
    }

    const checkPrefixMatch = (city1, city2) => {
        console.log(city1, city2)
        let ptr1 = 0, ptr2 = 0;
        while (ptr1 < city1.length && ptr2 < city2.length) {
            if (city1[ptr1] != city2[ptr2]) {
                return false;
            }
            ptr1 = ptr1 + 1;
            ptr2 = ptr2 + 1;
        }
        if (ptr2 == city2.length) {
            return true;
        }
        return false;
    }

    let showAllRegisteredparkings;
    console.log(allRegisteredParkings);

    if (allRegisteredParkings) {
        let allAvailableParkings = allRegisteredParkings.filter((parking) => {
            let slots = parking.slots;
            if (slots.length) {
                let isAvailable = 0;
                for (let i = 0; i < slots.length; i++) {
                    const obj = slots[i];
                    if (obj.space > 0) {
                        isAvailable = 1;
                    }
                }
                if (isAvailable) {
                    return parking;
                }
            }
            else
                return parking;
        })
        if (filteredCity) {
            let filteredRegisteredParkings = allAvailableParkings.filter((parking) => {
                if (checkPrefixMatch(parking.city.toLowerCase(), filteredCity.toLowerCase())) {
                    return parking;
                }
            })
            showAllRegisteredparkings = filteredRegisteredParkings.map((parking) => {
                return <AvailableParkings
                    userId = {location.state.userId}
                    city={parking.city}
                    price={parking.pricePerHour}
                    address={parking.address}
                    space={parking.space}
                    parkingId={parking._id}
                />
            })
        }
        else {
            showAllRegisteredparkings = allAvailableParkings.map((parking) => {
                console.log(parking)
                return <AvailableParkings
                    city={parking.city}
                    price={parking.pricePerHour}
                    address={parking.address}
                    space={parking.space}
                    parkingId={parking._id}
                />
            })
        }

    }

    return (
        <div id='searchParking'>
            <NavBar category = "user" />
            <div id='searchBar'>
                <label class="w3-container" id='label'>Search Locations : </label>
                <input class="w3-input w3-border w3-round" style={{ width: '30%', marginBottom: '3%' }}
                    type='search' onChange={getSearchCity}></input>
            </div>

            <div class="w3-container">
                <table class="w3-table-all w3-center">
                    <thead>
                        <tr class="w3-red">
                            <th class="w3-col s2 w3-center">Address</th>
                            <th class="w3-col s2 w3-center">City</th>
                            <th class="w3-col s2 w3-center">Space</th>
                            <th class="w3-col s2 w3-center">Price</th>
                            <th class="w3-col s2 w3-center">Book</th>
                        </tr>
                    </thead>
                </table>

                {showAllRegisteredparkings}

            </div>

        </div>
    )
}

export default SearchParking;