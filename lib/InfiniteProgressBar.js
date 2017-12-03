'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var tickInterval = 10;
var modes = {
	fill: 0,
	rotate: 1
};
var percentIncrease = .005;
var rotationIncrease = 1.75;

var Home = function (_React$Component) {
	_inherits(Home, _React$Component);

	_createClass(Home, null, [{
		key: 'propTypes',
		get: function get() {
			return {
				color: _propTypes2.default.string,
				backgroundColor: _propTypes2.default.string
			};
		}
	}, {
		key: 'defaultProps',
		get: function get() {
			return {
				color: "cornflowerblue",
				backgroundColor: "white"
			};
		}
	}]);

	function Home(props) {
		_classCallCheck(this, Home);

		return _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).call(this, props));
	}

	_createClass(Home, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.setState({
				color: this.props.color,
				backgroundColor: this.props.backgroundColor,
				mode: modes.fill,
				percentProgress: 0,
				rotation: 0,
				interval: setInterval(this.timerTick.bind(this), tickInterval) });
		}
	}, {
		key: 'render',
		value: function render() {

			if (!this.state) {
				return null;
			}

			var transform = 'rotate(' + (this.state.rotation || 0) + 'deg)';
			var widthPercent = 100 * (this.state.percentProgress || 0);
			var indicatorStyle = {
				width: widthPercent + '%',
				backgroundColor: this.state.color
			};

			var backgroundStyle = {
				transform: transform,
				backgroundColor: this.state.backgroundColor
			};

			var dropShadowStyle = {
				transform: transform
			};

			return _react2.default.createElement(
				'div',
				{ className: 'InfiniteProgressBar' },
				_react2.default.createElement('div', { className: 'drop-shadow', style: dropShadowStyle }),
				_react2.default.createElement(
					'div',
					{ className: 'progress-background', style: backgroundStyle },
					_react2.default.createElement('div', { className: 'progress-indicator', style: indicatorStyle })
				)
			);
		}
	}, {
		key: 'timerTick',
		value: function timerTick() {
			if (this.state.mode === modes.fill) {
				var percentProgress = this.state.percentProgress + percentIncrease;
				if (percentProgress >= 1) {
					this.setState({
						percentProgress: 1,
						mode: modes.rotate
					});
				} else {
					this.setState({
						percentProgress: percentProgress
					});
				}
			} else {
				var rotation = this.state.rotation + rotationIncrease;
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
	}]);

	return Home;
}(_react2.default.Component);

exports.default = Home;