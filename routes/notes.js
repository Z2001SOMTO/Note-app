const {
  handleCreateNote,
  handleGetAllNote,
  handleGetNoteById,
  handleUpdateNote,
  handleDeleteNote,
} = require("../controller/notes.controller");
const router = require("express").Router();
// C.R.U.D

// C -> CREATE
// Add new note
// POST /notes/
router.post("/", handleCreateNote);

// POST /notes/create
router.post("/create", handleCreateNote);

// R -> READ
router.get("/", handleGetAllNote);
router.get("/:id", handleGetNoteById);

// U -> UPDATE
router.put("/:id", handleUpdateNote);
router.patch("/:id", handleUpdateNote);

// D -> DELETE
router.delete("/:id", handleDeleteNote);

module.exports = router;
