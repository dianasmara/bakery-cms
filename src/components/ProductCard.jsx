import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
            <Link to={`/product/${product.id}`} className="product-image-link">
                <div className="product-image-wrapper">
                    <img src={product.image} alt={product.name} className="product-image" />
                    <div className="hover-overlay">
                        <span>Lihat Detail Produk</span>
                    </div>
                </div>
            </Link>
            <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">Rp {product.price.toLocaleString('id-ID')}</p>
            </div>
        </div>
    );
};

export default ProductCard;
