import React from 'react';
import PropTypes from 'prop-types';

const tickInterval = 10;
const modes = {
	fill: 0,
	rotate: 1
};
const percentIncrease = .005;
const rotationIncrease = 1.75;

export default class Home extends React.Component {

	static get propTypes() {
		return {
			color: PropTypes.string,
			backgroundColor: PropTypes.string
		}
	}

	static get defaultProps() {
		return {
			color: "cornflowerblue",
			backgroundColor: "white"
		}
	}

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.setState({
			color: this.props.color,
			backgroundColor: this.props.backgroundColor,
			mode: modes.fill,
			percentProgress: 0, 
			rotation: 0,
			interval: setInterval((this.timerTick.bind(this)), tickInterval)});
	}

	render() {

		if (!this.state) {
			return null;
		}

		const transform = `rotate(${this.state.rotation || 0}deg)`;
		const widthPercent = 100 * (this.state.percentProgress || 0);
		const indicatorStyle = {
			width: `${widthPercent}%`,
			backgroundColor: this.state.color
		};

		const backgroundStyle = {
			transform: transform,
			backgroundColor: this.state.backgroundColor
		}

		const dropShadowStyle = {
			transform: transform
		}

		return (
			<div className="InfiniteProgressBar">
					<div className="drop-shadow" style={dropShadowStyle}></div>
					<div className="progress-background" style={backgroundStyle}>
						<div className="progress-indicator" style={indicatorStyle}></div>
					</div>
			</div>
		);
	}

	timerTick() {
		if (this.state.mode === modes.fill) {
			const percentProgress = this.state.percentProgress + percentIncrease;
			if (percentProgress >= 1) {
				this.setState({
					percentProgress: 1,
					mode: modes.rotate,
				})
			} else {
				this.setState({
					percentProgress: percentProgress,
				});
			}
		} else {
			const rotation = this.state.rotation + rotationIncrease;
			if (rotation > 180) {
				this.setState({
					rotation: 0,
					mode: modes.fill,
					color: this.state.backgroundColor,
					backgroundColor: this.state.color,
					percentProgress: 0
				});
			} else {
				this.setState({
					rotation: rotation
				});
			}
		}
	}
}
