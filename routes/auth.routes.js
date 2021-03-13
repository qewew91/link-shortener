const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')

const router = Router()


router.post(
  '/register',
  [
    check('email', 'Wrong email')
      .trim()
      .isEmail(),
    check('password', 'Minimal length of password is 6 symbols')
      .trim()
      .isLength({ min: 6 })
  ],
  async (req, res) => {
    try {

      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Wrong register data'
        })
      }

      const { email, password } = req.body

      const userExists = await User.findOne({ email })
      if (userExists) {
        return res.status(400).json({ message: 'This email already exists' })
      }

      const hashedPassword = await bcrypt.hash(password, 10)

      const user = new User({ email, password: hashedPassword })
      await user.save()

      res.status(201).json({ message: 'User has been created!' })
    } catch (e) {
      res.status(500).json({ message: 'Something went wrong, try again' })
    }
})

router.post(
  '/login',
  [
    check('email', 'Wrong email')
      .normalizeEmail()
      .isEmail(),
    check('password', 'Wrong password')
      .trim()
      .exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Wrong login data'
        })
      }

      const { email, password } = req.body

      const user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({ message: 'User doesn\'t exist' })
      }

      const passwordMatch = await bcrypt.compare(password, user.password)
      if (!passwordMatch) {
        return res.status(400).json({ message: 'Wrong password, try again' })
      }

      const token = jwt.sign(
        { userId: user.id },
        config.get('jwtSecret'),
        { expiresIn: '1h'}
      )

      res.json({ token, userId: user.id})
    } catch (e) {
      res.status(500).json({ message: 'Something went wrong, try again' })
    }
})


module.exports = router
