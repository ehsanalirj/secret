import request from 'supertest';
import app from '../src/app.js';
import mongoose from 'mongoose';
import CRM from '../src/models/crm.js';
import Tenant from '../src/models/tenant.js';

const testTenant = { name: 'TestTenant', complianceTags: ['PCI'], dataClassification: 'internal', complianceStatus: 'approved' };
const testCRM = { name: 'Test CRM', email: 'crm@example.com', status: 'active' };

let tenantId;
let token;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/vontres_test');
  const tenant = await Tenant.create(testTenant);
  tenantId = tenant._id;
  // Simulate login to get token (replace with your actual auth endpoint)
  const res = await request(app)
    .post('/api/auth/login')
    .send({ email: testUser.email, password: testUser.password });
  token = res.body.token;
}, 30000);
  await mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/vontres_test');
  const tenant = await Tenant.create(testTenant);
  tenantId = tenant._id;
  // Simulate login to get token (replace with your actual auth endpoint)
  const res = await request(app)
    .post('/api/auth/login')
    .send({ email: 'testuser@example.com', password: 'TestPass123!' });
  token = res.body.token;
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
}, 30000);
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('CRM API', () => {
  it('should create a CRM record', async () => {
    const res = await request(app)
      .post('/api/crm')
      .set('Authorization', `Bearer ${token}`)
      .send({ ...testCRM, tenant: tenantId });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe(testCRM.name);
  });

  it('should get all CRM records for a tenant', async () => {
    const res = await request(app)
      .get('/api/crm')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
