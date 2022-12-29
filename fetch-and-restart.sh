nvm insall node 19
nvm use node 19
npm i
cd generate-data;
npm run fetch;
cd ../front;
docker compose down;
docker compose up -d --build;
