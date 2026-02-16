import React from 'react';
import './Banner.css';

const Banner = () => {
    return (
        <div className="info-banner">
            <div className="banner-content">
                <p>Pemesanan produk OLEVYA BAKERY melalui online store</p>
                <p>hanya berlaku untuk H-2 Pengambilan dan Pengiriman</p>
                <p>untuk pemesanan di hari yang sama,</p>
                <p>OlevyaLovers bisa pesan melalui Customer Service kami berikut ini</p>
                <div className="contact-numbers">
                    <span>📞 0812 5256 2727</span>
                    <span>📞 0812 1658 758</span>
                </div>
            </div>
        </div>
    );
};

export default Banner;
