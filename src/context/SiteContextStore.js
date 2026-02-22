import { createContext, useContext } from 'react';

export const SiteContext = createContext();

export const useSiteData = () => {
    const context = useContext(SiteContext);
    if (!context) {
        throw new Error('useSiteData must be used within a SiteProvider');
    }
    return context;
};
