import React, { Component } from "react";
import "./History.scss";

import ReactTable from "react-table";
import "react-table/react-table.css";

export default class HistoryDevice extends Component {
	render() {
		const { values } = this.props;

		return (
			<ReactTable
				data={values}
				columns={[
					{
						Header: "ID",
						accessor: "count"
					},
					{
						Header: "Valor",
						accessor: "value"
					},
					{
						Header: "Fecha",
						accessor: "created_at"
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
}
