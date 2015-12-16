#Sample Project to get started

Simple project (SASS - ITCSS Method ) setup with Bower and grunt with basic setting to get started with new project.


#Frontend Technologies

    The front-end development is powered primarily by Node, Bower, Grunt.
    The Styles is written in Sass with the SCSS syntax.

#Requirements and Installation
  <ul>
    <li>  Install Node with the installer.</li>
    <li> Install Bower globally with $ npm install -g bower </li>
    <li> Install Grunt globally with $ npm install -g grunt</li>
  </ul>


#Development

Install the required tool, utilities and libraries

$ npm install
$ bower install

#Tasks

This project uses Grunt to run automated tasks for development and production builds.

    gulp watch: Watches the changes and compiles preprocessors.

    grunt: Same as Grunt task runner, but will also run grunt test and not start up.

    gulp jshint: Lints all *.js file in the source folder using eslint and runs all *.test.js file unit tests through Karma and Jasmine.
