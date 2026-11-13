/**
 * Portfolio content configuration for Dasari Jashwanth.
 * Organized cleanly so links, skills, projects, and learning goals
 * can be updated in one place as new milestones are reached.
 */

export interface SkillItem {
  name: string;
  level?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  items: SkillItem[];
}

export interface ProjectItem {
  id: 'voter' | 'atm' | 'grade';
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  pythonCode: string;
}

export const PROFILE = {
  name: 'DASARI JASHWANTH',
  displayName: 'Dasari Jashwanth',
  status: 'B.Tech 1st Semester Student',
  goal: 'Aspiring AI Engineer',
  headline: "Hi, I'm DASARI JASHWANTH",
  subtitle: 'B.Tech Student | Aspiring AI Engineer',
  heroSummary:
    'Exploring Python, Web Development, and Generative AI while building practical projects and participating in hackathons and idea-thons.',
  honestNote:
    'I am a B.Tech student at the beginning of my technical journey, actively learning and building.',
  // To hardcode your photo in code, import an image from src/assets/ or paste a path/URL here:
  profilePhotoUrl: '',
  social: {
    linkedin: 'https://www.linkedin.com/in/dasari-jashwanth-641b22431',
    linkedinDisplay: 'linkedin.com/in/dasari-jashwanth-641b22431',
    github: 'https://github.com/djashwanth-7',
    githubDisplay: 'github.com/djashwanth-7',
    emailPlaceholder: 'your.email@example.com',
  },
} as const;

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'programming',
    title: 'Programming',
    items: [
      { name: 'Python', level: 'Foundations & Logic' },
    ],
  },
  {
    id: 'web-development',
    title: 'Web Development',
    items: [
      { name: 'HTML' },
      { name: 'CSS' },
      { name: 'JavaScript' },
      { name: 'Basic Web Development' },
    ],
  },
  {
    id: 'ai-emerging',
    title: 'AI & Emerging Technologies',
    items: [
      { name: 'Generative AI', level: 'Beginner' },
      { name: 'Artificial Intelligence', level: 'Currently Learning' },
    ],
  },
  {
    id: 'activities',
    title: 'Activities',
    items: [
      { name: 'Problem Solving' },
      { name: 'Hackathons' },
      { name: 'Idea-thons' },
      { name: 'Project Development' },
    ],
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'voter',
    title: 'Voter Eligibility Calculator',
    description:
      'A simple application that determines whether a person is eligible to vote based on their age and predefined eligibility conditions.',
    technologies: ['Python', 'Basic programming logic'],
    githubUrl: 'https://github.com/yourusername',
    pythonCode: `# Voter Eligibility Calculator
# Demonstrates basic input handling and conditional statements

def check_voter_eligibility(age: int, is_citizen: bool) -> str:
    if age < 0:
        return "Please enter a valid age."
    if not is_citizen:
        return "Not eligible: citizenship requirement not met."
    if age >= 18:
        return "Eligible to vote."
    else:
        years_left = 18 - age
        return f"Not eligible yet. Try again in {years_left} year(s)."

if __name__ == "__main__":
    user_age = int(input("Enter your age: "))
    citizen_input = input("Are you a citizen? (yes/no): ").strip().lower()
    print(check_voter_eligibility(user_age, citizen_input == "yes"))`,
  },
  {
    id: 'atm',
    title: 'ATM Management System',
    description:
      'A beginner-level ATM management application that demonstrates concepts such as user interaction, balance management, withdrawals, deposits, and basic transaction logic.',
    technologies: [
      'Python',
      'Conditional statements',
      'Functions',
      'Basic programming concepts',
    ],
    githubUrl: 'https://github.com/yourusername',
    pythonCode: `# ATM Management System
# Demonstrates functions, state management, and conditional logic

def check_balance(balance: float) -> None:
    print(f"Current Balance: ₹{balance:,.2f}")

def deposit(balance: float, amount: float) -> float:
    if amount <= 0:
        print("Deposit amount must be greater than zero.")
        return balance
    return balance + amount

def withdraw(balance: float, amount: float) -> float:
    if amount <= 0:
        print("Withdrawal amount must be greater than zero.")
        return balance
    if amount > balance:
        print("Insufficient balance.")
        return balance
    return balance - amount

def main():
    balance = 5000.0
    balance = deposit(balance, 1000.0)
    balance = withdraw(balance, 750.0)
    check_balance(balance)

if __name__ == "__main__":
    main()`,
  },
  {
    id: 'grade',
    title: 'Student Grade Calculator',
    description:
      'A simple application that calculates student grades based on marks and predefined grading conditions.',
    technologies: [
      'Python',
      'Conditional statements',
      'Basic programming logic',
    ],
    githubUrl: 'https://github.com/yourusername',
    pythonCode: `# Student Grade Calculator
# Demonstrates multi-branch conditional grading logic

def calculate_grade(marks: float) -> str:
    if marks < 0 or marks > 100:
        return "Invalid Marks (must be 0 to 100)"
    elif marks >= 90:
        return "Grade A+ (Outstanding)"
    elif marks >= 80:
        return "Grade A (Excellent)"
    elif marks >= 70:
        return "Grade B (Good)"
    elif marks >= 60:
        return "Grade C (Satisfactory)"
    elif marks >= 50:
        return "Grade D (Pass)"
    else:
        return "Grade F (Needs Improvement)"

if __name__ == "__main__":
    score = float(input("Enter student marks (0-100): "))
    print(calculate_grade(score))`,
  },
];

export const HACKATHON_FOCUS = [
  {
    title: 'Problem Discovery',
    detail:
      'Breaking down real-world student and community challenges into clear, solvable problem statements.',
  },
  {
    title: 'Idea Development',
    detail:
      'Structuring practical concepts during idea-thons and planning simple, workable prototypes.',
  },
  {
    title: 'Team Collaboration',
    detail:
      'Working alongside peers to share ideas, communicate clearly, and learn new tools under time constraints.',
  },
];

export const LEARNING_JOURNEY = {
  currentlyLearning: [
    'Python',
    'Web Development',
    'Generative AI',
    'AI Fundamentals',
    'Building Projects',
  ],
  nextGoals: [
    'Improve Python',
    'Learn AI/ML fundamentals',
    'Build more advanced projects',
    'Learn APIs and backend development',
    'Participate in more hackathons',
    'Contribute to open-source projects',
  ],
} as const;
