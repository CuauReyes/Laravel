require("./bootstrap");

import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Router, Route } from "react-router";
import Home from "./Components/Home/Home";
import createBrowserHistory from "history/createBrowserHistory";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import Admin from "./components/Admin/Admin";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
	faMicrochip,
	faBatteryEmpty,
	faBatteryFull,
	faBatteryHalf,
	faBatteryQuarter,
	faBatteryThreeQuarters,
	faCheckCircle,
	faExclamationTriangle
} from "@fortawesome/free-solid-svg-icons";

library.add(
	faMicrochip,
	faBatteryEmpty,
	faBatteryFull,
	faBatteryHalf,
	faBatteryQuarter,
	faBatteryThreeQuarters,
	faCheckCircle,
	faExclamationTriangle
);

const history = createBrowserHistory();

class App extends Component {
	render() {
		return (
			<Router history={history} className="App">
				<div id="main">
					<Route path="/" component={Home} />
					<Route exact path="/login" component={SignIn} />
					<Route exact path="/register" component={SignUp} />
					<Route exact path="/admin" component={Admin} />
				</div>
			</Router>
		);
	}
}

if (document.getElementById("app")) {
	ReactDOM.render(<App />, document.getElementById("app"));
}
