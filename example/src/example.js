import React, {Component} from 'react';
import {Motion, spring} from 'react-motion';
import Menu from '../../src';

export default class Example extends Component {
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
    //    return <div>a</div>
    console.log(Menu)
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
      </div>
    );
  }
}
