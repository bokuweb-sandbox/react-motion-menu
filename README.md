# react-motion-menu

Motion menu component for React.

[![Build Status](https://travis-ci.org/bokuweb/react-motion-menu.svg?branch=master)](https://travis-ci.org/bokuweb/react-motion-menu)
[![License](http://img.shields.io/npm/l/object.assign.svg)](https://github.com/bokuweb/react-motion-menu#license)

## Demo

![screenshot](https://github.com/bokuweb/react-motion-menu/blob/master/docs/screenshot.gif?raw=true)

See demo: [http://bokuweb.github.io/react-motion-menu/](http://bokuweb.github.io/react-motion-menu/)


## Installation

```sh
npm i react-motion-menu
```

## Overview

### Basic

``` javascript
import React from 'react';
import MotionMenu from '../../src';

export default () => (
  <MotionMenu
    type="circle"
    margin={120}
    y={0}
    x={0}
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
```

## Properties


#### x {number}

The position x of the menu button.

#### y {number}

The position y of the menu button.

#### type {string}

Menu opening and closing direction.
Please set 'horizontal' or 'vertical'.

#### margin {number}

Distance between items.
Opening the opposite direction, if set minus value.

## Test

``` sh
npm t
```

## License

The MIT License (MIT)

Copyright (c) 2016 @Bokuweb

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
