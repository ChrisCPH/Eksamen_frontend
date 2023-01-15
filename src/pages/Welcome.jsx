import React from 'react';

function Welcome(props) {

    return (
        <div className="divplacement">
            <h3>Welcome</h3>
            <p>To use the project follow the steps</p>
            <p> - Clone the backend project from git and follow the steps in that project</p>
            <p> - npm install, npm run dev</p>
            <p> - Make sure you have an admin and user login in the database</p>
            <p> - Change the url link in apiFacade.js to fit your backend</p>
        </div>
    );
}

export default Welcome;