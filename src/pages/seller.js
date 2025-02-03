import { useRouter } from "next/router";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("/api/placeholder/400/300");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl("/api/placeholder/400/300");
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    
    if (!e.target.file.files[0] || !e.target.name.value || !e.target.number.value || !e.target.date.value) {
      alert("商品の情報を全て入力してください。");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', e.target.file.files[0]);
      
      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      
      if (!uploadResponse.ok) {
        throw new Error('画像のアップロードに失敗しました');
      }
      
      const { imageUrl } = await uploadResponse.json();

      const productData = {
        name: e.target.name.value,
        price: e.target.number.value,
        expiryDate: e.target.date.value,
        imageUrl
      };

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error('商品の登録に失敗しました');
      }

      setIsOpen(true);
      setTimeout(() => {
        router.push("/shopper");
      }, 3000);
    } catch (error) {
      console.error('Error:', error);
      alert('エラーが発生しました: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="main">
      <div className="margin_top">
        <div className="catch">
          <span className="margin">POST PAGE</span>
        </div>
      </div>
      <div className="margin_top" />

      <form className="product" onSubmit={handleSubmit} name="form">
        <div className="center">・商品の情報を入力してください。</div>
        <div className="row_line">
          <div className="col_line">
            <img
              className="submit_image"
              src={previewUrl}
              alt="商品画像プレビュー"
              style={{
                maxWidth: '400px',
                maxHeight: '300px',
                objectFit: 'contain',
                marginBottom: '1rem'
              }}
            />
            <div className="space">
              <input
                type="file"
                accept="image/*"
                name="file"
                onChange={handleImageChange}
                required
              />
            </div>

            <div className="space">
              <label htmlFor="item_name">商品名</label>
              <input
                type="text"
                placeholder="例）いなりずし"
                name="name"
                id="item_name"
                required
              />
            </div>

            <div className="space">
              <label htmlFor="item_price">値段</label>
              <input
                type="number"
                placeholder="例）500"
                name="number"
                id="item_price"
                required
              />
              <span>円</span>
            </div>

            <div className="space">
              <label htmlFor="limit">期限</label>
              <input
                type="date"
                name="date"
                id="limit"
                required
              />
            </div>

            <div className="margin_top" />
            <button
              className="submit_button"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? '送信中...' : '投稿'}
            </button>
          </div>
        </div>
      </form>

      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>投稿完了しました！</h2>
            <p>3秒後に購入ページに移動します。</p>
          </div>
        </div>
      )}
    </div>
  );
}