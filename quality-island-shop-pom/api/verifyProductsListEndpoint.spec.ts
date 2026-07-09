import { test, expect } from '@playwright/test';

test('Should return a list of active products', async ({ request }) => {
  const response = await request.post(
    'https://quality-arena-labs.base44.app/api/apps/6a0f64f916520158fb474c6d/functions/apiPractice',
    {
      headers: {
        'x-app-id': '6a0f64f916520158fb474c6d',
        'base44-functions-version': 'prod',
      },
      data: {
        _path: '/api/products',
        _method: 'GET',
        _body: {},
      },
    }
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.status).toBe('success');
  expect(body.count).toBeGreaterThan(0);
  expect(body.data).toHaveLength(body.count);



  expect(body.data[0]).toMatchObject({
    id: expect.any(String),
    name: expect.any(String),
    price: expect.any(Number),
    category: expect.any(String),
    is_active: true,
  });

 expect(body.data.every((p: any) => p.price > 0)).toBeTruthy();
 expect(body.data.every((p: any) => p.name.trim().length > 0)).toBeTruthy();
  
});