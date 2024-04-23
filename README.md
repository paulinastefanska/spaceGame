# Space Game

### Tech stack [Nuxt 3, Google Firebase, Pinia, Vuetify 3, Vitest, Cypress]
### [Demo](https://space-game-person-vs-starship.web.app)

## Login data:

email: admin@admin.com </br>
password: admin123

## .env

Please make sure you add your `.env` file: </br>
(public env data for testing purposes only)

```bash
FIREBASE_API_KEY=AIzaSyBrPxCAa08QfDd6SJvjrEqshKYSDNp2VpE
FIREBASE_AUTH_DOMAIN=space-game-person-vs-starship.firebaseapp.com
FIREBASE_PROJECT_ID=space-game-person-vs-starship
FIREBASE_STORAGE_BUCKET=space-game-person-vs-starship.appspot.com
FIREBASE_MESSAGING_SENDER_ID=200579881696
FIREBASE_APP_ID=1:200579881696:web:6ff558cabc2b3e3af84e85
FIREBASE_MEASUREMENT_ID=G-6CZRH7XMNL
```

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# yarn
yarn dev
```

## Production

Build the application for production:

```bash
# yarn
yarn build
```

Locally preview production build:

```bash
# yarn
yarn preview
```

## Tests

```bash
# yarn
yarn test:unit
yarn test:e2e
```

