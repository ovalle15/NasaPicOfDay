# Rate Nasa's image of the day !

The following api will allow you to rate the Nasa images of the day. You will be able to do the following:

1) Fetch and save Nasa's image into a local database
2) Create and delete user and image specific ratings (1-5)
3) Get user information (ratings, email)
4) Get total user ratings per image

### How to run the api:
1) Get a api key token from -> https://api.nasa.gov/index.html
2) clone this repo
3) travel to the root folder and create an ```.env``` file with the following env variables

```
APP_ENV=production
API_HOST=localhost
PORT=3000
API_TOKEN="your_api_token"
MONGO_HOST='mongodb://mongo:27017/labelbox'
CLIENT_PORT=3001

```
4) Run  ```docker-compose up -d ``` on the root folder


### Endpoints:

* [GET] /nasaimage -> Fetches and saves nasa image of the day in your mongo db
* [GET]  /user/:id -> Gets user by mongo record id
e.g (/api/user/123sad456896868asde)
* [POST] /user  -> creates user and inserts image of the day for the user to add a rating:
    Must pass the user data for the request:
    {
        "email": "myemail@gmail.com"
    }
* [PATCH] /user/:id/:image_id -> Updates the rating for the user and a specific image
e.g (/api/user/123sad456896868asde/ksdhklj79897askjhkfjh)

* [DELETE] /user/:id -> Deletes the records of unique user + image of the day records in mongodb
e.g (/api/user/123sad456896868asde)

* [GET] /ratings -> Fetches the ratings for a specific user and specific image
    Must pass the user data for the request:
    {
        "email" : "myemail@gmail.com"
    }



![Activity Diagram](Activity_diagram.jpeg)
