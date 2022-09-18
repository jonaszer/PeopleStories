const express = require('express')
const mongoose = require('mongoose')
const Story = require('./models/story')
const storiesRouter = require('./routes/stories')
const methodOverride = require('method-override')
const app = express()


mongoose.connect('mongodb://localhost/stories', { useNewUrlParser: true, useUnifiedTopology: true })


app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(express.static(__dirname + '/public'));

app.get('/', async (req, res) => {
    const stories = await Story.find().sort({ createdAt: 'desc' })
    res.render('stories/index', { stories: stories })
})

app.use('/stories', storiesRouter)

app.listen(process.env.PORT || 5000)