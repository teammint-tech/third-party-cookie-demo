#!/bin/bash

# The hosts to add
HOSTS=("publisher-a.com" "publisher-b.com" "thirdparty.com")

# Loop over each host
for HOST in "${HOSTS[@]}"; do
  # Check if the host already exists in /etc/hosts
  if ! grep -q "127.0.0.1 $HOST" /etc/hosts; then
    # If it doesn't exist, append it
    echo "127.0.0.1 $HOST" | sudo tee -a /etc/hosts
  fi
done

# Generate the SSL certificates
mkcert -cert-file cert.pem -key-file key.pem localhost 127.0.0.1 ::1 "${HOSTS[@]}"