﻿const uri = "api/JobRequests";
const addRequestBtn = document.querySelector("#addRqstBtn");
const editRequestBtn = document.querySelector("#editRequestBtn");
const modalLabel = document.getElementById("exampleModalLabel");
let jobRequests = [];

const editIco = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
<path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
</svg>`;

const deleteIco = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
<path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
</svg>`;

const isGetInterviewIco = {
  confirmIco: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-circle" viewBox="0 0 16 16">
  <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
  <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
</svg>`,
  cancelIco: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg>`,
};

function getItems() {
  fetch(uri)
    .then((response) => response.json())
    .then((data) => _displayItems(data))
    .catch((error) => console.error("Unable to get items", error));
}

function deleteItem(id) {
  fetch(`${uri}/${id}`, {
    method: "DELETE",
  })
    .then(() => getItems())
    .catch((error) => console.error("Unable to delete item.", error));
}

function displayEditModal(id) {
  const editModal = document.querySelector(".modalEdit");
  modalLabel.innerHTML = "Edit item";
  addRequestBtn.hidden = true;
  editRequestBtn.hidden = false;
  const item = jobRequests.find((item) => item.id === id);

  document.forms.editDataForm[0].value = item.nameOfCompany;
  document.forms.editDataForm[1].value = item.dateOfSendingCV;
  document.forms.editDataForm[2].value = item.dateOfResponse;
  document.forms.editDataForm[3].checked = item.isGetInterview;
  document.forms.editDataForm[4].value = item.about;
  document.forms.editDataForm[5].value = item.id;
}

function displayAddModal() {
  const editModal = document.querySelector(".modalEdit");
  modalLabel.innerHTML = "Add item";
  addRequestBtn.hidden = false;
  editRequestBtn.hidden = true;

  document.forms.editDataForm[0].value = "";
  document.forms.editDataForm[1].value = Date.now();
  document.forms.editDataForm[2].value = Date.now();
  document.forms.editDataForm[3].checked = false;
  document.forms.editDataForm[4].value = "";
  document.forms.editDataForm[5].value = -1;
}

function addItem() {
  const item = {
    nameOfCompany: document.forms.editDataForm[0].value,
    dateOfSendingCV: document.forms.editDataForm[1].value,
    dateOfResponse: document.forms.editDataForm[2].value,
    isGetInterview: document.forms.editDataForm[3].checked,
    about: document.forms.editDataForm[4].value,
  };

  fetch(uri, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  })
    .then((response) => response.json())
    .then(() => getItems())
    .catch((error) => console.error("Unable to add item.", error));
}

function updateItem() {
  const itemId = document.getElementById("editId").value;
  const item = {
    id: parseInt(itemId, 10),
    nameOfCompany: document.forms.editDataForm[0].value,
    dateOfSendingCV: document.forms.editDataForm[1].value,
    dateOfResponse: document.forms.editDataForm[2].value,
    isGetInterview: document.forms.editDataForm[3].checked,
    about: document.forms.editDataForm[4].value,
  };

  fetch(`${uri}/${itemId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  })
    .then(() => getItems())
    .catch((error) => console.error("Unable to update item.", error));

  return false;
}

function toShortFullDateString(date) {
  const parsedDate = new Date(date);

  let day =
    parsedDate.getDate() > 9
      ? parsedDate.getDate()
      : "0" + parsedDate.getDate();
  let month =
    parsedDate.getMonth() + 1 > 9
      ? parsedDate.getMonth() + 1
      : "0" + (parsedDate.getMonth() + 1);
  return `${parsedDate.getFullYear()}-${month}-${day}`;
}

function _displayItems(data) {
  const tbody = document.querySelector(".jobRequestTable");
  tbody.innerHTML = "";

  data.forEach((element) => {
    element.dateOfSendingCV = toShortFullDateString(element.dateOfSendingCV);
    element.dateOfResponse = toShortFullDateString(element.dateOfResponse);

    let isGetInterview = document.createElement("input");
    isGetInterview.hidden = true;
    isGetInterview.type = "checkbox";
    isGetInterview.checked = element.isGetInterview;

    let tr = tbody.insertRow();

    let td1 = tr.insertCell(0);
    let idNode = document.createTextNode(element.id);
    td1.appendChild(idNode);

    let td2 = tr.insertCell(1);
    let companyNode = document.createTextNode(element.nameOfCompany);
    td2.appendChild(companyNode);

    let td3 = tr.insertCell(2);
    let dateOfSendingCVNode = document.createTextNode(element.dateOfSendingCV);
    td3.appendChild(dateOfSendingCVNode);

    let td4 = tr.insertCell(3);
    let dateOfResponseNode = document.createTextNode(element.dateOfResponse);
    td4.appendChild(dateOfResponseNode);

    let td5 = tr.insertCell(4);
    let pInteviewIco = document.createElement("p");
    pInteviewIco.innerHTML = isGetInterview.checked
      ? isGetInterviewIco.confirmIco
      : isGetInterviewIco.cancelIco;
    td5.appendChild(isGetInterview);
    td5.appendChild(pInteviewIco);

    let td6 = tr.insertCell(5);
    let aboutNode = document.createTextNode(element.about);
    td6.appendChild(aboutNode);

    let buttonDel = document.createElement("button");
    buttonDel.setAttribute("onclick", `deleteItem(${element.id})`);
    buttonDel.style.marginLeft = "15px";
    buttonDel.innerHTML = deleteIco;

    let buttonEdit = document.createElement("button");
    buttonEdit.type = "button";
    buttonEdit.setAttribute("data-bs-target", "#exampleModal");
    buttonEdit.setAttribute("data-bs-toggle", "modal");
    buttonEdit.setAttribute("onclick", `displayEditModal(${element.id})`);

    buttonEdit.innerHTML = editIco;

    let td7 = tr.insertCell(6);
    let blockWithButtons = document.createElement("div");
    td7.appendChild(buttonEdit);
    td7.appendChild(buttonDel);
  });

  jobRequests = data;
}

function ChangeVisibilityOfRequestTable() {
  const requestTable = document.querySelector(".requestTable");
  requestTable.style.visibility =
    requestTable.style.visibility == "visible" ? "hidden" : "visible";
}

getItems();
