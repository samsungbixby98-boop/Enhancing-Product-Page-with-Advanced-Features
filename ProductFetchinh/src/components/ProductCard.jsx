export default function ProductCard({ product }) {
  return (
    <div className="card">
      <img src={product.thumbnail} />
      <h3>{product.title}</h3>
      <p>₹ {product.price}</p>
    </div>
  );
}