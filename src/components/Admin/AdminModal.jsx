import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSiteData } from '../../context/SiteContext';
import './AdminModal.css';

const AdminModal = () => {
    const { settings, products, categories, landingPage, updateSettings, updateProducts, updateCategories, updateLandingPage } = useSiteData();
    const [isOpen, setIsOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [pin, setPin] = useState('');
    const [activeTab, setActiveTab] = useState('landing');
    const [error, setError] = useState('');
    const [landingFormData, setLandingFormData] = useState(landingPage);
    const [settingsFormData, setSettingsFormData] = useState(settings);

    const CORRECT_PIN = '1234511';

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.shiftKey && e.code === 'Space') {
                e.preventDefault();
                setIsOpen(true);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        setLandingFormData(landingPage);
        setSettingsFormData(settings);
    }, [landingPage, settings]);

    const handlePinSubmit = (e) => {
        e.preventDefault();
        if (pin === CORRECT_PIN) {
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('PIN Salah!');
            setPin('');
        }
    };

    const handleClose = () => {
        setIsOpen(false);
        setIsAuthenticated(false);
        setPin('');
        setError('');
    };

    const handleLandingSave = () => {
        updateLandingPage(landingFormData);
        updateSettings(settingsFormData);
        alert('Data Situs diperbarui!');
    };

    if (!isOpen) return null;

    return (
        <div className="admin-modal-overlay">
            <div className="admin-modal-content">
                <button className="close-modal-btn" onClick={handleClose}>&times;</button>

                {!isAuthenticated ? (
                    <div className="pin-gate">
                        <h2>Admin Access</h2>
                        <p>Masukkan PIN untuk melanjutkan</p>
                        <form onSubmit={handlePinSubmit}>
                            <input
                                type="password"
                                value={pin}
                                onChange={(e) => setPin(e.target.value)}
                                placeholder="****"
                                autoFocus
                            />
                            {error && <p className="error-msg">{error}</p>}
                            <button type="submit">Unlock System</button>
                        </form>
                    </div>
                ) : (
                    <div className="admin-dashboard">
                        <div className="admin-sidebar">
                            <div className="sidebar-header">
                                <h3>OLEVYA ADMIN</h3>
                            </div>
                            <div className="sidebar-nav">
                                <button className={activeTab === 'landing' ? 'active' : ''} onClick={() => setActiveTab('landing')}>Landing Page</button>
                                <button className={activeTab === 'products' ? 'active' : ''} onClick={() => setActiveTab('products')}>Daftar Produk</button>
                                <button className={activeTab === 'categories' ? 'active' : ''} onClick={() => setActiveTab('categories')}>Kategori</button>
                            </div>
                            <div className="sidebar-footer">
                                {activeTab === 'landing' && (
                                    <button className="save-btn sidebar-save" onClick={handleLandingSave}>Simpan Perubahan</button>
                                )}
                            </div>
                        </div>
                        <div className="admin-main">
                            {activeTab === 'landing' && (
                                <LandingEditor
                                    formData={landingFormData}
                                    setFormData={setLandingFormData}
                                    siteSettings={settingsFormData}
                                    setSiteSettings={setSettingsFormData}
                                />
                            )}
                            {activeTab === 'products' && (
                                <ProductEditor items={products} cats={categories} update={updateProducts} />
                            )}
                            {activeTab === 'categories' && (
                                <CategoryEditor items={categories} update={updateCategories} />
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const LandingEditor = ({ formData, setFormData, siteSettings, setSiteSettings }) => {
    const handleChange = (section, field, value) => {
        const newData = { ...formData };
        if (section === 'hero') newData.hero[field] = value;
        if (section === 'contact') newData.contact[field] = value;
        setFormData(newData);
    };

    const handleSectionChange = (sectionId, field, value) => {
        const newData = { ...formData };
        newData.sections = newData.sections.map(s =>
            s.id === sectionId ? { ...s, [field]: value } : s
        );
        setFormData(newData);
    };

    const handleFeatureItemChange = (sectionId, itemId, field, value) => {
        const newData = { ...formData };
        newData.sections = newData.sections.map(s => {
            if (s.id === sectionId && s.type === 'features') {
                return {
                    ...s,
                    items: s.items.map(item => item.id === itemId ? { ...item, [field]: value } : item)
                };
            }
            return s;
        });
        setFormData(newData);
    };

    return (
        <div className="editor-container">
            <h3>Edit Konten & Pengaturan</h3>

            <div className="edit-section">
                <h4>Site Settings</h4>
                <label>Nama Outlet</label>
                <input
                    value={siteSettings.outletName}
                    onChange={(e) => setSiteSettings({ ...siteSettings, outletName: e.target.value })}
                />
            </div>

            <div className="edit-section">
                <h4>Hero Section</h4>
                <label>Judul Hero</label>
                <input value={formData.hero.title} onChange={(e) => handleChange('hero', 'title', e.target.value)} />
                <label>Sub-judul</label>
                <textarea value={formData.hero.subtitle} onChange={(e) => handleChange('hero', 'subtitle', e.target.value)} />
                <label>Gambar Hero (URL)</label>
                <input value={formData.hero.image} onChange={(e) => handleChange('hero', 'image', e.target.value)} />
                <label>Ukuran Gambar Latar (Background Size)</label>
                <select
                    value={formData.hero.bgSize || 'cover'}
                    onChange={(e) => handleChange('hero', 'bgSize', e.target.value)}
                >
                    <option value="auto">auto</option>
                    <option value="contain">contain</option>
                    <option value="cover">cover</option>
                    <option value="inherit">inherit</option>
                    <option value="initial">initial</option>
                    <option value="revert">revert</option>
                    <option value="revert-layer">revert-layer</option>
                    <option value="unset">unset</option>
                </select>
                <label>Warna Latar (Background Color)</label>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '15px' }}>
                    <input
                        type="color"
                        value={formData.hero.bgColor || '#ffb35c'}
                        onChange={(e) => handleChange('hero', 'bgColor', e.target.value)}
                        style={{ width: '50px', height: '50px', padding: '0', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                    />
                    <input
                        type="text"
                        value={formData.hero.bgColor || '#ffb35c'}
                        onChange={(e) => handleChange('hero', 'bgColor', e.target.value)}
                        style={{ marginBottom: '0', flex: 1 }}
                    />
                </div>
                {formData.hero.image && (
                    <div
                        className="editor-preview-box"
                        style={{
                            backgroundImage: `url(${formData.hero.image})`,
                            backgroundSize: formData.hero.bgSize || 'cover',
                            backgroundColor: formData.hero.bgColor || '#ffb35c',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }}
                    >
                        <div className="hero-overlay"></div>
                        <div className="preview-label">Live Preview</div>
                    </div>
                )}
            </div>

            {formData.sections?.map(section => (
                <div key={section.id} className="edit-section">
                    <h4>Section: {section.type.toUpperCase()}</h4>
                    <label>Judul Section</label>
                    <input value={section.title} onChange={(e) => handleSectionChange(section.id, 'title', e.target.value)} />

                    {section.type === 'features' && (
                        <div className="feature-items-editor">
                            <h5>Item Features</h5>
                            {section.items.map(item => (
                                <div key={item.id} className="feature-item-edit-box">
                                    <label>Judul Item</label>
                                    <input value={item.title} onChange={(e) => handleFeatureItemChange(section.id, item.id, 'title', e.target.value)} />
                                    <label>Deskripsi</label>
                                    <textarea value={item.description} onChange={(e) => handleFeatureItemChange(section.id, item.id, 'description', e.target.value)} />
                                    <label>Gambar Item (URL)</label>
                                    <input value={item.image} onChange={(e) => handleFeatureItemChange(section.id, item.id, 'image', e.target.value)} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}

            <div className="edit-section">
                <h4>Contact Info</h4>
                <label>WhatsApp 1</label>
                <input value={formData.contact.whatsapp1} onChange={(e) => handleChange('contact', 'whatsapp1', e.target.value)} />
                <label>Alamat Lengkap (Muncul di Maps Card)</label>
                <input value={formData.contact.address} onChange={(e) => handleChange('contact', 'address', e.target.value)} />
                <label>Link Google Maps (URL)</label>
                <input value={formData.contact.mapsUrl} onChange={(e) => handleChange('contact', 'mapsUrl', e.target.value)} />
                <label>Email</label>
                <input value={formData.contact.email} onChange={(e) => handleChange('contact', 'email', e.target.value)} />
                <label>Instagram</label>
                <input value={formData.contact.instagram} onChange={(e) => handleChange('contact', 'instagram', e.target.value)} />
            </div>
        </div>
    );
};

const ProductEditor = ({ items, cats, update }) => {
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState(null);

    const handleAdd = () => {
        const newProduct = {
            id: Date.now(),
            name: "Nama Produk",
            price: 5000,
            category: cats[0],
            image: "https://picsum.photos/400/300",
            description: "Deskripsi produk...",
            benefits: ["Benefit 1"]
        };
        update([...items, newProduct]);
    };

    const handleDelete = (id) => {
        if (confirm('Hapus produk ini?')) {
            update(items.filter(p => p.id !== id));
        }
    };

    const startEdit = (product) => {
        setEditingId(product.id);
        setEditForm({ ...product });
    };

    const handleEditChange = (field, value) => {
        setEditForm({ ...editForm, [field]: value });
    };

    const saveEdit = () => {
        update(items.map(p => p.id === editingId ? editForm : p));
        setEditingId(null);
        setEditForm(null);
    };

    return (
        <div className="editor-container">
            <div className="header-with-action">
                <h3>Kelola Produk</h3>
                <button className="add-btn" onClick={handleAdd}>+ Tambah Produk</button>
            </div>

            {editingId && (
                <div className="edit-overlay" onClick={() => setEditingId(null)}>
                    <div className="edit-product-form" onClick={e => e.stopPropagation()}>
                        <h4>Edit: {editForm.name}</h4>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Nama Produk</label>
                                <input value={editForm.name} onChange={e => handleEditChange('name', e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Harga (Rp)</label>
                                <input type="number" value={editForm.price} onChange={e => handleEditChange('price', parseInt(e.target.value))} />
                            </div>
                            <div className="form-group">
                                <label>Kategori</label>
                                <select value={editForm.category} onChange={e => handleEditChange('category', e.target.value)}>
                                    {cats.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Gambar (URL)</label>
                                <input value={editForm.image} onChange={e => handleEditChange('image', e.target.value)} />
                            </div>
                        </div>
                        <label>Deskripsi</label>
                        <textarea value={editForm.description} onChange={e => handleEditChange('description', e.target.value)} rows="3" />
                        <div className="form-actions">
                            <button className="cancel-btn" onClick={() => setEditingId(null)}>Batal</button>
                            <button className="save-btn" onClick={saveEdit}>Simpan</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="product-table-wrapper">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Preview</th>
                            <th>Nama</th>
                            <th>Harga</th>
                            <th>Kategori</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(p => (
                            <tr key={p.id}>
                                <td><img src={p.image} alt="" style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }} /></td>
                                <td>{p.name}</td>
                                <td>Rp {p.price.toLocaleString()}</td>
                                <td>{p.category}</td>
                                <td>
                                    <button className="edit-btn-inline" onClick={() => startEdit(p)}>Edit</button>
                                    <button className="delete-btn" onClick={() => handleDelete(p.id)}>Hapus</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const CategoryEditor = ({ items, update }) => {
    const [newCat, setNewCat] = useState('');

    const handleAdd = () => {
        if (newCat && !items.includes(newCat)) {
            update([...items, newCat]);
            setNewCat('');
        }
    };

    const handleDelete = (cat) => {
        if (items.length <= 1) return alert('Harus ada minimal satu kategori!');
        update(items.filter(i => i !== cat));
    };

    return (
        <div className="editor-container">
            <h3>Kelola Kategori</h3>
            <div className="add-cat-form">
                <input value={newCat} onChange={(e) => setNewCat(e.target.value)} placeholder="Nama Kategori Baru" />
                <button onClick={handleAdd}>Tambah</button>
            </div>
            <ul className="admin-list">
                {items.map(cat => (
                    <li key={cat}>
                        {cat}
                        <button onClick={() => handleDelete(cat)}>&times;</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminModal;
