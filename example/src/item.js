import React, {Component} from 'react';
import {Motion, spring} from 'react-motion';

export default class Item extends Component{

  constructor(props) {
    super(props);
    this.state = {
      state: 0
    };
    setTimeout(() => this.setState({state: 1 }), 100);
    setTimeout(() => this.setState({state: 2 }), 500);
  }

  render() {
    let style;

    switch (this.state.state) {
      case 0 :
        style = {
          scaleX : spring(0.5, [1,1]),
          scaleY : spring(0.5, [1,1]),
          y : this.props.y
        };
        break;
      case 1 :
        style = {
          scaleX : spring(0.7, [1000, 100]),
          scaleY : spring(1.6, [1000, 100]),
          y : spring(this.props.y-100, [60, 100])
        };
        break;
      case 2 :
        style = {
          scaleX : spring(1, [1500, 5]),
          scaleY : spring(1, [1500, 5]),
          y : spring(this.props.y-100, [1000, 100])
        };
        if (this.props.onAnimationEnd) this.props.onAnimationEnd();
        break;
      default : break;
    }

    return (
      <Motion style={style}>
        {({scaleX, scaleY, y}) =>
          <div customClass={this.props.customClass}
            style={{
              transform: `translate3d(0, ${y}px, 0) scaleX(${scaleX}) scaleY(${scaleY})`,
              WebkitTransform: `translate3d(0, ${y}px, 0) scaleX(${scaleX}) scaleY(${scaleY})`,
              position: 'absolute',
              backgroundColor: "#000",
              border: "solid 1px #000",
              borderRadius: "50%",
              width: 30,
              height: 30
            }} >
            {this.props.children}
          </div>
        }
      </Motion>
    );
  }
}
