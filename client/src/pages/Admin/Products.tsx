import { Edit3, PackageSearch, Trash2 } from "lucide-react";
import { useState } from "react";

// Demo product type
interface Product {
  id: string;
  title: string;
  imageUrl?: string | "";
  description: string;
  quantity: number;
  price: number;
}

const demoProducts: Product[] = [
  {
    id: "P-1001",
    title: "Wireless Earbuds",
    description: "High quality wireless earbuds with noise cancellation.",
    imageUrl: "https://picsum.photos/600/500?random=1",
    quantity: 12,
    price: 129,
  },
  {
    id: "P-1002",
    title: "Smart Watch",
    description: "Feature-rich smart watch with health tracking.",
    imageUrl: "https://picsum.photos/600/500?random=2",
    quantity: 0,
    price: 199,
  },
  {
    id: "P-1003",
    title: "Bluetooth Speaker",
    imageUrl: "https://picsum.photos/600/500?random=3",
    description: "Portable Bluetooth speaker with deep bass.",
    quantity: 7,
    price: 89,
  },
];

const Products = () => {
  const [products] = useState<Product[]>(demoProducts);

  return (
    <div className="p-5 w-full min-h-screen">
      <div className="flex items-center justify-start gap-2 text-stone-900 mb-6">
        <PackageSearch size={28} />
        <h1 className="text-2xl font-medium">All Products</h1>
      </div>
      <ul className="space-y-6">
        {products.map((product) => (
          <li
            key={product.id}
            className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm flex flex-col sm:flex-row sm:items-center gap-4"
          >
            <img className="size-28 md:size-20 object-cover rounded-lg sm:mx-0" src={product.imageUrl} alt={product.title} />
            <div className="flex flex-col sm:flex-row sm:justify-between w-full gap-4">
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                  <span className="text-lg font-bold text-stone-900">{product.title}</span>
                  <span className={`text-xs w-fit font-semibold px-3 py-1 rounded-full ${product.quantity > 0 ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
                    {product.quantity > 0 ? `${product.quantity} in stock` : "Out of stock"}
                  </span>
                </div>
                <p className="text-stone-600 text-sm mb-2 line-clamp-2">{product.description}</p>
                <div className="text-stone-500 text-xs">Product ID: {product.id}</div>
              </div>
              <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between md:justify-start gap-3 w-full md:w-fit">
                <span className="text-xl font-bold text-stone-900">${product.price.toLocaleString()}</span>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 border border-green-500 bg-green-50 text-green-500 px-3 rounded-md py-1.5 text-sm font-medium hover:bg-green-100">
                    <Edit3 size={18} />
                    Edit
                  </button>
                  <button className="flex items-center gap-2 border border-red-500 bg-red-50 text-red-500 px-3 rounded-md py-1.5 text-sm font-medium hover:bg-red-100">
                    <Trash2 size={18} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;