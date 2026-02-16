import React from 'react';
import { Link } from 'react-router-dom';
import { useSiteData } from '../context/SiteContext';
import './LandingPage.css';

const LandingPage = () => {
    const { landingPage } = useSiteData();
    const { hero, sections, contact } = landingPage;

    return (
        <div className="landing-page">
            <section
                className="hero-section"
                style={{
                    backgroundImage: `url(${hero.image})`,
                    backgroundSize: hero.bgSize || 'cover',
                    backgroundColor: hero.bgColor || '#f8f5f4'
                }}
            >
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <h1 className="hero-title">{hero.title}</h1>
                    <p className="hero-subtitle">{hero.subtitle}</p>
                    <Link to="/products" className="cta-button">{hero.ctaText}</Link>
                </div>
            </section>

            {sections && sections.map((section) => {
                if (section.type === 'features') {
                    return (
                        <section key={section.id} className="features-section">
                            {section.title && <h2 className="section-title-dynamic">{section.title}</h2>}
                            <div className="features-grid-dynamic">
                                {section.items.map((item, idx) => (
                                    <div key={item.id} className={`feature-item fade-in-up delay-${idx}`}>
                                        <img src={item.image} alt={item.title} />
                                        <h3>{item.title}</h3>
                                        <p>{item.description}</p>
                                    </div>
                                ))}
                            </div>
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
                                <span className="contact-value">Customer Service 1</span>
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

                        <a href={`mailto:${contact.email}`} className="contact-card">
                            <div className="contact-card-icon mail">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                            </div>
                            <div className="contact-card-info">
                                {/* <span className="contact-label">Email</span> */}
                                <span className="contact-value">{contact.email}</span>
                            </div>
                            <div className="contact-card-arrow">→</div>
                        </a>

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
        </div>
    );
};

export default LandingPage;
