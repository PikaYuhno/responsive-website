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
  }
}

fetchData();
setTimeout(maketable, 3000);
document.getElementById("f").addEventListener('submit', function(evt) {
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
