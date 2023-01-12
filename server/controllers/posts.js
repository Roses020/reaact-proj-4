const User = require('../models/user');
const Post = require('../models/post');


module.exports = {
  getAllPosts: async (req, res) => {
    try {
        const posts = await Post.findAll({
            where: {privateStatus: false},
            include: [{
                model: User,
                required: true,
                attributes: [`username`]
            }]
        })
        res.status(200).send(posts)
    } catch (error) {
        console.log('ERROR IN getAllPosts')
        console.log(error)
        res.sendStatus(400)
    }
  },
  getCurrentUserPosts: async (req, res) => {
    try { 
      const {userId} = req.params
        const posts = await Post.findAll({
      include: [{
          model: User,
          required: true,
          attributes: [`username`]
      }]
    
    })
    res.status(200).send(posts)
   } catch (error) {
    console.log('ERROR IN getCurrentUserPost')
    console.log(error)
    res.sendStatus(400)
}
  

  },
  addPost: async (req, res) => {
    try {
      const {title, content, status, userId} = req.body
      await Post.create({title, content, privateStatus: status, userId}) 
      console.log("add Post");

      res.sendStatus(200)
      
    } catch (error) {
      console.log('error in getCurrentUserPosts')
      console.log(error)
      res.sendStatus(400)
    }
  },

  editPost: async (req, res) => {
    try {
      const { Id, status } = req.body
    
      console.log("edit Post");
  } catch (error)  {

  }
  },

  deletePost: (req, res) => {
    console.log("delete Post,");
  },
};
