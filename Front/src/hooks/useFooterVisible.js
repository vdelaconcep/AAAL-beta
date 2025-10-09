import { useState, useEffect } from 'react';

export const useFooterVisible = () => {
    const [footerVisible, setFooterVisible] = useState(false);

    useEffect(() => {
        const footer = document.querySelector('footer');

        if (!footer) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setFooterVisible(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        observer.observe(footer);

        return () => {
            observer.unobserve(footer);
        };
    }, []);

    return footerVisible;
};