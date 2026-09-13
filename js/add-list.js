"use strict";

{
  //リストを追加をクリック
  document.querySelectorAll(".add_list").forEach((liElm, index) => {
    liElm.addEventListener("click", () => {
      const btn = liElm.querySelector("#add_list_btn");
      if (btn === null) {
        return;
      }

      const divElm = document.createElement("div");
      divElm.classList.add("container_size");
      divElm.classList.add("list_area");
      const ul = document.createElement("ul");
      ul.classList.add('card_list');
      divElm.appendChild(ul);
      const btnElm = document.createElement("button");
      btnElm.textContent = "カードを追加";
      btnElm.classList.add("add_card");
      divElm.appendChild(btnElm);
      liElm.replaceChild(divElm, btn);

      //カードを追加がクリックされた
      btnElm.addEventListener('click', () => {
        console.log("カードを追加をクリック");
        let isEmpty = false;
        document
          .querySelectorAll(".card_list .task_card input")
          .forEach((input) => {
            if (input.value.trim() === "") {
              isEmpty = true;
              return;
            }
          });

        if (isEmpty) {
          alert("タイトルを入力してください。");
          return;
        }

        const cardUl = document.querySelector(".card_list");

        const liElm = document.createElement("li");
        liElm.classList.add("task_card");

        //タスクをリストに追加
        cardUl.appendChild(liElm);

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
      });
    });
  });

  //カードを追加をクリック
  document.querySelectorAll(".add_card").forEach((addCard, index) => {
    addCard.addEventListener("click", () => {
      console.log("add cardをクリック");

      let isEmpty = false;
      document
        .querySelectorAll(".card_list .task_card input")
        .forEach((input) => {
          if (input.value.trim() === "") {
            isEmpty = true;
            return;
          }
        });

      if (isEmpty) {
        alert("タイトルを入力してください。");
        return;
      }

      const liElm = document.createElement("li");
      const cardUl = document.querySelectorAll(".card_list");
      //タスクをリストに追加
      liElm.classList.add("task_card");
      cardUl[index].appendChild(liElm);

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
    });
  });
}
