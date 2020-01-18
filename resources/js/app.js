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


    var comment = document.createElement("div");
    comment.setAttribute("class", "comment");
    var avatar = document.createElement("a");
    avatar.setAttribute("class", "avatar");
    var profile = document.createElement("img");
    profile.setAttribute("src", "resources/imgs/profile.png");
    var content = document.createElement("content");
    content.setAttribute("class", "content");
    var author = document.createElement("a");
    author.setAttribute("class", "author");
    var metadata = document.createElement("div");
    metadata.setAttribute("class", "metadata");
    var date = document.createElement("span");
    date.setAttribute("class", "date");
    var text = document.createElement("div");
    text.setAttribute("class", "text");

    var today = new Date();
    var time = "Heute um " +today.getHours() + ":" + today.getMinutes();

    author.innerText = state.data[i].name;
    date.innerText = time;
    text.innerText = state.data[i].message;

    avatar.appendChild(profile);
    metadata.appendChild(date);
    content.appendChild(author);
    content.appendChild(metadata);
    content.appendChild(text);
    comment.appendChild(avatar);
    comment.appendChild(content);

    var t = document.getElementById("com-section");
    t.appendChild(comment);
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
