"use strict";

{
  function IsEmptyTaskName() {
    let isEmpty = false;
    document
      .querySelectorAll(".card-list .task-card input")
      .forEach((input) => {
        if (input.value.trim() === "") {
          isEmpty = true;
          return isEmpty;
        }
      });
    return isEmpty;
  }

  function RegisterTaskNameInput(liElm) {
    //タスク名を表示するinputタグを追加
    const taskNameText = document.createElement("input");
    taskNameText.type = "text";
    taskNameText.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        taskNameText.blur();
      }
    });
    liElm.appendChild(taskNameText);
    taskNameText.focus();
  }

  function AddCardBtnListener(AddListLi) {
    const btn = AddListLi.querySelector("#add-list-btn");
    if (btn === null) {
      return;
    }

    //リストを追加のリスナー登録
    btn.addEventListener("click", () => {
      AddListLi.classList.add("container-size");

      const divElm = document.createElement("div");
      divElm.classList.add("list-area");
      const ul = document.createElement("ul");
      ul.classList.add("card-list");
      divElm.appendChild(ul);
      const addCardBtnElm = document.createElement("button");
      addCardBtnElm.textContent = "カードを追加";
      addCardBtnElm.classList.add("add-card");
      divElm.appendChild(addCardBtnElm);
      AddListLi.replaceChild(divElm, btn);

      //カードを追加がクリックされた
      addCardBtnElm.addEventListener("click", () => {
        if (IsEmptyTaskName()) {
          alert("タイトルを入力してください。");
          return;
        }

        //タスクをリストに追加
        const cardUl = AddListLi.querySelector(".card-list");
        const liElm = document.createElement("li");
        liElm.classList.add("task-card");
        cardUl.appendChild(liElm);
        //タスク名を表示するinputタグを追加
        RegisterTaskNameInput(liElm);
      });

      //リスト追加ボタンを右端に追加
      const addListParent = document.querySelector("#add-list-parent");
      const addListLi = document.createElement("li");
      addListLi.classList.add("container-size");
      addListLi.classList.add("add-list");
      addListParent.appendChild(addListLi);

      // リストを追加ボタンも新しく作る
      const newBtn = document.createElement("button");
      newBtn.id = "add-list-btn";
      newBtn.textContent = "リストを追加";
      addListLi.appendChild(newBtn);

      AddCardBtnListener(addListLi);
    });
  }

  //リストを追加をクリック
  Array.from(document.getElementsByClassName("add-list")).forEach((addList) => {
    const btn = addList.querySelector("#add-list-btn");
    if (btn === null) {
      return;
    }

    AddCardBtnListener(addList);
  });

  //カードを追加をクリック
  Array.from(document.getElementsByClassName("add-card")).forEach(
    (addCard, index) => {
      addCard.addEventListener("click", () => {
        if (IsEmptyTaskName()) {
          alert("タイトルを入力してください。");
          return;
        }

        //タスクをリストに追加
        const liElm = document.createElement("li");
        liElm.classList.add("task-card");
        const cardUl = document.querySelectorAll(".card-list");
        cardUl[index].appendChild(liElm);

        //タスク名を表示するinputタグを追加
        RegisterTaskNameInput(liElm);
      });
    },
  );
}
