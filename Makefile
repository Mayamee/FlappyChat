lint-frontend:
	make -C frontend lint

install:
	npm ci

start-frontend:
	make -C frontend start

start-backend:
	npx start-server

deploy:
	echo 'deploy'

start:
	make start-backend & make start-frontend

.PHONY: install start-frontend start-backend deploy start