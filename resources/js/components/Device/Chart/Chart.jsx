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

export default class ChartDevice extends Component {
	static propTypes = {
		values: PropTypes.arrayOf(
			PropTypes.shape({
				created_at: PropTypes.string,
				value: PropTypes.number,
				count: PropTypes.number,
				_id: PropTypes.string
			})
		),
		type: PropTypes.string
	};

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
				return data.map(val => {
					sum = (sum || 0) + val.value;
					return {
						name: val.created_at,
						value: sum
					};
				});
			default:
				return data.map(val => ({ name: val.created_at, value: sum }));
		}
	}

	render() {
		const { width } = this.state;
		const { values, type } = this.props;
		let data = this.parseDate(type, values);

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
