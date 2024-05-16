# Getting Started

1. Install [`mkcert`](https://github.com/FiloSottile/mkcert) to generate SSL certificates

2. Run `bash init.sh` to modify /etc/hosts.

- This step requires sudo permissions

3. Run `npm start` to start http server

# Clean up

- Run `sudo vim /etc/hosts` and remove rows that appended by this demo.

```
127.0.0.1 publisher-a.com
127.0.0.1 publisher-b.com
127.0.0.1 thirdparty.com
```
