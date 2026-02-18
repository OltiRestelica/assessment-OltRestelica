const User = require("../models/User");
const bcrypt = require("bcrypt");
const validator = require("validator");
const JWT = require("jsonwebtoken");

const createToken = (user_id) => {
  return JWT.sign({ user_id }, process.env.SECRET, { expiresIn: "1h" });
};

const SignUp = (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      status: 0,
      message: "Please make sure to fill out all of the fields",
    });
  } else {
    const hash = bcrypt.hashSync(password, 10);
    if (!validator.isEmail(email)) {
      res.status(400).json({
        status: 0,
        message: "Invalid email",
      });
    } else {
      User.findOne({
        where: {
          email,
        },
      })
        .then((user) => {
          if (user) {
            res.status(500).json({
              status: 0,
              message: "This email is already assigned to an account",
            });
          } else {
            if (!validator.isStrongPassword(password)) {
              res.status(400).json({
                status: 0,
                message: "Password isn't strong enough",
              });
            } else {
              User.create({
                name,
                email,
                password: hash,
                role,
              })
                .then((newUser) => {
                  const token = createToken(newUser.user_id);
                  res.status(200).json({
                    status: 1,
                    data: newUser,
                    token,
                  });
                })
                .catch((err) => {
                  res.status(500).json({
                    status: 0,
                    data: err,
                  });
                });
            }
          }
        })
        .catch((err) => {
          res.status(500).json({
            status: 0,
            data: err,
          });
        });
    }
  }
};

const LogIn = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    res.status(400).json({
      status: 0,
      message: "Please make sure to fill out all of the fields",
    });
  } else {
    User.findOne({
      where: {
        email,
      },
    })
      .then((user) => {
        if (!user) {
          res.status(400).json({
            status: 0,
            message: "User not found",
          });
        } else {
          const isPasswordValid = bcrypt.compareSync(password, user.password);
          if (isPasswordValid === false) {
            res.status(400).json({
              status: 0,
              message: "Incorrect password",
            });
          } else {
            const token = createToken(user.user_id);
            res.status(200).json({
              status: 1,
              data: user,
              token,
            });
          }
        }
      })
      .catch((err) => {
        res.status(500).json({
          status: 0,
          data: err.message,
        });
      });
  }
};

module.exports = { SignUp, LogIn };
