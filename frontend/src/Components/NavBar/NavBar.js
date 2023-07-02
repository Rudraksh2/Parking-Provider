import { Link } from 'react-router-dom';
import axios from 'axios';

const Navbar = (props) => {
    const user = props.category === 'user';
    console.log("user : ",user);
    
    const userLogout = () => {
        axios.get('http://localhost:3001/user-logout')
        .then(res => {
            console.log("Logged Out",res.status)
        })
            .catch(err => {
                console.log("Logout Error",err)
            })
     
            console.log("logged out");
    }

    const providerLogout = () => {
        axios.get('http://localhost:3001/provider-logout')
        .then(res => {
            console.log("Logged Out",res.status)
        })
            .catch(err => {
                console.log("Logout Error",err)
            })
     
            console.log("logged out");
    }

    return(
           <div class ="w3-teal">
                    <Link class ="w3-bar-item w3-button w3-padding-large"
                       to={{pathname: "/"}}
                    >HOME</Link>
                <div id="div1Links">
                    <a class ="w3-bar-item w3-button w3-padding-large">
                        ABOUT US
                    </a>
                    <a class ="w3-bar-item w3-button w3-padding-large">
                        DOCUMENTATION
                    </a>
                    <Link class ="w3-bar-item w3-button w3-padding-large"
                       onClick = {user ? userLogout : providerLogout}
                       to={{pathname: "/"}}
                       >
                        LOG OUT
                    </Link>
                </div>
            </div>
    )
} 

export default Navbar;