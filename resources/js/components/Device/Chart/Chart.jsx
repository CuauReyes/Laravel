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
	event,
	zoomIdentity
} from "d3";

export default class ChartDevice extends Component {
	constructor(props) {
		super(props);
		this.createChart = this.createChart.bind(this);
	}

	componentDidMount() {
		const { values } = this.props;
		let data = [];
		values.forEach(val => {
			data.push({ date: new Date(val.created_at), value: +val.value });
		});
		setTimeout(() => {
			this.createChart(data);
		}, 500);
	}
	componentDidUpdate() {
		const { values } = this.props;
		let data = [];
		values.forEach(val => {
			data.push({ date: new Date(val.created_at), value: +val.value });
		});
		setTimeout(() => {
			this.createChart(data);
		}, 500);
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

		y.domain([0, max(data, d => d.value)]);
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

	render() {
		return <svg className="chart" width="900" height="500" />;
	}
}
