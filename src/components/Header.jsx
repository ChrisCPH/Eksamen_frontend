import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import facade from "../utils/apiFacade.js";
import Login from "./Login.jsx";
import LoggedIn from "./LoggedIn.jsx";
import "../styles/header.css"

function Header({setErrorMsg, loggedIn, setLoggedIn}) {
    const init = {username: "", password: ""};
        const [loginCredentials, setLoginCredentials] = useState(init);

    return (
        <nav className="topnav">
            <NavLink to="/"> Welcome</NavLink>
            {!loggedIn ? (<Login setLoggedIn={setLoggedIn} loginCredentials={loginCredentials} setLoginCredentials={setLoginCredentials} setErrorMsg={setErrorMsg}  />) :
                (<div>
                    <LoggedIn setLoggedIn={setLoggedIn} loginCredentials={loginCredentials}/>
                </div>)}
            {facade.hasUserAccess('admin',loggedIn) && (<NavLink to="/Projects"> Projects </NavLink>)}
            {facade.hasUserAccess('admin',loggedIn) && (<NavLink to="/ProjectInvoice"> ProjectInvoice </NavLink>)}
            {facade.hasUserAccess('admin',loggedIn) && (<NavLink to="/Developers"> Developers </NavLink>)}
            {loggedIn ? (<NavLink to="/DevProjects"> DevProjects </NavLink>) : <></>}
        </nav>
    );
}

export default Header;