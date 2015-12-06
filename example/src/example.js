import React, {Component} from 'react';
import {Motion, spring} from 'react-motion';
import Menu from '../../lib'

export default class Example extends Component{
  constructor(props) {
    super(props);
    this.state = {
      menu1:{isOpen: false},
      menu2:{isOpen: false},
      menu3:{isOpen: false},
      menu4:{isOpen: false}
    };
  }
  handleOnOpen(name) {
    this.setState({[name] : {isOpen: true}});
    console.log("open");
  }

  handleOnClose(name) {
    this.setState({[name] : {isOpen: false}});
    console.log("close");
  }
  render() {
    return (
        <div>
        <Menu
          name="menu1"
          direction="horizontal"
          onOpen={this.handleOnOpen.bind(this)}
          onClose={this.handleOnClose.bind(this)}
          customStyle={{
            color: "#fff",
            textAlign:"center",
            lineHeight:"50px",
            backgroundColor: "#E74C3C",
            border: "solid 1px #E74C3C",
            borderRadius: "40%"
          }}
          distance={-80}
          width={50}
          height={50}
          y={500}
          x={-150} >
          <div><i className={this.state.menu1.isOpen ? "fa fa-times" : "fa fa-bars"}></i></div>
          <div><i className="fa fa-home"></i></div>
          <div><i className="fa fa-heart"></i></div>
          <div><i className="fa fa-wrench"></i></div>
          <div><i className="fa fa-user"></i></div>
        </Menu>
        <Menu
          name="menu2"
          direction="vertical"
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
          y={500}
          x={-50} >
          <div><i className={this.state.menu2.isOpen ? "fa fa-times" : "fa fa-bars"}></i></div>
          <div><i className="fa fa-home"></i></div>
          <div><i className="fa fa-heart"></i></div>
          <div><i className="fa fa-wrench"></i></div>
          <div><i className="fa fa-user"></i></div>
        </Menu>
        <Menu
          name="menu3"
          direction="vertical"
          onOpen={this.handleOnOpen.bind(this)}
          onClose={this.handleOnClose.bind(this)}
          customStyle={{
            color: "#fff",
            textAlign:"center",
            lineHeight:"50px",
            backgroundColor: "#34495E",
            border: "solid 1px #34495E",
            borderRadius: "10%"
          }}
          distance={-80}
          width={50}
          height={50}
          y={500}
          x={50} >
          <div><i className={this.state.menu3.isOpen ? "fa fa-times" : "fa fa-bars"}></i></div>
          <div><i className="fa fa-home"></i></div>
          <div><i className="fa fa-heart"></i></div>
          <div><i className="fa fa-wrench"></i></div>
          <div><i className="fa fa-user"></i></div>
        </Menu>
        <Menu
          name="menu4"
          direction="horizontal"
          onOpen={this.handleOnOpen.bind(this)}
          onClose={this.handleOnClose.bind(this)}
          customStyle={{
            color: "#fff",
            textAlign:"center",
            lineHeight:"50px",
            backgroundColor: "#D35400",
            border: "solid 1px #D35400#D35400#D35400",
            borderRadius: "20%"
          }}
          distance={80}
          width={50}
          height={50}
          y={500}
          x={150} >
          <div><i className={this.state.menu4.isOpen ? "fa fa-times" : "fa fa-bars"}></i></div>
          <div><i className="fa fa-home"></i></div>
          <div><i className="fa fa-heart"></i></div>
          <div><i className="fa fa-wrench"></i></div>
          <div><i className="fa fa-user"></i></div>
        </Menu>
      </div>
    );
  }
}
