import React from 'react';
import MotionMenu from '../../src';

export default () => (
    <MotionMenu
        type="circle"
        margin={120}
        y={0}
        distFactor={0.5}
        bumpy={false}
        x={0}
        openSpeed={60}
        reverse={true}
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
