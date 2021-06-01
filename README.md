This component will expose a REST api providing CRUD operations to fetch one or several games, create, update
and delete a game. Though this api, it will also be possible:
• Fetch only the manufacturer data for a given game (without any manufacturers dedicated APIs – i.e. only by
using the game API)
• To trigger a process which will automatically remove the games having a release date older than 18months
and apply a discount of 20% to all games having a release date between 12 and 18 months.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
