import React, {useEffect, useState} from "react";
import facade from "../utils/apiFacade.js";

export default function LoggedIn({setLoggedIn, loginCredentials }) {

    const logout = () => {
        facade.logout()
        setLoggedIn(false)
    }

    return (
        <div>
            <div className="login-container">
                <button onClick={logout}>Logout</button>
            </div>
            <div className="login-username">
                <p>Username: {loginCredentials.username}</p>
            </div>
        </div>
    )

}