import DonatCoklatKacang from '../assets/FOTO KUE/DONAT ORI/Donat-Coklat-Kacang-Dea-Bakery-2023 (1).jpeg';
import DonatMesses from '../assets/FOTO KUE/DONAT ORI/Donat-Messes-Dea-Bakery-2023.jpeg';
import DonatPinkKicir from '../assets/FOTO KUE/DONAT ORI/Donat-Pink-Kicir-Dea-Bakery-2023 (1).jpeg';

import TartChocoMoonlight from '../assets/FOTO KUE/TART/Whipping-Choco-Moonlight-Dea-Bakery-2023.webp';
import TartCreamyDelight from '../assets/FOTO KUE/TART/Whipping-Creamy-Delight-Dea-Bakery-2023.webp';
import TartFlowerStyle from '../assets/FOTO KUE/TART/Whipping-Flower-Style-Dea-Bakery-2023.webp';
import TartMoccaLovely from '../assets/FOTO KUE/TART/Whipping-Mocca-Lovely-Dea-Bakery-2023.webp';
import TartSweetHeart from '../assets/FOTO KUE/TART/Whipping-Sweet-Heart-Dea-Bakery-2023.webp';

import KueBasah1 from '../assets/FOTO KUE/KUE BASAH/013e0c1b-00e1-4eb4-8d8b-0058ec641b94.png';
import KueBasah2 from '../assets/FOTO KUE/KUE BASAH/72bfceff-09e9-4af1-b512-a24992af53aa.png';
import KueBasah3 from '../assets/FOTO KUE/KUE BASAH/a95017d8-7121-436c-a662-91b817be371f.png';
import KueBasah4 from '../assets/FOTO KUE/KUE BASAH/af6c0e85-6860-4aac-8594-4afdde9dc230.png';

// Placeholders for Roti Hajatan (as names are generic)
import RotiHajatan1 from '../assets/FOTO KUE/ROTI HAJATAN/result_0.webp';
import RotiHajatan2 from '../assets/FOTO KUE/ROTI HAJATAN/result_0 (1).webp';

export const products = [
    // --- Donat Ring ---
    {
        id: 101,
        name: "Donat Coklat Kacang",
        price: 5500,
        category: "Donat Ring",
        image: DonatCoklatKacang,
        description: "Donat lembut dengan topping coklat leleh dan taburan kacang gurih.",
        benefits: ["Coklat Premium", "Kacang Pilihan", "Empuk"]
    },
    {
        id: 102,
        name: "Donat Meises",
        price: 5000,
        category: "Donat Ring",
        image: DonatMesses,
        description: "Donat klasik dengan topping meises coklat yang melimpah.",
        benefits: ["Favorit Anak-anak", "Manis Pas"]
    },
    {
        id: 103,
        name: "Donat Strawberry",
        price: 5500,
        category: "Donat Ring",
        image: DonatPinkKicir,
        description: "Donat dengan glaze strawberry manis dan hiasan cantik.",
        benefits: ["Rasa Buah Segar", "Tampilan Menarik"]
    },

    // --- Tart ---
    {
        id: 201,
        name: "Tart Choco Moonlight",
        price: 150000,
        category: "Tart",
        image: TartChocoMoonlight,
        description: "Kue tart coklat mewah dengan lapisan whipping cream lembut.",
        benefits: ["Desain Elegan", "Rasa Coklat Intens"]
    },
    {
        id: 202,
        name: "Tart Creamy Delight",
        price: 145000,
        category: "Tart",
        image: TartCreamyDelight,
        description: "Tart vanilla dengan sentuhan creamy yang memanjakan lidah.",
        benefits: ["Tekstur Ringan", "Manis Lembut"]
    },
    {
        id: 203,
        name: "Tart Flower Style",
        price: 135000,
        category: "Tart",
        image: TartFlowerStyle,
        description: "Tart dengan hiasan bunga cantik, cocok untuk hadiah.",
        benefits: ["Estetik", "Rasa Klasik"]
    },
    {
        id: 204,
        name: "Tart Mocca Lovely",
        price: 140000,
        category: "Tart",
        image: TartMoccaLovely,
        description: "Perpaduan rasa kopi moka dan krim yang sempurna.",
        benefits: ["Aroma Kopi Harum", "Rasa Mewah"]
    },
    {
        id: 205,
        name: "Tart Sweet Heart",
        price: 160000,
        category: "Tart",
        image: TartSweetHeart,
        description: "Tart berbentuk hati untuk orang tersayang.",
        benefits: ["Bentuk Unik", "Rasa Spesial"]
    },

    // --- Kue Basah / Basahan ---
    {
        id: 301,
        name: "Lemper Ayam",
        price: 3500,
        category: "Basahan",
        image: KueBasah1,
        description: "Ketan gurih isi ayam suwir berbumbu.",
        benefits: ["Kenyang", "Gurih"]
    },
    {
        id: 302,
        name: "Pastel",
        price: 3000,
        category: "Basahan",
        image: KueBasah2,
        description: "Pastel renyah dengan isian sayur dan telur.",
        benefits: ["Renya", "Isian Padat"]
    },
    {
        id: 303,
        name: "Pie Susu",
        price: 3000,
        category: "Basahan",
        image: KueBasah3,
        description: "Pie dengan fla susu yang lembut dan manis.",
        benefits: ["Kulit Renyah", "Fla Lembut"]
    },
    {
        id: 304,
        name: "Risol Mayo",
        price: 4000,
        category: "Basahan",
        image: KueBasah4,
        description: "Risol dengan isian mayones, telur, dan daging asap.",
        benefits: ["Creamy", "Gurih"]
    },

    // --- Roti Hajatan ---
    {
        id: 401,
        name: "Paket Hajatan A",
        price: 12000,
        category: "Roti Hajatan",
        image: RotiHajatan1,
        description: "Paket roti manis cocok untuk acara hajatan.",
        benefits: ["Praktis", "Hemat"]
    },
    {
        id: 402,
        name: "Paket Hajatan B",
        price: 15000,
        category: "Roti Hajatan",
        image: RotiHajatan2,
        description: "Paket premium dengan varian roti spesial.",
        benefits: ["Lengkap", "Eksklusif"]
    }
];

export const categories = [
    "Semua",
    "Donat Ring",
    "Tart",
    "Basahan",
    "Roti Hajatan",
    "Roti Reguler",
    "Cake",
    "Oleh - Oleh",
    "Roti Spesial",
    "Roti Tawar"
];
