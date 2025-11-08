# 🏨 StayBook — Hotel Booking Website

**StayBook** is a fully functional hotel booking website built with HTML, CSS, and JavaScript. This project demonstrates modern web development practices including responsive design, user authentication, form validation, and external API integration.

**🌐 Live Demo:** [View on GitHub Pages](https://yourusername.github.io/HotelBooking-main/)

---

## ✨ Features

### 🎨 Design & User Experience
* **Fully Responsive Design** - Optimized for desktop, tablet, and mobile devices
* **Light & Dark Mode** - Seamless theme switching with persistent preferences
* **Modern UI/UX** - Clean, professional design with smooth animations
* **Accessible** - ARIA labels and keyboard navigation support

### 🔐 Authentication & User Management
* **User Registration** - Create accounts with email and password
* **Login System** - Secure authentication with localStorage
* **User Profiles** - Personalized profile pages with mood rating system
* **Session Management** - Persistent login state across page reloads

### 📝 Form Validation
* **Email Validation** - Proper email format checking
* **Password Complexity** - Requires uppercase, lowercase, and numbers
* **Phone Number Validation** - Supports international formats
* **Date Validation** - Ensures future dates for bookings
* **Real-time Error Messages** - User-friendly validation feedback

### 🌐 External API Integration
* **Weather API** - Real-time weather information for hotel location (Almaty, Kazakhstan)
* Uses Open-Meteo API for current weather conditions

### 💾 Data Storage
* **LocalStorage Integration** - Saves user data, bookings, and preferences
* **Rating System** - Mood ratings saved per user
* **Booking History** - All bookings stored locally

### 🔍 Search & Filter
* **Menu Search** - Search functionality in dining section
* **Filtered Results** - Search results stored in localStorage

### 📱 Pages
* **Home Page** - Hero section, room gallery, booking form, FAQ
* **Profile Page** - User dashboard with mood rating and weather info
* **Spa Page** - Spa services and booking
* **Dining Page** - Menu highlights and table reservations

---

## 🛠 Tech Stack

* **Frontend:** HTML5, CSS3, JavaScript (ES6+)
* **Libraries:** jQuery
* **Icons:** Ionicons
* **API:** Open-Meteo Weather API
* **Storage:** LocalStorage

---

## 🚀 Getting Started

### Prerequisites
* A modern web browser (Chrome, Firefox, Safari, Edge)
* No build tools or dependencies required!

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/HotelBooking-main.git
```

2. Navigate to the project directory:
```bash
cd HotelBooking-main
```

3. Open `index.html` in your web browser

That's it! The website runs entirely client-side with no server required.

---

## 📋 Project Structure

```
HotelBooking-main/
├── index.html          # Main homepage
├── profile.html        # User profile page
├── Spa.html           # Spa services page
├── Dining.html         # Dining page
├── css/
│   ├── styles.css     # Main stylesheet
│   ├── profile.css    # Profile page styles
│   ├── spa.css        # Spa page styles
│   └── dining.css     # Dining page styles
├── js/
│   ├── main.js        # Main JavaScript logic
│   ├── reg-log.js     # Authentication system
│   ├── profile-ui.js  # Profile interactions
│   ├── weather.js     # Weather API integration
│   ├── theme.js       # Theme switching
│   └── ...
├── images/            # Image assets
└── README.md          # This file
```

---

## 🎯 Key Features Explained

### Authentication System
- Users can register with name, email, and password
- Passwords must meet complexity requirements
- Login credentials are validated against stored users
- Profile section appears only after successful login

### Profile Page
- Personalized greeting with user's name
- Interactive mood rating system (1-5 stars)
- Inspirational quotes based on rating
- Real-time weather information for hotel location
- All data persists in localStorage

### Booking System
- Comprehensive form validation
- Phone number format validation
- Date validation (prevents past dates)
- Bookings saved to localStorage
- Success confirmation messages

### Responsive Design
- Mobile-first approach
- Breakpoints at 768px and 480px
- Sidebar hidden on mobile
- Flexible grid layouts
- Touch-friendly buttons and inputs

---

## 🌙 Theme System

The website supports both light and dark themes:
- **Light Theme:** Clean, bright interface (default)
- **Dark Theme:** Easy on the eyes for low-light environments
- Theme preference saved in localStorage
- Keyboard shortcuts: Press 'D' for day mode, 'N' for night mode

---

## 📱 Mobile Responsiveness

The website is fully responsive with:
- Adaptive navigation menu
- Stacked layouts on small screens
- Optimized images and fonts
- Touch-friendly interactive elements
- Proper viewport meta tags

---

## 🔌 API Integration

### Weather API
- **Service:** Open-Meteo API
- **Location:** Almaty, Kazakhstan (Hotel location)
- **Data:** Current temperature, humidity, wind speed, weather conditions
- **Update:** Fetches real-time data on profile page load

---

## 📝 Form Validation Rules

### Registration Form
- Name: Minimum 2 characters
- Email: Valid email format
- Password: Minimum 6 characters, must contain uppercase, lowercase, and number
- Confirm Password: Must match password

### Login Form
- Email: Valid email format
- Password: Required field

### Booking Form
- Name: Minimum 2 characters
- Email: Valid email format
- Phone: Valid phone number format (supports international formats)
- Date: Must be a future date

---

## 🎨 Design Highlights

- **Color Scheme:** Professional blue gradient with gold accents
- **Typography:** Inter font family for modern readability
- **Animations:** Smooth transitions and hover effects
- **Cards:** Elevated card design with shadows
- **Icons:** Ionicons for consistent iconography

---

## 🐛 Known Issues

None at the moment! If you find any issues, please report them.

---

## 🔮 Future Enhancements

- [ ] Backend integration with FastAPI
- [ ] Database storage (PostgreSQL/MySQL)
- [ ] React frontend rewrite
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Multi-language support

---

## 👥 Team

**Group Name:** Full Stackers  
**Members:** Daniyal A, Alikhan M

---

## 📄 License

This project is created for educational purposes.

---

## 🙏 Acknowledgments

- Open-Meteo for weather API
- Ionicons for icon library
- All contributors and testers

---

## 📸 Screenshots

### Light Theme
![Light Theme Screenshot](https://github.com/user-attachments/assets/7e4e95a8-73bb-4bd0-98d0-3ef15e75f841)

### Dark Theme
![Dark Theme Screenshot](https://github.com/user-attachments/assets/7cc16fb2-c343-4792-9c69-a7a1ab36babf)

---

**⭐ If you find this project helpful, please give it a star!**
