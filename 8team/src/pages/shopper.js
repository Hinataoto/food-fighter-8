import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {

  const router = useRouter();
  function select_image() {
    router.push("buy")
  }

  return (
    <div class="main">
      <div class="margin_top">
        <div class="catch"><span class="margin">PURCHACE PAGE</span></div>
        <div class="margin_top">
          <div class="select_image">
            <div class="select_box">
              <img class="submit_image" src="https://thumb.ac-illust.com/50/50a81955d8a986bdda086069388635e2_t.jpeg"></img>
              <p>商品名</p>
            </div>

            <div class="select_box">
              <img class="submit_image" src="https://thumb.ac-illust.com/50/50a81955d8a986bdda086069388635e2_t.jpeg"></img>
              <p>商品名</p>
            </div>

            <div class="select_box">
              <img class="submit_image" src="https://thumb.ac-illust.com/50/50a81955d8a986bdda086069388635e2_t.jpeg"></img>
              <p>商品名</p>
            </div>

          </div>
        </div>
      </div>
      <button onClick={select_image}>写真</button>
      {/* <button on onClick={home}>ホームページに戻る</button>   */}
    </div>
  );
}