let API = 'http://localhost:8000/posts'
// json-server -w db.json -p 8000
console.log(API)

let imgInp = document.querySelector("#image");
let titleInp = document.querySelector("#title");
let descrInp = document.querySelector("#descr");
let navModal = document.querySelector("#navbar");
let btnAddPost = document.querySelector("#btn-add-post-novbar");
let saveBtn = document.querySelector("#btn-save-post")
let contentPost = document.querySelector("#content");
let contentModal = document.querySelector("#open-post");
let btnEdit = document.querySelector("#btn-edit");
let btnDelete = document.querySelector("#btn-delete");
// let btnModal = document.querySelector("#")


console.log(imgInp, titleInp, descrInp, navModal, btnAddPost);


let newPost = "";
saveBtn.addEventListener("click", async function () {
  let post = {
    image: imgInp.value,
    title: titleInp.value,
    description: descrInp.value,
  };
//   console.log(post)
  if (!post.image.trim() || 
      !post.title.trim() ||
      !post.description.trim()) {
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
  render()
});



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
        <a href="#" class="btn btn-primary">Edit</a>
        <a href="#" class="btn btn-primary">Delete</a>
      </div>
    </div>`;
    contentPost.append(newElem)
    });
  }

render()
let editPost = document.querySelector('.btn-edit');
console.log( editPost);
  
  
  
  
  
  





