import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { X } from "lucide-react";

export interface Product {
  id: string;
  title: string;
  imageUrl?: string | "";
  description: string;
  quantity: number;
  price: number;
  category?: string;
}

interface ProductAddFormProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: Product) => void;
  existingIds: string[];
}

const ProductAddForm: React.FC<ProductAddFormProps> = ({
  isOpen,
  onClose,
  onAddProduct,
  existingIds,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<Product>();

  const generateNextId = (ids: string[]) => {
    const numericIds = ids
      .map((id) => {
        const match = id.match(/\d+/);
        return match ? parseInt(match[0], 10) : 0;
      })
      .filter((val) => val > 0);

    const maxId = numericIds.length > 0 ? Math.max(...numericIds) : 1000;
    return `P-${maxId + 1}`;
  };

  const onSubmit: SubmitHandler<Product> = (data) => {
    const nextId = generateNextId(existingIds);
    onAddProduct({
      ...data,
      id: nextId,
    });
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-110 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-stone-950/40 backdrop-blur-xs" 
        onClick={() => {
          onClose();
          reset();
        }} 
      />
      <div className="relative z-10 w-full max-w-lg overflow-y-auto max-h-[90vh] rounded-3xl border border-stone-200 bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <h2 className="text-xl font-semibold text-stone-900">Add New Product</h2>
          <button 
            type="button" 
            onClick={() => {
              onClose();
              reset();
            }} 
            className="text-stone-400 hover:text-stone-900 hover:bg-stone-100 p-1.5 rounded-full transition cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4 text-left">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1.5">Category</label>
            <input
              type="text"
              {...register("category", { required: "Category is required" })}
              className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-2.5 text-sm text-stone-700 outline-none focus:border-stone-900 focus:bg-white transition-all"
              placeholder="e.g. Electronics"
            />
            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1.5">Product Name</label>
            <input
              type="text"
              {...register("title", { required: "Product Name is required" })}
              className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-2.5 text-sm text-stone-700 outline-none focus:border-stone-900 focus:bg-white transition-all"
              placeholder="e.g. Mechanical Keyboard"
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1.5">Price ($)</label>
              <input
                type="number"
                step="0.01"
                {...register("price", { 
                  required: "Price is required",
                  valueAsNumber: true,
                  min: { value: 0.5, message: "Price must be at least 0.5" }
                })}
                className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-2.5 text-sm text-stone-700 outline-none focus:border-stone-900 focus:bg-white transition-all"
                placeholder="e.g. 99"
              />
              {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1.5">Quantity</label>
              <input
                type="number"
                {...register("quantity", { 
                  required: "Quantity is required",
                  valueAsNumber: true,
                  min: { value: 0, message: "Quantity must be positive or 0" }
                })}
                className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-2.5 text-sm text-stone-700 outline-none focus:border-stone-900 focus:bg-white transition-all"
                placeholder="e.g. 15"
              />
              {errors.quantity && <p className="text-red-500 text-xs mt-1">{errors.quantity.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1.5">Image URL</label>
            <input
              type="url"
              {...register("imageUrl", { required: "Image URL is required" })}
              className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-2.5 text-sm text-stone-700 outline-none focus:border-stone-900 focus:bg-white transition-all"
              placeholder="https://images.unsplash.com/..."
            />
            {errors.imageUrl && <p className="text-red-500 text-xs mt-1">{errors.imageUrl.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1.5">Description</label>
            <textarea
              rows={3}
              {...register("description", { required: "Description is required" })}
              className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-2.5 text-sm text-stone-700 outline-none focus:border-stone-900 focus:bg-white transition-all resize-none"
              placeholder="Describe your product here..."
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-100">
            <button
              type="button"
              onClick={() => {
                onClose();
                reset();
              }}
              className="px-5 py-2.5 rounded-xl border border-stone-200 bg-white text-sm font-medium text-stone-700 hover:bg-stone-50 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-sm font-medium text-white transition cursor-pointer"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductAddForm;
