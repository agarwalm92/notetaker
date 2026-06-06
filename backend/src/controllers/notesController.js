export function getAllNotes(req, res){
res.status(200).send("get response");
}

export function createNote(req, res){
res.status(201).send("note created");
}

export function updateNote(req, res){
res.status(200).send("note updated");
}

export function deleteNote(req, res){
res.status(200).send("note deleted");
}