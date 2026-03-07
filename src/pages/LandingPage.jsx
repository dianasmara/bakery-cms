import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSiteData } from '../context/SiteContextStore';
import './LandingPage.css';

const FeatureCarousel = ({ images, title }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!images || images.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 4000); // Feature slides every 4 seconds
        return () => clearInterval(interval);
    }, [images]);

    if (!images || images.length === 0) return null;

    return (
        <div className="feature-carousel">
            {images.map((img, idx) => (
                <img
                    key={idx}
                    src={img}
                    alt={`${title} ${idx + 1}`}
                    className={`feature-slide ${idx === currentIndex ? 'active' : ''}`}
                />
            ))}
            {images.length > 1 && (
                <div className="feature-dots">
                    {images.map((_, idx) => (
                        <span
                            key={idx}
                            className={`f-dot ${idx === currentIndex ? 'active' : ''}`}
                            onClick={() => setCurrentIndex(idx)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const BannerSlider = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!images || images.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [images]);

    if (!images || images.length === 0) return null;

    const prev = () => setCurrentIndex((i) => (i - 1 + images.length) % images.length);
    const next = () => setCurrentIndex((i) => (i + 1) % images.length);

    return (
        <section className="banner-slider-section">
            <div className="banner-slider-track">
                {images.map((img, idx) => (
                    <img
                        key={idx}
                        src={img}
                        alt={`Banner ${idx + 1}`}
                        className={`banner-slide-img ${idx === currentIndex ? 'active' : ''}`}
                    />
                ))}
                {images.length > 1 && (
                    <>
                        <button className="banner-arrow banner-arrow-prev" onClick={prev} aria-label="Previous">&#8249;</button>
                        <button className="banner-arrow banner-arrow-next" onClick={next} aria-label="Next">&#8250;</button>
                        <div className="banner-dots">
                            {images.map((_, idx) => (
                                <button
                                    key={idx}
                                    className={`banner-dot ${idx === currentIndex ? 'active' : ''}`}
                                    onClick={() => setCurrentIndex(idx)}
                                    aria-label={`Go to slide ${idx + 1}`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

const LandingPage = () => {
    const { landingPage } = useSiteData();
    const { hero, sections, contact } = landingPage;

    const heroImages = hero.images || [hero.image];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        if (heroImages.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval);
    }, [heroImages]);

    return (
        <div className="landing-page">
            <section className="hero-section" style={{ backgroundColor: hero.bgColor || '#f8f5f4' }}>
                <div className="hero-slider-container">
                    <div className="hero-slider">
                        {heroImages.map((image, index) => (
                            <div
                                key={index}
                                className={`hero-slide ${index === currentImageIndex ? 'active' : ''}`}
                                style={{
                                    backgroundImage: `url(${image})`,
                                    backgroundSize: hero.bgSize || 'cover'
                                }}
                            />
                        ))}
                    </div>
                    {heroImages.length > 1 && (
                        <div className="hero-dots">
                            {heroImages.map((_, index) => (
                                <button
                                    key={index}
                                    className={`dot ${index === currentImageIndex ? 'active' : ''}`}
                                    onClick={() => setCurrentImageIndex(index)}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    )}
                    <Link to="/products" className="cta-button-overlay">{hero.ctaText}</Link>
                </div>

                <div className="hero-content">
                    <h1 className="hero-title">{hero.title}</h1>
                    <p className="hero-subtitle">{hero.subtitle}</p>
                </div>
            </section>

            {sections && sections.map((section) => {
                if (section.type === 'banner-slider') {
                    return <BannerSlider key={section.id} images={section.images} />;
                }
                if (section.type === 'features') {
                    return (
                        <section key={section.id} className="features-section">
                            {section.title && <h2 className="section-title-dynamic">{section.title}</h2>}
                            <div className="features-grid-dynamic">
                                {section.items.map((item, idx) => (
                                    <div key={item.id} className={`feature-item fade-in-up delay-${idx}`}>
                                        <FeatureCarousel images={item.images} title={item.title} />
                                        <h3>{item.title}</h3>
                                        <p>{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    );
                }
                if (section.type === 'design-box') {
                    return (
                        <section key={section.id} className="design-box-section">
                            <div className="design-box-accent-bar top"></div>
                            <div className="design-box-container">
                                <div className="design-box-content">
                                    <h2 className="design-box-title">{section.title}</h2>
                                    <p className="design-box-subtitle">{section.subtitle}</p>
                                    <div className="design-box-badges">
                                        <div className="d-badge"><span className="icon">✓</span> Free Design</div>
                                        <div className="d-badge"><span className="icon">✓</span> Exclusive</div>
                                        <div className="d-badge"><span className="icon">✓</span> Premium Box</div>
                                    </div>
                                </div>
                                <div className="design-box-showcase">
                                    {section.images?.map((img, idx) => (
                                        <div key={idx} className={`box-card card-${idx}`}>
                                            <img src={img} alt={`Design Box ${idx + 1}`} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="design-box-accent-bar bottom"></div>
                        </section>
                    );
                }
                // Add more section types here if needed (e.g. 'about', 'banner', etc.)
                return null;
            })}

            <section className="contact-section">
                <div className="container">
                    <h2 className="contact-title">{contact.title}</h2>
                    <p className="contact-subtitle">{contact.subtitle}</p>

                    <div className="contact-grid">
                        <a href={`https://wa.me/${contact.whatsapp1}`} target="_blank" rel="noreferrer" className="contact-card">
                            <div className="contact-card-icon wa">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                            </div>
                            <div className="contact-card-info">
                                {/* <span className="contact-label">WhatsApp</span> */}
                                <span className="contact-value">Whatsapp</span>
                            </div>
                            <div className="contact-card-arrow">→</div>
                        </a>

                        <a href={contact.mapsUrl} target="_blank" rel="noreferrer" className="contact-card">
                            <div className="contact-card-icon maps">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                            </div>
                            <div className="contact-card-info">
                                {/* <span className="contact-label">Lokasi Outlet</span> */}
                                <span className="contact-value">{contact.address}</span>
                            </div>
                            <div className="contact-card-arrow">→</div>
                        </a>

                        {/* <a href={`mailto:${contact.email}`} className="contact-card">
                            <div className="contact-card-icon mail">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                            </div>
                            <div className="contact-card-info">
                                 <span className="contact-label">Email</span> 
                                <span className="contact-value">{contact.email}</span>
                            </div>
                            <div className="contact-card-arrow">→</div>
                        </a> */}

                        <a href={`https://instagram.com/${contact.instagram.replace('@', '')}`} target="_blank" rel="noreferrer" className="contact-card">
                            <div className="contact-card-icon ig">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                            </div>
                            <div className="contact-card-info">
                                {/* <span className="contact-label">Instagram</span> */}
                                <span className="contact-value">{contact.instagram}</span>
                            </div>
                            <div className="contact-card-arrow">→</div>
                        </a>
                    </div>
                </div>
            </section>
            <footer className="site-footer">
                <p>© 2026 Olevya_Bakery | All Rights Reserved</p>
            </footer>
        </div>
    );
};

export default LandingPage;
