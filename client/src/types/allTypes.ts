import React from 'react';

export interface CartItem {
    id: number;
    name: string;
    code: string;
    price: number;
    quantity: number;
    image: string;
    description?: string;
}

export interface OrderSummaryProps {
    subtotal: number
}

export interface CartItemProps {
    cartItems: CartItem[];
    updateQuantity: (id: number, change: number) => void;
    removeItem: (id: number) => void;
}

export interface ProductContentProps {
    id: string;
    title: string;
    price: string;
    inStock: boolean;
    canUploadImage?: boolean;
    variants?: {
        name: string;
        images: string[];
        inStock: boolean;
    }[];
    customizable?: {
        logo?: boolean;
        coupleName?: boolean;
        whatsapp?: boolean;
        customizationDetails?: boolean;
        goldfoil?: boolean;
        additionalMessage?: boolean;
    };
    handleVariantChange: (index: number) => void
}

export interface AddAddressFormProps {
    addresses: { firstName: string; lastName: string; company: string; country: string; address: string; apartment: string; city: string; postalCode: string; phone: string; }[];
    cancel: React.Dispatch<React.SetStateAction<boolean>>
    setAddress: React.Dispatch<React.SetStateAction<{ firstName: string; lastName: string; company: string; country: string; address: string; apartment: string; city: string; postalCode: string; phone: string; }[]>>
}

export interface AddressPreviewProps {
    firstName: string
    lastName: string
    company: string
    country: string
    address: string
    apartment: string
    city: string
    postalCode: string
    phone: string
    onDelete: () => void
}

export type HeadBarProps = {
  onMenuClick?: () => void
  onSearchClick?: () => void
}