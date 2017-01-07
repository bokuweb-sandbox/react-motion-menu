import React, { Component, PropTypes } from 'react';
import MenuItem from './item';
import Button from './button';

export default class MotionMenu extends Component {

  static propTypes = {
    direction: PropTypes.oneOf(['horizontal', 'vertical', 'circle']),
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    distance: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    onClose: PropTypes.func,
    onOpen: PropTypes.func,
    customStyle: PropTypes.Object,
    customClass: PropTypes.string,
    children: PropTypes.Any,
  }

  static defaultProps = {
    customStyle: {},
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

  getItems() {
    const { x, y, width, height, direction, distance, customStyle, customClass } = this.props;
    let children;
    [button, ...children] = this.props.children;

    for (let i = 0; i < this.state.itemNumber && i < children.length; i += 1) {
      items.push(
        <MenuItem
          direction={this.props.direction}
          key={i}
          ref={(c) => { this.items[i + 1] = c; }}
          name={`item${i + 1}`}
          onOpenAnimationEnd={this.onOpenEnd}
          onCloseAnimationEnd={this.onCloseEnd}
          style={customStyle}
          className={customClass}
          width={width}
          height={height}
          distance={distance}
          x={direction === 'horizontal' ? ((i + 1) * distance) + x : x}
          y={direction === 'vertical' ? ((i + 1) * distance) + y : y}
        >
          {children[i]}
        </MenuItem>,
      );
    }
    return items;
  }

  get button() {
    return (
      <Button
        ref={(c) => { this.button = c; }}
        onClick={this.onClick}
      >
        {this.props.children[0].props.children}
      </Button>
    );
  }

  closeItems() {
    this.setState({ action: 'close' });
    this.button.reverse();
    Array.from(Array(this.state.itemNumber).keys())
    .reverse()
    .forEach(i => this.items[i].reverse());
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
      <div>
        {this.button}
        {this.getItems()}
      </div>
    );
  }
}
