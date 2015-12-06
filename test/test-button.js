import React from 'react';
import ReactDOM from 'react-dom';
import {Motion} from 'react-motion';
import TestUtils, {createRenderer} from 'react-addons-test-utils';
import Button from '../src/button';
import expect from 'expect';
import expectJSX from 'expect-jsx';

expect.extend(expectJSX);

describe('Button Component test', () => {
  const renderer = createRenderer();
  it ('Should button rendered Motion component witth initial value', (done) => {
    const button = TestUtils.renderIntoDocument(<Button />);
    renderer.render(
      <Button />
    )
    const onClick = () => console.log("onclick");
    const actualElement = renderer.getRenderOutput();
    let expectedElement = (
      <Motion style={{scaleX: {config: [1500, 10], val: 1}, scaleY: {config: [1500, 10], val: 1}}} />
    );
    expect(actualElement).toEqualJSX(expectedElement);
    done();
  });

  afterEach( done => {
    ReactDOM.unmountComponentAtNode(document.body);
    document.body.innerHTML = "";
    setTimeout(done);
  });
});
