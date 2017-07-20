# Teleopti styleguide [![Build Status](https://travis-ci.org/Teleopti/styleguide.svg?branch=master)](https://travis-ci.org/Teleopti/styleguide)

Take a look to the [styleguide here](http://teleopti.github.io/styleguide/styleguide/section-0.html)

## How to contribute
First, fork the project and create a new branch on the fork.

To be able to generate the styleguide you need to install the dependencies:

		npm install

To generate it:

		grunt dist or npm run dist

You can also use the watch task. The styleguide is generated after each scss change:

		grunt or npm start

Then, run a local instance (via visual studio for example). The local styleguide is accessible by the url [mylocalserver]/styleguide/styleguide


### Submit your contribution:

* create a pull request from your branch to Teleopti/master.


## Atom packages for this project

If you use Atom you can install those packages to help you following the guidelines

* jscs-fixer

* jshint

* linter-jscs
 
## How to release

* Upgrade the version number in package.json

* Go to https://github.com/Teleopti/styleguide/releases

* Click on "Draft a new release"

* The tag version should be "v"+the new version number (like v1.1.21)

* The target should be the commit with the version upgrade

* Title should be "v"+the new version number (like v1.1.21)

* And you can write some details about the release

* Click on "Publish release"
