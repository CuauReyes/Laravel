import React, { Component } from "react";
import "./Device.scss";
import axios from "axios";
import Header from "../Header/Header";

export default class Device extends Component {
	constructor() {
		super();
		this.state = {
			device: []
		};
	}

	componentDidMount() {
		const { deviceId } = this.props.match.params;
		axios.get(api.devices.get(deviceId)).then(response => {
			this.setState({
				device: response.data
			});
		});
	}

	render() {
		const { device } = this.state;
		return (
			<div>
				<Header />
				<div className="container-fluid mt-5">
					<div className="row justify-content-center">
						<div className="col-md-8">
							{device.map((device, key) => (
								<p>Localización: {device}</p>
							))}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
