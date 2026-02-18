import { useEffect, useState, useRef } from "react";
import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/ProductSkeleton";
import { useProductCache } from "../hooks/useProductCache";

export default function ProductContainer() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const requestId = useRef(0); // prevent stale updates

  const { getProducts } = useProductCache();

  useEffect(() => {
    let currentRequest = ++requestId.current;

    async function fetchData() {
      setLoading(true);

      const data = await getProducts();

      // Prevent stale state update
      if (currentRequest === requestId.current) {
        setProducts(data);
        setLoading(false);
      }
    }

    fetchData();
  }, []);
  return (
    <div className="grid">
      {loading
        ? Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
        : products.map((p) => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}