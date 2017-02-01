import React from 'react';
import assert from 'power-assert';
import { spy } from 'sinon';
import { mount, shallow } from 'enzyme';
import MenuButton from '../src/button';

describe('Button Component test', () => {
  it('should mount button component without error', () => {
    mount(
      <MenuButton x={0} y={0} onClick={() => {}} bumpy >
        <div>sample</div>
      </MenuButton>,
    );
  });

  it('should x, y position set to button component with bumpy', () => {
    const button = mount(
      <MenuButton x={10} y={20} onClick={() => {}} bumpy >
        <div>sample</div>
      </MenuButton>,
    );
    assert.equal(button.getDOMNode().style.transform, 'translate3d(10px, 20px, 0px) scaleX(1) scaleY(1)');
    assert.equal(button.getDOMNode().style.position, 'absolute');
  });

  it('should x, y position set to button component with smooth effect', () => {
    const button = mount(
      <MenuButton x={10} y={20} onClick={() => {}} bumpy={false} >
        <div>sample</div>
      </MenuButton>,
        );
    assert.equal(button.getDOMNode().style.transform, 'translate3d(10px, 20px, 0px) scaleX(1) scaleY(1)');
    assert.equal(button.getDOMNode().style.position, 'absolute');
  });

  it('should call onClick when button clicked', () => {
    const onClick = spy();
    const button = mount(
      <MenuButton x={10} y={20} onClick={onClick} bumpy>
        <div>sample</div>
      </MenuButton>,
    );
    button.simulate('click');
    assert.equal(onClick.callCount, 1);
  });
});
