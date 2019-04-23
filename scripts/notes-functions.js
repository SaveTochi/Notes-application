// Save notes to local storage
const saveNotes = notes => {
  localStorage.setItem("notes", JSON.stringify(notes));
};

// Get existing saved data
const getSavedNotes = () => {
  const notesJSON = localStorage.getItem("notes");
  if (notesJSON !== null) {
    const notes = JSON.parse(notesJSON);
    return notes;
  } else {
    return [];
  }
};

// Render application data
const renderNotes = function(notes, filters) {
  const filteredNotes = notes.filter(function(note) {
    return note.title.toLowerCase().includes(filters.searchText.toLowerCase());
  });

  document.querySelector("#notes").innerHTML = "";

  filteredNotes.forEach(function(note) {
    const noteItem = generateNoteDOM(note);
    document.querySelector("#notes").appendChild(noteItem);
  });
};

// Generate DOM elements
const generateNoteDOM = note => {
  const noteContainer = document.createElement("div");
  const noteCompletedToggle = document.createElement("input");
  const noteText = document.createElement("span");
  const removeNoteButton = document.createElement("button");

  noteCompletedToggle.setAttribute("type", "checkbox");

  if (note.title.length > 0) {
    noteText.textContent = note.title;
  } else {
    noteText.textContent = "Unnamed note";
  }
  removeNoteButton.textContent = "X";

  noteContainer.appendChild(noteCompletedToggle);
  noteContainer.appendChild(noteText);
  noteContainer.appendChild(removeNoteButton);

  return noteContainer;
};
