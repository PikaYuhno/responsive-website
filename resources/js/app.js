const state = {
  data: []
};
async function fetchData() {
  const res = await fetch("http://localhost:8080/getMessages", {
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    }
  });
  console.log("res: ", res);
  const data = await res.json();
  state.data = data;
}



function maketable() {
  let table = document.getElementById("table-body");
  for (let i = 0; i < state.data.length; i++) {
    console.log("TEST");
    var row = document.createElement("tr");
    var col1 = document.createElement("td");
    var col2 = document.createElement("td");
    var col3 = document.createElement("td");

    row.appendChild(col1);
    row.appendChild(col2);
    row.appendChild(col3);

    col1.innerText = state.data[i].name;
    col2.innerText = state.data[i].email;
    col3.innerText = state.data[i].message;

    table.appendChild(row);

    var s = "<div class= 'container' style='margin-top: 50px'><div class='ui comments'><h3 class='ui dividing header'>Comments</h3><div class='comment'><a class='avatar'><img src='resources/imgs/profile.png'></a><div class='content'><a class='author'></a><div class='metadata'><span class='date'>Today at 5:42PM</span></div><div class='text'></div><div class='actions'><a class='reply'>Reply</a></div></div></div></div></div>";
    var doc = new DOMParser().parseFromString(s, "text/xml");
    console.log(doc.firstChild.firstChild);

  }
}

fetchData();
setTimeout(maketable, 3000);
document.getElementById("f").addEventListener('submit', function(evt) {
  evt.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;
  const messageOBJ = {
    "name": name,
    "email": email,
    "message": message
  };
  console.log(messageOBJ);
  fetch("http://localhost:8080/insertMessage", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(messageOBJ)
  }).then(res => {
    console.log(res);
  });
});
