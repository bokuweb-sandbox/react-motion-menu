import React, {Component, PropTypes} from 'react';
import assign from 'react/lib/Object.assign';
import {Motion, spring} from 'react-motion';

export default class Button extends Component{
  constructor(props) {
    super(props);
    this.state = {sequence: 0};
    this.params = [
      {
        scaleX : spring(1, [1500,10]),
        scaleY : spring(1, [1500,10]),
      },
      {
        scaleX : spring(0.6, [1500, 50]),
        scaleY : spring(0.6, [1500, 50]),
      },
      {
        scaleX : spring(1, [1500, 10]),
        scaleY : spring(1, [1500, 10]),
      }
    ];
  }

  start() {
    setTimeout(() => this.setState({sequence: 1 }), 100);
    setTimeout(() => this.setState({sequence: 2 }), 150);
  }

  reverse() {
    this.setState({sequence: 1 });
    setTimeout(() => this.setState({sequence: 0 }), 50);
  }

  render() {
    const {x, y, width, height, customStyle, onClick, customClass} = this.props;
    return (
      <Motion style={this.params[this.state.sequence]}>
        {({scaleX, scaleY}) =>
          <div
            onClick={onClick}
            className={customClass}
            style={assign({}, customStyle, {
              transform: `translate3d(${x}px, ${y}px, 0) scaleX(${scaleX}) scaleY(${scaleY})`,
              WebkitTransform: `translate3d(${x}px, ${y}px, 0) scaleX(${scaleX}) scaleY(${scaleY})`,
              position: 'absolute',
              width,
              height
            })} >
            {this.props.children}
          </div>
        }
      </Motion>
    );
  }
}

Button.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  customStyle: PropTypes.object,
  customClass: PropTypes.string
}
