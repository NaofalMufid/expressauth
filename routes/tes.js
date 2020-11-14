const router = require('express').Router()
router.get("/fakeuser/:id", (req, res, next) => {
    const userOne = new User("Alexander", "fake@gmail.com");
    const userTwo = new User("Ryan", "fakeagain@gmail.com");
    res.json({ userOne, userTwo });
});

module.exports = router