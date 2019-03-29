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
				showDeleted: true
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
									filterAll: true
								},
								{
									Header: "Creado",
									id: "created_at",
									filterable: false,
									accessor: d => d.created_at,
									filterMethod: (filter, rows) =>
										matchSorter(rows, filter.value, { keys: ["created_at"] })
								},
								{
									Header: "Acciones",
									columns: [
										{
											Header: "Ver más",
											accessor: "_id",
											filterable: false,
											Cell: row => (
												<Button type="button" variant="secondary">
													<Link to={"/user/" + row.value}> Ver más </Link>
												</Button>
											)
										},
										{
											Header: "Modificar",
											accessor: "_id",
											filterable: false,
											Cell: row => (
												<Button type="button" variant="light">
													<Link to={"/userEdit/" + row.value}> Modificar </Link>
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
													onClick={() => this.setUserOn(row.value)}
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
													onClick={() => this.setUserOff(row.value)}
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
													onClick={() => this.deleteUser(row.value)}
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

				<Modal centered show={this.state.showDisabled} onHide={this.handleClose}>
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
