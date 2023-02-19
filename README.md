# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://docs.docker.com/get-docker/)   
***Note that the installation process may vary depending on your operating system. For example, on Windows or macOS, you may need to install Docker Desktop, while on Linux, you may need to install Docker Engine separately.***

## Downloading

```
git clone https://github.com/KatiaZakharina/nodejs2022Q4-service.git
```

## Installing NPM modules

```
npm install
```

## Configuration

Copy .env.example to .env file

## Running application

To run this app in detached mode run:

```
docker-compose up -d
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.


## Docker Scan

To scan the API, you can run the following command:

```
npm run docker:scan-api
```

To scan the database, you can run the following command:

```
npm run docker:scan-db
```

***If you encounter the error "failed to get DockerScanID: You need to be logged in to Docker Hub to use the scan feature"***

Log in using following command:

```
docker login
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
