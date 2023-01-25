docker build -t maclucky/landing-page .
docker tag maclucky/landing-page:latest maclucky/landing-page:1.0.2
docker push maclucky/landing-page:1.0.2