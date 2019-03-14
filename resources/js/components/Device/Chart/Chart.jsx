import React, { Component } from "react";
import "./Chart.scss";
import {
	select,
	scaleTime,
	scaleLinear,
	axisBottom,
	axisLeft,
	zoom,
	brushX,
	area,
	curveMonotoneX,
	extent,
	max,
	min,
	event,
	zoomIdentity
} from "d3";

import { Chart } from "react-charts";

import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	Brush,
	AreaChart,
	Area
} from "recharts";
export default class ChartDevice extends Component {
	constructor(props) {
		super(props);
		this.state = {
			width: 800,
			max: null,
			min: null
		};
		this.createChart = this.createChart.bind(this);
		this.brush = this.brush.bind(this);
	}

	componentDidMount() {
		let width = document.getElementById("chart").clientWidth;
		this.setState({
			width
		});

		const { values } = this.props;
		let data = [];
		data.push({ date: new Date(), value: 0 });
		values.forEach(val => {
			data.push({ date: new Date(val.created_at), value: +val.value });
		});
		// data.push({ date: new Date(), value: 0 });
		this.createChart(data);
	}
	componentDidUpdate() {
		const { values } = this.props;
		let data = [];
		values.forEach(val => {
			data.push({ date: new Date(val.created_at), value: +val.value });
		});
		// data.push({ date: new Date(), value: 0 });
		// this.createChart(data);
	}

	createChart(data) {
		let svg = select(".chart");
		let margin = { top: 20, right: 20, bottom: 110, left: 40 },
			margin2 = { top: 430, right: 20, bottom: 30, left: 40 },
			width = +svg.attr("width") - margin.left - margin.right,
			height = +svg.attr("height") - margin.top - margin.bottom,
			height2 = +svg.attr("height") - margin2.top - margin2.bottom;

		let x = scaleTime().range([0, width]),
			x2 = scaleTime().range([0, width]),
			y = scaleLinear().range([height, 0]),
			y2 = scaleLinear().range([height2, 0]);

		let xAxis = axisBottom(x),
			xAxis2 = axisBottom(x2),
			yAxis = axisLeft(y);

		let brush = brushX()
			.extent([[0, 0], [width, height2]])
			.on("brush end", brushed);

		let zoomVar = zoom()
			.scaleExtent([1, Infinity])
			.translateExtent([[0, 0], [width, height]])
			.extent([[0, 0], [width, height]])
			.on("zoom", zoomed);

		let area1 = area()
			.curve(curveMonotoneX)
			.x(d => x(d.date))
			.y0(height)
			.y1(d => y(d.value));

		let area2 = area()
			.curve(curveMonotoneX)
			.x(d => x2(d.date))
			.y0(height2)
			.y1(d => y2(d.value));

		svg
			.enter()
			.append("path")
			.attr("class", "data-line")
			.attr("width", width)
			.attr("height", height)

			.append("defs")
			.append("clipPath")
			.attr("id", "clip")

			.append("rect")
			.attr("width", width)
			.attr("height", height);

		let focus = svg
			.append("g")
			.attr("class", "focus")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		let context = svg
			.append("g")
			.attr("class", "context")
			.attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

		x.domain(extent(data, d => d.date));

		y.domain([min(data, d => d.value), max(data, d => d.value)]);
		x2.domain(x.domain());
		y2.domain(y.domain());

		focus
			.append("path")
			.datum(data)
			.attr("class", "area")
			.attr("d", area1);

		focus
			.append("g")
			.attr("class", "axis axis--x")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis);

		focus
			.append("g")
			.attr("class", "axis axis--y")
			.call(yAxis);

		context
			.append("path")
			.datum(data)
			.attr("class", "area")
			.attr("d", area2);

		context
			.append("g")
			.attr("class", "axis axis--x")
			.attr("transform", "translate(0," + height2 + ")")
			.call(xAxis2);

		context
			.append("g")
			.attr("class", "brush")
			.call(brush)
			.call(brush.move, x.range());

		svg
			.append("rect")
			.attr("class", "zoom")
			.attr("width", width)
			.attr("height", height)
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
			.call(zoomVar);

		function brushed() {
			if (event.sourceEvent && event.sourceEvent.type === "zoom") return;
			let s = event.selection || x2.range();
			x.domain(s.map(x2.invert, x2));
			focus.select(".area").attr("d", area1);
			focus.select(".axis--x").call(xAxis);
			svg
				.select(".zoom")
				.call(
					zoomVar.transform,
					zoomIdentity.scale(width / (s[1] - s[0])).translate(-s[0], 0)
				);
		}

		function zoomed() {
			if (event.sourceEvent && event.sourceEvent.type === "brush") return;
			let t = event.transform;
			x.domain(t.rescaleX(x2).domain());
			focus.select(".area").attr("d", area1);
			focus.select(".axis--x").call(xAxis);
			context.select(".brush").call(brush.move, x.range().map(t.invertX, t));
		}
	}

	brush(brushData) {
		this.setState({
			min: Math.min(brushData.start, brushData.end),
			max: Math.max(brushData.start, brushData.end)
		});
	}

	render() {
		const { width, max, min } = this.state;
		const { values } = this.props;
		let data2 = [];
		let data = [];
		values.forEach(val => {
			data2.push({ name: new Date(val.created_at), value: +val.value });
			data.push([new Date(val.created_at), +val.value]);
		});
		// data.push([new Date(), 0]);
		// data2.push({ date: new Date(), value: 0 });

		return (
			<div className="row">
				<div className="row col-sm-12 justify-content-center">
					<div style={{ width, height: "350px" }}>
						<Chart
							data={[
								{
									label: "Series 1",
									data: data
								}
							]}
							axes={[
								{
									primary: true,
									type: "time",
									position: "bottom",
									hardMin: min,
									hardMax: max
								},
								{ type: "linear", position: "left" }
							]}
							primaryCursor
							secondaryCursor
							tooltip
							brush={{
								onSelect: this.brush
							}}
						/>
					</div>
				</div>
				<div className="row col-sm-12 justify-content-center">
					<svg className="chart" width={width} height="500" />
				</div>
				<div className="row col-sm-12 justify-content-center">
					<LineChart
						width={width}
						height={400}
						data={data2}
						syncId="anyId"
						margin={{
							top: 10,
							right: 30,
							left: 0,
							bottom: 0
						}}
					>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Line
							type="monotone"
							dataKey="value"
							stroke="#82ca9d"
							fill="#82ca9d"
						/>
						<Brush data={data2} />
					</LineChart>
				</div>
			</div>
		);
	}
}
