// Simple i18n middleware for backend messages (demo)
const messages = {
  en: {
    unauthorized: 'Unauthorized',
    invalidToken: 'Invalid token',
    reviewFlagged: 'Review has been flagged',
    reviewRemoved: 'Review has been removed',
    analyticsExported: 'Analytics exported successfully',
  },
  es: {
    unauthorized: 'No autorizado',
    invalidToken: 'Token inválido',
    reviewFlagged: 'La reseña ha sido marcada',
    reviewRemoved: 'La reseña ha sido eliminada',
    analyticsExported: 'Análisis exportado con éxito',
  }
};

function i18n(req, res, next) {
  const lang = req.headers['accept-language']?.split(',')[0] || 'en';
  req.t = (key) => messages[lang] && messages[lang][key] ? messages[lang][key] : messages['en'][key];
  next();
}

export default i18n;
