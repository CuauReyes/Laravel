import React, { Component } from "react";
import "./Chart.scss";
import { Chart } from "react-charts";

export default class ChartDevice extends Component {
	render() {
		const { values } = this.props;
		let data = [[new Date(), 0]];
		values.forEach(val => {
			data.push([new Date(val.created_at), val.value]);
		});

		return (
			<div
				style={{
					width: "100%",
					height: "300px"
				}}
			>
				<Chart
					data={[
						{
							label: "Device",
							data: data
						}
					]}
					axes={[
						{ primary: true, type: "time", position: "bottom" },
						{ type: "linear", position: "left" }
					]}
				/>
			</div>
		);
	}
}
