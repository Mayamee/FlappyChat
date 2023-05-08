### Flappy chat

Available on https://cv-chat.wem.webtm.ru

### Developing locally
Install dependencies
```bash
npm install
```
Run dev server
```bash
make dev
```

### Developing with docker
Install docker and docker-compose if you haven't already
```bash
curl -sSL https://get.docker.com | sh
sudo usermod -aG docker $(whoami)
curl -L "https://github.com/docker/compose/releases/download/v2.12.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/bin/docker-compose
chmod +x /usr/bin/docker-compose
```
Run dev server
```bash
make dev-docker
```

### Building for production
```bash
make build
```

### Building and pushing docker image to docker hub
```bash
make DOCKER_USER=SOME_USER DOCKER_TAG=SOME_TAG docker-all-prod
```
Here you should create `.docker_passwd` file with your docker hub password
Plase this file in root project directory