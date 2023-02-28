let API = "http://localhost:8000/posts";
// json-server -w db.json -p 8000
// console.log(API);

let imgInp = document.querySelector("#image");
let titleInp = document.querySelector("#title");
let descrInp = document.querySelector("#descr");
let navModal = document.querySelector(".main navbar");
let btnAddPost = document.querySelector(".btn-add-post");
let contentPost = document.querySelector(".content");
// console.log(imgInp, titleInp, descrInp, navModal, btnAddPost);
let newPost = "";
btnAddPost.addEventListener("click", async function () {
  let post = {
    image: imgInp.value,
    title: titleInp.value,
    description: descrInp.value,
  };
  if (!post.image.trim() || !post.title.trim() || !post.description.trim()) {
    alert("Заполните поля");
    return;
  }
  await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(post),
  });
  imgInp.value = "";
  titleInp.value = "";
  descrInp.value = "";
  render();
});
// ? функция для отображения карточек
async function render() {
  let res = await fetch(API);
  let posts = await res.json();
  contentPost.innerHTML = "";
  posts.forEach((e) => {
    let newElem = document.createElement("div");
    newElem.id = e.id;
    newElem.innerHTML = `<div class="card" style="width: 18rem;">
      <img src="${e.image}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${e.title}</h5>
        <p class="card-text">${e.description}</p>
         <a href="#" class="btn btn-danger btn-delete">Delete</a>
         <a href="#" class="btn btn-primary btn-edit">Edit</a>
      </div>
    </div>`;
    contentPost.append(newElem);
  });
}
render();

document.addEventListener("click", async (elem) => {
  if (elem.target.classlist.contains("btn-delete")) {
    console.log("delete clicked");
    let id = elem.target.id;
    await fetch(`${API}/${id}`, { method: "DELETE" });
    render();
  }
});
