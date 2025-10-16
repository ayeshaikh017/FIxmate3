# 🎨 FixMate Frontend

Modern, responsive React frontend for the FixMate worker-finder platform.

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
```

The app will open at: http://localhost:3000

## ✨ Features

✅ User & Worker Registration/Login  
✅ Responsive Design  
✅ Real-time Socket.IO  
✅ Tailwind CSS Styling  
✅ Protected Routes  
✅ Toast Notifications  
✅ Form Validation  

## 🛠️ Tech Stack

- **React 18** - UI Library
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **React Router** - Routing
- **Axios** - HTTP Client
- **Socket.IO** - Real-time
- **Formik & Yup** - Forms & Validation
- **React Hot Toast** - Notifications

## 📁 Structure

```
src/
├── components/      # React components
├── pages/          # Page components
├── context/        # Context providers
├── services/       # API services
├── styles/         # CSS files
└── utils/          # Utility functions
```

## 🔧 Environment Variables

Edit `.env`:

```env
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
```

## 📱 Available Routes

- `/` - Home
- `/login` - Login
- `/register/user` - User Registration
- `/register/worker` - Worker Registration
- `/user/dashboard` - User Dashboard (Protected)
- `/worker/dashboard` - Worker Dashboard (Protected)

## 🎨 Customization

Colors and styles can be customized in:
- `tailwind.config.js` - Theme configuration
- `src/styles/index.css` - Custom styles

## 🚀 Build for Production

```bash
npm run build
```

Output will be in `dist/` folder.

---

Built with ❤️ for FixMate
