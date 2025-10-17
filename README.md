# Employee Directory Application

# Repo layout
- `backend/` — Node backend (Apollo GraphQL, Express, MongoDB)
- `client/` — Frontend (Nextjs with Apollo Client)



# Backend (run the GraphQL server)

1. Open a terminal window and go to the backend folder:

...terminal
cd "./backend"
...

2. Install dependencies:

...terminal
npm install


3. Create a `.env` file in `backend` or set environment variables. The backend expects a MongoDB connection URI in `MONGO_URI`.

Example `.env` (create `backend/.env`):

...
MONGO_URI=mongodb://localhost:27017/your-db-name
PORT=4000
...

4. Start the dev server (uses nodemon):

...terminal
npm run dev
...

The server will print a local URL (by default http://localhost:4000/) — open it in the browser to access the Apollo UI.

### Seeding the database
There is a seeder utility at `src/utility/seeder.js`. To run it enable line 24 of /backend/server.js 
OR
run `npm run seed`.






## Frontend (run the Nextjs app)

1. Open a terminal window and go to the client folder:

...terminal
cd "./client"
...

2. Install dependencies:

...terminal
npm install
...

3. Create a `.env.local` file in the client folder and add the public API URL. In Next.js (or many front-end toolchains) client-visible env vars must be prefixed with `NEXT_PUBLIC_`.

Example `client/.env.local`:

...
NEXT_PUBLIC_GQL_URL=http://localhost:4000/graphql
...

4. Start the dev server:

...terminal
npm run dev
...

The frontend will typically run on `http://localhost:3000` (or the port your framework uses). The Apollo client uses `process.env.NEXT_PUBLIC_API_URL` to connect to the backend.
