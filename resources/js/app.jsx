require("./bootstrap");

import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Router, Route } from "react-router";
import Home from "./Components/Home/Home";
import Plants from "./Components/Plants/Plants";
import createBrowserHistory from "history/createBrowserHistory";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
<<<<<<< HEAD
import Admin from "./components/Admin/Admin";
=======
import Plant from "./components/Plant/Plant";
import Header from "./components/Header/Header";
>>>>>>> 110de7bcfe8125ff4be49aa052e1959b06b7f4ea

const history = createBrowserHistory();

class App extends Component {
	render() {
		return (
			<Router history={history} className="App">
				<div id="main">
					<Header />
					<Route exact path="/" component={Home} />
					<Route exact path="/plants" component={Plants} />
					<Route exact path="/plants/:id" component={Plant} />
					<Route exact default path="/login" component={SignIn} />
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
