import { test, expect } from '@playwright/test'; // Import test and expect from Playwright.

const baseUrl = 'https://restful-booker.herokuapp.com'; // Store the base API address in one constant.

test.describe('Restful Booker API - first simple demo tests', () => { // Group the first simplest API tests.

  test('API responds to /ping endpoint', async ({ request }) => { // Create a very simple test that checks the API works.
    const response = await request.get(`${baseUrl}/ping`); // Send a GET request to /ping endpoint.

    expect(response.status()).toBe(201); // Check that the response has status 201.
  });




  test('GET /booking returns the body as an array', async ({ request }) => { // Create a test that checks the response body format.
    const response = await request.get(`${baseUrl}/booking`); // Send a GET request to /booking endpoint.

    expect(response.status()).toBe(200); // Check that the response has status 200.

    const body = await response.json(); // Read the response as JSON.

    expect(Array.isArray(body)).toBe(true); // Check that the body is an array.
  });

  test('GET /booking returns at least one booking', async ({ request }) => { // Create a test to verify the bookings list is not empty.
    const response = await request.get(`${baseUrl}/booking`); // Send a GET request to /booking endpoint.

    expect(response.status()).toBe(200); // Check that the response has status 200.

    const body = await response.json(); // Read the response as JSON.

    expect(body.length).toBeGreaterThan(0); // Check that the array has more than zero elements.
  });

  test('the first booking in the list has the bookingid field', async ({ request }) => { // Create a test that checks the structure of the first item in the list.
    const response = await request.get(`${baseUrl}/booking`); // Send a GET request to /booking endpoint.

    expect(response.status()).toBe(200); // Check that the response has status 200.

    const body = await response.json(); // Read the response as JSON.

    expect(body[0]).toHaveProperty('bookingid'); // Check that the first item has the bookingid field.
  });




























  
  test('can fetch details of the first booking from the list', async ({ request }) => { // Create a test that shows the dependency between two requests.
    const listResponse = await request.get(`${baseUrl}/booking`); // Fetch the bookings list.

    expect(listResponse.status()).toBe(200); // Check that the list was fetched successfully.

    const bookingList = await listResponse.json(); // Parse the bookings list as JSON.

    const bookingId = bookingList[0].bookingid; // Get the bookingid of the first booking.

    const detailsResponse = await request.get(`${baseUrl}/booking/${bookingId}`); // Fetch booking details by ID.

    expect(detailsResponse.status()).toBe(200); // Check that the details were fetched successfully.

    const bookingDetails = await detailsResponse.json(); // Parse the booking details as JSON.

    expect(bookingDetails).toHaveProperty('firstname'); // Check that the details include the firstname field.
    expect(bookingDetails).toHaveProperty('lastname'); // Check that the details include the lastname field.
  });
});

test.describe('Restful Booker API - task solutions', () => { // Group the actual task solutions.

  test('Task 1: Verify API availability', async ({ request }) => { // Create a test that checks the /ping endpoint.
    const response = await request.get(`${baseUrl}/ping`); // Send a GET request to /ping endpoint.

    expect(response.status()).toBe(201); // Check that the response status is 201.
  });

  test('Task 2: Retrieve booking list', async ({ request }) => { // Create a test that retrieves the bookings list.
    const response = await request.get(`${baseUrl}/booking`); // Send a GET request to /booking endpoint.

    expect(response.status()).toBe(200); // Check that the response has status 200.

    const body = await response.json(); // Parse the response body as JSON.

    expect(Array.isArray(body)).toBe(true); // Check that the response is an array.
    expect(body.length).toBeGreaterThan(0); // Check that the array is not empty.
    expect(body[0]).toHaveProperty('bookingid'); // Check that the first array item has the bookingid field.
  });

  test('Task 3: Retrieve booking details', async ({ request }) => { // Create a test that retrieves details of a single booking.
    const bookingListResponse = await request.get(`${baseUrl}/booking`); // Fetch the bookings list.

    expect(bookingListResponse.status()).toBe(200); // Check that the bookings list was fetched successfully.

    const bookingList = await bookingListResponse.json(); // Parse the bookings list as JSON.

    const bookingId = bookingList[0].bookingid; // Get the bookingid of the first booking from the list.

    const bookingDetailsResponse = await request.get(`${baseUrl}/booking/${bookingId}`); // Fetch details of the selected booking.

    expect(bookingDetailsResponse.status()).toBe(200); // Check that the details were fetched successfully.

    const bookingDetails = await bookingDetailsResponse.json(); // Parse the booking details as JSON.

    expect(bookingDetails).toHaveProperty('firstname'); // Check that the response includes the firstname field.
    expect(bookingDetails).toHaveProperty('lastname'); // Check that the response includes the lastname field.
    expect(bookingDetails).toHaveProperty('totalprice'); // Check that the response includes the totalprice field.
    expect(bookingDetails).toHaveProperty('depositpaid'); // Check that the response includes the depositpaid field.
    expect(bookingDetails).toHaveProperty('bookingdates'); // Check that the response includes the bookingdates field.
  });

  test('Task 4: Create a new booking', async ({ request }) => { // Create a test that creates a new booking.
    const newBooking = { // Prepare data for a new booking.
      firstname: 'Jan', // Set the customer first name.
      lastname: 'Kowalski', // Set the customer last name.
      totalprice: 499, // Set the booking price.
      depositpaid: true, // Set the deposit paid information.
      bookingdates: { // Create the booking dates object.
        checkin: '2026-06-01', // Set the check-in date.
        checkout: '2026-06-07', // Set the check-out date.
      },
      additionalneeds: 'Breakfast', // Set the additional customer need.
    };

    const response = await request.post(`${baseUrl}/booking`, { // Send a POST request to create a new booking.
      data: newBooking, // Pass the booking data as the request body.
    });

    expect(response.status()).toBe(200); // Check that the booking was created successfully.

    const body = await response.json(); // Read the response as JSON.

    expect(body).toHaveProperty('bookingid'); // Check that the response includes bookingid.
    expect(body.booking.firstname).toBe(newBooking.firstname); // Check that the firstname in the response is correct.
    expect(body.booking.lastname).toBe(newBooking.lastname); // Check that the lastname in the response is correct.
    expect(body.booking.totalprice).toBe(newBooking.totalprice); // Check that the totalprice in the response is correct.
    expect(body.booking.depositpaid).toBe(newBooking.depositpaid); // Check that the deposit information in the response is correct.
    expect(body.booking.bookingdates.checkin).toBe(newBooking.bookingdates.checkin); // Check the check-in date.
    expect(body.booking.bookingdates.checkout).toBe(newBooking.bookingdates.checkout); // Check the check-out date.
    expect(body.booking.additionalneeds).toBe(newBooking.additionalneeds); // Check the additional need in the response.
  });

  test('Task 5: Create an auth token', async ({ request }) => { // Create a test that retrieves an auth token.
    const response = await request.post(`${baseUrl}/auth`, { // Send a POST request to /auth endpoint.
      data: { // Pass login credentials in the request body.
        username: 'admin', // Set the user login.
        password: 'password123', // Set the user password.
      },
    });

    expect(response.status()).toBe(200); // Check that the token was created successfully.

    const body = await response.json(); // Read the response as JSON.

    expect(body).toHaveProperty('token'); // Check that the response includes the token field.
    expect(typeof body.token).toBe('string'); // Check that the token is a string.
    expect(body.token.length).toBeGreaterThan(0); // Check that the token is not empty.
  });

  test('Task 6: Create and retrieve a booking', async ({ request }) => { // Create a test that creates and retrieves a booking.
    const newBooking = { // Prepare data for a new booking.
      firstname: 'Anna', // Set the customer first name.
      lastname: 'Nowak', // Set the customer last name.
      totalprice: 350, // Set the booking price.
      depositpaid: false, // Set the deposit paid information to false.
      bookingdates: { // Create the booking dates object.
        checkin: '2026-07-10', // Set the check-in date.
        checkout: '2026-07-15', // Set the check-out date.
      },
      additionalneeds: 'Lunch', // Set the additional customer need.
    };

    const createResponse = await request.post(`${baseUrl}/booking`, { // Send a POST request to create a new booking.
      data: newBooking, // Pass the booking data as the request body.
    });

    expect(createResponse.status()).toBe(200); // Check that the booking was created successfully.

    const createBody = await createResponse.json(); // Parse the create booking response as JSON.

    const bookingId = createBody.bookingid; // Store the ID of the newly created booking.

    expect(bookingId).toBeTruthy(); // Check that bookingId exists.

    const getResponse = await request.get(`${baseUrl}/booking/${bookingId}`); // Fetch the created booking by ID.

    expect(getResponse.status()).toBe(200); // Check that fetching the booking succeeded.

    const booking = await getResponse.json(); // Parse the fetched booking as JSON.

    expect(booking.firstname).toBe(newBooking.firstname); // Check that the firstname is correct.
    expect(booking.lastname).toBe(newBooking.lastname); // Check that the lastname is correct.
    expect(booking.totalprice).toBe(newBooking.totalprice); // Check that the totalprice is correct.
    expect(booking.depositpaid).toBe(newBooking.depositpaid); // Check that the deposit information is correct.
    expect(booking.bookingdates.checkin).toBe(newBooking.bookingdates.checkin); // Check the check-in date.
    expect(booking.bookingdates.checkout).toBe(newBooking.bookingdates.checkout); // Check the check-out date.
    expect(booking.additionalneeds).toBe(newBooking.additionalneeds); // Check the additional need.
  });

  test('Task 7: Update a booking', async ({ request }) => { // Create a test that updates a booking.
    const authResponse = await request.post(`${baseUrl}/auth`, { // Send a POST request to get an auth token.
      data: { // Pass login credentials.
        username: 'admin', // Set the user login.
        password: 'password123', // Set the user password.
      },
    });

    expect(authResponse.status()).toBe(200); // Check that the token was created successfully.

    const authBody = await authResponse.json(); // Parse the token response as JSON.

    const token = authBody.token; // Store the token in a variable.

    const newBooking = { // Prepare data for the initial booking.
      firstname: 'Piotr', // Set the customer first name.
      lastname: 'Testowy', // Set the customer last name.
      totalprice: 600, // Set the initial price.
      depositpaid: true, // Set the deposit paid information.
      bookingdates: { // Create the initial booking dates object.
        checkin: '2026-08-01', // Set the initial check-in date.
        checkout: '2026-08-05', // Set the initial check-out date.
      },
      additionalneeds: 'Breakfast', // Set the initial additional need.
    };

    const createResponse = await request.post(`${baseUrl}/booking`, { // Create a booking that we will update shortly.
      data: newBooking, // Pass the initial booking data.
    });

    expect(createResponse.status()).toBe(200); // Check that the booking was created successfully.

    const createBody = await createResponse.json(); // Parse the create booking response.

    const bookingId = createBody.bookingid; // Store the ID of the created booking.

    const updatedBookingData = { // Prepare updated booking data.
      firstname: 'Piotr', // Set the customer first name.
      lastname: 'Zaktualizowany', // Set the updated customer last name.
      totalprice: 750, // Set the new price.
      depositpaid: false, // Set the new deposit information.
      bookingdates: { // Create the updated booking dates object.
        checkin: '2026-08-02', // Set the new check-in date.
        checkout: '2026-08-06', // Set the new check-out date.
      },
      additionalneeds: 'Dinner', // Set the new additional need.
    };

    const updateResponse = await request.put(`${baseUrl}/booking/${bookingId}`, { // Send a PUT request updating the booking.
      headers: { // Pass the request headers.
        Cookie: `token=${token}`, // Send the token in the Cookie header.
      },
      data: updatedBookingData, // Pass the updated booking data as the request body.
    });

    expect(updateResponse.status()).toBe(200); // Check that the update succeeded.

    const updatedBooking = await updateResponse.json(); // Parse the update response as JSON.

    expect(updatedBooking.firstname).toBe(updatedBookingData.firstname); // Check that the firstname is correct.
    expect(updatedBooking.lastname).toBe(updatedBookingData.lastname); // Check that the lastname was updated.
    expect(updatedBooking.totalprice).toBe(updatedBookingData.totalprice); // Check that the price was updated.
    expect(updatedBooking.depositpaid).toBe(updatedBookingData.depositpaid); // Check that the deposit information was updated.
    expect(updatedBooking.bookingdates.checkin).toBe(updatedBookingData.bookingdates.checkin); // Check the new check-in date.
    expect(updatedBooking.bookingdates.checkout).toBe(updatedBookingData.bookingdates.checkout); // Check the new check-out date.
    expect(updatedBooking.additionalneeds).toBe(updatedBookingData.additionalneeds); // Check the new additional need.
  });

  test('Task 8: Delete a booking', async ({ request }) => { // Create a test that deletes a booking.
    const authResponse = await request.post(`${baseUrl}/auth`, { // Send a POST request to get an auth token.
      data: { // Pass login credentials.
        username: 'admin', // Set the user login.
        password: 'password123', // Set the user password.
      },
    });

    expect(authResponse.status()).toBe(200); // Check that the token was created successfully.

    const authBody = await authResponse.json(); // Parse the token response as JSON.

    const token = authBody.token; // Store the token in a variable.

    const newBooking = { // Prepare data for a booking that will be deleted later.
      firstname: 'Marta', // Set the customer first name.
      lastname: 'Usuwana', // Set the customer last name.
      totalprice: 300, // Set the booking price.
      depositpaid: true, // Set the deposit paid information.
      bookingdates: { // Create the booking dates object.
        checkin: '2026-09-01', // Set the check-in date.
        checkout: '2026-09-03', // Set the check-out date.
      },
      additionalneeds: 'None', // Set no additional needs.
    };

    const createResponse = await request.post(`${baseUrl}/booking`, { // Create a new booking to delete.
      data: newBooking, // Pass the booking data as the request body.
    });

    expect(createResponse.status()).toBe(200); // Check that the booking was created successfully.

    const createBody = await createResponse.json(); // Parse the create booking response.

    const bookingId = createBody.bookingid; // Store the ID of the created booking.

    const deleteResponse = await request.delete(`${baseUrl}/booking/${bookingId}`, { // Send a DELETE request to remove the booking.
      headers: { // Pass the request headers.
        Cookie: `token=${token}`, // Send the token in the Cookie header.
      },
    });

    expect(deleteResponse.status()).toBe(201); // Check that the delete returned status 201.

    const getDeletedBookingResponse = await request.get(`${baseUrl}/booking/${bookingId}`); // Attempt to fetch the deleted booking.

    expect(getDeletedBookingResponse.status()).toBe(404); // Check that the API returns 404, meaning the booking no longer exists.
  });
});