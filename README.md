# Quality Island Shop - Test Automation Portfolio

This project demonstrates a hybrid QA automation approach using Playwright and k6.

## Tech Stack

- Playwright
- TypeScript
- Page Object Model (POM)
- Playwright API Testing
- k6 Performance Testing

---

## UI Automation

The UI test suite follows the Page Object Model design pattern and covers key user workflows.

### Covered scenarios

- Verify product details
- Add product to cart
- Complete checkout process
- Verify order confirmation
- Verify product filtering by category
- Verify login with invalid credentials

---

## API Testing

API tests are implemented using Playwright's Request API.

### Covered scenarios

- Verify products endpoint returns a successful response
- Validate response status and product count
- Verify response schema
- Validate product data consistency

---

## Performance Testing

Basic load testing is implemented using k6.

### Covered scenarios

- Load testing the Products API
- Response time validation using thresholds
- Error rate monitoring
- Load ramp-up and ramp-down scenarios
- Rate limiting observation (HTTP 429 under high concurrency)

---

## Project Structure

```
quality-island-shop-pom/
├── api/
├── pages/
├── performance/
├── tests/
└── playwright.config.ts
```

---

## Running Tests

### UI Tests

```bash
npx playwright test
```

### API Tests

```bash
npx playwright test api
```

### Performance Tests

```bash
k6 run performance/products-load-test.js
```