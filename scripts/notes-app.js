let notes = getSavedNotes();

const filters = {
  searchText: "",
  sortBy: "byEdited"
};

renderNotes(notes, filters);

document.querySelector(".create-note").addEventListener("click", e => {
  let id = uuidv4();
  let timeStamp = moment().valueOf();
  notes.push({
    title: "",
    body: "",
    id: id,
    createdAt: timeStamp,
    updatedAt: timeStamp
  });
  saveNotes(notes);
  location.assign(`/edit.html#${id}`);
});

document.querySelector(".filter-text").addEventListener("input", e => {
  filters.searchText = e.target.value;
  renderNotes(notes, filters);
});

document.querySelector(".filter-by").addEventListener("change", e => {
  filters.sortBy = e.target.value;
  renderNotes(notes, filters);
});

window.addEventListener("storage", e => {
  if (e.key === "notes") {
    notes = JSON.parse(e.newValue);
    renderNotes(notes, filters);
  }
});
