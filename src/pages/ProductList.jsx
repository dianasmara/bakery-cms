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
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
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
    }, [selectedCategory, sortOrder, priceRange, searchQuery]);

    return (
        <div className="product-list-page">
            <div className="container">
                <div className="filter-sidebar">
                    <div className="filter-group">
                        <h3 className="filter-label">Filter & Urutkan</h3>

                        {/* Category Dropdown */}
                        <div className="filter-item">
                            <label>Kategori</label>
                            <div className="custom-dropdown">
                                <button
                                    className="dropdown-trigger"
                                    onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                                >
                                    {selectedCategory}
                                    <span className={`arrow ${showCategoryDropdown ? 'open' : ''}`}>▼</span>
                                </button>
                                {showCategoryDropdown && (
                                    <ul className="dropdown-menu">
                                        {categories.map(cat => (
                                            <li
                                                key={cat}
                                                className={selectedCategory === cat ? 'active' : ''}
                                                onClick={() => {
                                                    setSelectedCategory(cat);
                                                    setShowCategoryDropdown(false);
                                                }}
                                            >
                                                {cat}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>

                        {/* Sorting Dropdown */}
                        <div className="filter-item">
                            <label>Urutkan Harga</label>
                            <select
                                className="filter-select"
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}
                            >
                                <option value="default">Terbaru</option>
                                <option value="low-to-high">Harga: Rendah ke Tinggi</option>
                                <option value="high-to-low">Harga: Tinggi ke Rendah</option>
                            </select>
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
                            className="reset-filter-btn"
                            onClick={() => {
                                setSelectedCategory("Semua");
                                setSortOrder("default");
                                setPriceRange(maxPriceInData);
                                setSearchQuery("");
                            }}
                        >
                            Reset Filter
                        </button>
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
