import React, { Component } from "react";
import { api } from "../../../const/api";
import { Link } from "react-router-dom";
import ReactTable from "react-table";
import "react-table/react-table.css";
import matchSorter from "match-sorter";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Axios from "axios";
import PropTypes from "prop-types";

export default class PlantsTable extends Component {
	static propTypes = {
		plants: PropTypes.array
	};

	constructor(props) {
		super(props);
		this.state = {
			showEnabled: false,
			showDisabled: false,
			showDeleted: false
		};
		this.handleClose = this.handleClose.bind(this);
		this.setPlantOn = this.setPlantOn.bind(this);
		this.setPlantOff = this.setPlantOff.bind(this);
		this.deletePlant = this.deletePlant.bind(this);
	}

	deletePlant(id) {
		Axios.delete(api.plants.get(id)).then(response => {
			this.setState({
				showDisabled: true
			});
		});
	}

	setPlantOn(id) {
		Axios.put(api.plants.get(id) + "/ON").then(response => {
			this.setState({
				showEnabled: true
			});
		});
	}

	setPlantOff(id) {
		Axios.put(api.plants.get(id) + "/OFF").then(response => {
			this.setState({
				showDisabled: true
			});
		});
	}

	async handleClose() {
		await this.props.loadData();
		this.setState({
			showEnabled: false,
			showDisabled: false,
			showDeleted: false
		});
	}

	render() {
		const { plants } = this.props;

		return (
			<span>
				<Card className="mt-5">
					<Card.Header>
						<Card.Title>Todas Las Plantas</Card.Title>
					</Card.Header>
					<Card.Body>
						<ReactTable
							data={plants}
							filterable
							defaultFilterMethod={(filter, row) =>
								String(row[filter.id]) === filter.value
							}
							columns={[
								{
									Header: "Nombre",
									id: "name",
									accessor: d => d.name,
									filterMethod: (filter, rows) =>
										matchSorter(rows, filter.value, { keys: ["name"] }),
									filterAll: true
								},
								{
									Header: "Localización",
									id: "location",
									accessor: d => d.location,
									filterMethod: (filter, rows) =>
										matchSorter(rows, filter.value, { keys: ["location"] }),
									filterAll: true
								},
								{
									Header: "Url",
									id: "url",
									accessor: d => d.url,
									filterMethod: (filter, rows) =>
										matchSorter(rows, filter.value, { keys: ["url"] }),
									filterAll: true
								},
								{
									Header: "Key",
									id: "key",
									accessor: d => d.key,
									filterMethod: (filter, rows) =>
										matchSorter(rows, filter.value, { keys: ["key"] }),
									filterAll: true
								},
								{
									Header: "Estado",
									id: "status",
									accessor: d => d.status,
									filterMethod: (filter, rows) =>
										matchSorter(rows, filter.value, { keys: ["status"] }),
									filterAll: true
								},
								{
									Header: "Acciones",
									columns: [
										{
											Header: "Modificar",
											accessor: "_id",
											filterable: false,
											Cell: row => (
												<Button type="button" variant="light">
													<Link to={"plant/" + row.value}> Modificar </Link>
												</Button>
											)
										},
										{
											Header: "Habilitar",
											accessor: "_id",
											filterable: false,
											Cell: row => (
												<Button
													type="button"
													variant="success"
													onClick={() => this.setPlantOn(row.value)}
												>
													Habilitar
												</Button>
											)
										},
										{
											Header: "Deshabilitar",
											accessor: "_id",
											filterable: false,
											Cell: row => (
												<Button
													type="button"
													variant="warning"
													onClick={() => this.setPlantOff(row.value)}
												>
													Deshabilitar
												</Button>
											)
										},
										{
											Header: "Eliminar",
											accessor: "_id",
											filterable: false,
											Cell: row => (
												<Button
													type="button"
													variant="danger"
													onClick={() => this.deletePlant(row.value)}
												>
													Eliminar
												</Button>
											)
										}
									]
								}
							]}
							defaultPageSize={10}
							className="-striped -highlight"
							previousText="Anterior"
							nextText="Siguiente"
							loadingText="Cargando..."
							noDataText="Datos no encontrados"
							pageText="Página"
							ofText="de"
							rowsText="filas"
							pageSizeOptions={[25, 50, 100]}
						/>
					</Card.Body>
				</Card>

				<Modal centered show={this.state.showEnabled} onHide={this.handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>NoTE Admin</Modal.Title>
					</Modal.Header>

					<Modal.Body>Habilitación correcta...</Modal.Body>

					<Modal.Footer>
						<Button type="button" variant="primary" onClick={this.handleClose}>
							Cerrar
						</Button>
					</Modal.Footer>
				</Modal>

				<Modal
					centered
					show={this.state.showDisabled}
					onHide={this.handleClose}
				>
					<Modal.Header closeButton>
						<Modal.Title>NoTE Admin</Modal.Title>
					</Modal.Header>

					<Modal.Body>Deshabilitación correcta...</Modal.Body>

					<Modal.Footer>
						<Button type="button" variant="primary" onClick={this.handleClose}>
							Cerrar
						</Button>
					</Modal.Footer>
				</Modal>
				<Modal centered show={this.state.showDeleted} onHide={this.handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>NoTE Admin</Modal.Title>
					</Modal.Header>

					<Modal.Body>Registro eliminado...</Modal.Body>

					<Modal.Footer>
						<Button type="button" variant="primary" onClick={this.handleClose}>
							Cerrar
						</Button>
					</Modal.Footer>
				</Modal>
			</span>
		);
	}
}
