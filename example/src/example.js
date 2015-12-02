import React, {Component} from 'react';
import {Motion, spring} from 'react-motion';
import Item from './item'

export default class Example extends Component{

  constructor(props) {
    super(props);
  }

  end1() {

  }
  
  render() {
    return (
      <div>
        <Item onAnimationEnd={this.end1.bind(this)} y={100}/>
        <Item y={0}/>
      </div>
    );
  }
}
