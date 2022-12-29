cd generate-data;
# npm run fetch;
cd ../front;
docker compose down;
docker compose up -d --build;
