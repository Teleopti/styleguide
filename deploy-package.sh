LOCAL=$(node -e "console.log(require('./package.json').version);");
REMOTE=$(npm view teleopti-styleguide version);

if [[ $LOCAL != $REMOTE ]];
then
	npm config set username "teleopti_travis"
	npm config set password $password
	npm config set email $email
	bash ./deploy-ghpages.sh;
	npm publish;
fi
