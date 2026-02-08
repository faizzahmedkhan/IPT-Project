# MERN Stack Backend - Responsible AI Consulting

This is the Express.js + MongoDB backend for the Responsible AI Consulting website.

## 🚀 Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM

## 📁 Project Structure

```
backend/
├── models/
│   ├── Contact.js      # Contact form submission model
│   └── Course.js       # Course data model
├── routes/
│   ├── contact.js      # Contact API routes
│   └── courses.js      # Courses API routes
├── .env                # Environment variables
├── package.json        # Dependencies
└── server.js           # Main server file
```

## 🔧 Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file (or modify the existing one):

```env
MONGODB_URI=mongodb://localhost:27017/responsible-ai-db
PORT=5000
FRONTEND_URL=http://localhost:5173
```

**For MongoDB Atlas (Cloud):**
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/responsible-ai-db
```

### 3. Start MongoDB

**Local MongoDB:**
```bash
# Make sure MongoDB is running locally
mongod
```

**Or use MongoDB Atlas** (recommended for production):
- Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
- Get your connection string and update `.env`

### 4. Run the Server

**Development (with auto-reload):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server will run on `http://localhost:5000`

## 📡 API Endpoints

### Health Check
- `GET /api/health` - Check if server is running

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get single course
- `POST /api/courses` - Create a course
- `PUT /api/courses/:id` - Update a course
- `DELETE /api/courses/:id` - Delete a course
- `POST /api/courses/seed` - Seed initial course data

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all submissions (admin)
- `GET /api/contact/:id` - Get single submission
- `PATCH /api/contact/:id` - Update submission status
- `DELETE /api/contact/:id` - Delete submission

## 🧪 Testing the API

### Seed Initial Data
```bash
curl -X POST http://localhost:5000/api/courses/seed
```

### Get All Courses
```bash
curl http://localhost:5000/api/courses
```

### Submit Contact Form
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","subject":"Test","message":"Hello!"}'
```

## 🔗 Connecting Frontend

The React frontend is configured to connect to this backend. Make sure both are running:

1. **Backend:** `cd backend && npm run dev` (runs on port 5000)
2. **Frontend:** `npm run dev` (runs on port 5173)

The frontend will automatically connect to `http://localhost:5000/api`

## 📝 Notes

- The frontend has fallback data in case the backend is not available
- CORS is configured to accept requests from the frontend URL
- Contact form submissions are saved to MongoDB
- Courses can be managed via API and will be displayed dynamically on the frontend
