# Flappy chat

🌐Available on
<a href="https://cv-chat.wem.webtm.ru" target="_blank">https://cv-chat.wem.webtm.ru</a>

🔍My portfolio:
<a href="https://portfolio-cv-eight.vercel.app" target="_blank">https://portfolio-cv-eight.vercel.app</a>

🏷This project:
<a href="https://portfolio-cv-eight.vercel.app/project/flappy-chat" target="_blank">https://portfolio-cv-eight.vercel.app/project/flappy-chat</a>

## Description

This is a simple chat application with JWT authorization.

It is written in `React` and uses `Redux` for state management.

For forms validation `Formik` and `Yup` are used.

For styling `React-Bootstrap` is used.

Routing is done with `React-Router`.

Internationalization is done with `i18next`.

Currently only `en` and `ru` languages are supported.

Also `Docker` is used for development and production.

## Features

- [x] JWT authorization
- [x] User registration
- [x] Chat functionality with Socket.io library
- [x] Chat rooms
- [x] Internationalization (i18next)
- [x] Adaptive design

## Docs

Default user for testing:
`admin` password: `admin`

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
Place this file in root project directory
