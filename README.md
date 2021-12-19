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

* [/nasaimage]: Fetches and saves nasa image of the day in your mongo db
```[GET] /api/nasaimage```
* [/user/:id]: Gets user by mongo record id
```[GET] /api/user/61bfb7359158437ec6634c51```

Response:

```json
{
    "success": true,
    "item": [
        {
            "_id": "61bfb7359158437ec6634c51",
            "email": "test@gmail.com",
            "image_id": "61bfb00193bcd5e95424ce93",
            "rating": 0,
            "createdAt": "2021-12-19T22:50:29.101Z",
            "updatedAt": "2021-12-19T22:50:29.101Z",
            "__v": 0
        }
    ]
}
```

* [/user]: creates user and inserts image of the day to user record:
```[POST] /api/user```

Request body:

```json
    {
        "email": "test@gmail.com"
    }
```
[200] Response:

```json
{
    "success": true,
    "item": {
        "email": "test@gmail.com",
        "image_id": "61bfb00193bcd5e95424ce93",
        "rating": 0,
        "_id": "61bfb7359158437ec6634c51",
        "createdAt": "2021-12-19T22:50:29.101Z",
        "updatedAt": "2021-12-19T22:50:29.101Z",
        "__v": 0
    }
}
```
* [/user/:id/:image_id]: Updates the rating for the user and a specific image
``` [PATCH] /api/user/61bfb7359158437ec6634c51/61bfb00193bcd5e95424ce93```

[200] Response:

```json
{
    "success": true,
    "item": {
        "rating": 3
    },
    "writeOpResult": {
        "_id": "61bfb7359158437ec6634c51",
        "email": "test@gmail.com",
        "image_id": "61bfb00193bcd5e95424ce93",
        "rating": 3,
        "createdAt": "2021-12-19T22:50:29.101Z",
        "updatedAt": "2021-12-19T22:54:41.666Z",
        "__v": 0
    }
}
```

* [/user/:id]: Deletes the records of unique user + image of the day records in mongodb
```[DELETE] /api/user/61bfb7359158437ec6634c51```

Response:
```json
{
    "success": true,
    "item": null,
    "message": "User has been deleted"
}
```

* [/ratings]: Fetches the ratings for a specific user and specific image must pass
 the user data in the request.
```[GET] /ratings```

Request body:

```json
    {
        "email" : "test@gmail.com"
    }
```

Response:

```json
{
    "success": true,
    "images": {
        "61bfb00193bcd5e95424ce93": 3
    },
    "user": "test@gmail.com",
    "message": "User ratings per image has been retrieved"
}
```
#API activity diagram

![Activity Diagram](Activity_diagram.jpeg)
