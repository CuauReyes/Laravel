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

	renderTable(devices) {
		return (
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
						filterAll: true
					},
					{
						Header: "Tipo",
						id: "type",
						accessor: d => d.type,
						filterMethod: (filter, rows) =>
							matchSorter(rows, filter.value, { keys: ["type"] }),
						filterAll: true
					},
					{
						Header: "Descripción",
						id: "description",
						accessor: d => d.description,
						filterMethod: (filter, rows) =>
							matchSorter(rows, filter.value, { keys: ["description"] }),
						filterAll: true
					},
					{
						Header: "Imagen",
						id: "img",
						accessor: d => d.img,
						filterMethod: (filter, rows) =>
							matchSorter(rows, filter.value, { keys: ["img"] }),
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
						Header: "Añadido",
						id: "created_at",
						accessor: d => d.created_at,
						filterMethod: (filter, rows) =>
							matchSorter(rows, filter.value, { keys: ["created_at"] }),
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
										<Link to={"device/" + row.value}> Modificar </Link>
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
										onClick={() => this.setDeviceOn(row.value)}
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
										onClick={() => this.setDeviceOff(row.value)}
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
										onClick={() => this.deleteDevice(row.value)}
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
		);
	}

	render() {
		const { devices, plants } = this.props;

		let devicesTmp = devices;
		if (plants) {
			devicesTmp = [];
			plants.forEach(plant =>
				plant.devices.forEach(device => devicesTmp.push(device))
			);
		}

		return (
			<Card className="mt-5">
				<Card.Header>
					<Card.Title>Todos Los Devices</Card.Title>
				</Card.Header>
				<Card.Body>
					{devicesTmp ? this.renderTable(devicesTmp) : null}
				</Card.Body>
			</Card>
		);
	}
}
