export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface DifficultyConfig {
  name: string;
  timeLimit: number;
  description: string;
  color: string;
}

export const difficultyConfigs: Record<string, DifficultyConfig> = {
  easy: {
    name: "Easy",
    timeLimit: 12,
    description: "Basic cyber awareness",
    color: "text-success",
  },
  medium: {
    name: "Medium",
    timeLimit: 9,
    description: "Practical security knowledge",
    color: "text-warning",
  },
  hard: {
    name: "Hard",
    timeLimit: 6,
    description: "Advanced cyber security",
    color: "text-destructive",
  },
};

export const questions: Record<string, Question[]> = {
  easy: [
    {
      id: 1,
      question: "What should you never share with strangers online?",
      options: ["Your favorite color", "Your password", "Your favorite movie", "Your hobby"],
      correctAnswer: 1,
    },
    {
      id: 2,
      question: "What does a strong password include?",
      options: ["Only your name", "Only numbers", "Letters, numbers, and symbols", "Your birthday"],
      correctAnswer: 2,
    },
    {
      id: 3,
      question: "What should you do if you receive a suspicious email?",
      options: ["Open all attachments", "Click all links", "Delete it or report it", "Reply with your info"],
      correctAnswer: 2,
    },
    {
      id: 4,
      question: "What is phishing?",
      options: ["A trick to steal your info", "A type of fish", "A computer game", "A social media app"],
      correctAnswer: 0,
    },
    {
      id: 5,
      question: "Why should you log out of shared computers?",
      options: ["It's not necessary", "To prevent others from accessing your accounts", "To make it faster", "To clear the screen"],
      correctAnswer: 1,
    },
    {
      id: 6,
      question: "What is a firewall used for?",
      options: ["To speed up internet", "To start fires", "To download files", "To block unauthorized access"],
      correctAnswer: 3,
    },
    {
      id: 7,
      question: "What should you do before clicking a link in an email?",
      options: ["Check if the sender is trustworthy", "Click immediately", "Forward it to friends", "Ignore the email"],
      correctAnswer: 0,
    },
    {
      id: 8,
      question: "Why is it important to update your software regularly?",
      options: ["To slow down your computer", "To get new colors", "It's not important", "To fix security vulnerabilities"],
      correctAnswer: 3,
    },
    {
      id: 9,
      question: "What is the safest way to create a password?",
      options: ["Use your pet's name", "Use 123456", "Use a random mix of characters", "Use your birthday"],
      correctAnswer: 2,
    },
    {
      id: 10,
      question: "What should you do if a website asks for too much personal information?",
      options: ["Leave the website", "Provide all information", "Share with friends first", "Create a fake account"],
      correctAnswer: 0,
    },
  ],
  medium: [
    {
      id: 1,
      question: "What is two-factor authentication (2FA)?",
      options: ["Using two passwords", "An extra security step beyond password", "Two email addresses", "Two usernames"],
      correctAnswer: 1,
    },
    {
      id: 2,
      question: "What does HTTPS indicate in a website URL?",
      options: ["The site is popular", "The connection is secure", "The site is free", "The site is new"],
      correctAnswer: 1,
    },
    {
      id: 3,
      question: "What is a VPN used for?",
      options: ["Private and secure browsing", "Faster internet", "Free movies", "Social media"],
      correctAnswer: 0,
    },
    {
      id: 4,
      question: "What should you do before downloading software?",
      options: ["Download from any source", "Ignore warnings", "Verify it's from a trusted source", "Share with friends first"],
      correctAnswer: 2,
    },
    {
      id: 5,
      question: "What is malware?",
      options: ["Good software", "A browser extension", "An email service", "Malicious software designed to harm"],
      correctAnswer: 3,
    },
    {
      id: 6,
      question: "What is ransomware?",
      options: ["Malware that locks your files for payment", "Free software", "A backup tool", "An antivirus program"],
      correctAnswer: 0,
    },
    {
      id: 7,
      question: "What is a secure way to store passwords?",
      options: ["Write on sticky notes", "Save in a text file", "Use a password manager", "Memorize all of them"],
      correctAnswer: 2,
    },
    {
      id: 8,
      question: "What does SSL stand for?",
      options: ["Secure Socket Layer", "Simple Security Lock", "Safe Site Login", "System Security Level"],
      correctAnswer: 0,
    },
    {
      id: 9,
      question: "What is a brute force attack?",
      options: ["Physical attack on servers", "Sending spam emails", "Crashing websites", "Trying all password combinations"],
      correctAnswer: 3,
    },
    {
      id: 10,
      question: "Why should you be careful with public Wi-Fi?",
      options: ["Hackers can intercept your data", "It's too fast", "It uses too much battery", "It's always free"],
      correctAnswer: 0,
    },
  ],
  hard: [
    {
      id: 1,
      question: "What is a zero-day vulnerability?",
      options: ["A bug fixed immediately", "A day without internet", "An unknown flaw exploited before patch", "A scheduled update"],
      correctAnswer: 2,
    },
    {
      id: 2,
      question: "What is SQL injection?",
      options: ["A code attack on databases", "Database optimization", "A backup method", "A programming language"],
      correctAnswer: 0,
    },
    {
      id: 3,
      question: "What does end-to-end encryption ensure?",
      options: ["Only sender and receiver can read messages", "Faster messaging", "More storage", "Better graphics"],
      correctAnswer: 0,
    },
    {
      id: 4,
      question: "What is a man-in-the-middle attack?",
      options: ["A physical attack", "A computer virus", "A network upgrade", "Intercepting communication between two parties"],
      correctAnswer: 3,
    },
    {
      id: 5,
      question: "What is social engineering in cybersecurity?",
      options: ["Building social networks", "Manipulating people to reveal information", "Creating websites", "Software development"],
      correctAnswer: 1,
    },
    {
      id: 6,
      question: "What is a DDoS attack?",
      options: ["Data backup", "Encrypting files", "Overwhelming a server with traffic", "Stealing passwords"],
      correctAnswer: 2,
    },
    {
      id: 7,
      question: "What is cross-site scripting (XSS)?",
      options: ["Writing code for multiple sites", "Copying website designs", "Cross-platform development", "Injecting malicious scripts into websites"],
      correctAnswer: 3,
    },
    {
      id: 8,
      question: "What is a keylogger?",
      options: ["Software that records keystrokes", "A keyboard cleaner", "A typing tutor", "A password generator"],
      correctAnswer: 0,
    },
    {
      id: 9,
      question: "What is the purpose of penetration testing?",
      options: ["To break systems permanently", "To slow down networks", "To find vulnerabilities before attackers do", "To install malware"],
      correctAnswer: 2,
    },
    {
      id: 10,
      question: "What is a rootkit?",
      options: ["A gardening tool", "A system repair utility", "An antivirus program", "Malware that hides deep in a system"],
      correctAnswer: 3,
    },
  ],
};
