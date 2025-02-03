import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Buy() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/get-products/${id}`);
      if (!response.ok) {
        throw new Error('商品の取得に失敗しました');
      }
      const data = await response.json();
      setProduct(data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async () => {
    try {
      const response = await fetch(`/api/delete-product/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('商品の削除に失敗しました');
      }

      setIsOpen(true);
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (err) {
      console.error('Delete error:', err);
      setError(err.message);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const handlePurchase = async () => {
    try {
      await deleteProduct();
    } catch (err) {
      console.error('Purchase error:', err);
      setError(err.message);
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

  if (!product) {
    return (
      <div className="main">
        <div className="margin_top">
          <div className="catch">
            <span className="margin">商品が見つかりません</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main">
      <div className="margin_top">
        <div className="catch">
          <span className="margin">PURCHASE PAGE</span>
        </div>
      </div>
      <div className="margin_top" />
      
      <div className="product">
        <div className="row_line">
          <div className="col_line">
            <img
              className="submit_image"
              style={{
                maxWidth: '400px',
                maxHeight: '300px',
                objectFit: 'contain',
                marginBottom: '1rem'
              }}
              src={product.ImageUrl || "/api/placeholder/400/300"}
              alt={product.Name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/api/placeholder/400/300";
              }}
            />
            
            <div className="space">
              <label>商品名</label>
              <input type="text" value={product.Name} readOnly />
            </div>

            <div className="space">
              <label>値段</label>
              <input type="number" value={product.Price} readOnly />
              <span>円</span>
            </div>

            <div className="space">
              <label>期限</label>
              <input type="text" value={formatDate(product.ExpiryDate)} readOnly />
            </div>

            <div className="margin_top" />
            <button className="submit_button" onClick={handlePurchase}>
              購入
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>購入完了しました！</h2>
            <p>3秒後にホームページに移動します。</p>
          </div>
        </div>
      )}
    </div>
  );
}