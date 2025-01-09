// IMPORTS
const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');

//SCHEMA IMPORT
const userSchema = require('../models/userSchema')

//HELPER IMPORTS
//checks verifies incoming req.body
const { deconstructUser } = require('../helpers/deconstructUser')

//verifies the password chosen meets password requirements
const {
  validatePasswordCriteria,
} = require('../helpers/validatePasswordCriteria')

//checks other schema for existing email or username

//GLOBALS
const SALT = Number(process.env.SALT)
const JWT_KEY = process.env.JWT_KEY

// Delete User
router.delete('/delete-user', async (req, res) => {
  try {
    console.log('Delete user endpoint hit')

    //  Extract userId from request body
    deconstructUser(req.body, 'delete')

    const id = req.body.id

    //  Handle dependent data
    if (userSchema.userType === 'parent' && user.kids.length > 0) {
      console.log(
        'Warning: Parent user has dependent kids. Handle this if needed.'
      )
    }

    // checks if user exist
    if (!(await userSchema.findById(id))) throw new Error('no user found')
    // Delete the user
    await userSchema.findByIdAndDelete(id) // Delete by userName

    // Return success response
    return res.status(200).json({ message: 'User successfully deleted' })
  } catch (error) {
    console.error('Error deleting user:', error)

    //  Handle server errors
    return res.status(500).json({ message: 'Server error', error })
  }
})

//register new user
router.post('/register', async (req, res) => {
  try {
    console.log('register new user endpoint hit') //TODO REMOVE IN FINAL

    deconstructUser(req.body)

    //create new user
    const newUser = new userSchema(req.body)

    validatePasswordCriteria(newUser.password)

    //hash user passprd
    newUser.password = bcrypt.hashSync(newUser.password, SALT)

    console.log('newUser', newUser)

    //save user
    await newUser.save()

    //generate token
    const token = jwt.sign(
      //payload
      { id: newUser._id },
      //token key
      JWT_KEY,
      //epiration
      { expiresIn: '1 hour' }
    )

    return res
      .status(200)
      .cookie('authToken', token, {
        maxAge: 1000 * 60 * 60,
        sameSite: 'Strict',
        secure: false,
      })
      .json({
        message: `new ${newUser.userType} user created`,
        userInfo: newUser
      })
  } catch (error) {
    return res.status(500).json({
      message: `${error}`,
    })
  }
})

// Endpoint to find all users
router.get('/findAllUsers', async (req, res) => {
  try {
    const users = await userSchema.find({})
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
})

// Update User
router.put('/updateUser', async (req, res) => {
  try {
    deconstructUser(req.body, 'update')

    const id = req.body.id
    const foundEntry = await userSchema.findById(id)

    //get password
    const password = req.body.password

    //if password exist hash new password
    if (password){
      req.body.password = bcrypt.hashSync(password, SALT)
    }

    const updatedEntry = await userSchema.findByIdAndUpdate(id, req.body, {
      returnDocument: 'after',
    })
    res.status(200).json({
      message: `Modified`,
      originalDocument: foundEntry,
      updatedDocument: updatedEntry,
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      error: `${err}`,
    })
  }
})

// Endpoint to get specific users by ID
router.post('/findSingleUser', async (req, res) => {
  try {
    console.log('find user endpoint hit')

    const user = await userSchema.findOne({ userName: req.body.userName })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
})

router.post('/login', async (req, res) => {
  try {
    console.log('user login endpoint hit')

    deconstructUser(req.body, 'login')

    //grab userName and password
    const userName = req.body.userName
    const userPassword = req.body.password

    //look for user. case insensitive
    const foundUser = await userSchema.findOne({
      userName: { $regex: userName, $options: 'i' },
    }) //4

    //if not found throw errror
    if (!foundUser) throw new Error('invalid username or password 1')

    //verify password
    const passwordVerified = await bcrypt.compare(
      userPassword,
      foundUser.password
    )

    //throw error if password invalid
    if (!passwordVerified) throw new Error('invalid username or password')

    //generate token
    const token = jwt.sign(
      //payload
      { id: foundUser._id },
      //token key
      JWT_KEY,
      //epiration
      { expiresIn: '1 hour' }
    )

    return res
      .status(200)
      .cookie('authToken', token, {
        maxAge: 1000 * 60 * 60,
        sameSite: 'Strict',
        secure: false,
      })
      .json({
        message: `Welcome ${foundUser.userName}`,
        userInfo: foundUser
      })
  } catch (error) {
    return res.status(500).json({
      message: `${error}`,
    })
  }
});

/*// Transporter for email services
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
*/

//Transporter for multiple email services
function createTransporter(service) {
  let config;

  switch (service) {
    case 'gmail':
      config = {
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS,
        },
      };
      break;

    case 'yahoo':
      config = {
        service: 'yahoo',
        auth: {
          user: process.env.YAHOO_USER,
          pass: process.env.YAHOO_PASS,
        },
      };
      break;

    case 'hotmail':
      config = {
        service: 'hotmail',
        auth: {
          user: process.env.HOTMAIL_USER,
          pass: process.env.HOTMAIL_PASS,
        },
      };
      break;

    case 'custom':
      config = {
        host: process.env.CUSTOM_SMTP_HOST,
        port: process.env.CUSTOM_SMTP_PORT,
        secure: process.env.CUSTOM_SMTP_SECURE === 'true', // Convert string to boolean
        auth: {
          user: process.env.CUSTOM_SMTP_USER,
          pass: process.env.CUSTOM_SMTP_PASS,
        },
      };
      break;

    default:
      throw new Error('Unsupported email service');
  }

  return nodemailer.createTransport(config);
}


// Password recovery endpoint
router.post('/recoverPass', async (req, res) => {
  try { console.log("endpoint hit")
    
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await userSchema.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const token = jwt.sign({ id: user._id }, 
                  JWT_KEY, { expiresIn: '1h' });

    const recoveryLink = `${CLIENT_URL}/reset-password/${token}`;

//Data that will be sent to user email  
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Password Recovery',
      text: `Click the link to reset your password: ${recoveryLink}`,
      html: `<p>Click the link to reset your password:</p><a href="${recoveryLink}">${recoveryLink}</a>`,
    };
//Sends recovery email
    await transporter.sendMail(mailOptions);

// Success or error after password recov. request
    res.status(200).json({ message: 'Password recovery email sent' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Password reset endpoint
router.post('/resetPass', async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ message: 'Token and new password are required' });
    }

    const decoded = jwt.verify(token, JWT_KEY);

    const user = await userSchema.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
// New Password added
    validatePasswordCriteria(newPassword);

    user.password = bcrypt.hashSync(newPassword, SALT);
    await user.save();

// Success or error after trying reset.
    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router
