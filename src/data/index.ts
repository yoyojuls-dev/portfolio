import { Project, Skill } from '../types'

export const projects: Project[] = [
  {
    id: 1,
    title: 'Safesense',
    description: 'Lethal Weapon Detection trained in YOLOv8, deployed with Flask API and React dashboard for real-time monitoring. 4 Categories: Firearms, Explosives, Projectile, and Bladed Weapon.',
    tags: ['Typescript', 'Node.js', 'Javascript', 'HTML','JSON', 'TensorFlow.js', 'Vite', 'CSS', 'React', 'YOLOv8', 'WEBGL'],
    image: '/images/safesense.png',
    liveUrl: 'https://safesense-two.vercel.app/',
    githubUrl: 'https://github.com/yoyojuls-dev/safesense.git',
    featured: true,
  },
  {
    id: 2,
    title: 'MAS  Management System',
    description: 'Ministry Management System for Altar Servers Attendance, Scheduling, and Communication. Built with React frontend, with email notifications.',
    tags: ['Typescript', 'Node.js', 'React', 'JavaScript', 'HTML', 'CSS', 'JSON', 'MongoDB'],
    image: '/images/mas.png',
    liveUrl: 'https://sndbs-mas-management-system.vercel.app/',
    githubUrl: 'https://github.com/yoyojuls-dev/MAS-Management-System.git',
    featured: true,
  },
  {
    id: 3,
    title: 'Fatibot',
    description: 'Our Lady of Fatima University Chatbot for answering FAQs about admissions, courses, and campus information. Built with Node.js and Express.',
    tags: ['Google AI Studio', 'Javascript', 'React', 'Node.js', 'Express', 'HTML', 'CSS'],
    image: '/images/olfu.png',
    liveUrl: 'https://chatbot-tau-three-32.vercel.app/',
    githubUrl: 'https://github.com/yoyojuls-dev/chatbot',
    featured: true,
  },
  {
    id: 4,
    title: 'Self - Clone AI',
    description: 'Localized AI-powered personal assistant that mimics my communication style and provides personalized responses. Built with JavaScript frontend and localized backend.',
    image: '/images/selfclone.png',
    tags: ['Docker', 'Ollama', 'Gemma 3b'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 5,
    title: 'Church Management System',
    description: 'Church Management System for tracking members, events, and donations. Built with PHP and MySQL.',
    image: '/images/church.png',
    tags: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 6,
    title: 'Uniform-Hub',
    description: 'Uniform Management System for tracking inventory, orders, and customer information. Built with React and Node.js.',
    tags: ['React', 'Node.js', 'Express.js', 'MongoDB', 'HTML', 'CSS', 'JavaScript'],
    image: '/images/uniformhub.png',
    liveUrl: 'https://www.figma.com/design/bCmMopufi2Fxw2ejDpPXz7/UNIFORMHUB---FIGMA?t=AawhdBW2yxn6kpjl-0',
    githubUrl: '#',
  },
  {
    id: 7,
    title: 'Thread Craft',
    description: 'Platform for Online Closet Organization and Outfit Planning. Built with React and Node.js.',
    tags: ['JavaScript', 'HTML', 'CSS'],
    image: '/images/threadcraft.png',
    liveUrl: 'thankyou-letter-pied.vercel.app',
    githubUrl: '#',
  },
  
  {
    id: 8,
    title: 'Wedding-Anniversary-Gallery',
    description: 'Gallery for showcasing wedding and anniversary photos. Built with React and Node.js.',
    tags: ['JavaScript', 'HTML', 'CSS'],
    image: '/images/wedding.png',
    liveUrl: 'https://wedding-anniversary-green.vercel.app/',
    githubUrl: '#',
  },
  {
    id: 9,
    title: 'BSHS Chatbot',
    description: 'Chatbot for answering FAQs about BSHS programs and services. Built with Google AI Studio and React.',
    tags: ['Google AI Studio', 'React', 'CSS'],
    image: '/images/bshs.png',
    liveUrl: 'https://wedding-anniversary-green.vercel.app/',
    githubUrl: '#',
  },
  {
    id: 10,
    title: 'Online Thankyou Letter',
    description: 'Created an online thank you letter generator using JS, HTML, and CSS, allowing users to easily create and customize thank you letters for various occasions.',
    tags: ['JavaScript', 'HTML', 'CSS'],
    image: '/images/thankyou.png',
    liveUrl: 'https://thankyou-letter-pied.vercel.app',
    githubUrl: '#',
  },
  {
    id: 11,
    title: 'EDUCEARTH',
    description: 'Created a Prototype for an educational platform that provides interactive learning experiences and resources for students.',
    tags: ['Figma'],
    image: '/images/educearth.png',
    liveUrl: 'https://www.figma.com/proto/FIXqeKeyj34nplB55BplUj/PROTOTYPE?node-id=2-2&t=hA3CqYxlV6L17DQq-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=2%3A2&show-proto-sidebar=1&fbclid=IwY2xjawQXG6NleHRuA2FlbQIxMABicmlkETEzdXptVjJCTDd0UktLWWUzc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHmWfcLSZJkoPBuS6rl09PWZh6fQkhTGAaMqy4b8OG9AlH9H2k3ZhqjwwFRIm_aem_kXEJIQ6dvwkHsffqfHQsCw',
    githubUrl: '#',
  },
]

export const skills: Skill[] = [
  {
    category: 'Languages',
    items: ['TypeScript', 'JavaScript', 'C', 'C++', 'Python', 'PHP'],
  },
  {
    category: 'Frameworks',
    items: ['React', 'Vue', 'Flask', 'Express.js', 'Discord.js', 'Next.js', 'Vite', 'Tailwind CSS', 'Bootstrap'],
  },
  {
    category: 'Databases',
    items: ['MySQL', 'MongoDB', 'SQLite', 'Firebase', 'Google Console Databases'],
  },
  {
    category: 'Tools',
    items: ['VSCode', 'PyCharm', 'Git', 'Figma', 'Canva', 'Linux', 'Docker'],
  },
  {
    category: 'AI / ML',
    items: ['Prompt Engineering', 'OpenAI API', 'Anthropic API', 'LangChain'],
  },
  {
    category: 'Other',
    items: ['HTML', 'CSS', 'REST', 'Jinja', 'EJS', 'SCSS'],
  },
]

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]
