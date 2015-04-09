#!/bin/bash
cd "$(dirname "$0")"
source ../aws-credentials.sh
aws s3 cp index.html s3://fbmacmessenger.rsms.me/index.html
aws s3 cp screenshot.png s3://fbmacmessenger.rsms.me/screenshot.png
