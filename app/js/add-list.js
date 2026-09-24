"use strict";

{
  function IsEmptyTaskName() {
    let isEmpty = false;
    document
      .querySelectorAll(".card-list .task-card textarea")
      .forEach((input) => {
        if (input.value.trim() === "") {
          isEmpty = true;
          return isEmpty;
        }
      });
    return isEmpty;
  }

  function AddCardEnable(addCardBtnElm) {
    addCardBtnElm.classList.remove("add-card-disable");
    addCardBtnElm.classList.add("add-card-enable");
  }

  function AddCardDisable(addCardBtnElm) {
    addCardBtnElm.classList.remove("add-card-enable");
    addCardBtnElm.classList.add("add-card-disable");
  }

  function TaskNameTextRegister(addCardBtn, liElm) {
    //タスク名を表示するtextareaタグを追加
    const taskNameText = document.createElement("textarea");
    taskNameText.placeholder = "タスク名を入力してください";
    taskNameText.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        taskNameText.blur();
      }
    });

    taskNameText.addEventListener("blur", () => {
      if (taskNameText.value.trim() === "") {
        AddCardDisable(addCardBtn);
      } else {
        AddCardEnable(addCardBtn);
        taskNameText.disabled = true;
        taskNameText.classList.add('task-name-disable');
      }
    });

    // taskNameText.addEventListener('click', (event)=>{
    //       event.preventDefault();
    //     })

    document.addEventListener("click", (event) => {
      if (!taskNameText.contains(event.target)) {
        taskNameText.blur();
      }
    });
    liElm.appendChild(taskNameText);
    taskNameText.focus();

    liElm.addEventListener('click', ()=>{
      console.log("liElm click!");
    });
  }

  function TitleEventListenerRegist(title, addCardBtn) {
    title.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        title.blur();
      }
    });

    title.addEventListener("blur", () => {
      if (title.value.trim() === "") {
        AddCardDisable(addCardBtn);
      } else {
        AddCardEnable(addCardBtn);
      }
    });

    document.addEventListener("click", (event) => {
      if (!title.contains(event.target)) {
        title.blur();
      }
    });
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

      const addCardBtnElm = document.createElement("button");
      addCardBtnElm.textContent = "カードを追加";
      addCardBtnElm.classList.add("add-card");

      const title = document.createElement("textarea");
      title.classList.add("title-text");
      TitleEventListenerRegist(title, addCardBtnElm);

      divElm.appendChild(title);
      const ul = document.createElement("ul");
      ul.classList.add("card-list");
      divElm.appendChild(ul);

      //titleの後に追加
      divElm.appendChild(addCardBtnElm);
      AddListLi.replaceChild(divElm, btn);

      //カードを追加がクリックされた
      addCardBtnElm.addEventListener("click", () => {
        //タスクをリストに追加
        const cardUl = AddListLi.querySelector(".card-list");
        const liElm = document.createElement("li");
        liElm.classList.add("task-card");
        cardUl.appendChild(liElm);
        //タスク名を表示するinputタグを追加
        RegisterTaskNameInput(addCardBtnElm, liElm);
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
      addListLi.append(newBtn);

      //`リストを追加をクリックした際のイベント登録再起呼び出し
      AddCardBtnListener(addListLi);
    });
  }

  //新規にリストを追加した際の処理
  //リストを追加をクリック
  Array.from(document.getElementsByClassName("add-list")).forEach((addList) => {
    const btn = addList.querySelector("#add-list-btn");
    if (btn === null) {
      return;
    }

    AddCardBtnListener(addList);
  });

  //リストエリアを取得その中で各要素の処理を実装
  Array.from(document.getElementsByClassName("list-area")).forEach(
    (listArea, index) => {
      const addCard = listArea.querySelector(".add-card");
      addCard.addEventListener("click", () => {
        if (addCard.classList.contains("add-card-disable")) {
          return;
        }

        //タスクをリストに追加
        const liElm = document.createElement("li");
        liElm.classList.add("task-card");
        const cardUl = listArea.querySelectorAll(".card-list");
        cardUl[index].appendChild(liElm);

        //タスク名を表示するinputタグを追加
        TaskNameTextRegister(addCard, liElm);
      });

      const title = listArea.querySelector(".title-text");
      TitleEventListenerRegist(title, addCard);
    },
  );
}
