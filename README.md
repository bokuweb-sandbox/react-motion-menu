# react-motion-menu

Animation menu component for React.

[![Build Status](https://img.shields.io/travis/bokuweb/react-motion-menu.svg?style=flat-square)](https://travis-ci.org/bokuweb/react-motion-menu)
[![Version](https://img.shields.io/npm/v/react-motion-menu.svg?style=flat-square)](https://www.npmjs.com/package/react-motion-menu)
[![License](http://img.shields.io/npm/l/object.assign.svg?style=flat-square)](https://github.com/bokuweb/react-motion-menu#license)

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
  >
    <div className="button">
      <i className="fa fa-bars" />
    </div>
    <div className="button">
      <i className="fa fa-cogs" />
    </div>
    <div className="button">
      <i className="fa fa-cloud" />
    </div>
    <div className="button">
      <i className="fa fa-home" />
    </div>
  </MotionMenu>
);
```

## Properties


#### `x: PropTypes.number`

The position `x` of the menu button.
If ommited, set 0.

#### `y: PropTypes.number`

The position `y` of the menu button.
If ommited, set 0.

#### `type: PropTypes.oneOf(['vertical', 'horizontal', 'circle'])`

The Menu opening and closing type.
Please set `horizontal`, `vertical`, `circle`.

#### `margin: PropTypes.number`

The `margin` between items or menu button.

#### `wing: PropTypes.bool`

If set `true`, menu opened both side, when `vertical` or `horizontal` type selected.

#### `bumpy: PropTypes.bool`

This prop controls if the menu items should open in bumpy mode or in smooth mode.
Default mode is set to bumpy effect. 

#### `openSpeed: PropTypes.number`

This prop controls how fast the menu items should open. Default speed is set to 60 milliseconds.
 
#### `reverse: PropTypes.bool`

This prop controls if the menu should open in reverse direction or not. 

## Test

``` sh
npm t
```

## License

The MIT License (MIT)

Copyright (c) 2016 @bokuweb

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
