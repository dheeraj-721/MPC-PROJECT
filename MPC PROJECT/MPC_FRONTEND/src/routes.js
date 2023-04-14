import React from "react";
import KeyGen1 from "./KeyGen1";
import Sign1 from "./Sign1";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Verify from "./verify";
import Popup from "./popup";

const Routing = () => {
    return (<Router><Routes>
        <Route path="/" element={<KeyGen1 />}></Route>
        <Route path="/Signing" element={<Sign1 />}></Route>
        <Route path="/verification" element={<Verify />}></Route>
        <Route path="/popup" element={<Popup />}></Route>
    </Routes></Router >
    )

}
export default Routing;