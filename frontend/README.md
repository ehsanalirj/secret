# Vontres Admin Dashboard (Frontend)

Enterprise-Ready React Admin UI for the Vontres Online Ordering SaaS Ecosystem.

---

## 🚀 Features
- Modern, responsive UI (React + MUI + Tailwind)
- Multi-tenant, RBAC-driven navigation
- Real-time analytics and notifications
- Modular dashboards: Tenant, User, Billing, Analytics, CRM, Orders, Menu, Integrations, Webhooks, Settings
- Advanced analytics and AI-driven insights
- Multi-language (English/Urdu, easily extensible)
- Dark/light theme, accessibility, onboarding flows
- API client auto-generated from OpenAPI spec
- PWA-ready, installable as an app

---

## 🛠️ Setup
1. Clone this repo
2. Copy `.env.example` to `.env` and fill in your backend API URL and secrets
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm start
   ```

---

## 📡 API Integration
- All API calls are type-safe, auto-generated from the OpenAPI spec
- Seamless integration with Vontres backend (see backend/openapi.yaml)
- Auth flows (JWT, API key) built-in

---

## 🧪 Testing & Scripts
- Run all tests:
  ```sh
  npm test
  ```
- Lint code:
  ```sh
  npm run lint
  ```
- Analyze bundle:
  ```sh
  npm run analyze
  ```
- Storybook for UI components:
  ```sh
  npm run storybook
  ```

---

## ⚙️ CI/CD & DevOps
- Dockerfile and docker-compose for local/dev/prod
- GitHub Actions for lint, test, build, and deploy
- PWA support and automated accessibility checks

---

## 📊 Advanced Analytics & AI
- Built-in dashboards for revenue, churn, segments, order trends
- Pluggable widgets, export to CSV/PDF, scheduled email reports
- AI-driven recommendations and predictive analytics (coming soon)

---

## ❤️ Developer Experience
- Beautiful code structure, type safety, and best practices
- Fully documented, easy to extend, and a joy to contribute

---

## 💡 Extending the Platform
- Add new modules/pages by following the established pattern
- Use OpenAPI codegen for new API endpoints
- Contribute to Storybook for UI consistency

---

## With love, for the future of SaaS.
