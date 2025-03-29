const URL = "https://backendsatt-1071529598982.us-central1.run.app/";

document.addEventListener("DOMContentLoaded", () => {
    fetchNotes();
    document.getElementById("note-form").addEventListener("submit", handleSubmit);
    document.getElementById("cancel-edit").addEventListener("click", resetForm);
});

async function fetchNotes() {
    const response = await fetch(URL);
    const notes = await response.json();
    console.log("Data dari backend:", notes);
    displayNotes(notes);
}

function displayNotes(notes) {
    const notesList = document.getElementById("notes-list");
    notesList.innerHTML = "";
    notes.forEach(note => {
        const div = document.createElement("div");
        div.classList.add("note-item");
        div.innerHTML = `
            <div>
                <strong>${note.notesTitle}</strong>
                <p>${note.notesContent}</p>
            </div>
            <div>
                <button class="btn btn-warning btn-sm" onclick="editNote('${note.id}', '${note.notesTitle}', '${note.notesContent}')">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteNote('${note.id}')">Delete</button>
            </div>
        `;
        notesList.appendChild(div);
    });
}

async function handleSubmit(event) {
    event.preventDefault();
    const id = document.getElementById("note-id").value;
    const notesTitle = document.getElementById("notes-title").value;
    const notesContent = document.getElementById("notes").value;


    const note = { notesTitle, notesContent };
    let response;

    if (id) {
        response = await fetch(`${URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(note),
        });
    } else {
        response = await fetch(URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(note),
        });
    }

    if (!response.ok) {
        console.error("Gagal menyimpan data:", await response.text());
        return;
    }

    resetForm();
    fetchNotes();
}

function editNote(id, title, content) {
    document.getElementById("note-id").value = id;
    document.getElementById("notes-title").value = title;
    document.getElementById("notes").value = content;
    document.getElementById("cancel-edit").style.display = "inline-block";
}

async function deleteNote(id) {
    if (confirm("Apakah Anda yakin ingin menghapus catatan ini?")) {
        await fetch(`${URL}/${id}`, { method: "DELETE" });
        fetchNotes();
    }
}

function resetForm() {
    document.getElementById("note-id").value = "";
    document.getElementById("notes-title").value = "";
    document.getElementById("notes").value = "";
    document.getElementById("cancel-edit").style.display = "none";
}
