import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./DeviceCard.scss";

const imagesHost = window.location.origin + "/images/devices/";

export default class DeviceCard extends Component {
	static propTypes = {
		device: PropTypes.object
	};

	formatValue(type, value, values = null) {
		switch (type) {
			case "ON-OFF":
				return +value ? "ENCENDIDO" : "APAGADO";
			case "OPEN-CLOSED":
				return +value ? "ABIERTO" : "CERRADO";
			case "TEMPERATURE A":
				return +value + "º C";
			case "COUNTER":
				return +value + " activado";
		}
	}

	transformDigit(digit) {
		return digit < 10 ? "0" + digit : digit;
	}

	lastConnection(date) {
		let today = new Date();
		let last = new Date(date);

		let hour =
			this.transformDigit(last.getHours()) +
			":" +
			this.transformDigit(last.getMinutes()) +
			":" +
			this.transformDigit(last.getSeconds());

		if (today.getFullYear() === last.getFullYear()) {
			if (today.getMonth() === last.getMonth()) {
				if (today.getDate() === last.getDate()) {
					return hour;
				}
				return (
					this.transformDigit(last.getMonth() + 1) +
					"-" +
					this.transformDigit(last.getDate()) +
					" " +
					hour
				);
			}
			return (
				last.getFullYear() +
				"-" +
				this.transformDigit(last.getMonth() + 1) +
				"-" +
				this.transformDigit(last.getDate()) +
				" " +
				hour
			);
		}
	}

	render() {
		const { device } = this.props;
		let classes;
		switch (device.type) {
			case "ON-OFF":
				classes = "bg-success text-white";
				break;
			case "COUNTER":
				classes = "bg-info text-white";
				break;
			case "TEMPERATURE A":
				classes = "bg-primary text-white";
				break;
			default:
				classes = "bg-success text-white";
		}
		return (
			<Card className="plant-card">
				<Card.Header className="text-truncate d-flex flex-row">
					<div className="col-sm-9 text-truncate">
						<Link to={"/device/" + device._id}>{device.name}</Link>
						<Card.Text className="flex-fill"> {device.type} </Card.Text>
					</div>
					<div className="col-sm d-flex flex-column justify-content-center align-items-center p-0">
						<div
							className={
								"status " +
								(device.status === 0
									? "bg-success"
									: device.status === 1
									? "bg-warning"
									: "bg-danger")
							}
						/>
						<FontAwesomeIcon icon="battery-full" className="fa-2x" />
					</div>
				</Card.Header>
				<div className="d-flex flex-row justify-content-center align-items-center">
					<Card.Img variant="top" src={imagesHost + device.img} />
				</div>
				<Card.Body className="d-flex flex-column">
					<Card
						className={
							classes +
							" d-flex flex-column align-items-center text-white p-2 m-2"
						}
					>
						<span>
							Ultimo valor:{" "}
							<b>
								{device.last_value
									? this.formatValue(device.type, device.last_value.value)
									: null}
							</b>
						</span>
					</Card>

					<Card
						className={
							classes +
							" d-flex flex-column align-items-center text-white p-2 m-2 text-truncate"
						}
					>
						<span>
							Conexión:{" "}
							<b>
								{device.last_value
									? this.lastConnection(device.last_value.created_at)
									: null}
							</b>
						</span>
					</Card>
					<Card
						className={
							classes +
							" d-flex flex-column align-items-center text-white p-2 m-2"
						}
					>
						<span>
							Total de datos:{" "}
							<b>{device.last_value ? device.last_value.count : null}</b>
						</span>
					</Card>
				</Card.Body>
				<Card.Footer className="d-flex flex-row" />
			</Card>
		);
	}
}
