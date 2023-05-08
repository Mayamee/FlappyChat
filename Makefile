DOCKER_TAG=autobuild
DOCKER_USER=mew1307

lint-frontend:
	make -C frontend lint

install:
	npm install

start:
	make start-backend & make start-frontend

dev:
	npm run dev

build:
	npm run build

start-frontend:
	make -C frontend start

start-backend:
	npm run launch

docker-dev:
	docker-compose -f docker-compose.dev.yml up -d --build --force-recreate

docker-prod:
	docker-compose -f docker-compose.production.yml up -d --build --force-recreate

docker-dev-down:
	docker-compose -f docker-compose.dev.yml down

docker-prod-down:
	docker-compose -f docker-compose.production.yml down

docker-build-prod:
	docker build -f Dockerfile.production -t $(DOCKER_USER)/flappy-chat:$(DOCKER_TAG) .

docker-login:
	npx posix-cat .docker_passwd | docker login -u $(DOCKER_USER) --password-stdin

docker-push-prod: docker-login
	docker push $(DOCKER_USER)/flappy-chat:$(DOCKER_TAG)

docker-all-prod: docker-build-prod docker-push-prod

.PHONY: install start-frontend start-backend deploy start dev
.PHONY: docker-dev docker-prod docker-dev-down docker-prod-down docker-build-prod docker-login docker-push-prod docker-all-prod