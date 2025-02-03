import { useRouter } from "next/router";
import { useState } from "react";

export default function Home() {

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true)
    setTimeout(() => {
      router.push("http://localhost:3000/");
    }, 3000);
  };


  return (
    <div class="main">
      <div class="margin_top">
        <div class="catch"><span class="margin">PURCHACE PAGE</span></div>
      </div>
      <div class="margin_top"></div>
      <img class="submit_img" src="https://thumb.ac-illust.com/50/50a81955d8a986bdda086069388635e2_t.jpeg"></img>
      <form class="product">
        <div class="row_line">
          <div class="col_line">
            <div class="space">
              商品名：<input type="text"></input><br />
            </div>
            <div class="space">
              値段：<input type="number"></input>円<br />
            </div>
            <div class="space">
              期限：<input type="date"></input><br />
            </div>
          </div>
        </div>
      </form>
      <div class="margin_top"></div>
      <div class="center">
        <button class="submit_button" onClick={openModal}>購入</button>
      </div>
      {
        isOpen && (
          <div className="modal-overlay">
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>購入完了しました！</h2>
              <p>3秒後にホームページに移動します。</p>
            </div>
          </div>)
      }
    </div >
  );
}