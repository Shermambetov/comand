let API = 'http://localhost:8000/posts'
// json-server -w db.json -p 8000
console.log(API)
let imgInp = document.querySelector("#image");
let titleInp = document.querySelector("#title");
let descrInp = document.querySelector("#descr");
let navModal = document.querySelector("#navbar");


let saveBtn = document.querySelector("#btn-save-post");
let contentPost = document.querySelector("#content");
let contentModal = document.querySelector("#open-post");
let btnEdit = document.querySelector("#btn-edit");
let btnDelete = document.querySelector("#btn-delete");
// let btnModal = document.querySelector("#")






// console.log(imgInp, titleInp, descrInp, navModal, btnAddPost);
// ? кнопки для эдита
let editImgInp = document.querySelector("#edit-image");
let editTitleInp = document.querySelector("#edit-title");
let editDescrInp = document.querySelector("#edit-descr");
let editBtnSave = document.querySelector("#btn-save-edit");
let exampleModal = document.querySelector("#exampleModal");
// ? погинация
let paginationList = document.querySelector(".pagination-list");
let prev = document.querySelector(".prev");
let next = document.querySelector(".next");
let page = 1;
let totalPageCount = 1;
// ?search
let searchInp = document.querySelector("#search");
let searchVal = "";
let newPost = "";
saveBtn.addEventListener("click", async function () {
  let post = {
    image: imgInp.value,
    title: titleInp.value,
    description: descrInp.value,
  };
  //   console.log(post)
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


async function render() {
  let res = await fetch(`${API}?q=${searchVal}&_page=${page}&_limit=3`);
  let posts = await res.json();
  paginationButton();
  contentPost.innerHTML = "";
  posts.forEach((e) => {
    let newElem = document.createElement("div");
    newElem.id = e.id;
    newElem.innerHTML = `<div class="card" style="width: 18rem;">
        <img src="${e.image}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${e.title}</h5>
        <p class="card-text">${e.description}</p>
        <a href="#" id=${e.id} class="btn btn-danger btn-delete">Delete</a>
        <a href="#" id=${e.id} class="btn btn-primary btn-edit" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</a>
        </div>
        </div>`;
    contentPost.append(newElem);
  });
}


render();
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-delete")) {
    let id = e.target.id;
    fetch(`${API}/${id}`, { method: "DELETE" }).then(() => render());
  }
});


document.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn-edit")) {
    let id = e.target.id;
    fetch(`${API}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        editImgInp.value = data.image;
        editTitleInp.value = data.title;
        editDescrInp.value = data.description;
        editBtnSave.setAttribute("id", data.id);
      });
  }
});


editBtnSave.addEventListener("click", function () {
  let id = this.id;
  //   console.log(id);
  let image = editImgInp.value;
  let title = editTitleInp.value;
  let description = editDescrInp.value;


  if (!image || !title || !description) {
    alert("Заполнитеполя");
    return;
  }
  let editedPost = {
    image: imgInp,
    title: titleInp,
    descr: descrInp,
  };
  saveEdit(editedPost, id);
  let modal = bootstrap.Modal.getInstance(exampleModal);
  modal.hide();
  //   console.log(modal);
});


function saveEdit() {
  fetch(`${API}/${id}`, {
    method: "PATH",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(editedPost),
  }).then(() => render());
}


function paginationButton() {
  fetch(`${API}?q=${searchVal}`)
    .then((res) => res.json())
    .then((data) => {
      totalPageCount = Math.ceil(data.length / 3);
      paginationList.innerHTML = "";
      for (let i = 1; i <= totalPageCount; i++) {
        if (page == i) {
          let page1 = document.createElement("li");
          page1.innerHTML = `<li class="page-item active"><a class="page-link" href="#">${i}</a></li>`;
          paginationList.append(page1);
        } else {
          let page1 = document.createElement("li");
          page1.innerHTML = `<li class="page-item"><a class="page-link" href="#">${i}</a></li>`;
          paginationList.append(page1);
        }
      }
      if (page == 1) {
        prev.classList.add("disabled");
      } else {
        prev.classList.add("disabled");
      }


      if (page == totalPageCount) {
        next.classList.add("disabled");
      } else {
        next.classList.add("disabled");
      }
    });
}
prev.addEventListener("click", () => {
  if (page <= 1) {
    return;
  }
  page--;
  render();
});


next.addEventListener("click", () => {
  if (page >= totalPageCount) {
    return;
  }
  page++;
  render();
});


document.addEventListener("click", function (e) {
  if (e.target.classList.contains("page_namber")) {
    console.log("pagination number clicked");
    page = e.target.innerText;
    render();
  }
});


searchInp.addEventListener("input", () => {
  searchVal = searchInp.value;
  render();
});








VANTA.HALO({
    el: "#intro",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 900.00,
    minWidth: 200.00,
    amplitudeFactor: 2.60
  })







  





