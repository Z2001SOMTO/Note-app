const mongoose = require('mongoose');

// Schema: Is used to describe the stuctures of the models (collections)
const noteSchema = new mongoose.Schema({
    content: {
        type: 'string',
        required: true
    }
}, {timestamp: true});

const noteModel = mongoose.model('Note', noteSchema);
module.exports = noteModel