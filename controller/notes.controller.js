const notes = []
const { response } = require("../utils/helper")
const noteModel = require("../models/note.model")


const handleCreateNote = async (req, res) => {
  if (!req.body.content) 
    return res.status(400).send(response("Request body is required", null, false));
  
  // const newNote = {
  //   content: req.body.content,
  //   id: notes.length + 1
  // }
  const newNote = await noteModel.create({
    content: req.body.content
  })

  notes.push(newNote);
  res.status(201).send(response("Note created!", newNote))
}


const handleGetAllNote = async (req, res) => {
  const notes = await noteModel.find()
  res.status(200).send(response("All Notes", notes))
}

const handleGetNoteById = async (req, res) => {

  if(!req.params.id) 
    return res.status(400).send(response("id is required", null, false))
const note = await noteModel.findOne({_id: req.params.id})
  // const note = notes.find(_note => _note.id == req.params.id)
  // if(!note) return res.status(404).send(response("Note not found!", null, false))

  res.status(200).send(response("Note found", note))
}

const handleUpdateNote = async (req, res) => {
  // Check if {id} param is present
  if(!req.params.id) 
    return res.status(400).send(response("id is required", null, false))
  
  // Check if body was sent
  if (!req.body.content) 
  return res.status(400).send(response("Request body is required", null, false));

  // Check if note exists
  const prevNote = await noteModel.findById(req.params.id)
  // const prevNote = notes.find(note => note.id == req.params.id)
  if(!prevNote) return res.status(404).send(response("Note not found!", null, false))

  // const update = {
  //   ...prevNote,
  //   content: req.body.content
  // }
  
  //  1st Method
 const update = await noteModel.findByIdAndUpdate(req.params.id, {content: req.body.content}, {new: true})

  // Get the index of the previous note
  // const index = notes.indexOf(prevNote)
  // Change the prevNote to the updated note
  // notes[index] = update

  res.send(response("Note updated!", update))
}

const handleDeleteNote = async (req, res) => {
  // Check if {id} param is present
  if(!req.params.id) 
    return res.status(400).send(response("id is required", null, false))

  // const noteIndex = notes.findIndex(note => note.id == req.params.id)
  const note = await noteModel.findById(req.params.id)

  if(!note) return res.status(404).send(response("Note does not exist", null, false))

  const deletedNote = await noteModel.findByIdAndDelete(req.params.id) // {content: "...", _id:"..."}

  // const deletedNote = notes.splice(noteIndex, 1)[0]
  res.status(200).send(response("Note deleted", deletedNote))
}


module.exports = {
  handleCreateNote,
  handleGetAllNote,
  handleGetNoteById,
  handleUpdateNote,
  handleDeleteNote
}