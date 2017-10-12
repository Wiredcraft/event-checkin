# event-checkin
meetup checkin service

## Getting Started
```
git clone git@github.com:Wiredcraft/event-checkin.git
cd event-checkin

# start the docker mysql container and setup database
docker-compose up
node deploy/setup.js

# start the backend server
cd backend
yarn install
make start

# start the frontend server
cd frontend
yarn install
yarn build
```
