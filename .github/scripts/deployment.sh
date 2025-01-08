#!/bin/bash
# assign the first argument passed to the script to a variable
version=$1

if [ -z "$version" ]; then
  echo "Error: version is missing"
  exit 1
fi

sed -i "s/landing-page.*/landing-page:$version/g" .github/manifests/portfolio-app.yml