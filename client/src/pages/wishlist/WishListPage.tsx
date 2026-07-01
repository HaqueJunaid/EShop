import { Link } from 'react-router-dom'
import AddToCartButton from '../../components/cart/AddToCartButton'
import { useWishlistStore } from '../../store/wishlistStore'
import { HeartIcon } from 'lucide-react'
import { useEffect } from 'react'

const WishListPage = () => {
  useEffect(() => {
    document.title = "VivahStore | Wishlist";
  }, []);

  const wishlistItems = useWishlistStore((state) => state.wishlistItems)
  const removeWishlistItem = useWishlistStore((state) => state.removeWishlistItem)
  const clearWishlist = useWishlistStore((state) => state.clearWishlist)
  const parsePrice = (v: any) => {
    if (typeof v === 'number') return v
    const n = Number(String(v).replace(/[^0-9.-]/g, ''))
    return Number.isFinite(n) ? n : 0
  }
  const formatPrice = (v: any) => {
    const n = parsePrice(v)
    return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }
  const wishlistValue = wishlistItems.reduce((sum, item) => sum + parsePrice(item.productPrice), 0)

  return (
    <div className="bg-stone-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-[#E41F66]/10 p-3 text-[#E41F66]">
              <HeartIcon className="size-5" />
            </div>
            <div>
              <h1 className="font-bold text-stone-900 text-3xl">My Wishlist</h1>
              <p className="mt-2 text-sm text-stone-500">You have {wishlistItems.length} item{wishlistItems.length === 1 ? '' : 's'} saved for later.</p>
              {wishlistItems.length > 0 && (
                <p className="text-sm text-stone-500 mt-2">Estimated wishlist value: <span className="font-semibold text-stone-900">₹{wishlistValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></p>
              )}
            </div>
          </div>

          {wishlistItems.length > 0 && (
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <button
                type="button"
                onClick={clearWishlist}
                className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-medium text-stone-700 hover:border-stone-900 hover:text-stone-900 transition"
              >
                Clear wishlist
              </button>
            </div>
          )}
        </div>

        {wishlistItems.length === 0 ? (
          <div className="p-10 border border-stone-200 rounded-lg bg-white text-center">
            <p className="text-stone-500">Your wishlist is empty. Add products from the catalog to save them here.</p>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {wishlistItems.map((item) => (
              <div key={item.productId} className="group overflow-hidden rounded-[28px] border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="relative overflow-hidden bg-stone-100">
                  <img src={item.productImage} alt={item.productName} className="w-full h-72 object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute top-4 right-4 rounded-full bg-white/90 px-3 py-2 text-xs font-semibold text-stone-700">Wishlist</div>
                </div>

                <div className="p-6 flex flex-col gap-4">
                  <div>
                    <p className="text-xl font-semibold text-stone-900 mb-2 line-clamp-2">{item.productName}</p>
                    <p className="text-sm text-stone-500">Product ID: #{item.productId}</p>
                  </div>

                  <div className="rounded-3xl bg-stone-50 p-4 text-sm text-stone-700">
                    <div className="flex justify-between gap-4">
                      <span className="font-medium">Price</span>
                      <span className="font-semibold text-stone-900">₹{formatPrice(item.productPrice)}</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs text-stone-500">
                      <span className="rounded-full bg-white px-3 py-1 border border-stone-200">Saved item</span>
                      <span className="rounded-full bg-white px-3 py-1 border border-stone-200">Fast checkout</span>
                    </div>
                  </div>

                  <div className="grid gap-3">
                    <AddToCartButton
                      product={{
                        id: item.productId,
                        title: item.productName,
                        price: String(parsePrice(item.productPrice)),
                        imageUrl: item.productImage,
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => removeWishlistItem(item.productId)}
                      className="w-full rounded-full border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700 hover:bg-rose-100 transition"
                    >
                      Remove from wishlist
                    </button>
                    <Link
                      to={`/products/${item.productId}/details`}
                      className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-4 py-3 text-sm font-medium text-stone-700 hover:border-stone-900 hover:text-stone-900 transition"
                    >
                      View product details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default WishListPage