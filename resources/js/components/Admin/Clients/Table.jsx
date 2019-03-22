import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactTable from "react-table";
import "react-table/react-table.css";
import matchSorter from "match-sorter";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { api } from "../../../const/api";
import Axios from "axios";

export default class ClientsTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showEnabled: false,
			showDisabled: false,
			showDeleted: false
		};
		this.handleClose = this.handleClose.bind(this);
		this.setUserOn = this.setUserOn.bind(this);
		this.setUserOff = this.setUserOff.bind(this);
		this.deleteUser = this.deleteUser.bind(this);
	}

	deleteUser(id) {
		Axios.delete(api.users.get(id)).then(response => {
			this.setState({
				showDisabled: true
			});
		});
	}

	setUserOn(id) {
		Axios.put(api.users.get(id) + "/ON").then(response => {
			this.setState({
				showEnabled: true
			});
		});
	}

	setUserOff(id) {
		Axios.put(api.users.get(id) + "/OFF").then(response => {
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
		const { users } = this.props;

		return (
			<span>
				<Card className="mt-5">
					<Card.Header>
						<Card.Title>Todos Los Clientes</Card.Title>
					</Card.Header>
					<Card.Body>
						<p>
							La siguiente tabla muestra todos los clientes registrados hasta el
							momento
						</p>
						<ReactTable
							data={users}
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
									Header: "Email",
									id: "email",
									accessor: d => d.email,
									filterMethod: (filter, rows) =>
										matchSorter(rows, filter.value, { keys: ["email"] }),
									filterAll: true
								},
								{
									Header: "Estado",
									id: "status",
									accessor: d => d.status,
									filterMethod: (filter, rows) =>
										matchSorter(rows, filter.value, { keys: ["status"] }),
									filterAll: true,
									maxWidth: 50
								},
								{
									Header: "Creado",
									id: "created_at",
									accessor: d => d.created_at,
									filterMethod: (filter, rows) =>
										matchSorter(rows, filter.value, { keys: ["created_at"] }),
									filterAll: true
								},
								{
									Header: "Acciones",
									accessor: "_id",
									Cell: row => (
										<div>
											<Button type="button" variant="secondary">
												<Link to={"/user/" + row.value}>Ver más</Link>
											</Button>
											<Button type="button" className="btn btn-light">
												<Link to={"/user/" + row.value}>Modificar</Link>
											</Button>
											<Button
												type="button"
												variant="success"
												data-toggle="modal"
												data-target="#habilitar"
												onClick={() => this.setUserOn(row.value)}
											>
												Habilitar
											</Button>
											<Button
												type="button"
												variant="warning"
												data-toggle="modal"
												data-target="#deshabilitar"
												onClick={() => this.setUserOff(row.value)}
											>
												Deshabilitar
											</Button>
											<Button
												type="button"
												variant="danger"
												data-toggle="modal"
												data-target="#eliminar"
												onClick={() => this.deleteUser(row.value)}
											>
												Eliminar
											</Button>
										</div>
									),
									filterAll: false,
									minWidth: 400
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
