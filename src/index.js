import React, {Component, PropTypes} from 'react';
import {Motion, spring} from 'react-motion';
import Item from './item';
import Button from './button';

export default class Menu extends Component{
  constructor(props) {
    super(props);
    this.state = {itemNumber: 1, status: "idle"};
  }

  open() {
    if(this.state.action === "open") return;
    this._open();
  }

  _open() {
    this.setState({action: "open"});
    this.refs.button.start();
    this.refs["item"+this.state.itemNumber].start();
  }

  close() {
    if(this.state.action !== "open") return;
    this._close();
  }

  _close() {
    this.setState({action: "close"});
    this.refs.button.reverse();
    for(let i = this.state.itemNumber-1; i > 0; i-=1) {
      this.refs["item"+i].reverse();
    }
  }

  _onOpenEnd(name) {
    if(this.state.action !== "open") return;
    if (this.state.itemNumber < this.props.children.length) {
      this.refs["item"+this.state.itemNumber].start();
      return this.setState({itemNumber: this.state.itemNumber+1});
    }
    if (name === `item${this.props.children.length-1}`)
      if(this.props.onOpen) this.props.onOpen(this.props.name);
  }

  _onCloseEnd(name) {
    if(this.state.action === "open") return;
    if (this.state.itemNumber > 1) {
      if (name === 'item1')
        if(this.props.onClose) this.props.onClose(this.props.name);
      this.setState({itemNumber: this.state.itemNumber-1});
    }
  }

  _onClick() {
    if(this.state.action === "open") this._close();
    else this._open();
  }

  _getItems() {
    const {x, y, width, height, direction, distance, customStyle} = this.props;
    let button;
    let children;
    [button, ...children] = this.props.children;
    let items = [
      <Button
        ref="button"
        onClick={this._onClick.bind(this)}
        customStyle={customStyle}
        width={width}
        height={height}
        x={x}
        y={y}
        key={"button"} >
        {button.props.children}
      </Button>
    ];
    for(let i = 0; i < this.state.itemNumber && i < children.length; i+=1) {
      items.push(
        <Item
          direction={this.props.direction}
          key={i}
          ref={`item${i+1}`}
          name ={`item${i+1}`}
          onOpenAnimationEnd={this._onOpenEnd.bind(this)}
          onCloseAnimationEnd={this._onCloseEnd.bind(this)}
          customStyle={customStyle}
          width={width}
          height={height}
          distance={distance}
          x={direction === "horizontal" ? i*distance + x : x}
          y={direction === "vertical" ? i*distance + y : y} >
          {children[i].props.children}
        </Item>
      );
    }
    return items;
  }

  render() {
    return (
      <div>
        {this._getItems()}
      </div>
    );
  }
}

Menu.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  direction: PropTypes.string.isRequired,
  distance: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  onAnimationEnd: PropTypes.func,
  onCloseAnimationEnd: PropTypes.func,
  customStyle: PropTypes.object,
  customClass: PropTypes.string
}
