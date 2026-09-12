"use strict";

{
  //カードを追加をクリック
  const add_card_btn = document.querySelector(".add_card");
  add_card_btn.addEventListener("click", () => {
    console.log("add cardをクリック");

    let isEmpty = false;
    document.querySelectorAll(".card_list .task_card p").forEach((p) => {
      if (p.textContent.trim() === "") {
        isEmpty = true;
        return;
      } 
    });

    if (isEmpty) {
      alert("タイトルを入力してください。");
      return;
    }

    const lielm = document.createElement("li");
    const card_ul = document.querySelector(".card_list");
    //タスクをリストに追加
    lielm.classList.add("task_card");
    card_ul.appendChild(lielm);
    
    //ダブルクリックのイベントを追加
    lielm.addEventListener("dblclick", () => {
      

      const liElms = lielm.children;
      const textarea = liElms[0].querySelector('textarea');
      if(textarea !== null){
        return;
      }
    
      const editArea = document.createElement("textarea");
      lielm.appendChild(editArea);
      editArea.classList.add("edit_show");
      editArea.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          lielm.querySelector("p").textContent = editArea.value;
          editArea.classList.remove("edit_show");
          editArea.classList.add("edit_hidden");
        }
      });
    });

    //タスク名を表示するpタグを追加
    const pElm = document.createElement("p");
    lielm.appendChild(pElm);
  });
}
