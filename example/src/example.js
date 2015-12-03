import React, {Component} from 'react';
import {Motion, spring} from 'react-motion';
import Menu from './menu'

export default class Example extends Component{
  handleOnOpen() {
    console.log("open");
  }

  handleOnClose() {
    console.log("close");
  }
  render() {
    return (
      <Menu
        onOpen={this.handleOnOpen.bind(this)}
        onClose={this.handleOnClose.bind(this)}
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
        y={500}>
        <div><i className="fa fa-bars"></i></div>
        <div><i className="fa fa-home"></i></div>
        <div><i className="fa fa-heart"></i></div>
        <div><i className="fa fa-wrench"></i></div>
        <div><i className="fa fa-user"></i></div>
        <div><i className="fa fa-tags"></i></div>
      </Menu>
    );
  }
}
