import { useRouter } from "next/router";
import { useState } from "react";



export default function Home() {

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  function openModal(e) {
    if (form.file.value == "" || form.name.value == "" || form.number.value == "" || form.date.value == "") {
      alert("商品の情報を全て入力してください。");
    } else {
      setIsOpen(true);
      setTimeout(() => {
        router.push("/shopper");
      }, 3000);
    }
    e.preventDefault();
  }


  return (
    <div class="main">
      <div class="margin_top">
        <div class="catch"><span class="margin">POST PAGE</span></div>
      </div>
      <div class="margin_top"></div>

      <form class="product" /*method="post"*/ name="form">
        <div class="center">・商品の情報を入力してください。</div>
        <div class="row_line">
          <input type="file" accept=".png, .jpg, .jpeg, .pdf," name="file" required></input><br />

          <div class="col_line">
            <div class="space">
              <label for="item_name">商品名</label><br></br>
              <input type="text" placeholder="例 ）いなりずし" name="name" id="item_name" required></input><br />
            </div>

            <div class="space">
              <label for="item_price">値段</label><br></br>
              <input type="number" placeholder="例 ）500" name="number" id="item_price" required></input>円<br />
            </div>

            <div class="space">
              <label for="limit">期限</label><br></br>
              <input type="date" name="date" id="limit" required></input><br />
            </div>
            <div class="margin_top"></div>
            <button class="submit_button" onClick={openModal}>投稿</button>
          </div>
        </div>
        {isOpen && (
          <div class="modal-overlay">
            <div class="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>投稿完了しました！</h2>
              <p>3秒後に購入ページに移動します。</p>
            </div>
          </div>)}
      </form>
    </div>
  );
}