import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Chart.scss";

import {
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Brush,
	AreaChart,
	Area
} from "recharts";

class ChartDevice extends Component {
	constructor(props) {
		super(props);
		this.state = {
			width: 800
		};
		this.onResize = this.onResize.bind(this);
	}

	componentDidMount() {
		let width = document.getElementById("chart").clientWidth;
		this.setState({
			width
		});
		window.addEventListener("resize", this.onResize, false);
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.onResize, false);
	}

	onResize() {
		let width = document.getElementById("chart").clientWidth;
		this.setState({
			width
		});
	}

	typeChart(type) {
		switch (type) {
			case "ON-OFF":
				return "step";
			case "OPEN-CLOSED":
				return "step";
			case "TEMPERATURE A":
				return "natural";
			case "COUNTER":
				return "linear";
		}
	}

	parseDate(type, data) {
		switch (type) {
			case "COUNTER":
				let sum;
				return (data = data.map((elem, index) => {
					sum = (sum || 0) + elem.value;
					return {
						name: elem.name,
						value: sum
					};
				}));
		}
	}

	render() {
		const { width } = this.state;
		const { values, type } = this.props;
		let data = [];
		values.forEach(val => {
			data.push({
				name: new Date(val.created_at).toString(),
				value: +val.value
			});
		});

		data = this.parseDate(type, data);

		return (
			<div className="row">
				<div className="row col-sm-12 justify-content-center">
					<AreaChart
						width={width}
						height={400}
						data={data}
						syncId="anyId"
						baseValue={"dataMin"}
						margin={{
							top: 20,
							right: 20,
							left: 20,
							bottom: 20
						}}
					>
						<defs>
							<linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
								<stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
							</linearGradient>
						</defs>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Area
							type={this.typeChart(type)}
							dataKey="value"
							stroke="#8884d8"
							dot={true}
							isAnimationActive={true}
							animationEasing={"linear"}
							baseLine={8}
							fillOpacity={1}
							fill="url(#colorValue)"
						/>
						<Brush data={data} />
					</AreaChart>
				</div>
			</div>
		);
	}
}

ChartDevice.propTypes = {
	values: PropTypes.array,
	type: PropTypes.string
};

export default ChartDevice;
