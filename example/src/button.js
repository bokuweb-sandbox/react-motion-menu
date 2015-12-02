import React, {Component} from 'react';
import assign from 'react/lib/Object.assign';
import {Motion, spring} from 'react-motion';

export default class Button extends Component{

  constructor(props) {
    super(props);
    this.state = {
      state: 0
    };
    setTimeout(() => this.setState({state: 1 }), 100);
    setTimeout(() => this.setState({state: 2 }), 150);
  }

  render() {
    let style;

    switch (this.state.state) {
      case 0 :
        style = {
          scaleX : spring(1, [1,1]),
          scaleY : spring(1, [1,1]),
          y : this.props.y
        };
        break;
      case 1 :
        style = {
          scaleX : spring(0.6, [1500, 50]),
          scaleY : spring(0.6, [1500, 50]),
          y : this.props.y
        };
        break;
      case 2 :
        style = {
          scaleX : spring(1, [1500, 10]),
          scaleY : spring(1, [1500, 10]),
          y : this.props.y
        };
        break
      default : break;
    }

    return (
      <Motion style={style}>
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
