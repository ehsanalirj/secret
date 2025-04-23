import request from 'supertest';
import app from '../src/app.js';
import mongoose from 'mongoose';
import Webhook from '../src/models/webhook.js';
import Tenant from '../src/models/tenant.js';

const testTenant = { name: 'TestTenant', complianceTags: ['PCI'], dataClassification: 'internal', complianceStatus: 'approved', country: 'US', domain: 'testtenant.com' };
const testUser = { name: 'Test User', email: 'testuser@example.com', password: 'TestPass123!', status: 'active', roles: ['admin'], permissions: ['*'], dataResidency: 'US' };
const testWebhook = { url: 'https://example.com/webhook', event: 'order.created', secret: 'whsec_test' };

let tenantId;
let token;
let userId;

beforeAll(async () => {
  if (!process.env.MONGO_URI) throw new Error('MONGO_URI must be set for cloud database tests!');
  await mongoose.connect(process.env.MONGO_URI);
  // Clean database before tests
  await mongoose.connection.db.dropDatabase();
  // Create tenant
  // Ensure tenant is compliance approved
  const tenant = await Tenant.create({ ...testTenant, complianceStatus: 'approved' });
  tenantId = tenant._id;
  console.log('DEBUG: Created tenant', tenant.toObject());
  // Register user with only required fields
  const registerRes = await request(app)
    .post('/api/auth/register')
    .send({
      name: testUser.name,
      email: testUser.email,
      password: testUser.password,
      role: testUser.role,
      tenant: tenantId,
      dataResidency: testUser.dataResidency
    });
  expect(registerRes.statusCode).toBe(201);
  // Update user with status 'active' and permissions ['admin'] to pass RBAC/compliance
  const User = (await import('../src/models/user.js')).default;
  await User.updateOne(
    { email: testUser.email },
    { $set: { status: 'active', roles: ['admin'], permissions: ['admin'] } }
  );
  // Simulate login to get token (replace with your actual auth endpoint)
  const res = await request(app)
    .post('/api/auth/login')
    .send({ email: testUser.email, password: testUser.password });
  token = res.body.token;
  if (!token) {
    console.error('LOGIN FAILED: Response:', res.body);
    throw new Error('Login did not return a token. Check user creation and login route.');
  }
  // Decode JWT for debug
  const jwtDecoded = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('utf8'));
  console.log('DEBUG: JWT payload', jwtDecoded);
}, 60000);

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
}, 60000);

describe('Webhook API', () => {
  it('should create a webhook', async () => {
    const res = await request(app)
      .post('/api/webhook')
      .set('Authorization', `Bearer ${token}`)
      .send({ ...testWebhook, tenant: String(tenantId) });
    expect(res.statusCode).toBe(201);
    expect(res.body.url).toBe(testWebhook.url);
  });

  it('should get all webhooks for a tenant', async () => {
    const res = await request(app)
      .get('/api/webhook')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
