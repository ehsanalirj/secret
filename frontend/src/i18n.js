import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      'Notifications': 'Notifications',
      'Analytics': 'Analytics',
      'AI Insights': 'AI Insights',
      'Integrations': 'Integrations',
      'Webhooks': 'Webhooks',
      'Reports': 'Reports',
      'Audit Logs': 'Audit Logs',
      'Org Switcher': 'Org Switcher',
      'Branding': 'Branding',
      'API Keys': 'API Keys',
      'API Docs': 'API Docs',
      'Loading...': 'Loading...',
      'No notifications.': 'No notifications.',
      'No integrations found.': 'No integrations found.',
      'No webhooks found.': 'No webhooks found.',
      'No organizations found.': 'No organizations found.',
      'No branding found.': 'No branding found.',
      'No API keys found.': 'No API keys found.',
      'No audit logs found.': 'No audit logs found.',
      'Export': 'Export',
      'Exporting...': 'Exporting...'
    }
  },
  // Add additional languages here
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
