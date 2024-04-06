
var dataAPI = 'http://localhost:3000/laptop';
function start() {
    getProduct(renderProduct);
    hanldUpdata();
}

start();
function getProduct(callback) {
    fetch(dataAPI)
        .then(function (response) {
            return response.json();
        })
        .then(callback)
}
function renderProduct(couser) {
    var listProduct__Dell = document.querySelector("#laptop--dell__presion");
    var htmls = couser.map(function (coure) {
        return `
        <ul class = "laptop--dell product__list--${coure.id}">
             <img src="${coure.img}" alt="">
             <li>${coure.name}</li>
             <li>${coure.cpu}</li>
             <li>${coure.ram}</li>
             <li>${coure.disk}</li>
             <li>${coure.desktop}</li>
             <li>${coure.price}</li>
             <li>${coure.discount}</li>
             <button id="xoa"onclick="deleteData(${coure.id})">Xoa</button>
              <button id="edit__${coure.id}"onclick="editData(${coure.id})">EDIT</button>
              </ul>
        `

    })
    listProduct__Dell.innerHTML = htmls.join('');
}
function upData(data, options) {
    var options = {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }
    fetch(dataAPI, options)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}
function hanldUpdata() {
    var updataBtn = document.querySelector('#updata');
    updataBtn.onclick = function () {
        var inputId = document.querySelector('input[name="id"]').value;
        var inputImg = document.querySelector('input[name="img"]').value;
        var inputName = document.querySelector('input[name="name"]').value;
        var inputCpu = document.querySelector('input[name="cpu"]').value;
        var inputRam = document.querySelector('input[name="ram"]').value;
        var inputDisk = document.querySelector('input[name="disk"]').value;
        var inputDesktop = document.querySelector('input[name="desktop"]').value;
        var inputPrice = document.querySelector('input[name="price"]').value;
        var inputDiscount = document.querySelector('input[name="discount"]').value;
        var fromData = {
            id: inputId,
            img: inputImg,
            name: inputName,
            cpu: inputCpu,
            ram: inputRam,
            disk: inputDisk,
            desktop: inputDesktop,
            price: inputPrice,
            discount: inputDiscount
        };
        upData(fromData);

    }
}
function deleteData(id) {
    var options = {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(id)
    }
    fetch(dataAPI + '/' + id, options)
        .then(function (response) {
            return response.json();
        })
        .then(function () {
            var deleItem = document.querySelector('.product__list--' + id);
            if (deleItem) {
                deleItem.remove();
            }
        })
}
function getElementById(id, callback) {
    fetch(dataAPI + '/' + id)
        .then(function (response) {
            return response.json();
        })
        .then(callback)
}
function editData(id) {
    getElementById(id, function (product) {
        renderEditProduct(product);
    })
}
function updateProduct(data) {
    var options = {
        method: 'PUT', // hoặc 'PATCH' nếu máy chủ hỗ trợ
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(dataAPI + '/' + data.id, options)
        .then(function (response) {
            return response.json();
        })
        .then(function (updatedProduct) {
            getProduct(renderProduct);
        })
}
function renderEditProduct(product) {
    var editForm = document.querySelector('#editForm');
    editForm.innerHTML = `
    <div class="edit__input--id"><label for="">id</label><input type="text" name="edit__id" value="${product.id}"></div>
    <div class="edit__input--img"><label for="">img</label><input type="text" name="edit__img" value="${product.img}"></div>
    <div class="edit__input--name"><label for="">name</label><input type="text" name="edit__name" value="${product.name}"></div>
    <div class="edit__input--cpu"><label for="">cpu</label><input type="text" name="edit__cpu" value="${product.cpu}"></div>
    <div class="edit__input--ram"><label for="">ram</label><input type="text" name="edit__ram" value="${product.ram}"></div>
    <div class="edit__input--disk"><label for="">disk</label><input type="text" name="edit__disk" value="${product.disk}"></div>
    <div class="edit__input--desktop"><label for="">desktop</label><input type="text" name="edit__desktop" value="${product.desktop}"></div>
    <div class="edit__input--price"><label for="">price</label><input type="text" name="edit__price" value="${product.price}"></div>
    <div class="edit__input--discount"><label for="">discount</label><input type="text" name="edit__discount" value="${product.discount}"></div>
    <button id="save__edit">Lưu</button>
    `
    var click__save = document.querySelector('#save__edit');
    click__save.onclick = function () {
        var updatedProduct = {
            id: parseInt(document.querySelector('input[name="edit__id"]').value),
            img: document.querySelector('input[name="edit__img"]').value,
            name: document.querySelector('input[name="edit__name"]').value,
            cpu: document.querySelector('input[name="edit__cpu"]').value,
            ram: document.querySelector('input[name="edit__ram"]').value,
            disk: document.querySelector('input[name="edit__disk"]').value,
            desktop: document.querySelector('input[name="edit__desktop"]').value,
            price: document.querySelector('input[name="edit__price"]').value,
            discount: document.querySelector('input[name="edit__discount"]').value
        }
        updateProduct(updatedProduct);
    }
}

