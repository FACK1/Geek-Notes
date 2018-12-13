// get user Name from users table..
var userName = document.getElementById("Name");

fetch('/getNotes?id='+id)
    .then(response => {
        return response.json();
    })
    .then((notes)=> {
      let container = document.getElementById('container');
      container.innerText = "";
      let listNotes = document.createElement('ul');
      listNotes.setAttribute('id','Notes');
        notes[0].forEach(element =>{
          let note = document.createElement('li');
          note.innerText = element.content;
          listNotes.appendChild(note);
        )};
      container.appendChild(listNotes);
    }
