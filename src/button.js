import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { Motion, spring } from 'react-motion';

export default class MenuButton extends Component {

  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    onClick: PropTypes.func,
    bumpy: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      sequence: 0,
    };
    this.sequenceParams = this.props.bumpy ?
    [
      {
        scaleX: spring(1, { stiffness: 1500, damping: 10 }),
        scaleY: spring(1, { stiffness: 1500, damping: 10 }),
      }, {
        scaleX: spring(0.6, { stiffness: 1500, damping: 50 }),
        scaleY: spring(0.6, { stiffness: 1500, damping: 50 }),
      }, {
        scaleX: spring(1, { stiffness: 1500, damping: 10 }),
        scaleY: spring(1, { stiffness: 1500, damping: 10 }),
      },
    ] :
    [
      {
        scaleX: spring(1, { stiffness: 1500, damping: 10 }),
        scaleY: spring(1, { stiffness: 1500, damping: 10 }),
      }, {
        scaleX: spring(1, { stiffness: 200, damping: 50 }),
        scaleY: spring(1, { stiffness: 200, damping: 50 }),
      }, {
        scaleX: spring(1, { stiffness: 1500, damping: 10 }),
        scaleY: spring(1, { stiffness: 1500, damping: 10 }),
      },
    ];
  }

  start() {
    setTimeout(() => this.setState({ sequence: 1 }), 100);
    setTimeout(() => this.setState({ sequence: 2 }), 150);
  }

  reverse() {
    this.setState({ sequence: 1 });
    setTimeout(() => this.setState({ sequence: 0 }), 50);
  }

  render() {
    const { x, y, onClick } = this.props;
    if (!this.props.children) return null;
    return (
      <Motion style={this.sequenceParams[this.state.sequence]}>
        {({ scaleX, scaleY }) => (
          cloneElement(
            this.props.children,
            {
              ...(this.props.children.props || {}),
              onClick,
              style: {
                ...((this.props.children.props && this.props.children.props.style) || {}),
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
