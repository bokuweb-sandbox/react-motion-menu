import React, {Component, PropTypes} from 'react';
import {Motion, spring} from 'react-motion';

export default class Item extends Component{
  constructor(props) {
    super(props);
    this.timerIds = [null, null, null];
    this.state = {sequence: 0};
    const {x, y, direction, distance} = this.props;
    if (direction !== 'vertical' && direction !== 'horizontal')
      return console.error("not support this direction!!");
    this.params = (direction === 'vertical') ? [
      {
        scaleX : spring(0, { stiffness: 1500, damping: 100 }),
        scaleY : spring(0, { stiffness: 1500, damping: 100 }),
        x,
        y : spring(y, { stiffness: 1500, damping: 50 })
      },
      {
        scaleX : spring(0.7, { stiffness: 1500, damping: 150 }),
        scaleY : spring(1.6, { stiffness: 1500, damping: 150 }),
        x,
        y : spring(y+distance, { stiffness: 1500, damping: 100 }),
      },
      {
        scaleX : spring(1, { stiffness: 1500, damping: 18 }),
        scaleY : spring(1, { stiffness: 1500, damping: 18 }),
        x,
        y : spring(y+distance,  { stiffness: 1500, damping: 100 }),
      }
    ] : [
      {
        scaleX : spring(0, { stiffness: 1500, damping: 100 }),
        scaleY : spring(0, { stiffness: 1500, damping: 100 }),
        x : spring(x, { stiffness: 1500, damping: 50 }),
        y
      },
      {
        scaleX : spring(1.6, { stiffness: 1500, damping: 150 }),
        scaleY : spring(0.7, { stiffness: 1500, damping: 150 }),
        x : spring(x+distance, { stiffness: 1500, damping: 100 }),
        y
      },
      {
        scaleX : spring(1, { stiffness: 1500, damping: 18 }),
        scaleY : spring(1, { stiffness: 1500, damping: 18 }),
        x : spring(x+distance, { stiffness: 1500, damping: 100 }),
        y
      }
    ];
  }

  start() {
    this.timerIds[1] = setTimeout(() => {
      this.setState({sequence: 1 });
      this.timerIds[1] = null;
    }, 60);

    this.timerIds[2] = setTimeout(() => {
      this.setState({sequence: 2 });
      this.timerIds[2] = null;
      if (this.props.onOpenAnimationEnd) this.props.onOpenAnimationEnd(this.props.name);
    }, 80);
  }

  reverse() {
    clearTimeout(this.timerIds[1]);
    clearTimeout(this.timerIds[2]);
    this.timerIds[0] = setTimeout(() => {
      if (this.props.onCloseAnimationEnd) this.props.onCloseAnimationEnd(this.props.name);
      this.timerIds[0] = null;
    }, 100);
    this.setState({sequence: 0});
  }

  render() {
    const {x, y, width, height, customStyle, onClick, customClass, children} = this.props;
    return (
      <Motion style={this.params[this.state.sequence]}>
        {({scaleX, scaleY}) =>
          <div className={customClass}
            style={Object.assign({}, customStyle, {
              transform: `translate3d(${x}px, ${y}px, 0) scaleX(${scaleX}) scaleY(${scaleY})`,
              WebkitTransform: `translate3d(${x}px, ${y}px, 0) scaleX(${scaleX}) scaleY(${scaleY})`,
              position: 'absolute',
              width,
              height,
            })} >
            {this.props.children}
          </div>
        }
      </Motion>
    );
  }
}

Item.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  direction: PropTypes.string.isRequired,
  distance: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  onOpenAnimationEnd: PropTypes.func,
  onCloseAnimationEnd: PropTypes.func,
  customStyle: PropTypes.object,
  customClass: PropTypes.string
}
