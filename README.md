# 🏆 ChoreChamp

Transform household chores into an engaging, rewarding experience for your family! ChoreChamp is a gamified task management system that motivates kids of all ages to contribute to household responsibilities while earning points, achievements, and rewards.

![ChoreChamp Banner](https://img.shields.io/badge/Built%20with-React%20%7C%20Vite%20%7C%20Tailwind-blue?style=for-the-badge)

## ✨ Features

### 🎮 Gamification
- **Points System**: Kids earn points for completing chores
- **Level Progression**: Watch children advance through levels as they complete tasks
- **Achievement Badges**: Unlock special achievements for consistent performance
- **Leaderboards**: Friendly competition between siblings

### 👨‍👩‍👧‍👦 Family Management
- **Multiple Child Profiles**: Manage chores for all your children in one place
- **Age-Appropriate Tasks**: Filter chores by age range and difficulty
- **Custom Avatars**: Personalized profiles with fun avatar colors
- **Weekly Allowance Tracking**: Link chore completion to pocket money

### 📋 Chore Management
- **Chore Templates**: Pre-built library of common household tasks
- **Custom Chores**: Create your own unique tasks
- **Difficulty Levels**: Easy, Medium, Hard chores with corresponding point values
- **Due Dates & Reminders**: Never miss a task with built-in scheduling
- **Photo Verification**: Kids can submit photos as proof of completion

### 📊 Analytics & Insights
- **Progress Tracking**: Visual dashboards showing completion rates
- **Recent Activity**: Real-time feed of completed tasks
- **Statistics**: Track trends and improvement over time
- **Parent Notifications**: Get notified when chores are completed

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ChoreChamp.git
   cd ChoreChamp
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
   ```
   http://localhost:3000
   ```

## 🛠️ Tech Stack

- **Frontend**: React 18, React Router
- **Build Tool**: Vite
- **Styling**: Tailwind CSS, Custom CSS Variables
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Date Handling**: date-fns
- **State Management**: React Hooks

## 📁 Project Structure

```
ChoreChamp/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── ui/              # Base UI components (Button, Card, etc.)
│   │   ├── Children/        # Child management components
│   │   ├── Dashboard/       # Dashboard-specific components
│   │   └── Chores/          # Chore-related components
│   ├── pages/               # Main application pages
│   │   ├── Dashboard.js     # Main dashboard
│   │   ├── children.js      # Child management
│   │   ├── choreTemplates.js # Chore template library
│   │   ├── childProfile.js  # Individual child profiles
│   │   ├── settings.js      # App settings
│   │   ├── notifications.js # Notification center
│   │   └── Auth.js          # Authentication (placeholder)
│   ├── entities/            # Data layer and API mocking
│   ├── utils/               # Helper functions and utilities
│   ├── layout.js            # Main app layout with sidebar
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # React entry point
│   └── index.css            # Global styles and CSS variables
├── public/                  # Static assets
├── index.html               # HTML entry point
├── package.json             # Project dependencies
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── postcss.config.js        # PostCSS configuration
```

## 🎨 Design System

ChoreChamp uses a warm, family-friendly color palette:

- **Primary Green (Sage)**: `#92B4A7` - Calming, nurturing
- **Secondary Mauve**: `#93827F` - Sophisticated, grounding  
- **Accent Coral**: `#DA4167` - Energetic, motivating
- **Background Cream**: `#F8F9F0` - Soft, welcoming
- **Text Charcoal**: `#2F2F2F` - Easy to read

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 🔧 Configuration

### Environment Variables
Currently using mock data for development. In production, you'll want to set up:
- Backend API endpoints
- Authentication providers
- Database connections

### Customization
- **Colors**: Update CSS variables in `src/index.css`
- **Components**: Extend UI components in `src/components/ui/`
- **Routes**: Modify navigation in `src/App.jsx`

## 📱 Features in Development

- [ ] **Mobile App**: React Native version for iOS/Android
- [ ] **Real Backend**: Replace mock data with actual API
- [ ] **Photo Uploads**: Cloud storage for chore verification photos
- [ ] **Parent Dashboard**: Advanced analytics and controls
- [ ] **Reward Marketplace**: Redeem points for privileges and treats
- [ ] **Social Features**: Share achievements with family and friends

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow React best practices
- Use Tailwind classes for styling
- Write descriptive commit messages
- Test your changes thoroughly

## 🐛 Bug Reports

Found a bug? Please open an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Radix UI** - For accessible component primitives
- **Tailwind CSS** - For utility-first styling
- **Lucide** - For beautiful, consistent icons
- **Framer Motion** - For smooth animations
- **Vite** - For fast development experience

## 📞 Support

Need help? Reach out:
- 📧 Email: support@chorechamp.app
- 💬 GitHub Issues: [Create an issue](https://github.com/yourusername/ChoreChamp/issues)
- 📖 Documentation: [Wiki](https://github.com/yourusername/ChoreChamp/wiki)

---

**Built with ❤️ for families who want to make chores fun!**

![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red?style=for-the-badge)
