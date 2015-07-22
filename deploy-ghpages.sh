( git clone -b gh-pages --single-branch https://github.com/Teleopti/styleguide.git out
 cd out
 
 find . -path ./.git -prune -o -exec rm -rf {} \; 2> /dev/null
 
 git config user.name "Travis-CI"
 git config user.email "carl.rockman@teleopti.com"
 cp -R ../styleguide ./styleguide
 cp -R ../vendor ./vendor
 cp -R ../css ./css
 cp ../app.js ./app.js
 
 git add .

 if output=$(git status --porcelain) && [ -z "$output" ]; then
   # Working directory clean
 else 
   # Uncommitted changes
 	git commit -m "Deployed to Github Pages"
 	git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1
 fi
)