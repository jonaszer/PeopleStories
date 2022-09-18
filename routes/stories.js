const express = require('express')
const Story = require('./../models/story')
const router = express.Router()

router.get('/new', (req, res) => {
    res.render('stories/new', { story: new Story() })
})

router.get('/edit/:id', async (req, res) => {
    const story = await Story.findById(req.params.id)
    res.render('stories/edit', { story: story })
})

router.get('/:id', async (req, res) => {
    const story = await Story.findById(req.params.id)
    if (story == null) res.redirect('/')
    res.render('stories/show', { story: story })
})

router.post('/', async (req, res, next) => {
    req.story = new Story()
    next()
}, saveStoryAndRedirect('new'))

router.put('/:id', async (req, res, next) => {
    req.story = await Story.findById(req.params.id)
    next()
}, saveStoryAndRedirect('edit'))

router.delete('/:id', async (req, res) => {
    await Story.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

function saveStoryAndRedirect(path) {
    return async (req, res) => {
        let story = req.story
        story.title = req.body.title
        story.description = req.body.description
        try {
            story = await story.save()
            res.redirect(`/stories/${story.id}`)
        } catch (e) {
            res.render(`stories/${path}`, { story: story })
        }
    }
}

module.exports = router