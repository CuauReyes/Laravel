require("./bootstrap");

import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Router, Route } from "react-router";
import createBrowserHistory from "history/createBrowserHistory";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import Admin from "./components/Admin/Admin";
import User from "./components/User/User";
import Plants from "./Components/Plants/Plants";
import Plant from "./Components/Plant/Plant";
import Device from "./Components/Device/Device";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./components/Profile/Profile";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
	faMicrochip,
	faBatteryEmpty,
	faBatteryFull,
	faBatteryHalf,
	faBatteryQuarter,
	faBatteryThreeQuarters,
	faCheckCircle,
	faExclamationTriangle,
	faPowerOff,
	faBolt,
	faWifi,
	faClock,
	faCheck
} from "@fortawesome/free-solid-svg-icons";
library.add(
	faMicrochip,
	faBatteryEmpty,
	faBatteryFull,
	faBatteryHalf,
	faBatteryQuarter,
	faBatteryThreeQuarters,
	faCheckCircle,
	faExclamationTriangle,
	faPowerOff,
	faBolt,
	faWifi,
	faClock,
	faCheck
);

const history = createBrowserHistory();

class App extends Component {
	render() {
		return (
			<Router history={history} className="App">
				<div id="main">
					<PrivateRoute exact path="/" component={Plants} />
					<PrivateRoute exact path="/plants" component={Plants} />
					<PrivateRoute exact path="/plants/:plantId" component={Plant} />
					<PrivateRoute exact path="/device/:deviceId" component={Device} />
					<PrivateRoute exact path="/admin" component={Admin} />
					<PrivateRoute exact path="/user/:userId" component={User} />
					<PrivateRoute exact path="/profile" component={Profile} />
					<Route exact default path="/login" component={SignIn} />
					<Route exact path="/register" component={SignUp} />
				</div>
			</Router>
		);
	}
}

if (document.getElementById("app")) {
	ReactDOM.render(<App />, document.getElementById("app"));
}
