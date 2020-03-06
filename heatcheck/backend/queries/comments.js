const db = require('../db/index');

const getAllComments = async (req, res, next) => {
    try {
        let { post_id } = req.params
        let comments = await db.any("SELECT * FROM comments WHERE post_id = $1", post_id)
        res.status(200).json({
            comments,
            status: "success",
            message: "all comments for post"
        })
    } catch (error) {
        res.json({
            "status": "error",
            "message": "data not found",
            "payload": null
    })
    }
}

const addSingleComment =  async (req, res, next) => {
    try {
        let { post_id } = req.params
        let { user_id, body } = req.body
        let comments = await db.one("INSERT INTO comments (user_id, post_id, body) VALUES ($1, $2, $3) RETURNING *", [user_id, post_id, body])
        res.status(200).json({
            comments,
            status: "success",
            message: "added a single comment"
        })
    } catch (error) {
        res.json({
            "status": "error",
            "message": "unable to add comment",
            "payload": null
    })
    }
}

const editSingleComment = async (req, res, next) => {
    try {
        let { post_id, user_id } = req.params
        let comment = await db.one("UPDATE comments SET body = $1 WHERE (post_id = $2 AND user_id = $3) RETURNING *", [ req.body.body, post_id, user_id])
      res.status(200).json({
          comment,
          status: "success",
          message: "updated a comment"
      }) 
    } catch (error) {
        res.json({
            "status": "error",
            "message": "unable to edit comment",
            "payload": null
    })  
    }
}

const deleteComment = async (req, res, next) => {
    try {
        let { post_id, user_id } = req.params
        await db.one("DELETE FROM comments WHERE (post_id = $1 AND user_id = $2) RETURNING *",[post_id, user_id])
        res.status(200).json({
            status: "success",
            message: "deleted a comment"
        })
    } catch (error) {
        res.json({
            "status": "error",
            "message": "comment not deleted",
            "payload": null
    })        
    }
}



module.exports = {getAllComments, addSingleComment, editSingleComment, deleteComment}