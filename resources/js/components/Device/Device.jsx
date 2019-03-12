import React, { Component } from "react";
import "./Device.scss";
import axios from "axios";

export default class Device extends Component {
	constructor() {
		super();
		this.state = {
			device: []
		};
	}

	componentDidMount() {
		const { id: deviceId } = this.props.match.params;
		axios
			.get("http://localhost:8000/api/v1/devices/" + deviceId)
			.then(response => {
				this.setState({
					device: response.data
				});
			});
	}

	render() {
		const { device } = this.state;
		return (
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-md-8">
						{device.map((device, key) => (
							<p>Localización: {device}</p>
						))}
					</div>
				</div>
			</div>
		);
	}
}
