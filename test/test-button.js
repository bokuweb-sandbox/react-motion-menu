import React from 'react';
import ReactDOM from 'react-dom';
import { Motion } from 'react-motion';
import TestUtils, {createRenderer} from 'react-addons-test-utils';
import Button from '../src/button';
import expect from 'expect';
import expectJSX from 'expect-jsx';
import assert from 'power-assert';

expect.extend(expectJSX);

describe('Button Component test', () => {

  it ('Should call onclick callback, when button clicked', (done) => {
    const onClick = () => {
      assert.ok(true);
      done();
    }
    const button = TestUtils.renderIntoDocument(<Button onClick={onClick} />);
    const div = TestUtils.scryRenderedDOMComponentsWithTag(button, 'div');
    TestUtils.Simulate.click(ReactDOM.findDOMNode(div[0]));
  });

  it ('Should style set to button component', (done) => {
    const button = TestUtils.renderIntoDocument(<Button width={80} height={120} customStyle={{color: "red"}} />);
    const div = TestUtils.scryRenderedDOMComponentsWithTag(button, 'div');
    assert.equal(div[0].style.color, 'red');
    assert.equal(div[0].style.position, 'absolute');
    assert.equal(div[0].style.width, '80px');
    assert.equal(div[0].style.height, '120px');
    done();
  });

  it ('Should text set to button component', (done) => {
    const button = TestUtils.renderIntoDocument(<Button>dummy</Button>);
    const div = TestUtils.scryRenderedDOMComponentsWithTag(button, 'div');
    assert.equal(div[0].textContent, 'dummy');
    done();
  });

  it ('Should x, y position set to button component', (done) => {
    const button = TestUtils.renderIntoDocument(<Button x={80} y={120} />);
    const div = TestUtils.scryRenderedDOMComponentsWithTag(button, 'div');
    assert.equal(div[0].style.WebkitTransform, 'translate3d(80px, 120px, 0px) scaleX(1) scaleY(1)');
    done();
  });

  afterEach(done => {
    ReactDOM.unmountComponentAtNode(document.body);
    document.body.innerHTML = "";
    setTimeout(done);
  });
});
