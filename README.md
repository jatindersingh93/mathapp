# 🧮 MathQuest - Interactive Math Learning App

MathQuest is a fun and engaging math learning application designed for kids aged 7-15. Built with React, TypeScript, and modern web technologies, it transforms mathematical learning into an exciting adventure!

## ✨ Features

### 🔐 User Authentication (NEW!)
- **Social Login**: Sign in with Google, Facebook, or GitHub
- **OAuth 2.0 Security**: Industry-standard authentication
- **Multi-device Sync**: Access your progress from anywhere
- **Automatic Profile**: Your profile is created on first login

### 🧠 Interactive Lessons
- **Guided Learning**: Age-appropriate math topics organized by difficulty
- **Visual Examples**: Colorful, interactive lessons that make abstract concepts concrete
- **Progressive Unlocking**: Complete lessons to unlock new challenges

### 🎮 Practice Mode
- **Timed Challenges**: 60-second problem-solving sessions
- **Multiple Operations**: Addition, subtraction, multiplication, division, and mixed practice
- **Instant Feedback**: Visual confirmation with animations for correct/incorrect answers
- **Session Tracking**: All practice sessions saved to your account

### � Game Arena (NEW!)
- **Bubble Pop Math**: Pop bubbles by solving problems before they escape
- **Math Racing**: Solve faster to speed up your car
- **Memory Match**: Match equations with answers
- **Leaderboards**: Compete with players worldwide

### �🏆 Rewards System
- **Star Collection**: Earn stars for completed lessons and practice sessions
- **Achievement Badges**: Unlock 12+ achievements
- **Level Progression**: Advance through levels as you master new skills
- **Streak Tracking**: Build your practice streak for bonus rewards

### 📈 Progress Tracking
- **Visual Charts**: Weekly activity tracking with colorful graphs
- **Skill Mastery**: Track progress across different mathematical concepts
- **Achievement Timeline**: See your mathematical journey over time
- **Statistics Dashboard**: Comprehensive analytics on your performance

### 🎨 Fun Themes (13 Available!)
- **Space Odyssey**: Launch your learning to cosmic heights
- **Ocean Adventure**: Dive deep into learning with aquatic colors
- **Jungle Safari**: Explore math in a vibrant forest setting
- **Castle Kingdom**: Rule your math realm
- **Superhero Academy**: Become a math superhero
- **Dinosaur Era**: Learn with prehistoric creatures
- **Robot Factory**: Code your way through math
- **Pirate Treasure**: Hunt for mathematical treasures
- **Candy Land**: Sweet math adventures
- **Arctic Expedition**: Cool learning experiences
- **Garden Paradise**: Grow your math skills
- **Sports Stadium**: Score points with every answer
- **Music Concert**: Harmonize with numbers

### 🎵 Sound Effects & Music
- **Interactive Sounds**: Pleasant audio feedback for actions
- **Theme-Specific Music**: Each theme has unique sounds
- **Volume Control**: Adjust or mute as needed
- **Event-Driven**: Sounds for correct/incorrect answers, clicks, success

## 🚀 Getting Started

### Prerequisites
- **Frontend**: Node.js 18+ and npm
- **Backend**: Python 3.9+, PostgreSQL 12+
- **OAuth**: Google/Facebook developer accounts

### Quick Start - Frontend Only

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mathapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to start your math adventure!

### Full Stack Setup - With Backend

See **[BACKEND_INTEGRATION.md](./BACKEND_INTEGRATION.md)** for complete setup guide!

**Quick Docker Setup:**
```bash
# Start backend with database
cd backend
docker-compose up -d

# In another terminal, start frontend
npm run dev
```

**Backend Features:**
- User authentication and profiles
- Progress persistence across devices
- Practice and game session tracking
- Achievements and leaderboards
- Comprehensive statistics

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe JavaScript
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icons
- **Web Audio API** - Sound effects

### Backend (NEW!)
- **FastAPI** - Modern Python web framework
- **PostgreSQL** - Robust relational database
- **SQLAlchemy** - SQL toolkit and ORM
- **OAuth 2.0** - Secure authentication (Authlib)
- **JWT** - JSON Web Tokens for sessions
- **Docker** - Containerization

## 📚 Learning Concepts Covered

### Basic Operations (Level 1-2)
- Addition and subtraction up to 100
- Introduction to multiplication tables
- Basic division concepts

### Intermediate Skills (Level 3-4)
- Multi-digit arithmetic
- Introduction to fractions
- Pattern recognition

### Advanced Topics (Level 5+)
- Algebraic thinking
- Complex fractions
- Problem-solving strategies

## 🎯 Target Age Groups

- **Ages 7-9**: Focus on basic addition, subtraction, and number recognition
- **Ages 10-12**: Multiplication, division, and introduction to fractions
- **Ages 13-15**: Algebraic concepts and advanced problem-solving

## 🏃‍♀️ Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint code

### Backend
- `cd backend && ./setup.sh` - Automated setup
- `uvicorn main:app --reload` - Start backend dev server
- `python init_db.py` - Initialize database
- `docker-compose up` - Start with Docker

## 📁 Project Structure

```
mathapp/
├── src/                      # Frontend source code
│   ├── components/          # React components
│   │   ├── AnimatedBackground.tsx
│   │   ├── AnimatedButton.tsx
│   │   ├── AnimatedCard.tsx
│   │   ├── Header.tsx
│   │   ├── SoundManager.tsx
│   │   └── VolumeControl.tsx
│   ├── pages/              # Page components
│   │   ├── Home.tsx
│   │   ├── Lessons.tsx
│   │   ├── Practice.tsx
│   │   ├── Games.tsx
│   │   ├── Progress.tsx
│   │   └── Rewards.tsx
│   ├── App.tsx             # Main app component
│   └── main.tsx            # Entry point
├── backend/                 # Backend API (NEW!)
│   ├── main.py             # FastAPI application
│   ├── models.py           # Database models
│   ├── schemas.py          # API schemas
│   ├── routes/             # API endpoints
│   │   ├── auth.py
│   │   ├── users.py
│   │   ├── practice.py
│   │   └── games.py
│   ├── docker-compose.yml  # Docker setup
│   └── README.md           # Backend docs
├── BACKEND_INTEGRATION.md   # Integration guide
└── README.md               # This file
```

## 🔗 API Integration

The app can work in two modes:

1. **Standalone Mode** (Current): Uses localStorage for data
2. **Connected Mode** (NEW!): Connects to FastAPI backend

To enable backend integration:
1. Set up backend (see `backend/README.md`)
2. Create `.env` with `VITE_API_URL=http://localhost:8000`
3. Implement API service layer (see `BACKEND_INTEGRATION.md`)

## 🎮 How to Play
- `npm run lint` - Run ESLint for code quality

## 🤝 Contributing

We welcome contributions to make MathQuest even better! Whether it's new features, bug fixes, or improved educational content, every contribution helps kids learn math more effectively.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎉 Acknowledgments

- Designed with educational best practices in mind
- Inspired by gamification principles to enhance learning motivation
- Built with accessibility and inclusivity as core principles

---

**Happy Learning! 🌟** Start your mathematical adventure with MathQuest today!
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
