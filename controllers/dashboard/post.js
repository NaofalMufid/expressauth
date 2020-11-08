const moment = require('moment')
const posts = [
    {id: 1, title: 'Lorem Ipsum', body: 'Everton vs Man. United', createdAt: Date()},
    {id: 2, title: 'Haji Magiuere', body: 'Suka Ngelawak dia', createdAt: Date()}
]

module.exports = {
    index: (req, res) => {
        const locals = {
            data: {
                posts: posts.map(i => {
                    i.fromNow = moment(i.createdAt).fromNow()
                    return i
                }),
            },
            contentName: 'Post'
        }
        res.render('pages/dashboard/post')
    }
}