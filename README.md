# Booking Places

A simple app showing you nearby lodging and allowing you to "book" any place.

## Setup to run locally

1. Clone this Repo
2. `cd client && npm i`
3. `cd server && npm i`
4. Install local mongodb instance and write its URL to: `server/src/environments -> MONGO_DB_INSTANCE`
5. Go to your Google Developers Console and enable its Geolocation API, Places API and Maps API
6. Go to `client/src/environments` and paste your `GOOGLE_PLACES_API_KEY`
7. In terminals run: `mongo`, `cd server && npm run start`, `cd client && ng serve`
8. Open your app on http://localhost:4200/
