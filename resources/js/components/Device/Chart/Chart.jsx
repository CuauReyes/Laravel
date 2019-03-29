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
	BarChart,
	Bar,
	Legend,
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
				let sum = 0;
				return data.map(val => {
					sum += val.value;
					return {
						name: val.created_at,
						value: sum
					};
				});
			default:
				return data.map(val => ({ name: val.created_at, value: sum }));
		}
	}

	renderBarChart() {
		const { width } = this.state;
		const { values } = this.props;

		let dataTime = [];
		let base = new Date(values[0].created_at);
		let sum = 0;
		values.forEach(value => {
			if (base.getHours() !== new Date(value.created_at).getHours()) {
				dataTime.push({
					name: new Date(
						base.getFullYear(),
						base.getMonth(),
						base.getDate(),
						base.getHours()
					).toString(),
					value: sum
				});
				sum = 0;
				base = new Date(value.created_at);
			}
			sum += value.value;
		});

		return (
			<BarChart
				width={width}
				height={400}
				data={dataTime}
				margin={{
					top: 20,
					right: 20,
					left: 20,
					bottom: 20
				}}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip />
				<Bar dataKey="value" fill="#8884d8" />
				<Brush data={dataTime} />
			</BarChart>
		);
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

					{type === "COUNTER" ? this.renderBarChart() : null}
				</div>
			</div>
		);
	}
}
