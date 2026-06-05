import { Edit3, PackageSearch, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import ProductAddForm from "./ProductAddForm";

// Demo product type
interface Product {
  id: string;
  title: string;
  imageUrl?: string | "";
  description: string;
  quantity: number;
  price: number;
  category?: string;
}

const demoProducts: Product[] = [
  {
    id: "P-1001",
    title: "Wireless Earbuds",
    description: "High quality wireless earbuds with noise cancellation.",
    imageUrl: "https://picsum.photos/600/500?random=1",
    quantity: 12,
    price: 129,
    category: "Audio",
  },
  {
    id: "P-1002",
    title: "Smart Watch",
    description: "Feature-rich smart watch with health tracking.",
    imageUrl: "https://picsum.photos/600/500?random=2",
    quantity: 0,
    price: 199,
    category: "Wearables",
  },
  {
    id: "P-1003",
    title: "Bluetooth Speaker",
    imageUrl: "https://picsum.photos/600/500?random=3",
    description: "Portable Bluetooth speaker with deep bass.",
    quantity: 7,
    price: 89,
    category: "Audio",
  },
];

const Products = () => {
  useEffect(() => {
    document.title = "Admin | All Products"
  }, [])
  const [products, setProducts] = useState<Product[]>(demoProducts);
  const [isOpen, setIsOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  const handleSaveProduct = (product: Product) => {
    if (productToEdit) {
      setProducts((prev) => prev.map((p) => (p.id === product.id ? product : p)));
    } else {
      setProducts((prev) => [...prev, product]);
    }
    setIsOpen(false);
    setProductToEdit(null);
  };

  return (
    <div className="p-5 w-full min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-6">
        <div className="flex items-center justify-start gap-2 text-stone-900 mb-2 md:mb-0">
          <PackageSearch size={28} />
          <h1 className="text-2xl font-medium">All Products</h1>
        </div>
        <button
          onClick={() => {
            setProductToEdit(null);
            setIsOpen(true);
          }}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-stone-900 text-stone-50 rounded-md hover:scale-95 transition-all duration-300 ease-in-out cursor-pointer"
        >
          <Plus size={25} /> Add Product
        </button>
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
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-lg font-bold text-stone-900">{product.title}</span>
                  {product.category && (
                    <span className="text-xs font-semibold bg-stone-100 text-stone-600 px-3 py-1 rounded-full">
                      {product.category}
                    </span>
                  )}
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
                  <button 
                    onClick={() => {
                      setProductToEdit(product);
                      setIsOpen(true);
                    }}
                    className="flex items-center gap-2 border border-green-500 bg-green-50 text-green-500 px-3 rounded-md py-1.5 text-sm font-medium hover:bg-green-100 cursor-pointer"
                  >
                    <Edit3 size={18} />
                    Edit
                  </button>
                  <button 
                    onClick={() => {
                      if (confirm(`Are you sure you want to delete ${product.title}?`)) {
                        setProducts((prev) => prev.filter((p) => p.id !== product.id));
                      }
                    }}
                    className="flex items-center gap-2 border border-red-500 bg-red-50 text-red-500 px-3 rounded-md py-1.5 text-sm font-medium hover:bg-red-100 cursor-pointer"
                  >
                    <Trash2 size={18} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-8 shadow-sm rounded-3xl border-2 border-stone-200 bg-white p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-stone-900 text-center md:text-left">Product Summary</h3>
          <p className="text-sm text-stone-500 text-center md:text-left">Total volume of all listed products</p>
        </div>
        <div className="text-center md:text-right">
          <p className="text-sm uppercase tracking-widest text-stone-500">Total Products</p>
          <p className="text-3xl font-bold text-indigo-600">
            {products.reduce((total, product) => total + product.quantity, 0)}
          </p>
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      {isOpen && <ProductAddForm
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setProductToEdit(null);
        }}
        onAddProduct={handleSaveProduct}
        existingIds={products.map((p) => p.id)}
        productToEdit={productToEdit}
      />}
    </div>
  );
};

export default Products;