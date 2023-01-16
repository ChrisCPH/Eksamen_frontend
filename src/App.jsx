import React, {useRef, useState} from 'react';
import {Route, Routes} from "react-router-dom";
import facade from "./utils/apiFacade.js";
import Header from "./components/Header.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import Welcome from "./pages/Welcome.jsx"
import Projects from './pages/Projects.jsx';
import ProjectInvoice from './pages/ProjectInvoice.jsx';
import Developers from './pages/Developers.jsx';
import DevProjects from './pages/ProjectHours';

function App(props) {

    const [loggedIn, setLoggedIn] = useState(false)

    return (
        <>
            <Header setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>
            <Routes>
                <Route path="/" element={<Welcome/>}/>
                <Route path="/Projects" element={facade.hasUserAccess('admin', loggedIn) ? <Projects/> : <Welcome/>}/>
                <Route path="/ProjectInvoice" element={facade.hasUserAccess('admin', loggedIn) ? <ProjectInvoice/> : <Welcome/>}/>
                <Route path="/Developers" element={facade.hasUserAccess('admin', loggedIn) ? <Developers/> : <Welcome/>}/>
                <Route path="/DevProjects" element={loggedIn ? <DevProjects/> : <Welcome/>}/>
                <Route path="*" element={<h1>Page Not Found !!!!</h1>}/>
            </Routes>
        </>
    );
}


export default App;