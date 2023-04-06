#!/bin/bash

! [ -f cert.key ] || ! [ -f cert.crt ] && openssl req -x509 -newkey rsa:4096 -subj / -noenc -days 365 -keyout cert.key -out cert.crt
cat > nginx.conf <<END
daemon off;
pid /dev/null;

events {}

http {
	include /etc/nginx/mime.types;

	server {
		access_log /dev/stdout;	
		error_log stderr;

		listen 4430 ssl;

		server_name		localhost;
		ssl_certificate		cert.crt;
		ssl_certificate_key	cert.key;
		ssl_protocols		TLSv1 TLSv1.1 TLSv1.2;
		ssl_ciphers		HIGH:!aNULL:!MD5;

		root .;
		location / {
			autoindex on;
		}
	}
}
END

echo "Serving at https://localhost:4430/ ..."
nginx -p . -c nginx.conf
