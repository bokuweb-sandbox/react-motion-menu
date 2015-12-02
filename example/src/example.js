import React, {Component} from 'react';
import {Motion, spring} from 'react-motion';
import Item from './item'

export default class Example extends Component{

  constructor(props) {
    super(props);
    this.state = {
      state : 1
    };
  }

  end() {
    console.log("end")
    if (this.state.state < 3) 
      this.setState({state: this.state.state+1});
  }

  getItem() {
      let items = [];
      for(let i = 0; i < this.state.state; i++) {
        items.push(<Item onAnimationEnd={this.end.bind(this)} y={~~`${i*-50 + 50}`} key={i}/>);
      }
      console.dir(items);
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
