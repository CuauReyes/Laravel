require("./bootstrap");

import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Router, Route } from "react-router";
import Home from "./Components/Home/Home";
import Plants from "./Components/Plants/Plants";
import createBrowserHistory from "history/createBrowserHistory";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";

const history = createBrowserHistory();

class App extends Component {
	render() {
		return (
			<Router history={history} className="App">
				<div id="main">
					<Route exact path="/" component={Home} />
					<Route exact path="/plants" component={Plants} />
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
