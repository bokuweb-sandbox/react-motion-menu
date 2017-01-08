import React from 'react';
import assert from 'power-assert';
import { spy } from 'sinon';
import { mount, shallow } from 'enzyme';
import MotionMenu from '../src/';

describe('Item Component test', function () {

  this.timeout(10000);

  it('should mount item component without error', () => {
    mount(
      <MotionMenu x={10} y={20} type="vertical" margin={20}>
        <div className="button">button</div>
        <div className="item1">item1</div>
        <div className="item2">item2</div>
      </MotionMenu>,
    );
  });

  it('should render a item and button, when mounted', () => {
    const menu = mount(
      <MotionMenu x={10} y={20} type="vertical" margin={20}>
        <div className="button">button</div>
        <div className="item1">item1</div>
        <div className="item2">item2</div>
      </MotionMenu>,
    );
    assert.equal(menu.find('.item1').getDOMNode().style.transform, 'translate3d(10px, 40px, 0px) scaleX(0) scaleY(0)');
    assert.equal(menu.find('.item2').length, 0);
  });

  it('should render a item and button, when opend', (done) => {
    const menu = mount(
      <MotionMenu x={10} y={20} type="vertical" margin={20}>
        <div className="button">button</div>
        <div className="item1">item1</div>
        <div className="item2">item2</div>
      </MotionMenu>,
    );
    menu.find('.button').simulate('click');
    setTimeout(() => {
      assert.equal(menu.find('.item1').getDOMNode().style.transform, 'translate3d(10px, 40px, 0px) scaleX(1) scaleY(1)');
      assert.equal(menu.find('.item2').getDOMNode().style.transform, 'translate3d(10px, 60px, 0px) scaleX(1) scaleY(1)');
      done();
    }, 3000);
  });
});
