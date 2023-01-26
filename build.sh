docker build -t maclucky/landing-page .
docker tag maclucky/landing-page:latest ghcr.io/mac-lucky/landing-page:1.0.0
docker push ghcr.io/mac-lucky/landing-page:1.0.0