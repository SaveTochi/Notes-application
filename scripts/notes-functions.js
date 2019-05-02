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

// Sort notes using the select options
const sortNotes = (notes, sortBy) => {
  if (sortBy === "byEdited") {
    return notes.sort((a, b) => {
      if (a.updatedAt > b.updatedAt) {
        return -1;
      } else if (a.updatedAt < b.updatedAt) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === "byCreated") {
    return notes.sort((a, b) => {
      if (a.createdAt > b.createdAt) {
        return -1;
      } else if (a.createdAt < b.createdAt) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === "alphabetical") {
    return notes.sort((a, b) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
      } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1;
      } else {
        return 0;
      }
    });
  } else {
    return notes;
  }
};

// Render application data

const renderNotes = function(notes, filters) {
  notes = sortNotes(notes, filters.sortBy);
  const filteredNotes = notes.filter(function(note) {
    return note.title.toLowerCase().includes(filters.searchText.toLowerCase());
  });

  document.querySelector("#notes").innerHTML = "";

  filteredNotes.forEach(function(note) {
    const noteItem = generateNoteDOM(note, note.id);
    document.querySelector("#notes").appendChild(noteItem);
  });
};

//remove a note from the list
const removeNote = function(id) {
  const noteIndex = notes.findIndex(note => {
    return note.id === id;
  });
  if (noteIndex > -1) {
    notes.splice(noteIndex, 1);
  }
};

// Generate DOM elements
const generateNoteDOM = note => {
  const noteContainer = document.createElement("div");
  const noteText = document.createElement("a");
  const removeNoteButton = document.createElement("button");

  //Set up the remove note button
  removeNoteButton.textContent = "X";
  noteContainer.appendChild(removeNoteButton);

  removeNoteButton.addEventListener("click", e => {
    removeNote(note.id);
    saveNotes(notes);
    renderNotes(notes, filters);
  });

  if (note.title.length > 0) {
    noteText.textContent = note.title;
  } else {
    noteText.textContent = "Unnamed note";
  }
  noteText.setAttribute("href", `edit.html#${note.id}`);

  noteContainer.appendChild(noteText);

  return noteContainer;
};

// Generate last edited message
const generateLastEditedText = timeStamp => {
  return `Last edited ${moment(timeStamp).fromNow()}`;
};
