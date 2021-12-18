const labelcoll = require('./schemas/app-schema')
const imagecoll = require('./schemas/image-schema')
const axios = require('axios')
const dotenv = require('dotenv')
dotenv.config()

const url = `https://api.nasa.gov/planetary/apod?api_key=${process.env.API_TOKEN}`
console.log(url)


getImage = async(req, response) => {
  console.log('-------- GET IMAGE  --------')

    const res = await axios.get(url);
    if (!res){
      console.error(`400 in createUser`)
      return response
        .status(400)
        .json({
          success: false,
          error: "Input Incorrect Data"
        });
    }
    const checkImg =  await imagecoll.findOne({"image_path": res.data.url}).lean()
    if (!checkImg) {
      const obj = {
        total_ratings: 0,
        image_path: res.data.url
      }
      const img = new imagecoll(obj);
      return img
      .save()
      .then((saved) =>{
        if (saved) {
          console.log(`202 in getImage, the following image record was created: ${img}`)
          return response
            .status(200)
            .json({
              success: true,
              item: img
            })
        };
      })
    } else {
      console.log("Skipping image insertion, this image already exists in the db", res.data)
      return response
        .status(200)
        .json({
          success: true,
          item : res.data.url,
          message: "This Image Already Exists in the DB"
        })
    }
}

getUser = async(req, response) => {
  console.log('---------- GET USER -------')
  await labelcoll.find({_id: req.params.id}, (err, user)=>{
    if (error) {
      console.log(`400 in getUser: ${error}`)
      return response
        .status(400)
        .json({
          success: false,
          error: error
        })
    } if (!user.length) {
      console.error(`404 in getUser: User not found`)
      return response
        .status(404)
        .json({
          success: false,
          error: 'Document Not Found'
        });
    };
    console.log(`200 in getUser: document with id ${req.params.id} has been fetched`)
    return response
      .status(200)
      .json({
        success: true,
        item: user
      })
  })
}

createUser = async(req, response) => {
  console.log('------- CREATE NEW USER -------- ')
  const body = req.body;
  console.log("this is body ==>",body)
  if (!body) {
    console.error(`400 in createUser`)
    return response
      .status(400)
      .json({
        success: false,
        error: "Input Incorrect Data"
      });
  };
  const user = new labelcoll(body);
  if (!user) {
    console.error(`400 in createUser, user document is malformed`)
    return response
      .status(400)
      .json({
        success: false,
        message: "Document is malformed"
      })
  };
  return user
    .save()
    .then((saved) =>{
      if(saved) {
        console.log(`202 in createUser, the following user was created: ${user}`)
        return response
          .status(200)
          .json({
            success: true,
            item: user
          })
      };
    })
    .catch(err => {
      console.error(`caught error in createUser: ${err}`);
      Object.keys(err.errors).forEach(errorKey => {
        console.error(`[ERROR] for: ${errorKey}`);
        console.error(`=> ${(err.errors[errorKey] || {}).properties || {}.message}`)
      })
    })
}
updateRating = async(req, response) => {
  const body = req.body;
  if(!body) {
    console.error(`400 in updateUser: you must provide an user to update`)
    return response
      .status(400)
      .json({
        success: false,
        error: "You must provide an item to update"
      });
  }
  const ratingForUpdate = {
    rating: req.body.rating,
    image_id: req.body.image_id
  };
  return labelcoll.updateOne({_id: req.params.id}, ratingForUpdate, (err, writeOpRes) => {
    if (err) {
      console.error(`updateUser: user not found`)
      console.error(err)
      return response
        .status(404)
        .json({
          success: false,
          error: err,
          message: 'User not found'
        });
    };
    console.log(writeOpRes);
    return writeOpRes
  })
  .then(result => {
    return response
      .status(200)
      .json({
        success: true,
        item: ratingForUpdate,
        writeOpResult: result
      });
  })
  .catch(err => {
    console.error(`caught error in createUser: ${err}`);
    Object.keys(err.errors).forEach(errorKey => {
      console.error(`[ERROR] for: ${errorKey}`);
      console.error(`=> ${(err.errors[errorKey] || {}).properties || {}.message}`)
    })
  })
};

deleteUser = async(req, response) => {
  console.log('------ DELETE USER ----- ')
  await labelcoll.findOneAndDelete({_id: req.params.id}, (err, user) => {
    if(err) {
      console.error(`400 in deleteUser: ${err}`);
      return response
        .status(400)
        .json({
          success: false,
          error: err
        });
    };
    if (!user) {
      console.error(`400 in deleteUser: user not found -. ${user}`);
      return response
        .status(404)
        .json({
          success: false,
          error: 'User not found'
        });
    };
    console.log(`Document with _id : ${req.params.id}, has been deleted`)
    return response
      .status(200)
      .json({
          success: true,
          item: user,
          message: 'User has been deleted'
      })
  })
  .catch(err => {
    console.error(`caught error in createUser: ${err}`);
    Object.keys(err.errors).forEach(errorKey => {
      console.error(`[ERROR] for: ${errorKey}`);
      console.error(`=> ${(err.errors[errorKey] || {}).properties || {}.message}`)
    })
  });
};

module.exports = {
  getImage,
  getUser,
  updateRating,
  createUser,
  deleteUser
}