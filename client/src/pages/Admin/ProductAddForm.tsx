import React, { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { X } from "lucide-react";
import { navigationDropdown } from "../../constants/navigation";

export interface Product {
  id: string;
  title: string;
  imageUrl?: string | "";
  imageUrls?: string[];
  description: string;
  quantity: number;
  price: number;
  category?: string;
  subCategory?: string;
  hasVariants?: boolean;
  variantTitle?: string;
  variantImages?: string;
}

interface ProductAddFormProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: Product) => void;
  existingIds: string[];
  productToEdit?: Product | null;
}

const ProductAddForm: React.FC<ProductAddFormProps> = ({
  isOpen,
  onClose,
  onAddProduct,
  existingIds,
  productToEdit,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Product>();

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [objectUrls, setObjectUrls] = useState<string[]>([]);

  const selectedCategory = watch("category");
  const hasVariants = watch("hasVariants");
  const selectedCategoryItem = navigationDropdown.find(
    (item) => item.title === selectedCategory,
  );
  const subCategoryOptions = selectedCategoryItem?.baseItems ?? [];

  const clearImagePreviews = () => {
    objectUrls.forEach(URL.revokeObjectURL);
    setObjectUrls([]);
    setImagePreviews([]);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    const urls = files.map((file) => URL.createObjectURL(file));

    objectUrls.forEach(URL.revokeObjectURL);
    setObjectUrls(urls);
    setImagePreviews(urls);
  };

  useEffect(() => {
    if (selectedCategory) {
      setValue("subCategory", "");
    }
  }, [selectedCategory, setValue]);

  useEffect(() => {
    if (isOpen) {
      if (productToEdit) {
        reset(productToEdit);
      } else {
        reset({
          id: "",
          title: "",
          description: "",
          quantity: 0,
          price: 0,
          imageUrl: "",
          category: "Assets",
          subCategory: "",
          hasVariants: false,
          variantTitle: "",
          variantImages: "",
        });
      }
    }
  }, [isOpen, productToEdit, reset]);

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
    const productData: Product = {
      ...data,
      imageUrl: imagePreviews[0] ?? data.imageUrl,
      imageUrls: imagePreviews.length ? imagePreviews : data.imageUrls,
    };

    if (productToEdit) {
      onAddProduct(productData);
    } else {
      const nextId = generateNextId(existingIds);
      onAddProduct({
        ...productData,
        id: nextId,
      });
    }

    clearImagePreviews();
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
          <h2 className="text-xl font-semibold text-stone-900">
            {productToEdit ? "Edit Product" : "Add New Product"}
          </h2>
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
            <select
              {...register("category", { required: "Category is required" })}
              defaultValue="Assets"
              className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-2.5 text-sm text-stone-700 outline-none focus:border-stone-900 focus:bg-white transition-all"
            >
              <option value="Assets">Assets</option>
              <option value="Boards & Signage">Boards & Signage</option>
              <option value="Room Stationery">Room Stationery</option>
              <option value="Utility Stationery">Utility Stationery</option>
              <option value="Fun & Entertainment">Fun & Entertainment</option>
              <option value="Thermatic Elements">Thermatic Elements</option>
              <option value="Favour & Gifts">Favour & Gifts</option>
              <option value="Invites & Planner">Invites & Planner</option>
            </select>
            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
          </div>

          {subCategoryOptions.length > 0 && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1.5">Sub Category</label>
              <select
                {...register("subCategory", {
                  validate: (value) =>
                    subCategoryOptions.length === 0 || value
                      ? true
                      : "Sub Category is required",
                })}
                className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-2.5 text-sm text-stone-700 outline-none focus:border-stone-900 focus:bg-white transition-all"
              >
                <option value="">Select sub category</option>
                {subCategoryOptions.map((item) => (
                  <option key={item.url} value={item.title}>
                    {item.title}
                  </option>
                ))}
              </select>
              {errors.subCategory && (
                <p className="text-red-500 text-xs mt-1">{errors.subCategory.message}</p>
              )}
            </div>
          )}

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="hasVariants"
              {...register("hasVariants")}
              className="h-4 w-4 rounded border-stone-300 text-stone-900 focus:ring-stone-900"
            />
            <label htmlFor="hasVariants" className="text-sm text-stone-700">
              This product has variants
            </label>
          </div>

          {hasVariants && (
            <>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1.5">Variant Title</label>
                <input
                  type="text"
                  {...register("variantTitle", {
                    required: hasVariants ? "Variant title is required" : false,
                  })}
                  className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-2.5 text-sm text-stone-700 outline-none focus:border-stone-900 focus:bg-white transition-all"
                  placeholder="e.g. Red, Large"
                />
                {errors.variantTitle && (
                  <p className="text-red-500 text-xs mt-1">{errors.variantTitle.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1.5">Variant Images</label>
                <textarea
                  rows={3}
                  {...register("variantImages", {
                    required: hasVariants ? "Variant images are required" : false,
                  })}
                  className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-2.5 text-sm text-stone-700 outline-none focus:border-stone-900 focus:bg-white transition-all resize-none"
                  placeholder="Add image URLs separated by commas"
                />
                {errors.variantImages && (
                  <p className="text-red-500 text-xs mt-1">{errors.variantImages.message}</p>
                )}
              </div>
            </>
          )}

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
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1.5">Product Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-2.5 text-sm text-stone-700 outline-none file:text-stone-700 file:bg-white file:border file:border-stone-200 file:rounded-md file:px-3 file:py-2"
            />
            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-3">
                {imagePreviews.map((src, idx) => (
                  <div key={`${src}-${idx}`} className="h-20 rounded-xl overflow-hidden border border-stone-200 bg-stone-100">
                    <img src={src} alt={`Preview ${idx + 1}`} className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
            )}
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
              {productToEdit ? "Save Changes" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductAddForm;
