# Portfolio Generator

A comprehensive React TypeScript application for creating and managing professional portfolios with multiple templates and full customization options.

**GitHub Repository**: [https://github.com/iankit-sachan](https://github.com/iankit-sachan)

## Features

### Core Functionality
- **Template Selection**: Choose from 2 distinct portfolio templates (Modern Professional & Creative Designer)
- **Multi-Section Form**: Structured form with 7 sections including personal info, bio, projects, skills, testimonials, and social links
- **Profile Card Display**: Compact profile cards with key information and "View Full Portfolio" button
- **Dynamic Routing**: Individual portfolio pages with clean URLs (`/portfolio/:id`)
- **Edit & Delete**: Full CRUD operations for portfolio management

### Additional Features
- **Form Validation**: Comprehensive validation with real-time feedback
- **Local Storage**: Automatic data persistence across browser sessions
- **Responsive Design**: Mobile-first design that works on all devices
- **Search & Filter**: Find portfolios by name, skills, or job title
- **Preview Mode**: Preview portfolios in a new tab before saving
- **Beautiful UI**: Production-ready design with smooth animations and hover effects

## Tech Stack

- **Frontend Framework**: React 18+ with TypeScript
- **Routing**: React Router v6
- **Styling**: Tailwind CSS with custom components
- **Icons**: Lucide React
- **State Management**: React Hooks with custom hooks
- **Data Persistence**: Local Storage API
- **Build Tool**: Vite

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── TemplateSelector.tsx
│   ├── PersonalInfoForm.tsx
│   ├── BioForm.tsx
│   ├── ProjectsForm.tsx
│   ├── SkillsForm.tsx
│   ├── TestimonialsForm.tsx
│   ├── SocialLinksForm.tsx
│   └── ProfileCard.tsx
├── pages/              # Page components
│   ├── Home.tsx
│   ├── PortfolioForm.tsx
│   └── PortfolioView.tsx
├── templates/          # Portfolio templates
│   ├── ModernTemplate.tsx
│   └── CreativeTemplate.tsx
├── hooks/              # Custom React hooks
│   └── usePortfolios.ts
├── types/              # TypeScript type definitions
│   └── index.ts
├── utils/              # Utility functions
│   ├── storage.ts
│   └── validation.ts
└── App.tsx            # Main application component
```

## Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

1. Clone or download the project
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Usage Guide

### Creating a Portfolio

1. Click "Create New Portfolio" on the home page
2. Follow the 7-step form process:
   - **Template**: Choose Modern Professional or Creative Designer
   - **Personal Info**: Enter name, title, contact details
   - **About**: Write a 200-500 character professional bio
   - **Projects**: Add projects with descriptions, technologies, and links
   - **Skills**: Categorize skills into Technical, Soft Skills, and Tools
   - **Testimonials**: Add client testimonials with ratings
   - **Social Links**: Connect LinkedIn, GitHub, Twitter, and website
3. Use the "Preview" button to see how your portfolio looks
4. Save your portfolio when complete

### Managing Portfolios

- **View**: Click "View Full Portfolio" on any profile card
- **Edit**: Click the edit icon on a profile card
- **Delete**: Click the delete icon (with confirmation)
- **Search**: Use the search bar to find portfolios
- **Filter**: Filter by skills or job title

### Templates

**Modern Professional**
- Clean, minimalist design
- Linear layout with professional typography
- Ideal for tech professionals and corporate roles

**Creative Designer**
- Bold, artistic layout with vibrant gradients
- Dynamic grid system with creative elements
- Perfect for designers, artists, and creative professionals

## Form Validation

The application includes comprehensive validation:

- **Required Fields**: Name, title, email, phone, location, bio, at least one project, at least one skill
- **Email Format**: Valid email address required
- **Bio Length**: Must be 200-500 characters
- **Real-time Feedback**: Instant validation messages and visual indicators

## Data Management

- **Local Storage**: All data is stored locally in the browser
- **Auto-save**: Form progress is maintained during navigation
- **Data Export**: Portfolio data can be accessed via browser storage
- **Preview Mode**: Temporary preview data stored in session storage

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

Visit the [GitHub repository](https://github.com/iankit-sachan) to contribute to this project.

1. Follow the existing code structure and TypeScript patterns
2. Maintain responsive design principles
3. Add proper error handling and validation
4. Include comprehensive type definitions
5. Test on multiple screen sizes and browsers

## Author

**Ankit Sachan**
- GitHub: [https://github.com/iankit-sachan](https://github.com/iankit-sachan)

## License

This project is open source and available under the MIT License.