const noteId = location.hash.substring(1);
let notes = getSavedNotes();
let note = notes.find(note => note.id === noteId);
const noteTitleInput = document.querySelector("#note-title");
const noteBodyText = document.querySelector("#note-body");
const removeNotesButton = document.querySelector("#remove-note");

//Generate date reference text content
const dateReference = document.querySelector("#date-reference");
dateReference.textContent = moment(note.updatedAt).fromNow();

//Redirects to index if notes is not found
if (note === undefined) {
  location.assign("/index.html");
}

noteTitleInput.value = note.title;
noteBodyText.value = note.body;

noteTitleInput.addEventListener("change", e => {
  note.title = e.target.value;
  note.updatedAt = moment().valueOf();
  dateReference.textContent = generateLastEditedText(note.updatedAt);
  saveNotes(notes);
});

noteBodyText.addEventListener("change", e => {
  note.body = e.target.value;
  note.updatedAt = moment().valueOf();
  dateReference.textContent = generateLastEditedText(note.updatedAt);
  saveNotes(notes);
});

removeNotesButton.addEventListener("click", () => {
  removeNote(note.id);
  saveNotes(notes);
  location.assign("/index.html");
});

window.addEventListener("storage", e => {
  if (e.key === "notes") {
    notes = JSON.parse(e.newValue);
    note = notes.find(note => {
      return note.id === noteId;
    });

    if (note === undefined) {
      location.assign("index.html");
    }

    noteTitleInput.value = note.title;
    noteBodyText.value = note.body;
    note.updatedAt = moment().valueOf();
    dateReference.textContent = generateLastEditedText(note.updatedAt);
  }
});

console.log(notes);
