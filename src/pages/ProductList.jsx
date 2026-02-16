import React, { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import { useSiteData } from '../context/SiteContext';
import './ProductList.css';

const ProductList = () => {
    const { products, categories } = useSiteData();
    // Get the actual min/max prices from data for better range slider
    const maxPriceInData = products.length > 0 ? Math.max(...products.map(p => p.price)) : 0;

    const [selectedCategory, setSelectedCategory] = useState("Semua");
    const [sortOrder, setSortOrder] = useState("default");
    const [priceRange, setPriceRange] = useState(maxPriceInData);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredAndSortedProducts = useMemo(() => {
        let result = [...products];

        // 1. Filter by Search Query
        if (searchQuery) {
            result = result.filter(p =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.category.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // 2. Filter by Category
        if (selectedCategory !== "Semua") {
            result = result.filter(p => p.category === selectedCategory);
        }

        // 3. Filter by Price Range
        result = result.filter(p => p.price <= priceRange);

        // 4. Sort
        if (sortOrder === "low-to-high") {
            result.sort((a, b) => a.price - b.price);
        } else if (sortOrder === "high-to-low") {
            result.sort((a, b) => b.price - a.price);
        }

        return result;
    }, [selectedCategory, sortOrder, priceRange, searchQuery, products]);

    const [showFilters, setShowFilters] = useState(false);

    const resetFilters = () => {
        setSelectedCategory("Semua");
        setSortOrder("default");
        setPriceRange(maxPriceInData);
        setSearchQuery("");
    };

    return (
        <div className="product-list-page">
            {/* Backdrop for mobile filter */}
            <div
                className={`filter-backdrop ${showFilters ? 'show' : ''}`}
                onClick={() => setShowFilters(false)}
            />

            <div className="container">
                <button
                    className="mobile-filter-toggle"
                    onClick={() => setShowFilters(!showFilters)}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
                    Filter & Urutkan
                </button>

                <div className={`filter-sidebar ${showFilters ? 'show' : ''}`}>
                    <div className="filter-drawer-handle"></div>
                    <div className="filter-group">
                        <div className="filter-header-mobile">
                            <h3 className="filter-label">Filter</h3>
                            <button className="reset-link" onClick={resetFilters}>Reset</button>
                        </div>
                        <h3 className="filter-label desktop-only">Filter & Urutkan</h3>

                        {/* Category Select */}
                        <div className="filter-item">
                            <label>Kategori</label>
                            <select
                                className="filter-select"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        {/* Sorting Pills */}
                        <div className="filter-item">
                            <label>Urutkan Harga</label>
                            <div className="filter-pills">
                                <button
                                    className={`pill-btn ${sortOrder === 'default' ? 'active' : ''}`}
                                    onClick={() => setSortOrder('default')}
                                >
                                    Terbaru
                                </button>
                                <button
                                    className={`pill-btn ${sortOrder === 'low-to-high' ? 'active' : ''}`}
                                    onClick={() => setSortOrder('low-to-high')}
                                >
                                    Terendah
                                </button>
                                <button
                                    className={`pill-btn ${sortOrder === 'high-to-low' ? 'active' : ''}`}
                                    onClick={() => setSortOrder('high-to-low')}
                                >
                                    Tertinggi
                                </button>
                            </div>
                        </div>

                        {/* Price Range Filter */}
                        <div className="filter-item">
                            <label>Batas Harga (Max)</label>
                            <div className="price-range-container">
                                <input
                                    type="range"
                                    min="0"
                                    max={maxPriceInData}
                                    step="1000"
                                    value={priceRange}
                                    onChange={(e) => setPriceRange(parseInt(e.target.value))}
                                    className="price-slider"
                                />
                                <div className="price-display">
                                    <span>Rp 0</span>
                                    <span className="current-price">Rp {priceRange.toLocaleString('id-ID')}</span>
                                </div>
                            </div>
                        </div>

                        <button
                            className="reset-filter-btn desktop-only"
                            onClick={resetFilters}
                        >
                            Reset Filter
                        </button>

                        <div className="filter-footer-mobile">
                            <button className="apply-filter-btn" onClick={() => setShowFilters(false)}>
                                Tampilkan Produk ({filteredAndSortedProducts.length})
                            </button>
                        </div>
                    </div>
                </div>

                <div className="main-content">
                    <div className="main-content-header">
                        <div className="results-info">
                            Menampilkan {filteredAndSortedProducts.length} produk
                        </div>
                        <div className="inline-search">
                            <input
                                type="text"
                                placeholder="Cari Produk di OLEVYA..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <span className="search-icon">🔍</span>
                        </div>
                    </div>
                    <div className="product-grid">
                        {filteredAndSortedProducts.length > 0 ? (
                            filteredAndSortedProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        ) : (
                            <div className="no-results">
                                <p>Tidak ada produk yang sesuai dengan pencarian atau filter Anda.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductList;
