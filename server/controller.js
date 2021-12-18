const labelcoll = require('./app-schema')


getImage = async(req, response) => {
  console.log('-------- GET ALL DOCS --------')
  await labelcoll.find({}, (error, image)=> {
    if (error) {
      console.error(`400 in getImage: ${error}`);
      return response
        .status(400)
        .json({
          success: false,
          error: error
        })
    } if (!image.length) {
      console.error(`404 in getImage: ${image} not found`)
      return response
        .status(404)
        .json({
          success: false,
          error: 'Image not found'
        });
    };
    console.log(`200 in getImage: ${image.length} images fetched`)
    return response
      .json({
        success: true,
        item: image
      })
  })
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

updateUser = async(req, response) => {
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
  const userForUpdate = {
    email: req.body.email
  };
  return labelcoll.updateOne({_id: req.params.id}, userForUpdate, (err, writeOpRes) => {
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
        item: userForUpdate,
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
  updateUser,
  createUser,
  deleteUser
}