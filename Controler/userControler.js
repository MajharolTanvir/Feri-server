const UserDB = require("../Model/userModel");
const sendToken = require("../Utilits/sendToken");

exports.createUser = async (req, res, next) => {
  try {
    const { name, email, address, city } = req.body;
    let user = await UserDB.findOne({ email });
    if (user) {
      sendToken(user, 200, res);
    } else {
      const addeduser = await UserDB.create({
        name,
        email,
        address,
        city,
      });

      sendToken(addeduser, 200, res);
    }
  } catch (eror) {
    console.log(eror);
  }
};

exports.getAllUser = async (req, res, next) => {
  const user = await UserDB.find({});
  res.json({ success: true, user });
};

exports.getUserDetails = async (req, res, next) => {
  const user = await UserDB.findById(req.params.id);
  if (!user) {
    res.status(400).json({ success: false, message: "User Not find" });
  }

  res.status(200).json({
    success: true,
    user,
  });
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await UserDB.findById(req.params.id);
    if (!user) {
      res.status(403).json({
        success: false,
        message: "user Not found",
      });
    }
    await user.remove();
    res.status(403).json({
      success: true,
      message: "User Delete SuccessFull",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.updateUserInfo = async (req, res, next) => {
  let user = await UserDB.findById(req.params.id);
  if (!user) {
    res.status(404).json({ success: false, message: "User Not Found" });
  }
  user = await UserDB.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
    message: "User update Success",
  });
};

exports.createAdmin = async (req, res, next) => {
  try {
    const email = req.params.email;
    const adminRequester = req.decoded.email;
    const requestAdmin = await UserDB.findOne({ email: adminRequester });
    if (requestAdmin.role == "admin") {
      const roleAction = req.query.roleAction;
      if (roleAction == "admin") {
        const makeAdmin = await UserDB.updateOne(
          { email },
          {
            $set: { role: "editor" },
          }
        );
        res.status(200).json({
          success: true,
          admin: makeAdmin,
        });
      } else if (roleAction === "user") {
        const makeUser = await User.updateOne(
          { email },
          {
            $set: { role: "user" },
          }
        );
        res.status(200).json({
          success: true,
          admin: makeUser,
        });
      }
    } else {
      res.status(403).send({ message: "forbiden Accescc" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.cheackAdmin = async (req, res, next) => {
  try {
    const email = req.params.email;
    const user = await UserDB.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User Not Found" });
    } else {
      const isAdmin = user.role === "admin";
      res.status(200).json({
        success: true,
        admin: isAdmin,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.cheackEditor = async (req, res, next) => {
  try {
    const email = req.params.email;
    const user = await UserDB.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User Not Found" });
    } else {
      const isEditor = user.role === "editor";
      res.status(200).json({
        success: true,
        admin: isEditor,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
