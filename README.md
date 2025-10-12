# 🧮 MathQuest - Interactive Math Learning App

MathQuest is a fun and engaging math learning application designed for kids aged 7-15. Built with React, TypeScript, and modern web technologies, it transforms mathematical learning into an exciting adventure!

## ✨ Features

### 🧠 Interactive Lessons
- **Guided Learning**: Age-appropriate math topics organized by difficulty
- **Visual Examples**: Colorful, interactive lessons that make abstract concepts concrete
- **Progressive Unlocking**: Complete lessons to unlock new challenges

### 🎮 Practice Mode
- **Timed Challenges**: 60-second problem-solving sessions
- **Multiple Operations**: Addition, subtraction, multiplication, division, and mixed practice
- **Instant Feedback**: Visual confirmation with animations for correct/incorrect answers

### 🏆 Rewards System
- **Star Collection**: Earn stars for completed lessons and practice sessions
- **Badge System**: Unlock badges for various achievements
- **Level Progression**: Advance through levels as you master new skills

### 📈 Progress Tracking
- **Visual Charts**: Weekly activity tracking with colorful graphs
- **Skill Mastery**: Track progress across different mathematical concepts
- **Achievement Timeline**: See your mathematical journey over time

### 🎨 Fun Themes
- **Ocean Theme**: Dive deep into learning with aquatic colors
- **Jungle Theme**: Explore math in a vibrant forest setting
- **Space Theme**: Launch your learning to cosmic heights

## 🚀 Getting Started

### Prerequisites
- Node.js (version 18+ recommended)
- npm or yarn package manager

### Installation

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

## 🛠️ Built With

- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe JavaScript for better development experience
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework for beautiful styling
- **React Router** - Client-side routing for smooth navigation
- **Lucide React** - Beautiful, customizable icons

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

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
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
