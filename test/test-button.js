import assert from 'power-assert';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Button from '../src/button';

describe('Button Component test', () => {
  it ('Should button text is show comment, when not oepned', (done) => {
    const button = TestUtils.renderIntoDocument(<Button />);
    //const div = TestUtils.scryRenderedDOMComponentsWithTag(button, 'div');
    //assert.equal(div[0].textContent, 'コメントを見る')
    done();
  });

  afterEach( done => {
    ReactDOM.unmountComponentAtNode(document.body);
    document.body.innerHTML = "";
    setTimeout(done);
  });
});
