# MovieHub — Online Movie Booking Website
React + Vite + Axios frontend · PHP procedural mysqli backend · MySQL · XAMPP

## 1. Project structure

```
movie-booking/
├── backend/
│   ├── db.php
│   ├── movies.php
│   ├── movie_details.php
│   ├── theatres.php
│   ├── shows.php
│   ├── seats.php
│   ├── register.php
│   ├── login.php
│   ├── book_ticket.php
│   ├── my_bookings.php
│   ├── cancel_booking.php
│   └── movies.sql
└── frontend/
    ├── src/
    │   ├── App.jsx
    │   ├── App.css
    │   └── main.jsx
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## 2. Data flow (the big picture)

```
React (App.jsx)
   ↓  user clicks a button
Axios (axios.get / axios.post)
   ↓  HTTP request to http://localhost/movie-booking/backend/...
PHP API file (e.g. book_ticket.php)
   ↓  reads $_GET or JSON body
mysqli (mysqli_query, mysqli_fetch_assoc, ...)
   ↓  talks to
MySQL (movie_booking_db)
   ↓  returns rows
PHP builds a PHP array and does echo json_encode(...)
   ↓  JSON response
Axios receives res.data
   ↓
React setState(...)
   ↓
Website UI re-renders
```

## 3. Setup instructions (step by step)

1. **Install XAMPP** from apachefriends.org and run the installer.
2. Open the **XAMPP Control Panel** and click **Start** next to **Apache**.
3. Click **Start** next to **MySQL**.
4. Copy the `backend` folder into your XAMPP web root, so the path is:
   `C:/xampp/htdocs/movie-booking/backend/` (Windows) or
   `/Applications/XAMPP/htdocs/movie-booking/backend/` (Mac).
5. Open **phpMyAdmin**: go to `http://localhost/phpmyadmin` in your browser.
6. Click **Import**, choose `backend/movies.sql`, and click **Go**. This creates the
   `movie_booking_db` database, all 7 tables, and the sample data.
7. Test the backend directly (see section 4 below) before touching React.
8. Create the React app: open a terminal in the `frontend` folder and run
   `npm install` (this reads `package.json` and installs React, Vite, Axios).
9. Start the React dev server: `npm run dev`.
10. Open the URL Vite prints, usually `http://localhost:5173/`.

**Two different URLs matter here:**
- `http://localhost/movie-booking/backend/...` → Apache serving your PHP files directly.
- `http://localhost:5173/` → Vite's development server serving your React app.
  React's Axios calls reach across to the Apache URL for data - that's exactly
  why `db.php` needs CORS headers.

### Replacing the placeholder posters
`movies.sql` stores poster values like `posters/silent-horizon.jpg`. To use real
images: create a `frontend/public/posters/` folder, drop your own `.jpg`/`.png`
files in it with matching names, and they'll be served automatically by Vite at
`http://localhost:5173/posters/silent-horizon.jpg`. Or simplest of all, just
paste any image URL directly into the `poster` column via phpMyAdmin.

## 4. Test each PHP file before testing React

Open these directly in your browser - each should show raw JSON, not an error page:

- `http://localhost/movie-booking/backend/movies.php` → `{"success":true,"movies":[...]}`
- `http://localhost/movie-booking/backend/movie_details.php?id=1`
- `http://localhost/movie-booking/backend/theatres.php?movie_id=1`
- `http://localhost/movie-booking/backend/seats.php?show_id=1`

If any of these fail, fix that before starting React - React can't succeed if the
API it's calling doesn't work on its own.

## 5. Watching it work in the browser Network tab

1. Open the website, press **F12**, click the **Network** tab.
2. Click a movie → you'll see a request to `movie_details.php` and `theatres.php`.
3. Select a show → a request to `seats.php`.
4. Select seats and click **Proceed to Booking** → a POST request to `book_ticket.php`.
5. Click on that request and check its **Payload** (what Axios sent) and
   **Response** (the JSON PHP sent back). This is React → Axios → PHP → MySQL →
   PHP → Axios → React happening in front of you.

## 6. API table

| React action     | Axios call    | PHP file             | SQL operation     | Purpose                       |
|-------------------|--------------|-----------------------|--------------------|--------------------------------|
| Load movies       | axios.get()  | movies.php            | SELECT             | Get all movies                |
| Movie details      | axios.get()  | movie_details.php     | SELECT             | Get one movie                 |
| Load theatres/shows| axios.get()  | theatres.php          | SELECT + JOIN      | Theatres & shows for a movie  |
| Show details        | axios.get()  | shows.php              | SELECT + JOIN      | Full details of one show      |
| Load seats         | axios.get()  | seats.php              | SELECT             | Seat layout for a show        |
| Register           | axios.post() | register.php           | SELECT + INSERT    | Create user (hashed password) |
| Login              | axios.post() | login.php               | SELECT             | Verify credentials             |
| Book ticket         | axios.post() | book_ticket.php         | SELECT + INSERT + UPDATE | Create booking, mark seats booked |
| My bookings         | axios.get()  | my_bookings.php         | SELECT + JOIN      | Get a user's booking history  |
| Cancel booking       | axios.post() | cancel_booking.php      | UPDATE             | Cancel booking, free seats    |

## 7. Common errors & fixes

| Error | Likely cause | Fix |
|---|---|---|
| "localhost refused to connect" | Apache not running | Start Apache in XAMPP Control Panel |
| PHP file gives 404 | Wrong folder path | Confirm files are in `htdocs/movie-booking/backend/` |
| CORS error in console | Missing/wrong CORS header | Confirm `db.php` sends `Access-Control-Allow-Origin` and is included first |
| "Database connection failed" | MySQL not running, or wrong credentials in db.php | Start MySQL; check `$db_user`/`$db_pass` |
| "Unknown database" | movies.sql not imported | Re-import `movies.sql` in phpMyAdmin |
| "Unknown table" | Import partially failed | Drop the database and re-import fully |
| Axios request failed / Network Error | Backend not reachable, or wrong API_BASE URL | Check `API_BASE` in App.jsx matches your folder path |
| React page is blank | JS error - check browser console | Read the console error, check spelling of file/prop names |
| `npm` command not found | Node.js not installed | Install Node.js from nodejs.org |
| Port 5173 already in use | Another Vite server still running | Close the other terminal, or let Vite pick a new port |
| Duplicate email on register | Email already exists in `users` | Use a different email or log in instead |
| "This seat is no longer available" | Someone else booked it first | Pick a different seat - this is the server double-check working correctly |
| JSON parsing error | PHP printed something before the JSON (e.g. a warning) | Fix the PHP error so only `json_encode(...)` is output |
| PHP warning instead of JSON | Backend error not being handled | Check `mysqli_error($conn)` messages, fix the query |

## 8. Checklist

- [ ] XAMPP Apache is running
- [ ] XAMPP MySQL is running
- [ ] Database exists
- [ ] movies table contains sample data
- [ ] movies.php returns JSON
- [ ] Movie cards appear
- [ ] Search works
- [ ] Movie details appear
- [ ] Theatre list appears
- [ ] Shows appear
- [ ] Seats appear
- [ ] Booked seats cannot be selected
- [ ] Selected seats are visually different
- [ ] Total price is calculated
- [ ] Registration works
- [ ] Login works
- [ ] Booking is stored in MySQL
- [ ] Booking confirmation appears
- [ ] My Bookings loads from MySQL
- [ ] Cancellation works
- [ ] Cancelled seats become available again
- [ ] Refreshing the browser still shows database data

## 9. Questions answered

**1. Why does PHP need `header("Access-Control-Allow-Origin: *")`?**
React (port 5173) and PHP (port 80) count as different origins to the browser.
This header tells the browser it's OK for a page from another origin to read
this response.

**2. What would happen without the CORS header?**
The browser would block the response before React ever sees it, and Axios
would fail with a CORS error in the console - even though the PHP code itself
ran fine on the server.

**3. Why can't PHP simply use `$_POST` when Axios sends JSON?**
`$_POST` only understands classic HTML-form-encoded data
(`key=value&key2=value2`). Axios sends a raw JSON string as the request body,
which PHP has to read and decode manually.

**4. Why does PHP use `json_decode(file_get_contents("php://input"), true)`?**
`file_get_contents("php://input")` reads the raw body of the request exactly
as it arrived. `json_decode(..., true)` turns that JSON text into a normal PHP
associative array we can work with.

**5. Why should React reload data from the database instead of only changing
the React array?**
The database is the single source of truth. If React only edits its own copy,
the screen can drift out of sync with what's actually stored - e.g. after a
booking, another user might also affect seat status, or a refresh would show
stale data.

**6. What does `[]` in `useEffect(() => {...}, [])` mean?**
It's the dependency list. An empty list means "nothing this effect depends on
ever changes," so React only runs it once, right after the first render -
perfect for loading initial data like the movie list.

**7. Why should the backend check seat availability even if React says the
seat is available?**
The browser's copy of the seat list can be seconds or minutes old. Another
user could have booked that seat since React last loaded it. Only the
database, checked at the moment of booking, knows the true current state.

**8. Why mark a booking "cancelled" instead of deleting it?**
Deleting the row destroys the booking history - useful for the user, for
support/refund questions, and for auditing. Keeping the row with a status
field preserves that history while still freeing the seats.

**9. Why are prepared statements safer than putting variables directly into SQL?**
Prepared statements separate the SQL structure from the data values, so user
input is never interpreted as part of the SQL command itself. That closes off
SQL injection, where a malicious value could otherwise change the meaning of
the query.

**10. What could happen if two users try to book the same seat at almost the
same time?**
Both could pass the "is this seat available?" check before either one's
booking is written, and both end up thinking they successfully booked the
same seat - a race condition. Production systems prevent this with database
transactions and row locking (or a unique constraint) so only one booking can
ever succeed for a given seat.

**11. What is the role of Axios in this project?**
It's the messenger: it sends HTTP requests from React to the PHP backend
(GET for reading, POST for writing) and hands the JSON response back to React.

**12. What is the role of PHP?**
It's the business logic layer: it receives requests, validates data, talks to
MySQL, and returns JSON responses.

**13. What is the role of MySQL?**
It's the persistent storage: every movie, theatre, show, seat, user, and
booking record lives there, independent of whether the browser is open.

**14. Explain the complete path of a booking request.**
The user selects seats and clicks "Proceed to Booking" in React → Axios sends
a POST request with `user_id`, `show_id`, and `seat_ids` as JSON →
`book_ticket.php` decodes that JSON → it re-checks the seats' status with
mysqli queries against MySQL → if all are available, it inserts a `bookings`
row, links seats in `booking_seats`, and updates each seat's status to
`booked` → it returns a JSON success response with the booking ID and total →
Axios receives that response → React updates its state to show the
confirmation screen.

## 10. Security note (read this)

This project intentionally uses `mysqli_real_escape_string()` for most queries
and inserts numeric IDs directly after `intval()`, to stay beginner-friendly.
A real production system should use **prepared statements** for every query
built from user input:

```php
$stmt = mysqli_prepare($conn, "SELECT * FROM users WHERE email = ?");
mysqli_stmt_bind_param($stmt, "s", $email);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);
```

A commercial movie-booking site would also need: sessions or JWT-based
authentication (not just localStorage), CSRF protection, input validation on
every field, transaction handling + row locking for seat booking, a real
payment gateway, HTTPS, and rate limiting. None of that is implemented here -
this project is a learning tool for the React ↔ PHP ↔ MySQL data flow.

## 11. Optional improvements (increasing difficulty)

1. **Genre filtering** - add a dropdown, filter `movies` client-side by genre.
2. **Language filtering** - same idea, filter by language.
3. **Sort by rating** - add a "Sort" control and `Array.sort()` on `movies`.
4. **"Coming Soon" section** - filter movies where `status !== 'Released'`.
5. **Trailer links** - add a `trailer_url` column, embed a YouTube iframe.
6. **Booking history page** - already partly covered by My Bookings; add filters by date.
7. **User profile page** - let users update name/mobile via a new `update_profile.php`.
8. **Admin login** - add an `is_admin` column to `users`, gate an admin view.
9. **Admin movie CRUD** - add `add_movie.php`, `update_movie.php`, `delete_movie.php`.
10. **Theatre management** - CRUD endpoints for the `theatres` table.
11. **Show management** - CRUD endpoints for the `shows` table.
12. **Prepared statements everywhere** - rewrite each query as shown in section 10.
13. **Database transactions for booking** - wrap the seat-check + insert + update
    steps in `mysqli_begin_transaction()` / `mysqli_commit()` / `mysqli_rollback()`.
14. **Stronger authentication** - move to PHP sessions or JWT instead of localStorage.
15. **Real payment gateway** - integrate a sandbox payment provider as a future step.
