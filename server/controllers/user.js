const router = require('express').Router()
const nodemailer = require('nodemailer')
const bcrypt = require('bcryptjs')

const { deconstructUser } = require('../helpers/deconstructUser');

//SCHEMA IMPORT
const userSchema = require('../models/userSchema')

//GLOBALS
const SALT = Number(process.env.SALT)

// Update User
router.put('/updateUser', async (req, res) => {
  try {
    console.log('Update user endpoint hit')

    deconstructUser(req.body, 'update')

    const id = req.body.id
    const foundEntry = await userSchema.findById(id)

    //get password
    const password = req.body.password

    //if password exist hash new password
    if (password) {
      req.body.password = bcrypt.hashSync(password, SALT)
    }

    //remove id from req.body
    const {_id, ...updateValues} = req.body

    const updatedEntry = await userSchema.findByIdAndUpdate(id, updateValues, {
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


router.post('/findKidsOfParent', async (req, res) => {
  try {
    console.log('findKidsOfParent endpint hit');

    deconstructUser(req.body, 'findKidsOfParent')

    // get parent user id
    const id = req.body.id

    const foundKidsOfParent = await userSchema.find({parentUser: id})
    
    return res.status(200).json({foundKidsOfParent})
  } catch (error) {
    return res.status(500).json({
      message: `${error}`,
    })
  }
})

router.post('/getAllUsers', async (req, res) =>{

  try {
    console.log('getAllUsers endpoint hit');
    
    // verify user is an admin
    if(req.body.userInfo.userType !== 'admin') throw new Error("Request Denied");
    
    const allUsers = await userSchema.find({})

    return res.status(200).json({allUsers})
    
  } catch (error) {
    return res.status(500).json({
      message: `${error}`,
    })
  }
})

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
  let config

  switch (service) {
    case 'gmail':
      config = {
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS,
        },
      }
      break

    case 'yahoo':
      config = {
        service: 'yahoo',
        auth: {
          user: process.env.YAHOO_USER,
          pass: process.env.YAHOO_PASS,
        },
      }
      break

    case 'hotmail':
      config = {
        service: 'hotmail',
        auth: {
          user: process.env.HOTMAIL_USER,
          pass: process.env.HOTMAIL_PASS,
        },
      }
      break

    case 'custom':
      config = {
        host: process.env.CUSTOM_SMTP_HOST,
        port: process.env.CUSTOM_SMTP_PORT,
        secure: process.env.CUSTOM_SMTP_SECURE === 'true', // Convert string to boolean
        auth: {
          user: process.env.CUSTOM_SMTP_USER,
          pass: process.env.CUSTOM_SMTP_PASS,
        },
      }
      break

    default:
      throw new Error('Unsupported email service')
  }

  return nodemailer.createTransport(config)
}

// Password recovery endpoint
router.post('/recoverPass', async (req, res) => {
  try {
    console.log('endpoint hit')

    const { email } = req.body
    if (!email) {
      return res.status(400).json({ message: 'Email is required' })
    }

    const user = await userSchema.findOne({ email: email.toLowerCase() })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const token = jwt.sign({ id: user._id }, JWT_KEY, { expiresIn: '1h' })

    const recoveryLink = `${CLIENT_URL}/reset-password/${token}`

    //Data that will be sent to user email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Password Recovery',
      text: `Click the link to reset your password: ${recoveryLink}`,
      html: `<p>Click the link to reset your password:</p><a href="${recoveryLink}">${recoveryLink}</a>`,
    }
    //Sends recovery email
    await transporter.sendMail(mailOptions)

    // Success or error after password recov. request
    res.status(200).json({ message: 'Password recovery email sent' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
})

// Password reset endpoint
router.post('/resetPass', async (req, res) => {
  try {
    const { token, newPassword } = req.body

    if (!token || !newPassword) {
      return res
        .status(400)
        .json({ message: 'Token and new password are required' })
    }

    const decoded = jwt.verify(token, JWT_KEY)

    const user = await userSchema.findById(decoded.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    // New Password added
    validatePasswordCriteria(newPassword)

    user.password = bcrypt.hashSync(newPassword, SALT)
    await user.save()

    // Success or error after trying reset.
    res.status(200).json({ message: 'Password reset successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
})

module.exports = router