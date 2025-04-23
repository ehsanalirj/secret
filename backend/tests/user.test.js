import request from 'supertest';
import app from '../src/app.js';
import mongoose from 'mongoose';
import User from '../src/models/user.js';
import Tenant from '../src/models/tenant.js';

// Mock data
const testTenant = { name: 'TestTenant', complianceTags: ['PCI'], dataClassification: 'internal', complianceStatus: 'approved', country: 'US', domain: 'testtenant.com' };
const testUser = { name: 'Test User', email: 'testuser@example.com', password: 'TestPass123!', status: 'active', roles: ['admin'], permissions: ['*'] };

let tenantId;
let token;

beforeAll(async () => {
  if (!process.env.MONGO_URI) throw new Error('MONGO_URI must be set for cloud database tests!');
  await mongoose.connect(process.env.MONGO_URI);
  // Create tenant
  const tenant = await Tenant.create(testTenant);
  tenantId = tenant._id;
  // Create user
  const user = await User.create({ ...testUser, tenant: tenantId });
  // Simulate login to get token (replace with your actual auth endpoint)
  const res = await request(app)
    .post('/api/auth/login')
    .send({ email: testUser.email, password: testUser.password });
  token = res.body.token;
}, 30000);


afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
}, 30000);
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('User API', () => {
  it('should get all users for a tenant', async () => {
    const res = await request(app)
      .get('/api/user')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should update user details', async () => {
    const res = await request(app)
      .put(`/api/user/${testUser.email}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Updated User' });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Updated User');
  });
});
