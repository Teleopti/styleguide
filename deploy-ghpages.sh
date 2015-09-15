( git clone -b gh-pages --single-branch https://github.com/Teleopti/styleguide.git out
 cd out
 
 find . -path ./.git -prune -o -exec rm -rf {} \; 2> /dev/null
 
 git config user.name "Travis-CI"
 git config user.email "carl.rockman@teleopti.com"
 cp -R ../styleguide ./styleguide
 cp -R ../vendor ./vendor
 cp -R ../css ./css
 cp ../app.js ./app.js
 npm install

 git add .

 if test -n "$(git status --porcelain)"; then
    # Uncommitted changes
 	git commit -m "Deployed to Github Pages"
 	git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" gh-pages > /dev/null 2>&1
	
	# Create version package and publish to Release
	cp ../.npmignore ./.npmignore
	cp ../package.json ./package.json
	
	npm pack
	
	cd ..
	git clone -b Release --single-branch https://github.com/Teleopti/styleguide.git Release
    cp -n out/*.tgz Release
	
	cd Release
	
 	git add .
 
	if test -n "$(git status --porcelain)"; then
    	# Uncommitted changes		
 		git config user.name "Travis-CI"
 		git config user.email "carl.rockman@teleopti.com"
 
 		git commit -m "Deployed to Release archive"
 		git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" Release > /dev/null 2>&1
	fi
 fi
)