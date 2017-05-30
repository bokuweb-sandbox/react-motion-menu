import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuItem from './item';
import MenuButton from './button';

export default class MotionMenu extends Component {

  static propTypes = {
    margin: PropTypes.number.isRequired,
    type: PropTypes.oneOf(['horizontal', 'vertical', 'circle']).isRequired,
    wing: PropTypes.bool,
    x: PropTypes.number,
    y: PropTypes.number,
    onClose: PropTypes.func,
    onOpen: PropTypes.func,
    className: PropTypes.string,
    bumpy: PropTypes.bool,
    openSpeed: PropTypes.number,
    reverse: PropTypes.bool,
  }

  static defaultProps = {
    x: 0,
    y: 0,
    style: {},
    onClose: () => {},
    onOpen: () => {},
    bumpy: true,
    openSpeed: 60,
    reverse: false,
  }

  constructor(props) {
    super(props);
    this.state = {
      itemNumber: 1,
      status: 'idle',
    };
    this.items = [];
    this.onOpenEnd = this.onOpenEnd.bind(this);
    this.onCloseEnd = this.onCloseEnd.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onOpenEnd(name) {
    if (this.state.action !== 'open') return;
    if (this.state.itemNumber < this.props.children.length) {
      this.items[this.state.itemNumber].start();
      this.setState({
        itemNumber: this.state.itemNumber + 1,
      });
      return;
    }
    if (name === `item${this.props.children.length - 1}`) {
      this.props.onOpen();
    }
  }

  onCloseEnd(name) {
    if (this.state.action === 'open') return;
    if (name === 'item1') {
      this.props.onClose();
    }
    if (this.state.itemNumber > 1) {
      if (name === 'item1') {
        this.props.onClose();
      }
      this.setState({
        itemNumber: this.state.itemNumber - 1,
      });
    }
  }

  onClick() {
    if (this.state.action === 'open') {
      this.closeItems();
    } else {
      this.openItem();
    }
  }

  getDistance(i) {
    return this.props.wing
      ? (parseInt(i / 2, 10) + 1) * this.props.margin * ((i % 2) || -1)
      : this.props.margin * (i + 1);
  }

  getX(i, x) {
    const { type, margin, children } = this.props;
    if (type === 'horizontal') {
      return this.getDistance(i) + x;
    }
    if (type === 'circle') {
      return x + (margin * Math.cos((Math.PI * 2 * i) / (children.length - 1)));
    }
    return x;
  }

  getY(i, y) {
    const { type, margin, children } = this.props;
    if (type === 'vertical') {
      return this.getDistance(i) + y;
    }
    if (type === 'circle') {
      return y + (margin * Math.sin((Math.PI * 2 * i) / (children.length - 1)));
    }
    return y;
  }

  getItems() {
    const { x, y, bumpy } = this.props;
    return Array.from(Array(this.state.itemNumber).keys())
      .reverse()
      .map(i => (
        <MenuItem
          key={i}
          ref={(c) => { this.items[i + 1] = c; }}
          name={`item${i + 1}`}
          onOpenAnimationEnd={this.onOpenEnd}
          onCloseAnimationEnd={this.onCloseEnd}
          x={this.getX(i, x)}
          y={this.getY(i, y)}
          bumpy={bumpy}
          openSpeed={this.props.openSpeed}
          reverse={this.props.reverse}
          type={this.props.type}
        >
          {this.props.children[i + 1]}
        </MenuItem>
      ),
    );
  }

  get menuButton() {
    return (
      <MenuButton
        ref={(c) => { this.button = c; }}
        onClick={this.onClick}
        x={this.props.x}
        y={this.props.y}
        bumpy={this.props.bumpy}
      >
        {this.props.children[0]}
      </MenuButton>
    );
  }

  closeItems() {
    this.setState({ action: 'close' });
    this.button.reverse();
    Array.from(Array(this.state.itemNumber).keys())
      .reverse()
      .forEach(i => this.items[i + 1].reverse());
  }

  close() {
    if (this.state.action !== 'open') return;
    this.closeItems();
  }

  open() {
    if (this.state.action === 'open') return;
    this.openItem();
  }

  openItem() {
    this.setState({ action: 'open' });
    this.button.start();
    this.items[this.state.itemNumber].start();
  }

  render() {
    return (
      <div
        style={this.props.style}
        className={this.props.className}
      >
        <div style={{ position: 'relative' }}>
          {this.menuButton}
          {this.getItems()}
        </div>
      </div>
    );
  }
}
