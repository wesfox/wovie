if [ $( docker ps -a | grep wovie-app | wc -l ) -gt 0 ]; then
  echo "wovie-app is running, stoping it..."
  docker stop wovie-app
  docker rm wovie-app
else
  echo "wovie-app is not running yet"
fi

echo "starting wovie-app"

docker run -d --name wovie-app -p 127.0.0.1:9000:80 -v "$(pwd)"/db:/db -v "$(pwd)"/nginx.conf:/etc/nginx/nginx.conf wovie-app
