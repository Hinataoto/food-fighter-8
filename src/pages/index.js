import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  
  function shopper_handleClick() {
    router.push("shopper");
  }

  function seller_handleClick() {
    router.push("seller");
  }

  return (
    <div className="main">
      <div className="company_name">フードファイター８</div>

      <div className="outline">
        <div className="title_box">概要</div>
        <div className="text">
          フードファイター８は、家庭の食べ残しや、スーパー、コンビニの売れ残りによる食品ロスを解決するサービスです！
          <br /><br />
          食べ残しや売れ残りを売ることや、安く購入することが誰でもできます！
        </div>
      </div>

      <div className="flex">
        <img
          className="shopper"
          src="https://furiirakun.com/wp/wp-content/uploads/2023/02/cya-han.gif"
          alt="ショッパーアイコン"
        />
        <div className="border1" onClick={shopper_handleClick}>
          <div className="text_img">商品一覧はこちらをクリック</div>
          <div className="shohin_header">
            賞味期限は近いですが、お手ごろな値段で商品を購入できます。
            <br />
            また、あなたの購入が食品ロスにもつながります。
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="border2" onClick={seller_handleClick}>
          <div className="text_img">投稿したい方はこちらをクリック</div>
          <div className="shohin_header">
            だれでも商品を投稿できます！稼げるチャンスかも！？
          </div>
        </div>
        <img
          className="seller"
          src="https://ugokawaii.com/wp-content/uploads/2022/08/waiter.gif"
          alt="セラーアイコン"
        />
      </div>
    </div>
  );
}