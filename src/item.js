import React, { Component, PropTypes, cloneElement } from 'react';
import { Motion, spring } from 'react-motion';

export default class MenuItem extends Component {
  constructor(props) {
    super(props);
    this.timerIds = [];
    this.state = {
      sequence: 0,
    };
    this.sequenceParams = this.createParams(props);
  }

  createParams({ x, y, direction, distance }) {
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
        y
      },
      {
        scaleX: spring(1.6, { stiffness: 1500, damping: 150 }),
        scaleY: spring(0.7, { stiffness: 1500, damping: 150 }),
        x: spring(x + distance, { stiffness: 1500, damping: 100 }),
        y
      },
      {
        scaleX: spring(1, { stiffness: 1500, damping: 18 }),
        scaleY: spring(1, { stiffness: 1500, damping: 18 }),
        x: spring(x + distance, { stiffness: 1500, damping: 100 }),
        y
      },
    ];
    return direction === 'vertical' ? verticalParams : horizontalParams;
  }

  start() {
    this.timerIds[1] = setTimeout(() => {
      this.setState({ sequence: 1 });
      this.timerIds[1] = null;
    }, 60);

    this.timerIds[2] = setTimeout(() => {
      this.setState({ sequence: 2 });
      this.timerIds[2] = null;
      // TODO: use defaultProps
      if (this.props.onOpenAnimationEnd) {
        this.props.onOpenAnimationEnd(this.props.name);
      }
    }, 80);
  }

  reverse() {
    this.timerIds.forEach((id) => { if (id) clearTimeout(id); });
    this.timerIds[0] = setTimeout(() => {
      this.timerIds[0] = null;
      if (this.props.onCloseAnimationEnd) {
        this.props.onCloseAnimationEnd(this.props.name);
      }
    }, 100);
    this.setState({ sequence: 0 });
  }

  render() {
    const { x, y, width, height, style, onClick, className } = this.props;
    return (
      <Motion style={this.sequenceParams[this.state.sequence]}>
        {({ scaleX, scaleY }) => {
          console.log(this.props.children.props);
          return cloneElement(
            this.props.children,
            {
              ...this.props.children.props,
              className,
              style: {
                ...this.props.children.props.style,
                transform: `translate3d(${x}px, ${y + 50}px, 0) scaleX(${scaleX}) scaleY(${scaleY})`,
                WebkitTransform: `translate3d(${x}px, ${y + 50}px, 0) scaleX(${scaleX}) scaleY(${scaleY})`,
                position: 'absolute',
                // width,
                // height,
              },
            },
          );
        }
      }
      </Motion>
    );
  }
}

MenuItem.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  direction: PropTypes.oneOf(['vertical', 'horizontal']).isRequired,
  distance: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  onOpenAnimationEnd: PropTypes.func,
  onCloseAnimationEnd: PropTypes.func,
  customStyle: PropTypes.object,
  customClass: PropTypes.string
}
