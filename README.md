# Julius Ceasar Visbal — Portfolio

A modern, TypeScript + React + Node.js portfolio site with dark hacker aesthetic, smooth animations, and a contact form backend.

## 🚀 Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express, TypeScript, Nodemailer
- **Fonts**: JetBrains Mono, Space Grotesk, DM Sans

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx       # Fixed nav with scroll tracking
│   │   ├── Hero.tsx         # Hero with typewriter effect
│   │   ├── Projects.tsx     # Project cards grid
│   │   ├── Skills.tsx       # Skills categorized
│   │   ├── About.tsx        # About section
│   │   ├── Contact.tsx      # Contact form
│   │   ├── Footer.tsx       # Footer
│   │   ├── CustomCursor.tsx # Custom cursor effect
│   │   └── Loader.tsx       # Loading screen
│   ├── data/index.ts        # All your content (edit this!)
│   ├── types/index.ts       # TypeScript types
│   └── styles/globals.css   # Global styles
├── server/
│   └── index.ts             # Express API server
├── public/
│   ├── images/              # ← PUT YOUR PHOTOS HERE
│   │   ├── julius.png       # Your hero photo
│   │   ├── about.png        # Your about section photo
│   │   ├── chert.png        # ChertNodes screenshot
│   │   ├── protect.png      # ProtectX screenshot
│   │   └── kahoot.png       # Kahoot Viewer screenshot
│   └── favicon.svg
└── .env.example             # Copy to .env and fill in
```

## 🖼 Adding Your Images

Copy your images to the `public/images/` folder:

| File | Usage |
|------|-------|
| `public/images/julius.png` | Hero section photo (your main pic) |
| `public/images/about.png` | About section photo (hooded figure / casual) |
| `public/images/chert.png` | ChertNodes project screenshot |
| `public/images/protect.png` | ProtectX project screenshot |
| `public/images/kahoot.png` | Kahoot Viewer project screenshot |

## ⚙️ Setup & Running

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
# Edit .env with your SMTP credentials for the contact form
```

### 3. Run development server
```bash
# Frontend only (port 5173)
npm run dev

# Backend API only (port 3001)
npm run server

# Both simultaneously
npm run start
```

### 4. Build for production
```bash
npm run build
npm run preview
```

## ✏️ Customization

Edit `src/data/index.ts` to update:
- **Projects**: Add/edit your projects
- **Skills**: Update your skill categories
- **Nav links**: Modify navigation

Update personal info in the components:
- `Hero.tsx` — name, roles, bio, social links
- `Contact.tsx` — email, Discord handle
- `Footer.tsx` — social links

## 🌐 Deployment

### Vercel (recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload the dist/ folder
```

For the backend, deploy to Railway, Render, or Fly.io.
