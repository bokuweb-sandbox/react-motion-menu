import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { Motion, spring } from 'react-motion';

const createSmoothParams = ({ x, y }) => ([
  {
    scaleX: spring(0, { stiffness: 1500, damping: 100 }),
    scaleY: spring(0, { stiffness: 1500, damping: 100 }),
    x: spring(x, { stiffness: 1500, damping: 50 }),
    y: spring(y, { stiffness: 1500, damping: 50 }),
  }, {
    scaleX: spring(0.5, { stiffness: 120, damping: 20 }),
    scaleY: spring(0.5, { stiffness: 120, damping: 20 }),
    x: spring(x, { stiffness: 120, damping: 20 }),
    y: spring(y, { stiffness: 120, damping: 20 }),
  }, {
    scaleX: spring(1, { stiffness: 120, damping: 20 }),
    scaleY: spring(1, { stiffness: 120, damping: 20 }),
    x: spring(x, { stiffness: 120, damping: 20 }),
    y: spring(y, { stiffness: 120, damping: 20 }),
  },
]);

const createBumpyParams = (x, y) => ([
  {
    scaleX: spring(0, { stiffness: 1500, damping: 100 }),
    scaleY: spring(0, { stiffness: 1500, damping: 100 }),
    x: spring(x, { stiffness: 1500, damping: 50 }),
    y: spring(y, { stiffness: 1500, damping: 50 }),
  },
  {
    scaleX: spring(1.6, { stiffness: 1500, damping: 150 }),
    scaleY: spring(0.7, { stiffness: 1500, damping: 150 }),
    x: spring(x, { stiffness: 1500, damping: 100 }),
    y: spring(y, { stiffness: 1500, damping: 100 }),
  },
  {
    scaleX: spring(1, { stiffness: 1500, damping: 18 }),
    scaleY: spring(1, { stiffness: 1500, damping: 18 }),
    x: spring(x, { stiffness: 1500, damping: 100 }),
    y: spring(y, { stiffness: 1500, damping: 100 }),
  },
]);


export default class MenuItem extends Component {

  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    onOpenAnimationEnd: PropTypes.func,
    onCloseAnimationEnd: PropTypes.func,
    bumpy: PropTypes.bool.isRequired,
    openSpeed: PropTypes.number.isRequired,
    reverse: PropTypes.bool.isRequired,
    type: PropTypes.oneOf(['horizontal', 'vertical', 'circle']).isRequired,
  }

  static defaultProps = {
    onOpenAnimationEnd: () => {},
    onCloseAnimationEnd: () => {},
  }

  constructor(props) {
    super(props);
    this.timerIds = [];
    this.state = {
      sequence: 0,
    };

    this.sequenceParams = this.props.bumpy ? createBumpyParams(props) : createSmoothParams(props);
  }

  start() {
    this.timerIds[1] = setTimeout(() => {
      this.setState({ sequence: 1 });
      this.timerIds[1] = null;
    }, this.props.openSpeed);

    this.timerIds[2] = setTimeout(() => {
      this.setState({ sequence: 2 });
      this.timerIds[2] = null;
      this.props.onOpenAnimationEnd(this.props.name);
    }, this.props.openSpeed);
  }

  reverse() {
    this.timerIds.forEach((id) => { if (id) clearTimeout(id); });
    this.timerIds[0] = setTimeout(() => {
      this.timerIds[0] = null;
      this.props.onCloseAnimationEnd(this.props.name);
    }, 100);
    this.setState({ sequence: 0 });
  }

  render() {
    const { x, y, reverse, type } = this.props;
    let newX;
    let newY;
    if (reverse) {
      newX = (-1) * (x);
      newY = type === 'vertical' ? (-1) * (y) : y;
    } else {
      newX = x;
      newY = y;
    }
    if (!this.props.children) return null;
    return (
      <Motion style={this.sequenceParams[this.state.sequence]}>
        {({ scaleX, scaleY }) => (
          cloneElement(
            this.props.children,
            {
              ...(this.props.children.props || {}),
              style: {
                ...((this.props.children.props && this.props.children.props.style) || {}),
                transform: `translate3d(${newX}px, ${newY}px, 0) scaleX(${scaleX}) scaleY(${scaleY})`,
                WebkitTransform: `translate3d(${newX}px, ${newY}px, 0) scaleX(${scaleX}) scaleY(${scaleY})`,
                position: 'absolute',
              },
            },
          )
        )
      }
      </Motion>
    );
  }
}
