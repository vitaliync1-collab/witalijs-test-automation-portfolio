import { test, expect } from '@playwright/test';

test('Should authenticate user and return access token', async ({ request }) => {
  const response = await request.post(
    'https://quality-arena-labs.base44.app/api/apps/6a0f64f916520158fb474c6d/functions/shopLogin',
    {
      data: {
        email: 'test@qualityisland.pl',
        password: 'Test1234!',
      },
    }
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.status).toBe('success');

  expect(body.data).toMatchObject({
    token: expect.any(String),
    user: {
      id: expect.any(String),
      email: 'test@qualityisland.pl',
      first_name: 'Test',
      last_name: 'User',
    },
  });

  expect(body.data.token.length).toBeGreaterThan(0);
});