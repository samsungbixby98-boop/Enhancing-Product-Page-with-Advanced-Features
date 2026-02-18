let cache = null; // in-memory cache (closure)
let lastFetchTime = 0;
let fetchCount = 0; // closure variable

export function useProductCache() {
  const getProducts = async () => {
    fetchCount++;
    console.log("API Fetch Attempt:", fetchCount);

    // Cache valid for 60 seconds
    if (cache && Date.now() - lastFetchTime < 60000) {
      console.log("Using Cached Data");
      return cache;
    }

    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();

    cache = data.products;
    lastFetchTime = Date.now();

    return cache;
  };

  return { getProducts };
}