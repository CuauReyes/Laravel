import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactTable from "react-table";
import "react-table/react-table.css";
import matchSorter from "match-sorter";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Axios from "axios";
import { api } from "../../../const/api";

export default class DevicesTable extends Component {
	deleteDevice(id) {
		Axios.delete(api.devices.get(id)).then(response => {});
	}

	setDeviceOn(id) {
		Axios.put(api.devices.get(id) + "/ON").then(response => {});
	}

	setDeviceOff(id) {
		Axios.put(api.devices.get(id) + "/OFF").then(response => {});
	}

	render() {
		const { devices } = this.props;

		return (
			<Card className="mt-5">
				<Card.Header>
					<Card.Title>Todos Los Devices</Card.Title>
				</Card.Header>
				<Card.Body>
					<ReactTable
						data={devices}
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
								filterAll: true,
								maxWidth: 180
							},
							{
								Header: "Tipo",
								id: "type",
								accessor: d => d.type,
								filterMethod: (filter, rows) =>
									matchSorter(rows, filter.value, { keys: ["type"] }),
								filterAll: true,
								maxWidth: 150
							},
							{
								Header: "Descripción",
								id: "description",
								accessor: d => d.description,
								filterMethod: (filter, rows) =>
									matchSorter(rows, filter.value, { keys: ["description"] }),
								filterAll: true,
								maxWidth: 150
							},
							{
								Header: "Imagen",
								id: "img",
								accessor: d => d.img,
								filterMethod: (filter, rows) =>
									matchSorter(rows, filter.value, { keys: ["img"] }),
								filterAll: true,
								maxWidth: 150
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
								Header: "Añadido",
								id: "created_at",
								accessor: d => d.created_at,
								filterMethod: (filter, rows) =>
									matchSorter(rows, filter.value, { keys: ["created_at"] }),
								filterAll: true,
								maxWidth: 180
							},
							{
								Header: "Acciones",
								accessor: "_id",
								Cell: row => (
									<div>
										<Button type="button" variant="light">
											<Link to={"/user/" + row.value}>Modificar</Link>
										</Button>
										<Button
											type="button"
											variant="success"
											data-toggle="modal"
											data-target="#habilitar"
											onClick={() => this.setDeviceOn(row.value)}
										>
											Habilitar
										</Button>
										<Button
											type="button"
											variant="warning"
											data-toggle="modal"
											data-target="#deshabilitar"
											onClick={() => this.setDeviceOff(row.value)}
										>
											Deshabilitar
										</Button>
										<Button
											type="button"
											variant="danger"
											data-toggle="modal"
											data-target="#eliminar"
											onClick={() => this.deleteDevice(row.value)}
										>
											Eliminar
										</Button>
									</div>
								),
								filterAll: false,
								maxWidth: 400
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
		);
	}
}
