import React, { Component, PropTypes, cloneElement } from 'react';
import { Motion, spring } from 'react-motion';

const createParams = ({ x, y, direction, distance }) => {
  const verticalParams = [
    {
      scaleX: spring(0, { stiffness: 1500, damping: 100 }),
      scaleY: spring(0, { stiffness: 1500, damping: 100 }),
      x,
      y: spring(y, { stiffness: 1500, damping: 50 }),
    }, {
      scaleX: spring(0.7, { stiffness: 1500, damping: 150 }),
      scaleY: spring(1.6, { stiffness: 1500, damping: 150 }),
      x,
      y: spring(y + distance, { stiffness: 1500, damping: 100 }),
    }, {
      scaleX: spring(1, { stiffness: 1500, damping: 18 }),
      scaleY: spring(1, { stiffness: 1500, damping: 18 }),
      x,
      y: spring(y + distance, { stiffness: 1500, damping: 100 }),
    },
  ];

  const horizontalParams = [
    {
      scaleX: spring(0, { stiffness: 1500, damping: 100 }),
      scaleY: spring(0, { stiffness: 1500, damping: 100 }),
      x: spring(x, { stiffness: 1500, damping: 50 }),
      y,
    },
    {
      scaleX: spring(1.6, { stiffness: 1500, damping: 150 }),
      scaleY: spring(0.7, { stiffness: 1500, damping: 150 }),
      x: spring(x + distance, { stiffness: 1500, damping: 100 }),
      y,
    },
    {
      scaleX: spring(1, { stiffness: 1500, damping: 18 }),
      scaleY: spring(1, { stiffness: 1500, damping: 18 }),
      x: spring(x + distance, { stiffness: 1500, damping: 100 }),
      y,
    },
  ];
  return direction === 'vertical' ? verticalParams : horizontalParams;
};

export default class MenuItem extends Component {

  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    children: PropTypes.Any,
    onOpenAnimationEnd: PropTypes.func,
    onCloseAnimationEnd: PropTypes.func,
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
    this.sequenceParams = createParams(props);
  }

  start() {
    this.timerIds[1] = setTimeout(() => {
      this.setState({ sequence: 1 });
      this.timerIds[1] = null;
    }, 60);

    this.timerIds[2] = setTimeout(() => {
      this.setState({ sequence: 2 });
      this.timerIds[2] = null;
      this.props.onOpenAnimationEnd(this.props.name);
    }, 80);
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
    const { x, y } = this.props;
    if (!this.props.children) return null;
    return (
      <Motion style={this.sequenceParams[this.state.sequence]}>
        {({ scaleX, scaleY }) => (
          cloneElement(
            this.props.children,
            {
              ...(this.props.children.props || {}),
              style: {
                ...this.props.children.props.style,
                transform: `translate3d(${x}px, ${y}px, 0) scaleX(${scaleX}) scaleY(${scaleY})`,
                WebkitTransform: `translate3d(${x}px, ${y}px, 0) scaleX(${scaleX}) scaleY(${scaleY})`,
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
