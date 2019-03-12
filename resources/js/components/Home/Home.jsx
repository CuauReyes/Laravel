import React, { Component } from "react";
import "./Home.scss";
import Header from "../Header/Header";
import Plants from "../Plants/Plants";
import Plant from "../Plant/Plant";
import Device from "../Device/Device";
import { Route } from "react-router";

export default class Home extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<Header />
				<Route exact path="/" component={Plants} />
				<Route exact path={`/plants`} component={Plants} />
				<Route exact path={`/plants/:plantId`} component={Plant} />
				<Route exact path={`/device/:deviceId`} component={Device} />
			</div>
		);
	}
}
