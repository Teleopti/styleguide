LOCAL=$(node -e "console.log(require('./package.json').version);");
REMOTE=$(npm view teleopti-styleguide version);

if [[ $LOCAL != $REMOTE ]];
then
	bash ./deploy-ghpages.sh;
	return true
fi
