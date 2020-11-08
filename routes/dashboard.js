const router = require('express').Router()
const { dashboard } = require('../controllers')
const layoutName = (req, res, next) => {
    res.locals.layout = `layout/${layoutName}`
    next()
}

router.use(layoutName('dashboard'))
router.get('/', dashboard.home)
router.get('/post', dashboard.post.index)

module.exports = router