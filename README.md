# Cyber Quest Genie

An interactive cyber security awareness training game designed to educate users about cybersecurity through engaging quiz gameplay.

## 🛡️ Features

- **Interactive Quiz Game**: Challenging cybersecurity questions across multiple difficulty levels
- **Progressive Difficulty**: Easy, Medium, and Hard levels to match learning progression  
- **Certificate Generation**: Downloadable certificates in PNG and PDF formats
- **Terminal-Style UI**: Immersive cyber-themed interface with animations
- **Sound Effects**: Audio feedback for enhanced user experience
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cyber-quest-genie
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
   Navigate to `http://localhost:5173` to start playing!

## 🎮 How to Play

1. **Enter Your Name**: Provide your name for the certificate
2. **Select Difficulty**: Choose from Easy, Medium, or Hard levels
3. **Answer Questions**: Click on the correct answers within the time limit
4. **Get Your Score**: See your performance and earn achievements
5. **Download Certificate**: Get your completion certificate in PNG or PDF format

## 🏗️ Project Structure

```
cyber-quest-genie/
├── src/
│   ├── components/         # React components
│   │   ├── ui/            # Reusable UI components
│   │   ├── QuizGame.tsx   # Main quiz logic
│   │   ├── ResultScreen.tsx # Results and certificate
│   │   └── ...
│   ├── data/              # Quiz questions and configurations
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   └── pages/             # Page components
├── public/                # Static assets
└── ...
```

## 🛠️ Built With

- **React** - Frontend framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Shadcn/ui** - UI components
- **html2canvas** - Certificate image generation
- **jsPDF** - PDF certificate generation
- **Lucide React** - Icons

## 📚 Question Categories

### Easy Level (12s per question)
- Basic cyber awareness
- Password security fundamentals
- Email safety basics

### Medium Level (9s per question)  
- Practical security knowledge
- VPNs and encryption basics
- Malware awareness

### Hard Level (6s per question)
- Advanced cyber security concepts
- Technical attack vectors
- Professional security practices

## 🎯 Learning Objectives

After completing this training, users will understand:

- **Password Security**: Best practices for creating and managing passwords
- **Email Safety**: Identifying and avoiding phishing attempts
- **Network Security**: Understanding VPNs, firewalls, and secure connections
- **Malware Protection**: Recognizing and preventing malicious software
- **Social Engineering**: Identifying manipulation tactics
- **Advanced Threats**: Understanding complex attack vectors

## 🏆 Achievements

- **Cyber Champion**: Perfect score (100%)
- **Security Expert**: 80%+ score  
- **Good Effort**: 60%+ score
- **Needs Training**: Below 60%

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

### Adding New Questions

Questions are stored in `src/data/quizQuestions.ts`. Each question follows this structure:

```typescript
{
  id: number,
  question: string,
  options: string[],
  correctAnswer: number // Index of correct answer (0-3)
}
```

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support and questions, please open an issue in the GitHub repository.

---

**Ready to test your cybersecurity knowledge? Start your Cyber Quest journey today!** 🚀🔐
