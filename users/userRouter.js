const express = require("express");
const dataB = require("./userDb.js");

const router = express.Router();

router.post("/", validateUser, async (req, res) => {
    try {
        const user = await dataB.insert(req.body);
        res.status(201).json(user);
    } catch (error) {
        // log error to server
        res.status(500).json({
            message: error
        });
    }
});

router.post("/:id/posts", (req, res) => {});

router.get("/", async (req, res) => {
    try {
        const user = await dataB.get(req.query);
        res.status(200).json(user);
    } catch (error) {
        // log error to database
        console.log(error);
        res.status(500).json({
            message: "Error retrieving the user"
        });
    }
});

router.get("/:id", validateUserId, async (req, res) => {
    try {
        const user = await dataB.getById(req.params.id);

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "user not found" });
        }
    } catch (error) {
        // log error to server
        console.log(error);
        res.status(500).json({
            message: "Error retrieving the db"
        });
    }
});

router.get("/:id/posts", (req, res) => {});

router.delete("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});

//custom middleware

async function validateUserId(req, res, next) {
    try {
        const { id } = req.params;
        const user = await dataB.getById(id);

        if (user) {
            req.user = user;
            next();
        } else {
            res.status(404).json({ message: "invalid user id" });
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

async function validateUser(req, res, next) {
    try {
        const body = req.body;
        const name = req.body.name;

        if (body) {
            if (name) {
                next();
            } else {
                res.status(400).json({
                    message: "missing required name field"
                });
            }
        } else {
            res.status(400).json({ message: "missing user data" });
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

function validatePost(req, res, next) {}

module.exports = router;
