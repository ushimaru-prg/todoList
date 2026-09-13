"use strict";

{
  //カードを追加をクリック
  const addCardBtn = document.querySelector(".add_card");
  addCardBtn.addEventListener("click", () => {    
    console.log("add cardをクリック");

    let isEmpty = false;
    document.querySelectorAll(".card_list .task_card input").forEach((input) => {
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
    const cardUl = document.querySelector(".card_list");
    //タスクをリストに追加
    liElm.classList.add("task_card");
    cardUl.appendChild(liElm);

    //タスク名を表示するinputタグを追加
    const taskNameText = document.createElement("input");
    taskNameText.type = 'text';
    taskNameText.addEventListener('keydown', (event) =>{
      if(event.key === 'Enter'){
        taskNameText.blur();
      }
    })
    liElm.appendChild(taskNameText);
  });
}
