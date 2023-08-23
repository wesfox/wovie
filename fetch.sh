cd generate-data;
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
nvm insall node 19
nvm use node 19
npm i
npm run fetch-prod;
