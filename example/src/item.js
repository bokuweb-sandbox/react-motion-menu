import React, {Component} from 'react';
import assign from 'react/lib/Object.assign';
import {Motion, spring} from 'react-motion';

export default class Item extends Component{

  constructor(props) {
    super(props);
    this.state = {
      state: 0
    };
  }

  start() {
    setTimeout(() => this.setState({state: 1 }), 60);
    setTimeout(() => {
      this.setState({state: 2 });
      if (this.props.onAnimationEnd) this.props.onAnimationEnd();
    }, 60);
  }

  reverse() {
    if (this.props.onAnimationEnd) this.props.onAnimationEnd();
    this.setState({state: 0});
  }

  render() {
    let style;
    switch (this.state.state) {
      case 0 :
        style = {
          scaleX : spring(0, [1500, 100]),
          scaleY : spring(0, [1500, 100]),
          y : spring(this.props.y, [1500, 50])
        };
        break;
      case 1 :
        style = {
          scaleX : spring(0.7, [1500, 150]),
          scaleY : spring(1.6, [1500, 150]),
          y : spring(this.props.y-this.props.distance, [1500, 100])
        };
        break;
      case 2 :
        style = {
          scaleX : spring(1, [1500, 18]),
          scaleY : spring(1, [1500, 18]),
          y : spring(this.props.y-this.props.distance, [1500, 100])
        };

        break;
      default : break;
    }

    return (
      <Motion style={style}>
        {({scaleX, scaleY, y}) =>
          <div customClass={this.props.customClass}
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
