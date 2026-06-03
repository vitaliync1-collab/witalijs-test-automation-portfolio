import { test, expect } from '@playwright/test'; // Importujemy test i expect z Playwrighta.

const baseUrl = 'https://restful-booker.herokuapp.com'; // Zapisujemy bazowy adres API w jednej stałej.

test.describe('Restful Booker API - pierwsze proste testy pokazowe', () => { // Grupujemy pierwsze, najprostsze testy API.

  test('API odpowiada na endpoint /ping', async ({ request }) => { // Tworzymy bardzo prosty test sprawdzający działanie API.
    const response = await request.get(`${baseUrl}/ping`); // Wysyłamy request GET na endpoint /ping.

    expect(response.status()).toBe(201); // Sprawdzamy, czy odpowiedź ma status 201.
  });




  test('GET /booking zwraca body jako tablicę', async ({ request }) => { // Tworzymy test sprawdzający format body odpowiedzi.
    const response = await request.get(`${baseUrl}/booking`); // Wysyłamy request GET na endpoint /booking.

    expect(response.status()).toBe(200); // Sprawdzamy, czy odpowiedź ma status 200.

    const body = await response.json(); // Odczytujemy odpowiedź jako JSON.

    expect(Array.isArray(body)).toBe(true); // Sprawdzamy, czy body jest tablicą.
  });

  test('GET /booking zwraca przynajmniej jedną rezerwację', async ({ request }) => { // Tworzymy test sprawdzający, czy lista rezerwacji nie jest pusta.
    const response = await request.get(`${baseUrl}/booking`); // Wysyłamy request GET na endpoint /booking.

    expect(response.status()).toBe(200); // Sprawdzamy, czy odpowiedź ma status 200.

    const body = await response.json(); // Odczytujemy odpowiedź jako JSON.

    expect(body.length).toBeGreaterThan(0); // Sprawdzamy, czy tablica ma więcej niż zero elementów.
  });

  test('pierwsza rezerwacja z listy ma pole bookingid', async ({ request }) => { // Tworzymy test sprawdzający strukturę pierwszego elementu listy.
    const response = await request.get(`${baseUrl}/booking`); // Wysyłamy request GET na endpoint /booking.

    expect(response.status()).toBe(200); // Sprawdzamy, czy odpowiedź ma status 200.

    const body = await response.json(); // Odczytujemy odpowiedź jako JSON.

    expect(body[0]).toHaveProperty('bookingid'); // Sprawdzamy, czy pierwszy element ma pole bookingid.
  });




























  
  test('można pobrać szczegóły pierwszej rezerwacji z listy', async ({ request }) => { // Tworzymy test pokazujący zależność między dwoma requestami.
    const listResponse = await request.get(`${baseUrl}/booking`); // Pobieramy listę rezerwacji.

    expect(listResponse.status()).toBe(200); // Sprawdzamy, czy lista została pobrana poprawnie.

    const bookingList = await listResponse.json(); // Odczytujemy listę rezerwacji jako JSON.

    const bookingId = bookingList[0].bookingid; // Pobieramy bookingid pierwszej rezerwacji.

    const detailsResponse = await request.get(`${baseUrl}/booking/${bookingId}`); // Pobieramy szczegóły rezerwacji po jej ID.

    expect(detailsResponse.status()).toBe(200); // Sprawdzamy, czy szczegóły zostały pobrane poprawnie.

    const bookingDetails = await detailsResponse.json(); // Odczytujemy szczegóły rezerwacji jako JSON.

    expect(bookingDetails).toHaveProperty('firstname'); // Sprawdzamy, czy szczegóły zawierają pole firstname.
    expect(bookingDetails).toHaveProperty('lastname'); // Sprawdzamy, czy szczegóły zawierają pole lastname.
  });
});

test.describe('Restful Booker API - rozwiązania zadań', () => { // Grupujemy właściwe rozwiązania zadań.

  test('Zadanie 1: Sprawdzenie działania API', async ({ request }) => { // Tworzymy test sprawdzający endpoint /ping.
    const response = await request.get(`${baseUrl}/ping`); // Wysyłamy request GET na endpoint /ping.

    expect(response.status()).toBe(201); // Sprawdzamy, czy status odpowiedzi to 201.
  });

  test('Zadanie 2: Pobranie listy rezerwacji', async ({ request }) => { // Tworzymy test pobierający listę rezerwacji.
    const response = await request.get(`${baseUrl}/booking`); // Wysyłamy request GET na endpoint /booking.

    expect(response.status()).toBe(200); // Sprawdzamy, czy odpowiedź ma status 200.

    const body = await response.json(); // Odczytujemy body odpowiedzi jako JSON.

    expect(Array.isArray(body)).toBe(true); // Sprawdzamy, czy odpowiedź jest tablicą.
    expect(body.length).toBeGreaterThan(0); // Sprawdzamy, czy tablica nie jest pusta.
    expect(body[0]).toHaveProperty('bookingid'); // Sprawdzamy, czy pierwszy element tablicy ma pole bookingid.
  });

  test('Zadanie 3: Pobranie szczegółów rezerwacji', async ({ request }) => { // Tworzymy test pobierający szczegóły jednej rezerwacji.
    const bookingListResponse = await request.get(`${baseUrl}/booking`); // Pobieramy listę rezerwacji.

    expect(bookingListResponse.status()).toBe(200); // Sprawdzamy, czy lista rezerwacji została pobrana poprawnie.

    const bookingList = await bookingListResponse.json(); // Odczytujemy listę rezerwacji jako JSON.

    const bookingId = bookingList[0].bookingid; // Pobieramy bookingid pierwszej rezerwacji z listy.

    const bookingDetailsResponse = await request.get(`${baseUrl}/booking/${bookingId}`); // Pobieramy szczegóły konkretnej rezerwacji.

    expect(bookingDetailsResponse.status()).toBe(200); // Sprawdzamy, czy szczegóły zostały pobrane poprawnie.

    const bookingDetails = await bookingDetailsResponse.json(); // Odczytujemy szczegóły rezerwacji jako JSON.

    expect(bookingDetails).toHaveProperty('firstname'); // Sprawdzamy, czy odpowiedź zawiera pole firstname.
    expect(bookingDetails).toHaveProperty('lastname'); // Sprawdzamy, czy odpowiedź zawiera pole lastname.
    expect(bookingDetails).toHaveProperty('totalprice'); // Sprawdzamy, czy odpowiedź zawiera pole totalprice.
    expect(bookingDetails).toHaveProperty('depositpaid'); // Sprawdzamy, czy odpowiedź zawiera pole depositpaid.
    expect(bookingDetails).toHaveProperty('bookingdates'); // Sprawdzamy, czy odpowiedź zawiera pole bookingdates.
  });

  test('Zadanie 4: Utworzenie nowej rezerwacji', async ({ request }) => { // Tworzymy test tworzący nową rezerwację.
    const newBooking = { // Przygotowujemy dane nowej rezerwacji.
      firstname: 'Jan', // Ustawiamy imię klienta.
      lastname: 'Kowalski', // Ustawiamy nazwisko klienta.
      totalprice: 499, // Ustawiamy cenę rezerwacji.
      depositpaid: true, // Ustawiamy informację, że zaliczka została opłacona.
      bookingdates: { // Tworzymy obiekt z datami rezerwacji.
        checkin: '2026-06-01', // Ustawiamy datę zameldowania.
        checkout: '2026-06-07', // Ustawiamy datę wymeldowania.
      },
      additionalneeds: 'Breakfast', // Ustawiamy dodatkową potrzebę klienta.
    };

    const response = await request.post(`${baseUrl}/booking`, { // Wysyłamy request POST tworzący nową rezerwację.
      data: newBooking, // Przekazujemy dane rezerwacji jako body requestu.
    });

    expect(response.status()).toBe(200); // Sprawdzamy, czy rezerwacja została utworzona poprawnie.

    const body = await response.json(); // Odczytujemy odpowiedź jako JSON.

    expect(body).toHaveProperty('bookingid'); // Sprawdzamy, czy odpowiedź zawiera bookingid.
    expect(body.booking.firstname).toBe(newBooking.firstname); // Sprawdzamy, czy imię w odpowiedzi jest poprawne.
    expect(body.booking.lastname).toBe(newBooking.lastname); // Sprawdzamy, czy nazwisko w odpowiedzi jest poprawne.
    expect(body.booking.totalprice).toBe(newBooking.totalprice); // Sprawdzamy, czy cena w odpowiedzi jest poprawna.
    expect(body.booking.depositpaid).toBe(newBooking.depositpaid); // Sprawdzamy, czy informacja o zaliczce jest poprawna.
    expect(body.booking.bookingdates.checkin).toBe(newBooking.bookingdates.checkin); // Sprawdzamy datę zameldowania.
    expect(body.booking.bookingdates.checkout).toBe(newBooking.bookingdates.checkout); // Sprawdzamy datę wymeldowania.
    expect(body.booking.additionalneeds).toBe(newBooking.additionalneeds); // Sprawdzamy dodatkową potrzebę klienta.
  });

  test('Zadanie 5: Utworzenie tokena', async ({ request }) => { // Tworzymy test pobierający token autoryzacyjny.
    const response = await request.post(`${baseUrl}/auth`, { // Wysyłamy request POST na endpoint /auth.
      data: { // Przekazujemy dane logowania w body requestu.
        username: 'admin', // Ustawiamy login użytkownika.
        password: 'password123', // Ustawiamy hasło użytkownika.
      },
    });

    expect(response.status()).toBe(200); // Sprawdzamy, czy token został utworzony poprawnie.

    const body = await response.json(); // Odczytujemy odpowiedź jako JSON.

    expect(body).toHaveProperty('token'); // Sprawdzamy, czy odpowiedź zawiera pole token.
    expect(typeof body.token).toBe('string'); // Sprawdzamy, czy token jest tekstem.
    expect(body.token.length).toBeGreaterThan(0); // Sprawdzamy, czy token nie jest pusty.
  });

  test('Zadanie 6: Utworzenie i pobranie rezerwacji', async ({ request }) => { // Tworzymy test tworzący i pobierający rezerwację.
    const newBooking = { // Przygotowujemy dane nowej rezerwacji.
      firstname: 'Anna', // Ustawiamy imię klienta.
      lastname: 'Nowak', // Ustawiamy nazwisko klienta.
      totalprice: 350, // Ustawiamy cenę rezerwacji.
      depositpaid: false, // Ustawiamy informację, że zaliczka nie została opłacona.
      bookingdates: { // Tworzymy obiekt z datami rezerwacji.
        checkin: '2026-07-10', // Ustawiamy datę zameldowania.
        checkout: '2026-07-15', // Ustawiamy datę wymeldowania.
      },
      additionalneeds: 'Lunch', // Ustawiamy dodatkową potrzebę klienta.
    };

    const createResponse = await request.post(`${baseUrl}/booking`, { // Wysyłamy request POST tworzący nową rezerwację.
      data: newBooking, // Przekazujemy dane rezerwacji jako body requestu.
    });

    expect(createResponse.status()).toBe(200); // Sprawdzamy, czy rezerwacja została utworzona poprawnie.

    const createBody = await createResponse.json(); // Odczytujemy odpowiedź po utworzeniu rezerwacji jako JSON.

    const bookingId = createBody.bookingid; // Zapisujemy ID nowo utworzonej rezerwacji.

    expect(bookingId).toBeTruthy(); // Sprawdzamy, czy bookingId istnieje.

    const getResponse = await request.get(`${baseUrl}/booking/${bookingId}`); // Pobieramy utworzoną rezerwację po ID.

    expect(getResponse.status()).toBe(200); // Sprawdzamy, czy pobranie rezerwacji zakończyło się sukcesem.

    const booking = await getResponse.json(); // Odczytujemy pobraną rezerwację jako JSON.

    expect(booking.firstname).toBe(newBooking.firstname); // Sprawdzamy, czy imię jest poprawne.
    expect(booking.lastname).toBe(newBooking.lastname); // Sprawdzamy, czy nazwisko jest poprawne.
    expect(booking.totalprice).toBe(newBooking.totalprice); // Sprawdzamy, czy cena jest poprawna.
    expect(booking.depositpaid).toBe(newBooking.depositpaid); // Sprawdzamy, czy informacja o zaliczce jest poprawna.
    expect(booking.bookingdates.checkin).toBe(newBooking.bookingdates.checkin); // Sprawdzamy datę zameldowania.
    expect(booking.bookingdates.checkout).toBe(newBooking.bookingdates.checkout); // Sprawdzamy datę wymeldowania.
    expect(booking.additionalneeds).toBe(newBooking.additionalneeds); // Sprawdzamy dodatkową potrzebę klienta.
  });

  test('Zadanie 7: Aktualizacja rezerwacji', async ({ request }) => { // Tworzymy test aktualizujący rezerwację.
    const authResponse = await request.post(`${baseUrl}/auth`, { // Wysyłamy request POST po token autoryzacyjny.
      data: { // Przekazujemy dane logowania.
        username: 'admin', // Ustawiamy login użytkownika.
        password: 'password123', // Ustawiamy hasło użytkownika.
      },
    });

    expect(authResponse.status()).toBe(200); // Sprawdzamy, czy token został utworzony poprawnie.

    const authBody = await authResponse.json(); // Odczytujemy odpowiedź z tokenem jako JSON.

    const token = authBody.token; // Zapisujemy token do zmiennej.

    const newBooking = { // Przygotowujemy dane początkowej rezerwacji.
      firstname: 'Piotr', // Ustawiamy imię klienta.
      lastname: 'Testowy', // Ustawiamy nazwisko klienta.
      totalprice: 600, // Ustawiamy początkową cenę.
      depositpaid: true, // Ustawiamy informację, że zaliczka została opłacona.
      bookingdates: { // Tworzymy obiekt z początkowymi datami.
        checkin: '2026-08-01', // Ustawiamy początkową datę zameldowania.
        checkout: '2026-08-05', // Ustawiamy początkową datę wymeldowania.
      },
      additionalneeds: 'Breakfast', // Ustawiamy początkową dodatkową potrzebę.
    };

    const createResponse = await request.post(`${baseUrl}/booking`, { // Tworzymy rezerwację, którą zaraz zaktualizujemy.
      data: newBooking, // Przekazujemy dane początkowej rezerwacji.
    });

    expect(createResponse.status()).toBe(200); // Sprawdzamy, czy rezerwacja została utworzona poprawnie.

    const createBody = await createResponse.json(); // Odczytujemy odpowiedź po utworzeniu rezerwacji.

    const bookingId = createBody.bookingid; // Zapisujemy ID utworzonej rezerwacji.

    const updatedBookingData = { // Przygotowujemy nowe dane rezerwacji.
      firstname: 'Piotr', // Ustawiamy imię klienta.
      lastname: 'Zaktualizowany', // Ustawiamy nowe nazwisko klienta.
      totalprice: 750, // Ustawiamy nową cenę.
      depositpaid: false, // Ustawiamy nową informację o zaliczce.
      bookingdates: { // Tworzymy obiekt z nowymi datami.
        checkin: '2026-08-02', // Ustawiamy nową datę zameldowania.
        checkout: '2026-08-06', // Ustawiamy nową datę wymeldowania.
      },
      additionalneeds: 'Dinner', // Ustawiamy nową dodatkową potrzebę.
    };

    const updateResponse = await request.put(`${baseUrl}/booking/${bookingId}`, { // Wysyłamy request PUT aktualizujący rezerwację.
      headers: { // Przekazujemy nagłówki requestu.
        Cookie: `token=${token}`, // Przekazujemy token w nagłówku Cookie.
      },
      data: updatedBookingData, // Przekazujemy nowe dane rezerwacji jako body requestu.
    });

    expect(updateResponse.status()).toBe(200); // Sprawdzamy, czy aktualizacja zakończyła się sukcesem.

    const updatedBooking = await updateResponse.json(); // Odczytujemy odpowiedź po aktualizacji jako JSON.

    expect(updatedBooking.firstname).toBe(updatedBookingData.firstname); // Sprawdzamy, czy imię jest poprawne.
    expect(updatedBooking.lastname).toBe(updatedBookingData.lastname); // Sprawdzamy, czy nazwisko zostało zaktualizowane.
    expect(updatedBooking.totalprice).toBe(updatedBookingData.totalprice); // Sprawdzamy, czy cena została zaktualizowana.
    expect(updatedBooking.depositpaid).toBe(updatedBookingData.depositpaid); // Sprawdzamy, czy informacja o zaliczce została zaktualizowana.
    expect(updatedBooking.bookingdates.checkin).toBe(updatedBookingData.bookingdates.checkin); // Sprawdzamy nową datę zameldowania.
    expect(updatedBooking.bookingdates.checkout).toBe(updatedBookingData.bookingdates.checkout); // Sprawdzamy nową datę wymeldowania.
    expect(updatedBooking.additionalneeds).toBe(updatedBookingData.additionalneeds); // Sprawdzamy nową dodatkową potrzebę.
  });

  test('Zadanie 8: Usunięcie rezerwacji', async ({ request }) => { // Tworzymy test usuwający rezerwację.
    const authResponse = await request.post(`${baseUrl}/auth`, { // Wysyłamy request POST po token autoryzacyjny.
      data: { // Przekazujemy dane logowania.
        username: 'admin', // Ustawiamy login użytkownika.
        password: 'password123', // Ustawiamy hasło użytkownika.
      },
    });

    expect(authResponse.status()).toBe(200); // Sprawdzamy, czy token został utworzony poprawnie.

    const authBody = await authResponse.json(); // Odczytujemy odpowiedź z tokenem jako JSON.

    const token = authBody.token; // Zapisujemy token do zmiennej.

    const newBooking = { // Przygotowujemy dane rezerwacji, którą później usuniemy.
      firstname: 'Marta', // Ustawiamy imię klienta.
      lastname: 'Usuwana', // Ustawiamy nazwisko klienta.
      totalprice: 300, // Ustawiamy cenę rezerwacji.
      depositpaid: true, // Ustawiamy informację, że zaliczka została opłacona.
      bookingdates: { // Tworzymy obiekt z datami rezerwacji.
        checkin: '2026-09-01', // Ustawiamy datę zameldowania.
        checkout: '2026-09-03', // Ustawiamy datę wymeldowania.
      },
      additionalneeds: 'None', // Ustawiamy brak dodatkowych potrzeb.
    };

    const createResponse = await request.post(`${baseUrl}/booking`, { // Tworzymy nową rezerwację do usunięcia.
      data: newBooking, // Przekazujemy dane rezerwacji jako body requestu.
    });

    expect(createResponse.status()).toBe(200); // Sprawdzamy, czy rezerwacja została utworzona poprawnie.

    const createBody = await createResponse.json(); // Odczytujemy odpowiedź po utworzeniu rezerwacji.

    const bookingId = createBody.bookingid; // Zapisujemy ID utworzonej rezerwacji.

    const deleteResponse = await request.delete(`${baseUrl}/booking/${bookingId}`, { // Wysyłamy request DELETE usuwający rezerwację.
      headers: { // Przekazujemy nagłówki requestu.
        Cookie: `token=${token}`, // Przekazujemy token w nagłówku Cookie.
      },
    });

    expect(deleteResponse.status()).toBe(201); // Sprawdzamy, czy usunięcie zakończyło się statusem 201.

    const getDeletedBookingResponse = await request.get(`${baseUrl}/booking/${bookingId}`); // Próbujemy pobrać usuniętą rezerwację.

    expect(getDeletedBookingResponse.status()).toBe(404); // Sprawdzamy, czy API zwraca 404, czyli rezerwacja nie istnieje.
  });
});