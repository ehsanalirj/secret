import morgan from 'morgan';
import fs from 'fs';
import path from 'path';

// Create a write stream (in append mode) for request logs
const logDirectory = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}
const accessLogStream = fs.createWriteStream(path.join(logDirectory, 'access.log'), { flags: 'a' });

// Custom morgan token for tenant/user info
morgan.token('tenant', req => req.user && req.user.tenant ? req.user.tenant : '-');
morgan.token('user', req => req.user && req.user.id ? req.user.id : '-');

// Combined log format with tenant/user
const logFormat = ':remote-addr :method :url :status :res[content-length] - :response-time ms tenant=:tenant user=:user';

const requestLogger = morgan(logFormat, { stream: accessLogStream });

export default requestLogger;
