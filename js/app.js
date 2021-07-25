"use strict";
let formEl = document.getElementById("bookForm");
let tbodyEl = document.getElementById('tbody');
Book.bookList = [];

function Book(bookName, bookPages, bookPrice) {
    this.bookName = bookName;
    this.bookPages = bookPages;
    this.bookPrice = bookPrice;
    Book.bookList.push(this);
}



formEl.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    event.preventDefault();

    let bookName = event.target.bookName.value;
    let bookPages = randomBookPages(1, 500);
    let bookPrice = event.target.bookPrice.value;

    new Book(bookName, bookPages, bookPrice);

    Book.prototype.saveToLocalStorage();
    renderTable();
}


function randomBookPages(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

Book.prototype.saveToLocalStorage = function () {
    localStorage.setItem('Book', JSON.stringify(Book.bookList));
}

Book.prototype.readFromLocalStorage = function () {
    Book.bookList = JSON.parse(localStorage.getItem('Book')) || [];
}

function renderTable() {
    Book.prototype.readFromLocalStorage();
    let total = 0;
    tbodyEl.textContent = "";
    for (let i = 0; i < Book.bookList.length; i++) {
        let trEl = document.createElement('tr');
        let tdEl1 = document.createElement('td');
        tdEl1.textContent = Book.bookList[i].bookName;
        trEl.appendChild(tdEl1);

        let tdEl2 = document.createElement('td');
        tdEl2.textContent = Book.bookList[i].bookPages;
        trEl.appendChild(tdEl2);

        let tdEl3 = document.createElement('td');
        tdEl3.textContent = Book.bookList[i].bookPrice;
        trEl.appendChild(tdEl3);
        total = total + Number(Book.bookList[i].bookPrice);
        tbodyEl.appendChild(trEl);

    }
    let spanEl = document.getElementById('total');
    spanEl.textContent = `Total : ${total}`
}
renderTable();