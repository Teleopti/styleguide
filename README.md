# Teleopti styleguide [![Build Status](https://travis-ci.org/Teleopti/styleguide.svg?branch=master)](https://travis-ci.org/Teleopti/styleguide)

# Development

1.  `npm ci` or `npm install` to install dependencies
2.  `npm start` to build and watch
3.  `npm run devServer` to mount styleguide on [http://localhost:3000](http://localhost:3000)

Submit a _pull request_ with your improvements.

# Deploy release to npm & github pages

1.  Bump suitable [semver](https://semver.org/) version in [package.json](./package.json)
    *   Preferably submit and merge a pull request with the version change
2.  Tag the commit
    *   Tag with `v1.5.0` if the version is `1.5.0`
3.  Push the tag to master
    *   `git push origin v1.5.0`

If you have any mentionable changes then [draft a new GitHub release](https://github.com/Teleopti/styleguide/releases/new) with the same tag and a list of changes.
