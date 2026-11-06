# COMPLETE PROMPT — Online Movie Booking Website
# React + Vite + Axios | PHP Procedural mysqli | MySQL | XAMPP
# Copy everything below this line and paste it into Claude / ChatGPT / Gemini

---

You are going to build me a **complete, fully working, beginner-friendly, full-stack Online Movie Booking Website** that runs locally on **XAMPP**.

I am a college student doing a practical assignment. The code must be plain, simple, well-commented, and work without any errors. Follow every instruction below exactly.

---

## ════════════════════════════════════════════
## TECHNOLOGY STACK — STRICT RULES
## ════════════════════════════════════════════

### Frontend
- React 18, created with **Vite** (use `npm create vite@latest`)
- Plain JavaScript / JSX only — NO TypeScript
- **Axios** for all HTTP calls (install with `npm install axios`)
- React `useState` and `useEffect` hooks only
- Plain CSS in `App.css` — NO Bootstrap, NO Tailwind, NO Material UI, NO Ant Design, NO any CSS library

### Backend
- **PHP** only
- **Procedural mysqli** only — `mysqli_connect()`, `mysqli_query()`, `mysqli_fetch_assoc()`, etc.
- **NO PDO**, **NO `new mysqli()`**, **NO object-oriented mysqli**, **NO Laravel**, **NO Node.js**, **NO Express.js**

### Database
- MySQL via XAMPP
- Database name: `movie_booking_db`

### Server
- XAMPP (Apache + MySQL)

---

## ════════════════════════════════════════════
## STRICT CODING RULES — FOLLOW EXACTLY
## ════════════════════════════════════════════

1. Use **procedural mysqli only**. Examples:
   - `$conn = mysqli_connect(...)`
   - `mysqli_query($conn, $sql)`
   - `mysqli_fetch_assoc($result)`
   - `mysqli_num_rows($result)`
   - `mysqli_close($conn)`

2. Create **one PHP file per API operation** — never put all operations in one file.

3. Every PHP operation file must begin with:
   ```php
   <?php
   include 'db.php';
   ```

4. **Axios rules** — use exactly:
   - `axios.get()` for all read/GET operations
   - `axios.post()` for create, update, booking, cancellation, login, register
   - **NEVER use** `axios.put()`, `axios.delete()`, `axios.patch()`, or the `fetch()` API

5. PHP must read JSON data sent by Axios like this:
   ```php
   $data = json_decode(file_get_contents("php://input"), true);
   ```

6. Every PHP file must return a JSON response using `echo json_encode(...)`.

7. **db.php** must set CORS headers and JSON Content-Type so React (port 5173) can talk to PHP (port 80).

8. Keep **all React code inside `App.jsx`** — do not split into separate component files unless absolutely necessary.

9. Do not use TypeScript. Use `.jsx`, `.js`, `.php`, `.css`, `.sql` only.

10. Add a short comment above every function and above every important SQL query.

11. Keep code simple enough for a beginner to read and understand.

---

## ════════════════════════════════════════════
## COMPLETE FOLDER STRUCTURE — BUILD EXACTLY THIS
## ════════════════════════════════════════════

```
movie-booking/
│
├── backend/                        ← copy into C:/xampp/htdocs/movie-booking/backend/
│   ├── db.php                      ← DB connection + CORS + JSON headers
│   ├── movies.php                  ← GET: all movies
│   ├── movie_details.php           ← GET: one movie by ?id=
│   ├── theatres.php                ← GET: theatres + shows for a movie by ?movie_id=
│   ├── shows.php                   ← GET: one show details by ?id=
│   ├── seats.php                   ← GET: seat layout for a show by ?show_id=
│   ├── register.php                ← POST: register new user
│   ├── login.php                   ← POST: check credentials
│   ├── book_ticket.php             ← POST: create booking
│   ├── my_bookings.php             ← GET: booking history for ?user_id=
│   ├── cancel_booking.php          ← POST: cancel a booking
│   └── movies.sql                  ← Import this in phpMyAdmin first
│
└── frontend/                       ← run `npm install` then `npm run dev` here
    ├── src/
    │   ├── App.jsx                 ← all React code lives here
    │   ├── App.css                 ← all CSS lives here
    │   └── main.jsx                ← React entry point (do not change)
    ├── index.html
    ├── package.json
    └── vite.config.js
```

---

## ════════════════════════════════════════════
## DATABASE — CREATE EXACTLY THESE TABLES
## ════════════════════════════════════════════

Database name: `movie_booking_db`

### Table 1: `users`
```sql
id        INT PRIMARY KEY AUTO_INCREMENT
name      VARCHAR(100) NOT NULL
email     VARCHAR(100) UNIQUE NOT NULL
mobile    VARCHAR(15) NOT NULL
password  VARCHAR(255) NOT NULL   -- always store bcrypt hash, never plain text
```

### Table 2: `movies`
```sql
id            INT PRIMARY KEY AUTO_INCREMENT
title         VARCHAR(150) NOT NULL
description   TEXT
genre         VARCHAR(100)
language      VARCHAR(50)
duration      INT            -- minutes
release_date  DATE
poster        VARCHAR(255)   -- file path or URL
rating        DECIMAL(3,1)
status        VARCHAR(20)    -- 'Released' or 'Coming Soon'
```

### Table 3: `theatres`
```sql
id        INT PRIMARY KEY AUTO_INCREMENT
name      VARCHAR(150) NOT NULL
location  VARCHAR(200) NOT NULL
```

### Table 4: `shows`
```sql
id            INT PRIMARY KEY AUTO_INCREMENT
movie_id      INT NOT NULL   -- FK → movies.id
theatre_id    INT NOT NULL   -- FK → theatres.id
show_date     DATE NOT NULL
show_time     TIME NOT NULL
ticket_price  DECIMAL(10,2) NOT NULL
```

### Table 5: `seats`
```sql
id           INT PRIMARY KEY AUTO_INCREMENT
show_id      INT NOT NULL    -- FK → shows.id
seat_number  VARCHAR(10) NOT NULL
status       VARCHAR(20) DEFAULT 'available'  -- 'available' or 'booked'
```

### Table 6: `bookings`
```sql
id              INT PRIMARY KEY AUTO_INCREMENT
user_id         INT NOT NULL    -- FK → users.id
show_id         INT NOT NULL    -- FK → shows.id
booking_date    DATETIME NOT NULL
total_amount    DECIMAL(10,2) NOT NULL
booking_status  VARCHAR(20) DEFAULT 'confirmed'  -- 'confirmed' or 'cancelled'
```

### Table 7: `booking_seats`
```sql
id          INT PRIMARY KEY AUTO_INCREMENT
booking_id  INT NOT NULL   -- FK → bookings.id
seat_id     INT NOT NULL   -- FK → seats.id
```

---

## ════════════════════════════════════════════
## movies.sql — PROVIDE THE COMPLETE FILE
## ════════════════════════════════════════════

The file must:
1. `CREATE DATABASE IF NOT EXISTS movie_booking_db;`
2. `USE movie_booking_db;`
3. `CREATE TABLE` all 7 tables with correct data types, foreign keys, defaults
4. `INSERT` at least 5 fictional sample movies with realistic data
5. `INSERT` at least 3 sample theatres
6. `INSERT` sample shows (multiple shows per movie across different theatres, dates, times)
7. `INSERT` seats for every show — use a 4-row × 5-seat grid (A1–D5 = 20 seats per show) using a cross-join or loop
8. Mark 2 seats in show 1 as `status = 'booked'` so the seat grid shows a realistic mix
9. `INSERT` one sample user row — but note that its password is a placeholder; instruct the user to register a real account via the website

For poster values, use placeholder paths like `posters/movie-name.jpg` and explain in a comment how to replace them with real images.

---

## ════════════════════════════════════════════
## BACKEND PHP FILES — BUILD ALL OF THESE
## ════════════════════════════════════════════

### db.php
Must do all of the following:
- Send `header("Access-Control-Allow-Origin: *");`
- Send `header("Access-Control-Allow-Methods: GET, POST, OPTIONS");`
- Send `header("Access-Control-Allow-Headers: Content-Type");`
- Send `header("Content-Type: application/json");`
- Handle the browser OPTIONS preflight request by returning 200 and exiting
- Connect with: `$conn = mysqli_connect("localhost", "root", "", "movie_booking_db");`
- Check if connection failed and return a JSON error if so
- Include a clear comment explaining WHY CORS headers are needed (different localhost ports)

### movies.php
- `axios.get()` endpoint
- Run `SELECT * FROM movies ORDER BY release_date DESC`
- Return: `{"success": true, "movies": [...]}`

### movie_details.php
- `axios.get()` endpoint, reads `$_GET['id']`
- Use `intval()` to sanitise the id
- Return one movie or a JSON error if not found

### theatres.php
- `axios.get()` endpoint, reads `$_GET['movie_id']`
- `JOIN shows s ON s.theatre_id = t.id` — get all theatres that have shows for this movie
- Group results by theatre so the response is:
  ```json
  {"success": true, "theatres": [
    {
      "theatre_id": 1,
      "theatre_name": "...",
      "location": "...",
      "shows": [
        {"show_id": 1, "show_date": "...", "show_time": "...", "ticket_price": "..."}
      ]
    }
  ]}
  ```

### shows.php
- `axios.get()` endpoint, reads `$_GET['id']`
- JOIN shows → movies → theatres so one query returns everything
- Return full show details including movie title, theatre name, poster

### seats.php
- `axios.get()` endpoint, reads `$_GET['show_id']`
- Return all seats for that show with their current status
- Return: `{"success": true, "seats": [{"id": 1, "seat_number": "A1", "status": "available"}, ...]}`

### register.php
- `axios.post()` endpoint
- Read body with `json_decode(file_get_contents("php://input"), true)`
- Validate all fields server-side (not just in React)
- Check for duplicate email before inserting
- Hash password with `password_hash($password, PASSWORD_DEFAULT)`
- Use `mysqli_real_escape_string()` on string inputs
- Return success/error JSON

### login.php
- `axios.post()` endpoint
- Read email + password from JSON body
- Find user by email using `mysqli_real_escape_string()`
- Verify password with `password_verify($password, $row['password'])`
- On success, return user object WITHOUT the password field
- Same error message for "email not found" and "wrong password" (security)

### book_ticket.php
- `axios.post()` endpoint
- Read `user_id`, `show_id`, `seat_ids` (array) from JSON body
- Validate all three are present and non-empty
- Convert every seat id with `intval()` and build a safe comma-separated list
- **Re-check seat availability from the database** — do not trust what React says
- If any seat is already booked, return an error listing which seats
- Get ticket_price from the `shows` table and calculate `total_amount`
- Insert into `bookings` and get the new booking id with `mysqli_insert_id()`
- Loop through seat ids: insert each into `booking_seats`, then `UPDATE seats SET status = 'booked'`
- Return `{"success": true, "message": "Booking confirmed successfully!", "booking_id": ..., "total_amount": ...}`
- Add a comment explaining the race condition problem and how production systems use transactions

### my_bookings.php
- `axios.get()` endpoint, reads `$_GET['user_id']`
- JOIN bookings → shows → movies → theatres in one query
- For each booking, run a second query to get its seat numbers from `booking_seats` JOIN `seats`
- Return array of bookings, each with a `seats` array of seat number strings

### cancel_booking.php
- `axios.post()` endpoint
- Read `booking_id` from JSON body
- Check booking exists and is not already cancelled
- `UPDATE bookings SET booking_status = 'cancelled'`
- Get all seat ids from `booking_seats` and `UPDATE seats SET status = 'available'` for each
- Do NOT delete the booking row — explain why in a comment
- Return success/error JSON

---

## ════════════════════════════════════════════
## FRONTEND — App.jsx REQUIREMENTS
## ════════════════════════════════════════════

Put **all React code in App.jsx**. Use a single `page` state string to show/hide sections instead of a routing library. Possible page values: `"home"`, `"details"`, `"seats"`, `"confirmation"`, `"login"`, `"register"`, `"mybookings"`.

### At the top of App.jsx, define:
```js
const API_BASE = "http://localhost/movie-booking/backend";
```

### State variables required (declare all with useState):
```js
const [page, setPage] = useState("home");
const [message, setMessage] = useState("");       // temporary banner message
const [user, setUser] = useState(null);            // logged-in user object
const [movies, setMovies] = useState([]);
const [searchTerm, setSearchTerm] = useState("");
const [selectedMovie, setSelectedMovie] = useState(null);
const [theatres, setTheatres] = useState([]);
const [selectedShow, setSelectedShow] = useState(null);
const [seats, setSeats] = useState([]);
const [selectedSeatIds, setSelectedSeatIds] = useState([]);
const [confirmation, setConfirmation] = useState(null);
const [bookings, setBookings] = useState([]);

// Register form
const [regName, setRegName] = useState("");
const [regEmail, setRegEmail] = useState("");
const [regMobile, setRegMobile] = useState("");
const [regPassword, setRegPassword] = useState("");
const [regConfirmPassword, setRegConfirmPassword] = useState("");

// Login form
const [loginEmail, setLoginEmail] = useState("");
const [loginPassword, setLoginPassword] = useState("");
```

### useEffect — on first load:
```js
useEffect(() => {
  // Try to restore login from localStorage
  const savedUser = localStorage.getItem("user");
  if (savedUser) setUser(JSON.parse(savedUser));
  // Load all movies
  getMovies();
}, []);
// The empty [] means this runs ONCE after the component first renders
```

### Functions to implement (with comments above each):

**getMovies()** — `axios.get(API_BASE + "/movies.php")` → `setMovies(res.data.movies)`

**openMovieDetails(movieId)** — `axios.get(API_BASE + "/movie_details.php?id=" + movieId)` → set selectedMovie, call loadTheatres, set page to "details"

**loadTheatres(movieId)** — `axios.get(API_BASE + "/theatres.php?movie_id=" + movieId)` → `setTheatres(res.data.theatres)`

**selectShow(theatreName, show)** — set selectedShow state with all display fields, reset selectedSeatIds to `[]`, call `axios.get(API_BASE + "/seats.php?show_id=" + show.show_id)` → `setSeats(res.data.seats)`, set page to "seats"

**toggleSeat(seat)** — if `seat.status === "booked"` return immediately; otherwise toggle the seat id in selectedSeatIds

**confirmBooking()** — if no user, redirect to login; if no seats selected, show message; else `axios.post(API_BASE + "/book_ticket.php", { user_id, show_id, seat_ids })` → on success set confirmation and go to page "confirmation"; on failure reload the seat grid

**handleRegister(e)** — prevent default; validate all fields + password match; `axios.post(API_BASE + "/register.php", {...})` → on success clear form and go to login page

**handleLogin(e)** — prevent default; `axios.post(API_BASE + "/login.php", {email, password})` → on success `setUser(res.data.user)`, `localStorage.setItem("user", JSON.stringify(res.data.user))`, go to home

**handleLogout()** — `localStorage.removeItem("user")`, `setUser(null)`, `setPage("home")`

**openMyBookings()** — if no user, redirect to login; else `axios.get(API_BASE + "/my_bookings.php?user_id=" + user.id)` → `setBookings(res.data.bookings)`, `setPage("mybookings")`

**cancelBooking(bookingId)** — show `window.confirm()` first; `axios.post(API_BASE + "/cancel_booking.php", { booking_id: bookingId })` → on success call `openMyBookings()` to reload from MySQL

**Client-side search** — filter the movies array:
```js
const filteredMovies = movies.filter(m =>
  m.title.toLowerCase().includes(searchTerm.toLowerCase())
);
```

---

## ════════════════════════════════════════════
## FRONTEND — UI SECTIONS TO RENDER
## ════════════════════════════════════════════

### Navigation bar (always visible)
- Logo/brand name on the left — clicking it goes to home page
- Nav links on the right: Home | Movies | My Bookings | Login/Register (or Hi, {name} + Logout when logged in)

### Message banner
- Visible below the navbar whenever `message !== ""`
- Auto-clears after 4 seconds using `setTimeout`

### HOME page (`page === "home"`)
- Search input box (filters movies as user types)
- Movie grid using CSS Grid
- Each movie card shows: poster image, title, genre, language, duration, rating, release date, a status badge ("Released" / "Coming Soon"), "View Details" button, "Book Now" button
- `onError` on every `<img>` tag to show a placeholder if the image fails to load

### MOVIE DETAILS page (`page === "details"`)
- Back button → home
- Large poster + all movie info
- List of theatres with their shows — each show is a clickable button showing date · time · price
- Clicking a show calls `selectShow()`

### SEAT SELECTION page (`page === "seats"`)
- Back button → details page
- Movie + theatre + show info header
- "SCREEN THIS WAY" label at the top of the seat grid
- Seat grid: render each seat as a `<div>` with class `seat available`, `seat selected`, or `seat booked`
- Booked seats: grey, cursor not-allowed, clicking does nothing
- Selected seats: red/highlighted
- Available seats: dark, clickable
- Legend: shows what each colour means
- Summary panel below the grid:
  - Selected Seats: A1, A2
  - Ticket Price: ₹200
  - Number of Seats: 2
  - Total: ₹400
  - "Proceed to Booking" button

### BOOKING CONFIRMATION page (`page === "confirmation"`)
- "✅ Booking confirmed successfully!" heading
- Booking ID, Movie, Theatre, Date, Time, Seats, Total Amount, Status
- "Back to Home" button
- "View My Bookings" button

### MY BOOKINGS page (`page === "mybookings"`)
- `<table>` with columns: ID, Movie, Theatre, Date, Time, Seats, Total, Status, Action
- Booking status shown as a coloured badge
- "Cancel" button only for confirmed bookings; calls `cancelBooking()`

### LOGIN page (`page === "login"`)
- Email + Password form
- Submit calls `handleLogin(e)`
- Link to switch to register page

### REGISTER page (`page === "register"`)
- Name, Email, Mobile, Password, Confirm Password form
- Client-side validation: all fields required, passwords must match
- Submit calls `handleRegister(e)`
- Link to switch to login page

---

## ════════════════════════════════════════════
## App.css — PLAIN CSS REQUIREMENTS
## ════════════════════════════════════════════

Write all styles in App.css. The design should look like a real movie-booking site (dark theme preferred). Include styles for:

- `*` reset with `box-sizing: border-box`
- `body` — dark background (`#0f111a`), light text, sans-serif font
- `.navbar` — flex, space-between, dark background, red accent border-bottom
- `.logo` — red colour, bold, pointer cursor
- `.nav-links` — flex row, gap, hover colour change
- `.message-banner` — full-width, styled info bar below navbar
- `.page` — max-width 1200px, centred, padded
- `.search-box` — full-width input, dark theme
- `.movie-grid` — `display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px`
- `.movie-card` — dark card, rounded, flex column
- `.poster` — 100% width, fixed height `300px`, `object-fit: cover`, rounded
- `.poster.large` — for details page, fixed 220×320
- `.status-tag` — pill shape; green background for "Released", orange for "Coming Soon"
- `.card-buttons` — flex row gap
- `button` — cursor pointer, rounded, dark background
- `button.primary` — red background (`#e50914`)
- `.details-box` — flex row (wraps on mobile), dark card
- `.theatre-box` — dark card, margin-bottom
- `.show-btn` — button variant for show time selectors
- `.screen-label` — centered, uppercase, letter-spacing, light grey, border-bottom
- `.seat-grid` — `display: grid; grid-template-columns: repeat(5, 50px); gap: 10px; justify-content: center`
- `.seat` — 50px × 40px, flex center, rounded, font-size 12px, pointer
- `.seat.available` — dark background, subtle border
- `.seat.selected` — red background
- `.seat.booked` — grey background, grey text, `cursor: not-allowed`
- `.seat-legend` — flex row, centred, gap, small font
- `.box` — small inline coloured square for the legend
- `.booking-summary` — dark card, max-width 400px, centred, padding
- `.booking-summary .total` — larger font, green colour
- `.confirmation-box` — dark card, centred, padding, green heading
- `.bookings-table` — full-width, `border-collapse: collapse`
- `.bookings-table th, td` — padding, border-bottom
- `.auth-page` — centred flex
- `.auth-box` — dark card, max-width 360px, padding, form flex-column gap
- `.auth-box input` — dark background input
- `.link` — red colour, pointer cursor
- **Mobile responsive** — `@media (max-width: 600px)` breakpoint: navbar stacks, details-box stacks, seat-grid columns shrink to 40px

---

## ════════════════════════════════════════════
## package.json — EXACT CONTENT
## ════════════════════════════════════════════

```json
{
  "name": "movie-booking-frontend",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "axios": "^1.7.2",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "vite": "^5.4.1"
  }
}
```

---

## ════════════════════════════════════════════
## vite.config.js — EXACT CONTENT
## ════════════════════════════════════════════

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

---

## ════════════════════════════════════════════
## main.jsx — EXACT CONTENT
## ════════════════════════════════════════════

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

---

## ════════════════════════════════════════════
## ERROR MESSAGES TO SHOW IN THE UI
## ════════════════════════════════════════════

Every PHP endpoint must return a `message` field in its JSON response. React must display that message in the banner. Use these messages:

- "Movie loaded successfully."
- "Please select a movie."
- "Please select a show."
- "Please select at least one seat."
- "Login successful."
- "Invalid email or password."
- "Registration successful. Please log in."
- "This email is already registered."
- "Booking confirmed successfully!"
- "This seat is no longer available: A1, A2"
- "Booking cancelled successfully."
- "Something went wrong. Please try again."
- "Could not reach the server. Is Apache/MySQL running?"
- "All fields are required."
- "Passwords do not match." (checked in React before sending)

---

## ════════════════════════════════════════════
## SETUP INSTRUCTIONS TO INCLUDE
## ════════════════════════════════════════════

After all code, provide these step-by-step instructions:

1. Install XAMPP from apachefriends.org
2. Open XAMPP Control Panel → Start **Apache** → Start **MySQL**
3. Copy the `backend/` folder to `C:/xampp/htdocs/movie-booking/backend/`
4. Open `http://localhost/phpmyadmin` → click **Import** → choose `movies.sql` → click **Go**
5. Test backend directly in browser:
   - `http://localhost/movie-booking/backend/movies.php` → should return JSON
   - `http://localhost/movie-booking/backend/seats.php?show_id=1` → should return JSON
6. Open a terminal in the `frontend/` folder
7. Run `npm install`
8. Run `npm run dev`
9. Open `http://localhost:5173/` in your browser
10. Register a new account via the Register page (don't try the placeholder sample user)

Explain the difference:
- `http://localhost/movie-booking/backend/` = Apache serving PHP
- `http://localhost:5173/` = Vite serving React
- They are different origins, which is why db.php needs CORS headers

---

## ════════════════════════════════════════════
## API TABLE TO INCLUDE
## ════════════════════════════════════════════

Provide this table:

| React action        | Axios call    | PHP file            | SQL operation        | Purpose                        |
|---------------------|--------------|----------------------|----------------------|--------------------------------|
| Load movies         | axios.get()  | movies.php           | SELECT               | Get all movies                 |
| Movie details       | axios.get()  | movie_details.php    | SELECT               | Get one movie                  |
| Load theatres/shows | axios.get()  | theatres.php         | SELECT + JOIN        | Theatres & shows for a movie   |
| Load show details   | axios.get()  | shows.php            | SELECT + JOIN        | Full show info                 |
| Load seats          | axios.get()  | seats.php            | SELECT               | Seat layout for a show         |
| Register            | axios.post() | register.php         | SELECT + INSERT      | Create user with hashed pw     |
| Login               | axios.post() | login.php            | SELECT               | Verify credentials             |
| Book ticket         | axios.post() | book_ticket.php      | SELECT+INSERT+UPDATE | Create booking, mark seats     |
| My bookings         | axios.get()  | my_bookings.php      | SELECT + JOIN        | User booking history           |
| Cancel booking      | axios.post() | cancel_booking.php   | UPDATE               | Cancel, release seats          |

---

## ════════════════════════════════════════════
## TROUBLESHOOTING TABLE TO INCLUDE
## ════════════════════════════════════════════

| Error | Likely Cause | Fix |
|---|---|---|
| localhost refused to connect | Apache not running | Start Apache in XAMPP |
| 404 on PHP file | Wrong htdocs path | Ensure folder is inside `htdocs/movie-booking/backend/` |
| CORS error in console | Missing header in db.php | Confirm `Access-Control-Allow-Origin: *` is in db.php |
| Database connection failed | MySQL not running or wrong credentials | Start MySQL; check `$db_user`/`$db_pass` in db.php |
| Unknown database | movies.sql not imported | Re-import movies.sql in phpMyAdmin |
| Axios request failed | Wrong API_BASE URL | Check `API_BASE` in App.jsx |
| React page blank | JS error | Press F12 → Console and read the error |
| npm not found | Node.js not installed | Install from nodejs.org |
| Port 5173 already in use | Another Vite server running | Close other terminal or let Vite pick a new port |
| Duplicate email | Already registered | Use a different email or log in |
| Seat no longer available | Race condition — another user booked it | This is correct behaviour — pick a different seat |
| PHP outputs warning instead of JSON | PHP error before echo | Check the PHP error and fix it; only JSON should be output |

---

## ════════════════════════════════════════════
## CHECKLIST TO INCLUDE
## ════════════════════════════════════════════

```
- [ ] XAMPP Apache is running
- [ ] XAMPP MySQL is running
- [ ] movie_booking_db database exists
- [ ] movies table has 5+ rows
- [ ] movies.php returns JSON in the browser
- [ ] Movie cards appear on the home page
- [ ] Search box filters movies
- [ ] Clicking View Details shows movie details
- [ ] Theatres and shows appear on the details page
- [ ] Clicking a show loads the seat grid
- [ ] Booked seats are grey and cannot be clicked
- [ ] Clicking available seats highlights them red
- [ ] Total price updates as seats are selected
- [ ] Register form creates a new account
- [ ] Login works with the registered account
- [ ] Booking is stored in MySQL after confirming
- [ ] Booking confirmation page appears
- [ ] My Bookings page loads history from MySQL
- [ ] Cancel booking changes status in MySQL
- [ ] Cancelled seats become available again
- [ ] Refreshing the page still shows data (it comes from MySQL, not memory)
```

---

## ════════════════════════════════════════════
## SHORT-ANSWER QUESTIONS TO ANSWER
## ════════════════════════════════════════════

After all code and instructions, answer each of these questions in 2–3 simple sentences:

1. Why does PHP need `header("Access-Control-Allow-Origin: *")`?
2. What would happen if that CORS header was missing?
3. Why can't PHP use `$_POST` when Axios sends JSON?
4. Why does PHP use `json_decode(file_get_contents("php://input"), true)`?
5. Why should React reload data from MySQL after an operation instead of only updating the React array?
6. What does `[]` mean in `useEffect(() => {...}, [])`?
7. Why should the backend re-check seat availability even if React says the seat is free?
8. Why mark a booking as "cancelled" instead of deleting the row?
9. Why are prepared statements safer than building SQL strings with user input?
10. What could happen if two users try to book the same seat at exactly the same time?
11. What is the role of Axios in this project?
12. What is the role of PHP in this project?
13. What is the role of MySQL in this project?
14. Trace the full journey of a booking request from browser click to MySQL and back.

---

## ════════════════════════════════════════════
## OPTIONAL IMPROVEMENTS TO LIST
## ════════════════════════════════════════════

After the main project, briefly describe these optional improvements in increasing difficulty:

1. Add genre/language filter dropdowns
2. Add "Coming Soon" movies section
3. Add movie trailer YouTube embed links
4. Add user profile page (update name/mobile)
5. Add admin login (is_admin column)
6. Add admin movie/theatre/show CRUD
7. Replace mysqli_real_escape_string with prepared statements everywhere
8. Wrap book_ticket.php in a database transaction with `mysqli_begin_transaction()`
9. Add server-side sessions or JWT instead of localStorage for auth
10. Add a real payment gateway as a future step

---

## ════════════════════════════════════════════
## FINAL INSTRUCTION TO THE AI
## ════════════════════════════════════════════

Now build the complete project. For every file:

1. State the filename clearly (e.g. `backend/db.php`)
2. Show the **complete file content** — no "..." abbreviations, no "add the rest yourself"
3. After the code, explain in simple language what it does and how it connects to other files
4. Explain every important SQL query in a comment
5. Explain what JSON the file returns

After all files are shown, give the complete setup instructions again, then the API table, the troubleshooting table, the checklist, and finally answer all 14 short-answer questions.

**The final result must be a 100% working, zero-error beginner project using React + Vite + Axios + PHP procedural mysqli + MySQL + XAMPP that a student can copy, paste, import, and run immediately without any modifications except copying files to the correct folder.**
