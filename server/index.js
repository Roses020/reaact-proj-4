require('dotenv').config()

const express = require('express')
const cors = require('cors')
const {SERVER_PORT} = process.env
const {getAllPosts, getCurrentUserPosts, addPost, editPost, deletePost} = require('./controllers/posts')

const {user} = require('./models/user')
const {post} = require('./models/post')
const { sequelize } = require('./util/database')

const {login, register} = require('./controllers/auth')
const {isAuthenticated} = require('./middleware/isAuthenticated')

const app = express()

app.use(express.json())
app.use(cors())

app.post('/register', register)
app.post('/login',login)

app.get('/posts', getAllPosts)

app.get('/userposts/:userId', getCurrentUserPosts)
app.post('/post',isAuthenticated, addPost)
app.put('/posts/:id',isAuthenticated, editPost)
app.delete('/posts/:id',isAuthenticated, deletePost )

user.hasMany(post)
post.belongsTo(user)

sequelize.sync()
.then(() => {
    app.listen(SERVER_PORT, () => console.log(`datab working ${SERVER_PORT}!`)) 
})

.catch(err => console.log(err))