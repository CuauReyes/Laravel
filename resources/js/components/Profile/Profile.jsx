import React, { Component } from "react";
import "./Profile.scss";
import { api } from "../../const/api";
import axios from "axios";
import Header from "../Header/Header";

export default class Profile extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="device">
				<Header />
				<div className="container-fluid pt-3">Profile</div>
			</div>
		);
	}
}
