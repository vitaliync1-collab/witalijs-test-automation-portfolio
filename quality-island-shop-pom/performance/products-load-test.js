import http from 'k6/http';
import { check } from 'k6';

export const options = {
    //stages: [
    //  { duration: '10s', target: 10 },
    // { duration: '20s', target: 50 },
    //{ duration: '10s', target: 0 },
    //],

    stages: [
  { duration: '10s', target: 5 },
  { duration: '20s', target: 10 },
  { duration: '10s', target: 0 },
    ],

    thresholds: {
        http_req_failed: ['rate<0.01'],
        http_req_duration: ['p(95)<500'],
    },
};

export default function () {
    const url =
        'https://quality-arena-labs.base44.app/api/apps/6a0f64f916520158fb474c6d/functions/apiPractice';

    const payload = JSON.stringify({
        _path: '/api/products',
        _method: 'GET',
        _body: {}
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
            'x-app-id': '6a0f64f916520158fb474c6d',
            'base44-functions-version': 'prod',
        },
    };

    const response = http.post(url, payload, params);

    check(response, {
        'status is 200': (r) => r.status === 200,
    });

    if (response.status !== 200)
    console.log(response.status);

   
}