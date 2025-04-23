// Additional security middleware for production
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
import csrf from 'csurf';

export function advancedSecurity(app) {
  // Enable strict Content Security Policy
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", 'https:'],
        styleSrc: ["'self'", 'https:', "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'https:'],
        connectSrc: ["'self'", 'https:'],
        fontSrc: ["'self'", 'https:', 'data:'],
      },
    })
  );

  // Prevent clickjacking
  app.use(helmet.frameguard({ action: 'deny' }));

  // Prevent XSS
  app.use(helmet.xssFilter());

  // Prevent MIME sniffing
  app.use(helmet.noSniff());

  // HTTP Strict Transport Security
  app.use(helmet.hsts({ maxAge: 31536000, includeSubDomains: true, preload: true }));

  // Referrer Policy
  app.use(helmet.referrerPolicy({ policy: 'no-referrer' }));

  // DNS Prefetch Control
  app.use(helmet.dnsPrefetchControl({ allow: false }));

  // Hide X-Powered-By
  app.use(helmet.hidePoweredBy());

  // Cross-domain policies
  app.use(helmet.permittedCrossDomainPolicies());

  // IE no open
  app.use(helmet.ieNoOpen());

  // Expect-CT (removed, not available in latest helmet)
  // app.use(helmet.expectCt({ maxAge: 86400, enforce: true }));

  // Origin-Agent-Cluster
  app.use(helmet.originAgentCluster());

  // Cross-Origin Resource Policy
  app.use(helmet.crossOriginResourcePolicy({ policy: 'same-origin' }));

  // Cross-Origin Embedder Policy
  app.use(helmet.crossOriginEmbedderPolicy({ policy: 'require-corp' }));

  // Cross-Origin Opener Policy
  app.use(helmet.crossOriginOpenerPolicy({ policy: 'same-origin' }));

  // Global rate limiting (100 requests per 15 min per IP)
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
  }));

  // CORS - allow only trusted origins
  app.use(cors({
    origin: process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : ['http://localhost:3000'],
    credentials: true,
    optionsSuccessStatus: 200,
  }));

  // Sanitize request data
  app.use(mongoSanitize());

  // Prevent HTTP Parameter Pollution
  app.use(hpp());

  // CSRF protection (for web forms, not APIs with JWT)
  // Uncomment if using cookies/sessions:
  // app.use(csrf());

  // Disable client-side caching
  app.use(helmet.noCache ? helmet.noCache() : (req, res, next) => { res.set('Cache-Control', 'no-store'); next(); });
}
