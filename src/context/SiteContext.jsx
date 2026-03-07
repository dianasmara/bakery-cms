import React, { useState, useEffect } from 'react';
import { SiteContext } from './SiteContextStore';
import { products as initialProducts, categories as initialCategories } from '../data/products';

// Feature Images Imports
import coverHajatan from '../assets/FOTO KUE/ROTI HAJATAN/coverHajatan.jpg';
import RotiHajatan1 from '../assets/FOTO KUE/ROTI HAJATAN/rotiHajatan1.jpg';
import RotiHajatan2 from '../assets/FOTO KUE/ROTI HAJATAN/rotiHajatan2.jpg';
import RotiHajatan3 from '../assets/FOTO KUE/ROTI HAJATAN/rotiHajatan3.png';
import RotiHajatan4 from '../assets/FOTO KUE/ROTI HAJATAN/rotiHajatan4.webp';

import BirthdayCake1 from '../assets/FOTO KUE/TART/BirthdayCake1.jpg';
import BirthdayCake2 from '../assets/FOTO KUE/TART/BirthdayCake2.jpg';
import BirthdayCake3 from '../assets/FOTO KUE/TART/BirthdayCake3.png';
import BirthdayCake6 from '../assets/FOTO KUE/TART/BirthdayCake6.png';
import BirthdayCake7 from '../assets/FOTO KUE/TART/BirthdayCake7.png';
import BirthdayCake8 from '../assets/FOTO KUE/TART/BirthdayCake8.png';

import PaketNampan1 from '../assets/FOTO KUE/PAKET NAMPAN/PaketNampan1.png';
import PaketNampan2 from '../assets/FOTO KUE/PAKET NAMPAN/PaketNampan2.png';
import PaketNampan3 from '../assets/FOTO KUE/PAKET NAMPAN/PaketNampan3.png';
import PaketNampan4 from '../assets/FOTO KUE/PAKET NAMPAN/PaketNampan4.png';

// Banner Images
import banner1 from '../assets/FOTO KUE/BANNER/banner.jpeg';

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
            subtitle: "OLEVYA BAKERY menghadirkan roti dan kue berkualitas dengan cita rasa istimewa untuk momen spesial Anda, dari tart Birthday cakes hingga Aneka Roti Premium lainnya. Menggunakan bahan-bahan terbaik. Rasakan perbedaan kualitasnya.",
            ctaText: "Belanja Sekarang",
            image: "https://image2url.com/r2/default/images/1771268190173-c2f95791-8992-41de-80b9-7d1097282b2c.png",
            images: [
                "https://image2url.com/r2/default/images/1771268190173-c2f95791-8992-41de-80b9-7d1097282b2c.png",
                // "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=1920",
                "https://image2url.com/r2/default/images/1772323245151-3904530f-d456-4eec-acf2-fb0543fa02cb.png",
                "https://image2url.com/r2/default/images/1772352407717-18ce8860-ae27-4aba-b1f2-97b93a4afe17.blob",
                "https://image2url.com/r2/default/images/1772324534043-12fe5ab3-e247-4143-8c6b-4b703e33bcc5.blob"
            ],
            bgSize: "contain",
            bgColor: "#ff8000ff"
        },
        sections: [
            {
                id: 0,
                type: 'banner-slider',
                images: [
                    banner1
                ]
            },
            // {
            //     id: 'design-box',
            //     type: 'design-box',
            //     title: "Spesial Desain Box",
            //     subtitle: "Tersedia 3 pilihan desain terbaru, yang bisa membuat bingkisan acara Olevya makin eksklusif. S&K berlaku",
            //     images: [
            //         BirthdayCake6,
            //         BirthdayCake7,
            //         BirthdayCake8
            //     ]
            // },
            {
                id: 1,
                type: 'features',
                title: "Rayakan Momen Spesial Anda Bersama Kami",
                items: [
                    {
                        id: 101,
                        images: [
                            coverHajatan,
                            RotiHajatan1,
                            RotiHajatan2,
                            RotiHajatan3,
                            RotiHajatan4
                        ],
                        title: "Pernikahan & Hajatan",
                        description: "Moment spesial tak pernah lepas dari hidangan spesial. Jadikan momen bahagia anda semakin berkesan dengan dengan hidangan Roti special dari kami"
                    },
                    {
                        id: 102,
                        images: [
                            BirthdayCake1,
                            BirthdayCake2,
                            BirthdayCake3,
                            BirthdayCake6,
                            BirthdayCake7,
                            BirthdayCake8

                        ],
                        title: "Ulang Tahun",
                        description: "Rayakan moment istimewa orang tersayang dengan Whipping Tart Spesial dari Olevya Bakery yang terbuat dari base cake spesial dengan cream yang terbuat dari susu sehingga memiliki tekstur yang lembut, serta melayani semua request desain"
                    },
                    {
                        id: 103,
                        images: [
                            PaketNampan1,
                            PaketNampan2,
                            PaketNampan3,
                            PaketNampan4
                        ],
                        title: "Tasyakuran",
                        description: "Sedia berbagai macam paket nampan untuk acara tasyakuran, pengajian, dan momen berkumpul keluarga lainnya dengan berbagai varian kue basah pilihan."
                    }
                ]
            }
        ],
        contact: {
            title: "Let's Connect",
            subtitle: "Kami selalu terbuka untuk diskusi pesanan baru, ide kreatif, atau sekadar menyapa OlevyaLovers.",
            whatsapp1: "6281333198380",
            address: "JL.Lopawon RT 02, RW.10, Kabupaten Malang, Jawa Timur 65164",
            mapsUrl: "https://maps.app.goo.gl/dJjiSYw8G8QgGsuz9",
            // email: "info@olevyabakery.com",
            instagram: "@olevya_bakery"
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
                        title: initialLandingPage.sections[0].title,
                        items: parsed.features.map((f, i) => ({
                            ...f,
                            id: f.id || (100 + i)
                        }))
                    }
                ];
                delete parsed.features;
            }

            // Merge and prioritize initialLandingPage sections to ensure new features (like sliders) appear
            const mergedSections = initialLandingPage.sections.map(initialSection => {
                const savedSection = parsed.sections?.find(s => s.id === initialSection.id);
                if (!savedSection) return initialSection;

                // Banner slider: always use initial (images are imported assets, not serializable)
                if (initialSection.type === 'banner-slider') return initialSection;

                return {
                    ...initialSection,
                    ...savedSection,
                    // If the title is "Keunggulan Kami" (old title), use the new title
                    title: savedSection.title === "Keunggulan Kami" ? initialSection.title : savedSection.title,
                    items: initialSection.items.map(initialItem => {
                        const savedItem = savedSection.items?.find(i => i.id === initialItem.id);
                        if (!savedItem) return initialItem;

                        return {
                            ...initialItem,
                            ...savedItem,
                            // Ensure images is always present and updated if old data only had 'image'
                            images: savedItem.images || (savedItem.image ? [savedItem.image] : initialItem.images),
                            // If description is short (old style), use the new descriptive one
                            description: (savedItem.description && savedItem.description.length < 100 && initialItem.description.length > 100)
                                ? initialItem.description
                                : savedItem.description
                        };
                    })
                };
            });

            return {
                ...initialLandingPage,
                ...parsed,
                hero: { ...initialLandingPage.hero, ...parsed.hero },
                contact: { ...initialLandingPage.contact, ...parsed.contact },
                sections: mergedSections
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
