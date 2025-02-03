import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/get-products');
      if (!response.ok) {
        throw new Error('商品の取得に失敗しました');
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = (productId) => {
    router.push(`/buy?id=${productId}`);
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
    } catch (err) {
      console.error('Date format error:', err);
      return '日付不明';
    }
  };

  if (loading) {
    return (
      <div className="main">
        <div className="margin_top">
          <div className="catch">
            <span className="margin">読み込み中...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="main">
        <div className="margin_top">
          <div className="catch">
            <span className="margin">エラー</span>
          </div>
        </div>
        <div className="center margin_top">{error}</div>
      </div>
    );
  }

  return (
    <div className="main">
      <div className="margin_top">
        <div className="catch">
          <span className="margin">PURCHASE PAGE</span>
        </div>
        <div className="margin_top">
          <div className="select_image">
            {products && products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product.Id}
                  className="select_box"
                  onClick={() => handleProductClick(product.Id)}
                >
                  <img
                    className="submit_image"
                    src={product.ImageUrl || "/api/placeholder/400/300"}
                    alt={product.Name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/api/placeholder/400/300";
                    }}
                  />
                  <p className="product-name">{product.Name}</p>
                  <p className="product-price">{product.Price}円</p>
                  <p className="product-date">期限: {formatDate(product.ExpiryDate)}</p>
                </div>
              ))
            ) : (
              <div className="no-products">
                商品が見つかりませんでした
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}