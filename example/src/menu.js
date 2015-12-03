import React, {Component} from 'react';
import {Motion, spring} from 'react-motion';
import Item from './item'
import Button from './button'

export default class Menu extends Component{
  constructor(props) {
    super(props);
    this.state = {
      itemNumber: 1,
      status: "idle"
    };
  }

  componentDidUpdate() {
    if(this.state.action === "open")
      this.refs["item"+this.state.itemNumber].start();
    else
      this.refs["item"+this.state.itemNumber].reverse();
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
    for(let i = 1; i < this.state.itemNumber; i++)
      this.refs["item"+i].reverse();
  }

  _onOpenEnd(name) {
    if(this.state.action !== "open") return;
    if (this.state.itemNumber < this.props.children.length-1)
      return this.setState({itemNumber: this.state.itemNumber+1});
    if (name === `item${this.props.children.length-1}`)
      if(this.props.onOpen) this.props.onOpen();
  }

  _onCloseEnd(name) {
    if(this.state.action === "open") return;
    if (this.state.itemNumber > 1)
      return this.setState({itemNumber: this.state.itemNumber-1});
    if (name === 'item1')
      if(this.props.onClose) this.props.onClose();
  }

  _onClick() {
    if(this.state.action === "open") this._close();
    else this._open();
  }

  _getItems() {
    let button;
    let children;
    [button, ...children] = this.props.children;
    let items = [
      <Button
        ref="button"
        onClick={this._onClick.bind(this)}
        customStyle={this.props.customStyle}
        width={this.props.width}
        height={this.props.height}
        y={this.props.y}
        key={"button"} >
        {button.props.children}
      </Button>
    ];
    for(let i = 0; i < this.state.itemNumber; i+=1) {
      items.push(
        <Item
          key={i}
          ref={`item${i+1}`}
          name ={`item${i+1}`}
          onOpenAnimationEnd={this._onOpenEnd.bind(this)}
          onCloseAnimationEnd={this._onCloseEnd.bind(this)}
          customStyle={this.props.customStyle}
          width={this.props.width}
          height={this.props.height}
          distance={this.props.distance}
          y={i*-this.props.distance + this.props.y} >
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
