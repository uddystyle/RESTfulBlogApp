var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var express = require('express')
var app = express()

mongoose.connect('mongodb://localhost/restful_blog_app')
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

// MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now}
})
var Blog = mongoose.model('Blog', blogSchema)

// Blog.create({
//   title: 'Test Blog',
//   image: 'https://images.unsplash.com/photo-1504226646080-dbdec09a1fac?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d6149692d77f1c5454a95e437fb1bd20&auto=format&fit=crop&w=1350&q=80',
//   body: 'HELLO THIS IS A BLOG POST!'
// })

// RESTFUL ROUTES
app.get('/blogs', function (req, res) {
  res.render('index')
})

app.listen(3000, function () {
  console.log('SERVER IS RUNNING!!')
})