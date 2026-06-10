# Playwright Test Automation Portfolio

Test automation portfolio built with Playwright and TypeScript.

## Technologies

* Playwright
* TypeScript
* Node.js
* GitHub Actions
* Page Object Model (POM)

## Project Structure

```text
quality-island-shop-pom/
├── pages/
│   ├── ShopPage.ts
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   └── OrderConfirmationPage.ts
│
└── tests/
    └── orderCookBook.spec.ts

tests/
└── Practice exercises from training
```

## Implemented Features

### UI Automation

* Form validation
* Checkboxes
* Radio buttons
* Dropdowns
* File upload
* Multi-select controls

### Page Object Model

The repository contains a Page Object Model implementation for the Quality Island Shop application.

Covered flow:

1. Open shop page
2. Verify product details
3. Add product to cart
4. Verify cart contents
5. Complete checkout process
6. Verify order confirmation

## Running Tests

Install dependencies:

```bash
npm install
```

Run all tests:

```bash
npx playwright test
```

Run POM test only:

```bash
npx playwright test quality-island-shop-pom/tests/orderCookBook.spec.ts --project=chromium
```

## Continuous Integration

GitHub Actions automatically:

* Installs dependencies
* Installs Playwright browsers
* Runs automated tests
* Publishes Playwright reports

## Author

Witalij Sośnicki
