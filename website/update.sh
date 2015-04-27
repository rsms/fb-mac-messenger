#!/bin/bash
cd "$(dirname "$0")"
source ../admin/aws-credentials.sh
aws s3 sync . s3://fbmacmessenger.rsms.me/ --exclude "*.sh" --exclude ".DS_Store"
