import React, { createContext, useContext, useState, useEffect } from 'react';
import { products as initialProducts, categories as initialCategories } from '../data/products';

const SiteContext = createContext();

export const useSiteData = () => useContext(SiteContext);

export const SiteProvider = ({ children }) => {
    // Initial Site Settings
    const initialSettings = {
        outletName: "OLEVYA BAKERY",
        logo: "" // Future use
    };

    // Initial Landing Page Data
    const initialLandingPage = {
        hero: {
            title: "Nikmati Kelembutan di Setiap Gigitan",
            subtitle: "OLEVYA BAKERY menghadirkan roti dan kue berkualitas dengan cita rasa istimewa untuk momen spesial Anda.",
            ctaText: "Belanja Sekarang",
            image: "https://image2url.com/r2/default/images/1771268190173-c2f95791-8992-41de-80b9-7d1097282b2c.png",
            bgSize: "contain",
            bgColor: "#e1a166"
        },
        sections: [
            {
                id: 1,
                type: 'features',
                title: "Keunggulan Kami",
                items: [
                    {
                        id: 101,
                        image: "https://picsum.photos/id/1080/400/300",
                        title: "Bahan Berkualitas",
                        description: "Dibuat dari bahan-bahan pilihan terbaik untuk menjaga kualitas rasa."
                    },
                    {
                        id: 102,
                        image: "https://picsum.photos/id/292/400/300",
                        title: "Dibuat dengan Cinta",
                        description: "Setiap produk diolah dengan sepenuh hati oleh baker berpengalaman kami."
                    },
                    {
                        id: 103,
                        image: "https://picsum.photos/id/429/400/300",
                        title: "Halal & Higienis",
                        description: "Terjamin kehalalan dan kebersihannya untuk ketenangan Anda."
                    }
                ]
            }
        ],
        contact: {
            title: "Mari Terhubung",
            subtitle: "Kami selalu terbuka untuk diskusi pesanan baru, ide kreatif, atau sekadar menyapa OlevyaLovers.",
            whatsapp1: "6281252562727",
            address: "Jl. Raya Bakery No. 123, Indonesia",
            mapsUrl: "https://maps.google.com",
            email: "info@olevyabakery.com",
            instagram: "@olevyabakery"
        }
    };

    const [settings, setSettings] = useState(() => {
        const saved = localStorage.getItem('olevya_settings');
        return saved ? JSON.parse(saved) : initialSettings;
    });

    const [products, setProducts] = useState(() => {
        const saved = localStorage.getItem('olevya_products');
        return saved ? JSON.parse(saved) : initialProducts;
    });

    const [categories, setCategories] = useState(() => {
        const saved = localStorage.getItem('olevya_categories');
        return saved ? JSON.parse(saved) : initialCategories;
    });

    const [landingPage, setLandingPage] = useState(() => {
        const saved = localStorage.getItem('olevya_landing');
        if (!saved) return initialLandingPage;

        try {
            const parsed = JSON.parse(saved);

            // Migration: Transform old 'features' array into the new 'sections' format
            if (!parsed.sections && parsed.features) {
                parsed.sections = [
                    {
                        id: 1,
                        type: 'features',
                        title: "Keunggulan Kami",
                        items: parsed.features.map((f, i) => ({
                            ...f,
                            id: f.id || (100 + i) // Ensure ID exists
                        }))
                    }
                ];
                delete parsed.features;
            }

            // Ensure all new fields exist by merging with default
            return {
                ...initialLandingPage,
                ...parsed,
                hero: { ...initialLandingPage.hero, ...parsed.hero },
                contact: { ...initialLandingPage.contact, ...parsed.contact },
                sections: parsed.sections || initialLandingPage.sections
            };
        } catch (e) {
            console.error("Failed to parse landing data, resetting to default", e);
            return initialLandingPage;
        }
    });

    // Persistence
    useEffect(() => {
        localStorage.setItem('olevya_settings', JSON.stringify(settings));
    }, [settings]);

    useEffect(() => {
        localStorage.setItem('olevya_products', JSON.stringify(products));
    }, [products]);

    useEffect(() => {
        localStorage.setItem('olevya_categories', JSON.stringify(categories));
    }, [categories]);

    useEffect(() => {
        localStorage.setItem('olevya_landing', JSON.stringify(landingPage));
    }, [landingPage]);

    const updateSettings = (newSettings) => setSettings(newSettings);
    const updateProducts = (newProducts) => setProducts(newProducts);
    const updateCategories = (newCategories) => setCategories(newCategories);
    const updateLandingPage = (newData) => setLandingPage(newData);

    return (
        <SiteContext.Provider value={{
            settings,
            products,
            categories,
            landingPage,
            updateSettings,
            updateProducts,
            updateCategories,
            updateLandingPage
        }}>
            {children}
        </SiteContext.Provider>
    );
};
