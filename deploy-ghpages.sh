mkdir out; 
( cd out
 git init
 git config user.name "Travis-CI"
 git config user.email "carl.rockman@teleopti.com"
 cp -R ../styleguide ./styleguide
 cp -R ../vendor ./vendor
 git add .
 git commit -m "Deployed to Github Pages"
 git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1
)