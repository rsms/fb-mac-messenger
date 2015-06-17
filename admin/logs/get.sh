#!/bin/bash
set -e
cd "$(dirname "$0")"
source ../aws-credentials.sh
aws s3 sync s3://fbmacmessenger.rsms.me/logs/ ./logs --exclude ".DS_Store"
