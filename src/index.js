import React, { Component, PropTypes } from 'react';
import MenuItem from './item';
import MenuButton from './button';

export default class MotionMenu extends Component {

  static propTypes = {
    type: PropTypes.oneOf(['horizontal', 'vertical', 'circle']),
    wing: PropTypes.bool,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    margin: PropTypes.number.isRequired,
    onClose: PropTypes.func,
    onOpen: PropTypes.func,
    className: PropTypes.string,
  }

  static defaultProps = {
    style: {},
    onClose: () => {},
    onOpen: () => {},
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
      ? (parseInt(i / 2, 10) + 1) * this.props.margin * ((-1) ** (i % 2))
      : this.props.margin * (i + 1);
  }

  getX(distance, x) {
    if (this.props.type === 'horizontal') {
      return distance + x;
    }
    return x;
  }

  getY(distance, y) {
    if (this.props.type === 'vertical') {
      return distance + y;
    }
    return y;
  }

  getItems() {
    const { x, y } = this.props;
    return Array.from(Array(this.state.itemNumber).keys())
      .reverse()
      .map((i) => {
        const distance = this.getDistance(i);
        return (
          <MenuItem
            direction={this.props.type}
            key={i}
            ref={(c) => { this.items[i + 1] = c; }}
            name={`item${i + 1}`}
            onOpenAnimationEnd={this.onOpenEnd}
            onCloseAnimationEnd={this.onCloseEnd}
            distance={distance}
            x={this.getX(distance, x)}
            y={this.getY(distance, y)}
          >
            {this.props.children[i + 1]}
          </MenuItem>
        );
      },
    );
  }

  get menuButton() {
    return (
      <MenuButton
        ref={(c) => { this.button = c; }}
        onClick={this.onClick}
        x={this.props.x}
        y={this.props.y}
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
