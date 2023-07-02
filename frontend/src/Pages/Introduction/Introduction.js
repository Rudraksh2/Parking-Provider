import Facebook from '../../Images/facebook.png'
import Twitter from '../../Images/twitter.png';
import LinkedIn from '../../Images/linkedin.png';
import { Link, useNavigate } from 'react-router-dom'
import './Introduction.css';
import 'w3-css/w3.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Introduction = () => {
    
    const navigate = useNavigate();
    const [user,setUser] = useState();
    const [provider,setProvider] = useState();
    
    useEffect(() => {
            axios.get('http://localhost:3001/getUser').then(res => {
              //console.log("userData :",res.data[0]);
              setUser(res.data[0])
           })

            axios.get('http://localhost:3001/getProvider').then(res => {
              //console.log("provider data : ",res.data[0]);
              setProvider(res.data[0])
            })
    },[]);

    const handleUser = (event) =>{
        event.preventDefault();

        if(user){
            navigate('/bookparking', { state: { userId: user._id } })
        }
        else{
            navigate('/signup', { state: { userType: "user" } })
        }
    }

    const handleProvider = (event) =>{
        event.preventDefault();

        if(provider){
            navigate('/provideparking', { state: { providerId: provider._id } })
        }
        else{
            navigate('/signup', { state: { userType: "provider" } })
        }
    }
    
    return (
        <div>
            <div class ="w3-white">
                <div id="div2Links">
                    <a class ="w3-bar-item w3-button w3-padding-large">
                        ABOUT US
                    </a>
                    <a class ="w3-bar-item w3-button w3-padding-large">
                        DOCUMENTATION
                    </a>
                </div>
            </div>

            <div class="w3-container w3-red w3-center">
                <h1 class="w3-margin w3-jumbo">PARKING PROVIDER</h1>
                <p class="w3-xlarge">WHO ARE YOU?</p>

                {/* <Link class="w3-button w3-black w3-padding-large w3-large w3-margin-top" style={{ textDecoration: 'none'}} to={{
                    pathname: "/signup",
                }} state={{
                    userType: "user"
                }}> User </Link>
                
                <Link class="w3-button w3-black w3-padding-large w3-large w3-margin-top" style={{textDecoration: 'none'}} to={{
                    pathname: "/signup",
                }} state={{
                    userType: "provider"
                }}> Provider </Link> */}

                <button class="w3-button w3-black w3-padding-large w3-large w3-margin-top" 
                        style={{ margin : '1%'}} 
                        onClick={handleUser}> User </button>
                
                <button class="w3-button w3-black w3-padding-large w3-large w3-margin-top"
                        style={{margin : '1%'}}
                        onClick={handleProvider}
                        > Provider </button>
                
            </div>

            <div id='d3'>
                <div id='d3d1' class="w3-container">
                    <h1>
                        Major cities we have covered :
                    </h1>
                    <ul class="w3-ul w3-hoverable">
                        <li>Bombay</li>
                        <li>Delhi</li>
                        <li>Bangalore</li>
                        <li>Hyderabad</li>
                        <li>Gurgaon</li>
                        <li>Chennai</li>
                        <li>Amritsar</li>
                        <li>Pune</li>
                    </ul>
                </div>

                <div id='d3d2' class="w3-container">
                    <h1>
                        Upcoming cities :
                    </h1>
                    <ul class="w3-ul w3-hoverable">
                        <li>Bombay</li>
                        <li>Delhi</li>
                        <li>Bangalore</li>
                        <li>Hyderabad</li>
                        <li>Gurgaon</li>
                        <li>Chennai</li>
                        <li>Amritsar</li>
                        <li>Pune</li>
                    </ul>
                </div>
            </div>

            <div id="d4">
                <div id="div4Logo">

                </div>
                <div id="div4Pic">
                    <img id="img1" src={Facebook} alt="" />
                    <img id="img2" src={Twitter} alt="" />
                    <img id="img3" src={LinkedIn} alt="" />
                </div>
                <div id="div4Links">
                    <a id="liNav">Contact Us </a>
                    <a id="liNav">Costumer Terms of Use </a>
                    <a id="liNav">Privacy Policy </a>
                </div>

            </div>
        </div>
    );
}

export default Introduction;
