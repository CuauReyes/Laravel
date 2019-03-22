import React, { Component } from "react";
import { api } from "../../../const/api";
import { Link } from "react-router-dom";
import ReactTable from "react-table";
import "react-table/react-table.css";
import matchSorter from "match-sorter";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Axios from "axios";

export default class PlantsTable extends Component {
	deletePlant(id) {
		Axios.delete(api.plants.get(id)).then(response => {});
	}

	setPlantOn(id) {
		Axios.put(api.plants.get(id) + "/ON").then(response => {});
	}

	setPlantOff(id) {
		Axios.put(api.plants.get(id) + "/OFF").then(response => {});
	}

	render() {
		const { plants } = this.props;

		return (
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
								accessor: "_id",
								Cell: row => (
									<div>
										<Button type="button" variant="light">
											<Link to={"/user/" + row.value}> Modificar </Link>
										</Button>
										<Button
											type="button"
											variant="success"
											data-toggle="modal"
											data-target="#habilitar"
											onClick={() => this.setPlantOn(row.value)}
										>
											Habilitar
										</Button>
										<Button
											type="button"
											variant="warning"
											data-toggle="modal"
											data-target="#deshabilitar"
											onClick={() => this.setPlantOff(row.value)}
										>
											Deshabilitar
										</Button>
										<Button
											type="button"
											variant="danger"
											data-toggle="modal"
											data-target="#eliminar"
											onClick={() => this.deletePlant(row.value)}
										>
											Eliminar
										</Button>
									</div>
								)
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
