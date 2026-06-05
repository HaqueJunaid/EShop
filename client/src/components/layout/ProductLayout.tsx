import React, { useEffect, useMemo, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import ProductFilter from '../products/ProductFilter.tsx'
import SortBy from '../common/SortBy.tsx' 
import LayoutChanger, { type LayoutMode } from '../common/LayoutChanger.tsx'
import ProductGrid from '../products/ProductGrid.tsx'
import ProductCard from '../products/ProductCard.tsx'

const ProductLayout: React.FC = () => {
  useEffect(() => {
    document.title = "VivahStore | Products";
  }, []);

  const { id } = useParams()
  const [searchParams] = useSearchParams();
  const [sort, setSort] = useState(searchParams.get('sort') || 'featured')
  const [layout, setLayout] = useState<LayoutMode>('grid-3')

  useEffect(() => {
    setSort(searchParams.get('sort') || 'default');
  }, [searchParams]);

  const productObject = [
    {
      title: "Ritual Cards | Fan Shape with Wooden Handle",
      price: 6500,
      imageUrl: "https://picsum.photos/600/500",
      inStock: true,
      date: "2024-07-21T10:00:00Z"
    },
    {
      title: "Mini Suitcase",
      price: 1100,
      imageUrl: "https://picsum.photos/600/550",
      inStock: false,
      date: "2024-07-20T11:00:00Z"
    },
    {
      title: "Quirky Indian Custom Wedding Badge - Ladkiwale",
      price: 1825,
      imageUrl: "https://picsum.photos/600/550",
      inStock: true,
      date: "2024-07-19T12:00:00Z"
    },
    {
      title: "Wedding Badge",
      price: 2500,
      imageUrl: "https://picsum.photos/600/600",
      inStock: true,
      date: "2024-07-18T13:00:00Z"
    },
    {
      title: "Wedding Card",
      price: 2000,
      imageUrl: "https://picsum.photos/700/500",
      inStock: true,
      date: "2024-07-17T14:00:00Z"
    },
    {
      title: "Decors",
      price: 1000,
      imageUrl: "https://picsum.photos/500/700",
      inStock: true,
      date: "2024-07-16T15:00:00Z"
    },
    {
      title: "Greeting Card",
      price: 3000,
      imageUrl: "https://picsum.photos/800/500",
      inStock: false,
      date: "2024-07-15T16:00:00Z"
    },
    {
      title: "Name Patch",
      price: 1500,
      imageUrl: "https://picsum.photos/500/800",
      inStock: true,
      date: "2024-07-14T17:00:00Z"
    },
    {
      title: "Ritual Cards | Fan Shape with Wooden Handle",
      price: 4500,
      imageUrl: "https://picsum.photos/600/500",
      inStock: true,
      date: "2024-07-13T18:00:00Z"
    },
    {
      title: "Mini Suitcase",
      price: 1200,
      imageUrl: "https://picsum.photos/600/600",
      inStock: true,
      date: "2024-07-12T19:00:00Z"
    },
  ]

  const filteredProducts = useMemo(() => {
    let products = [...productObject];
    const priceLte = searchParams.get('price_lte');
    const inStock = searchParams.get('inStock');

    if (priceLte) {
      products = products.filter(p => p.price <= Number(priceLte));
    }

    if (inStock === 'true') {
      products = products.filter(p => p.inStock);
    }

    if (sort) {
      switch (sort) {
        case 'default':
          break;
        case 'best-selling':
          break;
        case 'alpha-asc':
          products.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'alpha-desc':
          products.sort((a, b) => b.title.localeCompare(a.title));
          break;
        case 'price-asc':
          products.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          products.sort((a, b) => b.price - a.price);
          break;
        case 'date-asc':
          products.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
          break;
        case 'date-desc':
          products.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          break;
      }

    }

    return products;
  }, [searchParams, sort]);

  return (
    <div className='relative bg-stone-50 mx-auto px-4 lg:px-1.5 py-2 lg:py-1.5 border-stone-200 border-b w-full'>
      <div className='relative flex lg:flex-row flex-col gap-7 mx-auto w-full lg:w-2/3 h-fit'>
        <ProductFilter />
        <div className='bg-stone-50 px-2 py-5 w-full text-stone-800'>
          <div className='flex md:flex-row flex-col md:justify-between items-start gap-4'>
            <h2 className='font-semibold text-3xl capitalize'>

              {id?.replace("-", " ")}
              
            </h2>
            <div className='md:hidden inline'><SortBy sort={sort} setSort={setSort} /></div>
          </div>
          <div className='hidden md:flex md:flex-row flex-col md:justify-between md:items-center gap-3 mt-4'>
            <SortBy sort={sort} setSort={setSort} />

            <div className='flex justify-between items-center gap-4'>
              <LayoutChanger layout={layout} setLayout={setLayout} />
            </div>
          </div>
          <ProductGrid layout={layout}>
            {filteredProducts.map((product, idx) => (
              <ProductCard
                id={idx?.toString() || ""}
                key={idx}
                layout={layout}
                title={product.title}
                price={product.price}
                imageUrl={product.imageUrl}
                inStock={product.inStock}
              />
            ))}
          </ProductGrid>
        </div>
      </div>
    </div>
  )
}

export default ProductLayout