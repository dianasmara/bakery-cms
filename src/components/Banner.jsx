import React from 'react';
import { useSiteData } from '../context/SiteContext';
import './Banner.css';

const Banner = () => {
    const { landingPage } = useSiteData();
    const { contact } = landingPage;

    // Format number for display (e.g., 6281333198380 -> 0813 3319 8380)
    const formatPhone = (num) => {
        if (!num) return "";
        let clean = num.replace("62", "0");
        return clean.replace(/(\d{4})(\d{4})(\d{4})/, "$1 $2 $3");
    };

    return (
        <div className="info-banner">
            <div className="banner-content">
                <p>Pemesanan produk OLEVYA BAKERY melalui online store</p>
                <p>hanya berlaku untuk H-2 Pengambilan dan Pengiriman</p>
                <p>untuk pemesanan di hari yang sama,</p>
                <p>OlevyaLovers bisa pesan melalui Customer Service kami berikut ini</p>
                <div className="contact-numbers">
                    <a href={`https://wa.me/${contact.whatsapp1}`} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <span>📞 {formatPhone(contact.whatsapp1)}</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Banner;
