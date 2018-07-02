var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var express = require('express')
var app = express()

mongoose.connect('mongodb://localhost/restful_blog_app')
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
  extended: true
}))

// MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {
    type: Date,
    default: Date.now
  }
})
var Blog = mongoose.model('Blog', blogSchema)

// Blog.create({
//   title: 'Test Blog',
//   image: 'https://images.unsplash.com/photo-1504226646080-dbdec09a1fac?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d6149692d77f1c5454a95e437fb1bd20&auto=format&fit=crop&w=1350&q=80',
//   body: 'HELLO THIS IS A BLOG POST!'
// })

// RESTFUL ROUTES
app.get('/', function (req, res) {
  res.redirect('/blogs')
})

// INDEX ROUTE
app.get('/blogs', function (req, res) {
  Blog.find({}, function (err, blogs) {
    if (err) {
      console.log("ERROR!")
    } else {
      res.render('index', {
        blogs: blogs
      })
    }
  })
})

// NEW ROUTE
app.get('/blogs/new', function (req, res) {
  res.render('new')
})

// CREATE ROUTE
app.post('/blogs', function (req, res) {
  // create blog
  Blog.create(req.body.blog, function (err, newBlog) {
    if (err) {
      res.render('new')
    } else {
      // then, redirect to the index
      res.redirect('/blogs')
    }
  })
})

// SHOW ROUTE
app.get('/blogs/:id', function (req, res) {
  Blog.findById(req.params.id, function (err, foundBlog) {
    if (err) {
      res.redirect('/blogs')
    } else {
      res.render('show', {
        blog: foundBlog
      })
    }
  })
})

app.listen(3000, function () {
  console.log('SERVER IS RUNNING!!')
})