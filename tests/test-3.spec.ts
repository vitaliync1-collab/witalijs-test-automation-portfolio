import { test, expect } from '@playwright/test';



test('multi-select pozwala wybrać API Testing i UI Testing', async ({ page }) => {
  await page.goto('https://quality-arena-labs.base44.app/practice/forms');

  const apiTestingOption = page.getByTestId('multi-select-api-testing');
  const uiTestingOption = page.getByTestId('multi-select-ui-testing');
  const performanceTestingOption = page.getByTestId('multi-select-performance');
  const securityTestingOption = page.getByTestId('multi-select-security');
  const mobileTestingOption = page.getByTestId('multi-select-mobile');

  await apiTestingOption.click();
  await uiTestingOption.click();

  await expect(apiTestingOption).toHaveAttribute('data-selected', 'true');
  await expect(uiTestingOption).toHaveAttribute('data-selected', 'true');
  await expect(performanceTestingOption).toHaveAttribute('data-selected', 'false');
  await expect(securityTestingOption).toHaveAttribute('data-selected', 'false');
  await expect(mobileTestingOption).toHaveAttribute('data-selected', 'false');

  await page.reload();

  await expect(apiTestingOption).toHaveAttribute('data-selected', 'false');
  await expect(uiTestingOption).toHaveAttribute('data-selected', 'false');
  await expect(performanceTestingOption).toHaveAttribute('data-selected', 'false');
  await expect(securityTestingOption).toHaveAttribute('data-selected', 'false');
  await expect(mobileTestingOption).toHaveAttribute('data-selected', 'false');  
});