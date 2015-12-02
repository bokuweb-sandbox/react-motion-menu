import React, {Component} from 'react';
import assign from 'react/lib/Object.assign';
import {Motion, spring} from 'react-motion';

export default class Button extends Component{
  constructor(props) {
    super(props);
    this.state = {sequence: 0};
    this.params = [
      {
        scaleX : spring(1, [1,1]),
        scaleY : spring(1, [1,1]),
        y : this.props.y
      },
      {
        scaleX : spring(0.6, [1500, 50]),
        scaleY : spring(0.6, [1500, 50]),
        y : this.props.y
      },
      {
        scaleX : spring(1, [1500, 10]),
        scaleY : spring(1, [1500, 10]),
        y : this.props.y
      }
    ];
  }

  start() {
    setTimeout(() => this.setState({sequence: 1 }), 100);
    setTimeout(() => this.setState({sequence: 2 }), 150);
  }

  render() {
    return (
      <Motion style={this.params[this.state.sequence]}>
        {({scaleX, scaleY, y}) =>
          <div
            onClick={this.props.onClick}
            customClass={this.props.customClass}
            style={assign({}, this.props.customStyle, {
              transform: `translate3d(0, ${y}px, 0) scaleX(${scaleX}) scaleY(${scaleY})`,
              WebkitTransform: `translate3d(0, ${y}px, 0) scaleX(${scaleX}) scaleY(${scaleY})`,
              position: 'absolute',
              width: this.props.width,
              height: this.props.height
            })} >
            {this.props.children}
          </div>
        }
      </Motion>
    );
  }
}
