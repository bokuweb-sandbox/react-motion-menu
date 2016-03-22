# ![](https://raw.githubusercontent.com/bokuweb/react-motion-menu/master/example/logo.png)

Motion menu component for React.

[![Build Status](https://travis-ci.org/bokuweb/react-motion-menu.svg?branch=master)](https://travis-ci.org/bokuweb/react-motion-menu)
[![License](http://img.shields.io/npm/l/object.assign.svg)](https://github.com/bokuweb/react-motion-menu#license)

## Demo

![screenshot](https://github.com/bokuweb/react-motion-menu/blob/master/example/screenshot.gif?raw=true)

See demo: [http://bokuweb.github.io/react-motion-menu/example/](http://bokuweb.github.io/react-motion-menu/example/)

## Important Note

This is an alpha release. Use with caution and hope.

## Installation

```sh
npm i react-motion-menu
```

## Overview

### Basic

``` javascript
import React from 'react';
import ReactDOM from 'react-dom'
import Menu from 'react-motion-menu'

class Example extends React.Component{
  render() {
    return (
        <div>
          <Menu
            direction="horizontal"
            distance={80}
            width={50}
            height={50}
            y={500}
            x={100}
            customStyle={{
              color: "#fff",
              textAlign:"center",
              lineHeight:"50px",
              backgroundColor: "#16A085",
              border: "solid 1px #16A085",
              borderRadius: "50%"
            }}>
            <i className="bars"></i>  // button
            <a href="http://google.com"><i className="home"></i></a>  // menu item1
            <a href="http://google.com"><i className="heart"></i></a> // menu item2
          </Menu>
        </div>
      );
}
}
ReactDOM.render(
<Example />,
document.getElementById('app')
);

```

## Properties

#### width {number}

The width of the menu item and button.   

#### height {number}

The height of the menu item and button.   

#### x {number}

The position x of the menu button.

#### y {number}

The position y of the menu button.

#### direction {string}

Menu opening and closing direction.
Please set 'horizontal' or 'vertical'.

#### distance {number}

Distance between items.
Opening the opposite direction, if set minus value.

#### customClass {string}

The css class set menu item and button.

#### customStyle {object}

The css style set on themenu item and button.

#### onClick {func}

Callback called on resizable box clicked.

#### onTouchStart {func}

Callback called on resizable box touched.


## Test

``` sh
npm t
```

## License

The MIT License (MIT)

Copyright (c) 2015 @Bokuweb

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
