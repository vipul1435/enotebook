const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchUser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

router.get("/fetchNotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    res.status(500).send("Some error occured");
  }
});

router.post(
  "/addNotes",
  fetchuser,
  [
    body("title", "Titel must have atleast 3 charcters").isLength({ min: 3 }),
    body("description", "description must have atleast 5 charcters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
        const {title,description, tag } = req.body;
        const note = new Note({
            title,description,tag, user: req.user.id
        })

        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
      res.status(500).send("Some error occured");
    }
  }
);

router.put('/updateNotes/:id',fetchuser,async (req,res)=>{
  const {title,description,tag} = req.body;
  try {
  const newNote = {};
  if(title){newNote.title = title};
  if(description){newNote.description = description};
  if(tag){newNote.tag = tag};

  let note =await Note.findById(req.params.id);
  if(!note){
    return res.status(404).send("Not found");
  }

  if(note.user.toString()!=req.user.id){
    return res.status(401).send("Not Allowed");
  }
  note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
  res.send(note);
} catch (error) {
  res.status(500).send("Some error occured");
}
})

router.delete('/deleteNotes/:id',fetchuser,async(req,res)=>{
  try {
  let note = await Note.findById(req.params.id);
  if(!note){
    return res.status(404).send("Not found");
  }

  if(note.user.toString()!=req.user.id){
    return res.status(401).send("Not Allowed");
  }

  await Note.findByIdAndDelete(req.params.id);
  res.send("Deleted");
} catch (error) {
  res.status(500).send("Some error occured");
}

})

module.exports = router;
