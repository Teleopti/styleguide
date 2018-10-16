# Teleopti styleguide [![Build Status](https://travis-ci.org/Teleopti/styleguide.svg?branch=master)](https://travis-ci.org/Teleopti/styleguide)

# Development
1.  Fork the main repo https://github.com/Teleopti/styleguide.git to <your_github_username>/styleguide
2.  Clone your repo to local `git clone https://github.com/<your_github_username>/styleguide.git`
3.  `npm ci` or `npm install` to install dependencies
4.  `npm start` to build and watch
5.  `npm run devServer` to mount styleguide on [http://localhost:3000](http://localhost:3000)
6.  Make your changes with test covered
7.  Copy the generated files to `WFM\node_modules\teleopti-styleguide` and verfiy the changes on WFM
8.  Submit a _pull request_ from your repo to => Teleopti/styleguide main repo with your improvements.

# Deploy release to npm & github pages

1.  Bump suitable [semver](https://semver.org/) version in [package.json](./package.json)
    *   Preferably submit and merge a pull request with the version change
2.  Tag the commit
    *   Tag with `v1.5.0` if the version is `1.5.0`
3.  Push the tag to master
    *   `git push origin v1.5.0`

If you have any mentionable changes then [draft a new GitHub release](https://github.com/Teleopti/styleguide/releases/new) with the same tag and a list of changes.
