import React from 'react';
import assert from 'power-assert';
import { spy } from 'sinon';
import { mount, shallow } from 'enzyme';
import MenuItem from '../src/item';

describe('Item Component test', function () {

  this.timeout(10000);

  it('should mount item component without error', () => {
    mount(
      <MenuItem x={0} y={0} name="sample" bumpy openSpeed={60} type={'circle'} reverse={false}>
        <div>sample</div>
      </MenuItem>,
    );
  });

  it('should call onOpenAnimationEnd callback, when opend', (done) => {
    const onOpenAnimationEnd = spy();
    const wrapper = shallow(
      <MenuItem x={0} y={0} name="sample" onOpenAnimationEnd={onOpenAnimationEnd} bumpy openSpeed={60} type={'circle'} reverse={false}>
        <div>sample</div>
      </MenuItem>,
    );
    wrapper.instance().start();
    setTimeout(() => {
      assert.equal(onOpenAnimationEnd.callCount, 1);
      assert.equal(onOpenAnimationEnd.getCall(0).args[0], 'sample');
      done();
    }, 200);
  });

  it('should call onOpenAnimationEnd callback, when opend', (done) => {
    const wrapper = mount(
      <MenuItem x={10} y={20} name="sample" bumpy openSpeed={60} type={'circle'} reverse={false}>
        <div>sample</div>
      </MenuItem>,
    );
    wrapper.instance().start();
    setTimeout(() => {
      assert.equal(wrapper.getDOMNode().style.transform, 'translate3d(10px, 20px, 0px) scaleX(1) scaleY(1)');
      done();
    }, 3000);
  });

  it('should call onCloseAnimationEnd callback, when closed', (done) => {
    const onCloseAnimationEnd = spy();
    const wrapper = shallow(
      <MenuItem x={0} y={0} name="sample" onCloseAnimationEnd={onCloseAnimationEnd} bumpy openSpeed={60} type={'circle'} reverse={false}>
        <div>sample</div>
      </MenuItem>,
    );
    wrapper.instance().start();
    wrapper.instance().reverse();
    setTimeout(() => {
      assert.equal(onCloseAnimationEnd.callCount, 1);
      assert.equal(onCloseAnimationEnd.getCall(0).args[0], 'sample');
      done();
    }, 200);
  });
});
