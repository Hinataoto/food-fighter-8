import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {

  const router = useRouter();
  function shopper_handleClick() {
    router.push("shopper")
  }

  function seller_handleClick() {
    router.push("seller")
  }

  return (
    <div class="main">
      <div class="company_name">フードファイター８</div>

      <div class="outline"><div class="title_box">概要</div>
        <div class="text">フードファイター８は、家庭の食べ残しや、スーパー、コンビニの売れ残りによる食品ロスを解決するサービスです！<br /><br />
          食べ残しや売れ残りを売ることや、安く購入することが誰でもできます！</div>
      </div>

      <div class='flex'>
        <img class="shopper" src="https://furiirakun.com/wp/wp-content/uploads/2023/02/cya-han.gif" ></img>
        <div class="border1" onClick={shopper_handleClick}>
          <div class="text_img">商品一覧はこちらをクリック</div>
          <div class="shohin_header">賞味期限は近いですが、お手ごろな値段で商品を購入できます。<br></br>また、あなたの購入が食品ロスにもつながります。</div>
        </div>
      </div>

      <div class='flex'>
        <div class="border2" onClick={seller_handleClick}>
          <div class="text_img">投稿したい方はこちらをクリック</div>
          <div class="shohin_header">だれでも商品を投稿できます！稼げるチャンスかも！？</div>
        </div>
        <img class="seller" src="https://ugokawaii.com/wp-content/uploads/2022/08/waiter.gif" ></img>
      </div>
    </div>
  );
}
