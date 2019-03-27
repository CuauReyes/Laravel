import React, { Component } from "react";
import ReactTable from "react-table";
import PropTypes from "prop-types";
import "./History.scss";
import "react-table/react-table.css";

export default class HistoryDevice extends Component {
	static propTypes = {
		values: PropTypes.arrayOf(
			PropTypes.shape({
				created_at: PropTypes.string,
				value: PropTypes.number,
				count: PropTypes.number,
				_id: PropTypes.string
			})
		)
	};

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
