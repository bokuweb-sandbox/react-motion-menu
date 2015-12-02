import React, {Component} from 'react';
import {Motion, spring} from 'react-motion';
import Item from './item'
import Button from './button'

export default class Menu extends Component{

  constructor(props) {
    super(props);
    this.state = {
      state: 1,
      action: "open"
    };
  }

  componentDidUpdate() {
    if(this.state.action === "open")
      this.refs["item"+this.state.state].start();
    else
      this.refs["item"+this.state.state].reverse();
  }

  componentDidMount() {
    // FIXME: Add start method
    this.refs["item"+this.state.state].start();
  }

  end() {
    if(this.state.action === "open") {
      if (this.state.state < this.props.children.length) {
        this.setState({state: this.state.state+1});
      }
    } else {
      if (this.state.state > 1) {
        this.setState({state: this.state.state-1});
      }
    }
  }

  onClick() {
    this.setState({action: "close"});
    for(let i = 1; i < this.state.state; i++)
      this.refs["item"+i].reverse()
  }

  getItem() {
    let items = [
      <Button
        onClick={this.onClick.bind(this)}
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
    for(let i = 0; i < this.state.state; i++) {
      items.push(
        <Item
          key={i}
          ref={`item${i+1}`}
          onAnimationEnd={this.end.bind(this)}
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
          y={~~`${i*-80 + 500}`} >
          {this.props.children[i].props.children}
        </Item>
      );
    }
    return items;
  }

  render() {

    return (
      <div>
        {this.getItem()}
      </div>
    );
  }
}
