import React from 'react';
import MotionMenu from '../../src';

export default () => (
  <MotionMenu
    type="vertical"
    margin={120}
    y={0}
    bumpy={false}
    x={0}
    openSpeed={10}
    wing={false}
    reverse={false}
  >
    <div className="button"><i className="fa fa-bars" /></div>
    <div className="button"><i className="fa fa-cogs" /></div>
    <div className="button"><i className="fa fa-cloud" /></div>
    <div className="button"><i className="fa fa-home" /></div>
    <div className="button"><i className="fa fa-flash" /></div>
    <div className="button"><i className="fa fa-heart" /></div>
    <div className="button"><i className="fa fa-globe" /></div>
    <div className="button"><i className="fa fa-plug" /></div>
  </MotionMenu>
);
