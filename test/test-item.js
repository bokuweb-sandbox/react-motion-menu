import React from 'react';
import ReactDOM from 'react-dom';
import {Motion} from 'react-motion';
import TestUtils, {createRenderer} from 'react-addons-test-utils';
import Item from '../src/item';
import expect from 'expect';
import expectJSX from 'expect-jsx';
import assert from 'power-assert';

expect.extend(expectJSX);

describe('Item Component test', () => {
  let renderer = createRenderer();
  it ('Should Item rendered Motion component with initial state value', (done) => {

    renderer.render(<Item direction='vertical' x={100} y={200} distance={50} />)
    const actualElement = renderer.getRenderOutput();
    let expectedElement = (
      <Motion style={{scaleX: {config: [1500, 100], val: 0}, scaleY: {config: [1500, 100], val: 0}, x: 100, y: {config: [1500, 50], val: 200}}} />
    );
    expect(actualElement).toEqualJSX(expectedElement);
    done();
  });

  it ('Should Item rendered Motion component with 2nd and 3rd state value with vertical, when call start()', (done) => {
    renderer.render(<Item  direction='vertical' x={100} y={200} distance={50} />);
    renderer._instance._instance.start()
    setTimeout(() => {
      const actualElement = renderer.getRenderOutput();
      let expectedElement = (
          <Motion style={{scaleX: {config: [1500, 150], val: 0.7}, scaleY: {config: [1500, 150], val: 1.6}, x: 100, y: {config: [1500, 100], val: 250}}} />
      );
      expect(actualElement).toEqualJSX(expectedElement);
    }, 60);
    setTimeout(() => {
      const actualElement = renderer.getRenderOutput();
      let expectedElement = (
          <Motion style={{scaleX: {config: [1500, 18], val: 1}, scaleY: {config: [1500, 18], val: 1}, x: 100, y: {config: [1500, 100], val: 250}}} />
      );
      expect(actualElement).toEqualJSX(expectedElement);
      done();
    }, 100);
  });

  /*
  it ('Should call onAnimationEnd callback, when call start()', (done) => {
    const onAnimationEnd = () => {
      console.log('animation end');
      done();
    }
    renderer.render(<Item  direction='vertical' x={100} y={200} distance={50} onAnimationEnd={onAnimationEnd}/>);
    renderer._instance._instance.start();
  });*/

  afterEach(done => {
    renderer = null;
    renderer = createRenderer();
    ReactDOM.unmountComponentAtNode(document.body);
    document.body.innerHTML = "";
    setTimeout(done);
  });
});


