import "./index.css";

import {useState} from "react";
import {Outlet} from "react-router-dom";


function Root() {
    const [loggedIn, setLoggedIn] = useState(false);


    return (
        <Outlet />
    );
}

export default Root;
