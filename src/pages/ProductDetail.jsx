import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSiteData } from '../context/SiteContext';
import Banner from '../components/Banner';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const { products, landingPage } = useSiteData();
    const product = products.find(p => p.id === parseInt(id));

    if (!product) {
        return <div className="container" style={{ padding: '100px 20px', textAlign: 'center' }}>
            <h2>Produk tidak ditemukan</h2>
            <Link to="/products" className="nav-btn" style={{ marginTop: '20px', display: 'inline-block', textDecoration: 'none' }}>Kembali ke Produk</Link>
        </div>;
    }

    // Carousel Logic
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [itemsPerPage, setItemsPerPage] = useState(4);

    const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 8);
    const maxIndex = Math.max(0, relatedProducts.length - itemsPerPage);

    // Responsive Carousel Items
    React.useEffect(() => {
        const updateItemsPerPage = () => {
            if (window.innerWidth <= 768) setItemsPerPage(1);
            else if (window.innerWidth <= 900) setItemsPerPage(2);
            else setItemsPerPage(4);
        };
        updateItemsPerPage();
        window.addEventListener('resize', updateItemsPerPage);
        return () => window.removeEventListener('resize', updateItemsPerPage);
    }, []);

    // Auto-play effect
    React.useEffect(() => {
        let interval;
        if (isAutoPlaying) {
            interval = setInterval(() => {
                handleNext();
            }, 3000); // Change every 3 seconds
        }
        return () => clearInterval(interval);
    }, [isAutoPlaying, currentIndex, maxIndex, itemsPerPage]);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    };

    const handleWhatsAppClick = () => {
        const message = `Assalamualaikum, saya ingin memesan ${product.name}`;
        const encodedMessage = encodeURIComponent(message);
        const phoneNumber = landingPage.contact.whatsapp1;
        window.open(`https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`, '_blank');
    };

    return (
        <div className="product-detail-page">
            <Banner />
            <div className="container" onMouseEnter={() => setIsAutoPlaying(false)} onMouseLeave={() => setIsAutoPlaying(true)}>
                {/* Breadcrumb styled header */}
                <div className="breadcrumb">
                    KATEGORI PRODUK \ {product.category.toUpperCase()} \ {product.name.toUpperCase()}
                </div>

                <div className="detail-card">
                    <div className="detail-image">
                        <img src={product.image} alt={product.name} />
                    </div>
                    <div className="detail-info">
                        <h1>{product.name}</h1>
                        <div className="detail-price">Rp {product.price.toLocaleString('id-ID')}</div>
                        <p className="detail-description">{product.description}</p>

                        <div className="detail-benefits">
                            <h4>Benefit Produk</h4>
                            <ol>
                                {product.benefits && product.benefits.map((benefit, index) => (
                                    <li key={index}>{benefit}</li>
                                ))}
                            </ol>
                        </div>

                        <button className="whatsapp-button" onClick={handleWhatsAppClick}>
                            Beli Sekarang
                        </button>
                    </div>
                </div>

                <div className="related-products">
                    <div className="related-header">
                        <h3>Produk Pilihan Lainnya</h3>
                        <div className="carousel-nav">
                            <button onClick={handlePrev} className="nav-btn">Prev</button>
                            <button onClick={handleNext} className="nav-btn">Next</button>
                        </div>
                    </div>

                    <div className="carousel-viewport">
                        <div
                            className="carousel-track"
                            style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
                        >
                            {relatedProducts.map(p => (
                                <div key={p.id} className="carousel-slide">
                                    <Link to={`/product/${p.id}`} className="related-item">
                                        <img src={p.image} alt={p.name} />
                                        <div className="related-name">{p.name}</div>
                                        <div className="related-price">Rp {p.price.toLocaleString('id-ID')}</div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductDetail;
