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
  console.log(renderer);
  it ('Should Item rendered Motion component with initial state value', (done) => {

    renderer.render(<Item direction='vertical' x={100} y={100} />)
    const actualElement = renderer.getRenderOutput();
    let expectedElement = (
      <Motion style={{scaleX: {config: [1500, 100], val: 0}, scaleY: {config: [1500, 100], val: 0}, x: 100, y: {config: [1500, 50], val: 100}}} />
    );
    expect(actualElement).toEqualJSX(expectedElement);
    done();
  });

  it ('Should Item rendered Motion component with expected value, when set vertical and call start()', (done) => {
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

  it ('Should Item rendered Motion component with expected value, when set vertical and call start()', (done) => {
    renderer.render(<Item  direction='horizontal' x={100} y={200} distance={50} />);
    renderer._instance._instance.start()
    setTimeout(() => {
      const actualElement = renderer.getRenderOutput();
      let expectedElement = (
          <Motion style={{scaleX: {config: [1500, 150], val: 1.6}, scaleY: {config: [1500, 150], val: 0.7}, y: 200, x: {config: [1500, 100], val: 150}}} />
      );
      expect(actualElement).toEqualJSX(expectedElement);
    }, 60);
    setTimeout(() => {
      const actualElement = renderer.getRenderOutput();
      let expectedElement = (
          <Motion style={{scaleX: {config: [1500, 18], val: 1}, scaleY: {config: [1500, 18], val: 1}, y: 200, x: {config: [1500, 100], val: 150}}} />
      );
      expect(actualElement).toEqualJSX(expectedElement);
      done();
    }, 100);
  });

  it ('Should call onOpenAnimationEnd callback, when call start()', (done) => {
    const onOpenAnimationEnd = () => {
      console.log('open animation end');
      done();
    }
    renderer.render(<Item  direction='vertical' x={100} y={200} distance={50} onOpenAnimationEnd={onOpenAnimationEnd}/>);
    renderer._instance._instance.start();
  });

  it ('Should call onCloseAnimationEnd callback, when call reverse()', (done) => {
    const onOpenAnimationEnd = () => {
      console.log('open animation end');
      renderer._instance._instance.reverse();
    };
    const onCloseAnimationEnd = () => {
      console.log('close animation end');
      done();
    };
    renderer.render(<Item direction='vertical' x={100} y={200} distance={50}
                      onOpenAnimationEnd={onOpenAnimationEnd}
                      onCloseAnimationEnd={onCloseAnimationEnd} />);
    renderer._instance._instance.start();
  });

  afterEach(done => {
    renderer = null;
    renderer = createRenderer();
    ReactDOM.unmountComponentAtNode(document.body);
    document.body.innerHTML = "";
    setTimeout(done);
  });
});


