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
    for(let i = 1; i < this.state.itemNumber; i++)
      this.refs["item"+i].reverse()
  }

  _end() {
    if(this.state.action === "open") {
      if (this.state.itemNumber < this.props.children.length) {
        this.setState({itemNumber: this.state.itemNumber+1});
      }
    } else {
      if (this.state.itemNumber > 1) {
        this.setState({itemNumber: this.state.itemNumber-1});
      }
    }
  }

  _onClick() {
    if(this.state.action === "open") this._close();
    else this._open();
  }

  _getItems() {
    let items = [
      <Button
        ref="button"
        onClick={this._onClick.bind(this)}
        customStyle={{
          color: "#fff",
          textAlign:"center",
          lineHeight:"50px",
          backgroundColor: "#16A085",
          border: "solid 1px #16A085",
          borderRadius: "50%"
        }}
        width={50}
        height={50}
        y={500}
        key={"button"} >
        x
      </Button>
    ];
    for(let i = 0; i < this.state.itemNumber; i+=1) {
      items.push(
        <Item
          key={i}
          ref={`item${i+1}`}
          onAnimationEnd={this._end.bind(this)}
          customStyle={{
            color: "#fff",
            textAlign:"center",
            lineHeight:"50px",
            backgroundColor: "#16A085",
            border: "solid 1px #16A085",
            borderRadius: "50%"
          }}
          distance={80}
          width={50}
          height={50}
          y={i*-80 + 500} >
          {this.props.children[i].props.children}
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
