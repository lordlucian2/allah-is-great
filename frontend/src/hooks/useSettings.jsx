import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "";

export const useSettings = () => {
  const [settings, setSettings] = useState({
    business_name: 'ALLAH IS GREAT',
    tagline: 'Everything Electronics Under One Roof',
    logo_url: '',
    hero_headline: 'ALLAH IS GREAT Electronics & Electrical Store',
    hero_subheadline: 'Your trusted source for phones, accessories, speakers, electrical supplies, lighting solutions, fans, power solutions, and home electronics.',
    hero_image: 'https://placehold.co/1600x600/0D47A1/white?text=Store+Front',
    phone: '+231776070131',
    whatsapp: '231776070131',
    address: 'New Georgia Estate, Liberia',
    business_hours: 'Mon-Sat: 9am-7pm, Sun: Closed',
    whatsapp_message: "Hello, I'm interested in [PRODUCT_NAME]. Is it currently available?"
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/settings`);
        if (res.data) setSettings(prev => ({ ...prev, ...res.data }));
      } catch (err) { console.error('Failed to load settings', err);
      } finally { setLoading(false); }
    };
    fetchSettings();
  }, []);

  return { settings, loading };
};
