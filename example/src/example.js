import React, {Component} from 'react';
import {Motion, spring} from 'react-motion';
import Menu from './menu'

export default class Example extends Component{
  render() {
    return (
      <Menu>
        <div><i className="fa fa-home"></i></div>
        <div><i className="fa fa-heart"></i></div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
      </Menu>
    );
  }
}
