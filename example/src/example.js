import React, {Component} from 'react';
import {Motion, spring} from 'react-motion';
import Menu from './menu'

export default class Example extends Component{
  render() {

    return (
      <Menu>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Menu>
    );
  }
}
