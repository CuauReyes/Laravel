import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import defaultImg from "./microchip.svg";
import "./DeviceCard.scss";

const imagesHost = "https://www.note-iiot.com/app.note-iiot.com/images/";

export default class DeviceCard extends Component {
	static propTypes = {
		device: PropTypes.shape({
			_id: PropTypes.string.isRequired,
			created_at: PropTypes.string,
			devices: PropTypes.array,
			url: PropTypes.string,
			key: PropTypes.string,
			name: PropTypes.string,
			status: PropTypes.string,
			img: PropTypes.string,
			counter: PropTypes.number,
			type: PropTypes.string,
			last_value: PropTypes.object
		})
	};

	formatValue(type, value, device) {
		switch (type) {
			case "ON-OFF":
				return +value ? "ENCENDIDO" : "APAGADO";
			case "OPEN-CLOSED":
				return +value ? "ABIERTO" : "CERRADO";
			case "TEMPERATURE A":
				return +value + "º C";
			case "COUNTER":
				return device.counter + " veces";
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
		return "No hay información";
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
								"status " + (device.status == 1 ? "bg-success" : "bg-danger")
							}
						/>
						<FontAwesomeIcon icon="battery-full" className="fa-2x" />
					</div>
				</Card.Header>
				<div className="d-flex flex-row justify-content-center align-items-center">
					{device.img ? (
						<Link to={"/device/" + device._id}>
							<Card.Img variant="top" src={imagesHost + device.img} />
						</Link>
					) : (
						<Link to={"/device/" + device._id}>
							<Card.Img variant="top" src={defaultImg} />
						</Link>
					)}
				</div>
				<Card.Body className="d-flex flex-column">
					<Card
						className={
							classes +
							" d-flex flex-column align-items-center text-white p-2 m-2"
						}
					>
						<span>
							{device.type === "COUNTER"
								? "Veces activado: "
								: "Ultimo valor: "}
							<b>
								{device.last_value
									? this.formatValue(
											device.type,
											device.last_value.value,
											device
									  )
									: "No hay datos"}
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
									: "No hay datos"}
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
							<b>
								{device.last_value ? device.last_value.count : "No hay datos"}
							</b>
						</span>
					</Card>
				</Card.Body>
				<Card.Footer className="d-flex flex-row" />
			</Card>
		);
	}
}
