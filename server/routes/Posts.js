/**
 * @swagger
 * components:
 *   schemas:
 *     Posts:
 *       type: object
 *       required:
 *         - title
 *         - postText
 *         - username
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the post
 *         title:
 *           type: string
 *           description: The title of your post
 *         postText:
 *           type: string
 *           description: The post explanation
 *         username:
 *           type: string
 *           description: Whether you have finished reading the post
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the post was added
 *
 */
/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: The posts managing API
 * /posts:
 *   get:
 *     summary: Lists all the posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: The list of the posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Posts'
 *   post:
 *     summary: Create a new posts
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Posts'
 *     responses:
 *       201:
 *         description: The created post.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Posts'
 *       500:
 *         description: Some server error
 * /posts/{id}:
 *   get:
 *     summary: Get the post by id
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post id
 *     responses:
 *       200:
 *         description: The post response by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Posts'
 *       404:
 *         description: The post was not found
 *   put:
 *    summary: Update the post by the id
 *    tags: [Posts]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The post id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Posts'
 *    responses:
 *      200:
 *        description: The post was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Posts'
 *      404:
 *        description: The post was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the post by id
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post id
 *
 *     responses:
 *       200:
 *         description: The post was deleted
 *       404:
 *         description: The post was not found
 */

const express = require("express");
const router = express.Router();

const { Posts } = require("../models");
router.get("/", async (req, res) => {
  const listOfPosts = await Posts.findAll();
  res.json(listOfPosts);
});

router.post("/", async (req, res) => {
  const post = req.body;
  await Posts.create(post);
  res.json(post);
});

router.put("/:id", async (req, res) => {
  const idPost = req.params.id;
  const { title, postText, username } = req.body;
  await Posts.update(
    { title: title, postText: postText, username: username },
    {
      where: {
        id: idPost,
      },
    }
  );
  res.json("Update successfully!");
});

router.get("/:id", async (req, res) => {
  const idPost = req.params.id;
  const response = await Posts.findOne({
    where: {
      id: idPost,
    },
  });
  res.json({
    message: `get post id = ${idPost} successfully!`,
    data: response,
  });
});

router.delete("/:id", async (req, res) => {
  const idPost = req.params.id;
  await Posts.destroy({
    where: {
      id: idPost,
    },
  });
  res.json({
    message: `delete post id = ${idPost} successfully!`,
  });
});
module.exports = router;
