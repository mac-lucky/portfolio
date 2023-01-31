#!/bin/bash
# assign the first argument passed to the script to a variable
version=$1

sed -i "s/landing-page.*/landing-page:$version/g" .github/manifests/portfolio-app.yml