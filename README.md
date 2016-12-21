# ianlamb.com

##### This is my personal website that covers the basics of a "web developer portfolio" and goes beyond to demonstrate fully dynamic content and really just give more insight into the kind of person I am outside of work. Hopefully this repo exhibits everything I stand for in web development and can be used by others as a reference/learning tool.

[![bitHound Score](https://www.bithound.io/github/ianlamb/ildotcom/badges/score.svg)](https://www.bithound.io/github/ianlamb/ildotcom/master)

### Setup

Make sure Node, NPM, Bower and MongoDB are all installed globally.

Copy the example config files in the `config` directory and adjust them to your own specs, then run:

    npm install
    bower install
    
For development with LiveReload run:

    grunt watch
    node server.js
    
For production build run:

    grunt full
    NODE_ENV=prod node server.js

The nice thing about this workflow is you only really need grunt for watch during development. No build steps are actually happening, so it's basically a static site until you move to production (where you get all the concatenation/uglification/minification/etc).

### Technology Stack
* HTML5
* CSS
* JavaScript
* Node.js
* MongoDB

### Frameworks
* Angular
* Bootstrap
* Express
* Mongoose ODM

### Libraries
* Font Awesome
* Moment
* Raphael
* jsPDF
* markdown-js

### Tools
* NPM
* Bower
* Grunt
* Forever
