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

/**
 *
 * Dragger
 *
 */

var Dragger = function (_React$PureComponent) {
  _inherits(Dragger, _React$PureComponent);

  // eslint-disable-line react/prefer-stateless-function
  function Dragger(props) {
    _classCallCheck(this, Dragger);

    var _this = _possibleConstructorReturn(this, (Dragger.__proto__ || Object.getPrototypeOf(Dragger)).call(this, props));

    _this.onDragStart = function (x, y) {
      _this.setState({
        dragging: true,
        startPoint: {
          x: x,
          y: y
        },
        position: {
          top: _this.props.position.top,
          left: _this.props.position.left
        }
      });

      _this.props.onStart();
    };

    _this.onDrag = function (x, y) {
      if (_this.state.dragging && _this.state.startPoint) {
        var currentLocation = {
          x: x,
          y: y
        };

        var diff = {
          dx: _this.state.startPoint.x - currentLocation.x,
          dy: _this.state.startPoint.y - currentLocation.y
        };

        if (_this.props.inverted) {
          diff.dx = -diff.dx;
          diff.dy = -diff.dy;
        }

        _this.props.onDrag({
          left: _this.state.position.left - diff.dx,
          top: _this.state.position.top - diff.dy
        });
      }
    };

    _this.onDragEnd = function () {
      _this.reset(_this.props.target, false);
      _this.setState({
        dragging: false,
        startPoint: null
      });
      _this.props.onEnd();
    };

    _this.bind = function (ref) {
      if (ref) {
        ref.addEventListener('mousedown', _this.onMouseDown);
        ref.addEventListener('touchstart', _this.onTouchStart);
        _this.setState({
          bound: true
        });
      }
    };

    _this.reset = function (ref) {
      var removeDown = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (ref) {
        if (removeDown) {
          ref.removeEventListener('mousedown', _this.onMouseDown);
          ref.removeEventListener('touchstart', _this.onTouchStart);
        }
        ref.removeEventListener('mousemove', _this.onMouseMove);
        ref.removeEventListener('touchmove', _this.onTouchMove);
        ref.removeEventListener('mouseup', _this.onDragEnd);
      }
    };

    _this.onTouchStart = function (e) {
      if (e.touches.length !== 2) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      _this.onDragStart(e.touches[0].pageX, e.touches[0].pageY);

      _this.props.target.addEventListener('touchmove', _this.onTouchMove);
      _this.props.target.addEventListener('touchend', _this.onDragEnd);
    };

    _this.onTouchMove = function (e) {
      e.preventDefault();
      _this.onDrag(e.touches[0].pageX, e.touches[0].pageY);
    };

    _this.onMouseDown = function (e) {
      if (e.button === 2 || e.nativeEvent && e.nativeEvent.which === 2) {
        return;
      }

      _this.onDragStart(e.pageX, e.pageY);

      _this.props.target.addEventListener('mousemove', _this.onMouseMove);
      _this.props.target.addEventListener('mouseup', _this.onDragEnd);
    };

    _this.onMouseMove = function (e) {
      e.preventDefault();
      _this.onDrag(e.pageX, e.pageY);
    };

    _this.state = {
      bound: false,
      dragging: false,
      startPoint: null,
      position: {
        top: props.position.top,
        left: props.position.left
      }
    };
    return _this;
  }

  _createClass(Dragger, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.bind(this.props.target);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (this.props.target && prevProps.target && this.props.target !== prevProps.target || !this.state.bound) {
        this.reset(prevProps.target);
        this.bind(this.props.target);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.target) {
        this.reset(this.props.target);
      }
    }

    /**
     * Handle drag start - common code for touch and mouse interactions
     * @param x
     * @param y
     */


    /**
     * Update the location while item is being dragged
     * @param x
     * @param y
     */


    /**
     * Finish dragging
     */


    /* Touch Handlers */


    /* Mouse Handlers */

  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return Dragger;
}(_react2.default.PureComponent);

// PropTypes


exports.default = Dragger;