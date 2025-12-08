import { ContentData } from './types';

export const RESUME_DATA: Record<'ru' | 'en', ContentData> = {
  ru: {
    nav: {
      about: "Обо мне",
      experience: "Опыт",
      skills: "Навыки",
      education: "Образование",
      contact: "Контакты"
    },
    hero: {
      greeting: "Привет, я",
      name: "Султонов Комил",
      role: "Product Manager | Product Owner",
      description: "Бизнес-аналитик и продуктовый дизайнер, превращающий сложные данные в успешные продукты.",
      cta_primary: "Связаться",
      cta_secondary: "Скачать резюме"
    },
    about: {
      title: "Обо мне",
      content: [
        "Проактивный IT-проектный менеджер с опытом в финтехе, AI/ML и digital.",
        "Управляю проектами с упором на автоматизацию, эффективность и результат. Помешан на оптимизации процессов и внедрении технологических решений, которые повышают скорость и качество работы команд.",
        "Опыт управления проектами — 5 лет, из них 2 года в роли Project Manager в IT и digital."
      ],
      stats: [
        { label: "Лет опыта", value: "5+" },
        { label: "Проектов", value: "20+" },
        { label: "Языков", value: "3" }
      ]
    },
    experience: {
      title: "Опыт работы",
      items: [
        {
          id: "1",
          role: "Business Development Manager / Acting PM",
          company: "ЧП Softex",
          period: "Окт 2025 — Ноя 2025",
          description: "Отвечал за исследование рынка, аудит компании и создание продуктовой стратегии. Выполнял функции Product Manager/Product Owner.",
          achievements: [
            "Провёл масштабный анализ рынка недвижимости (6 сегментов, 16 ниш).",
            "Сформировал базу 600+ риелторов, организовал 300 интервью.",
            "Сформировал продуктовую стратегию для Marketplace и CRM.",
            "Спроектировал рейтинговую систему риелторов."
          ],
          tags: ["Market Research", "Product Strategy", "CRM"]
        },
        {
          id: "2",
          role: "Project Manager (Fintech + AI/ML)",
          company: "WatchWithNoHands",
          period: "Июнь 2024 — Окт 2025",
          description: "Управление полным циклом проекта: от идеи и сбора требований до релиза и сопровождения.",
          achievements: [
            "Разработка архитектуры БД, интеграция платёжных систем (YooKassa, Payme).",
            "Автоматизация процессов с AI (DeepSeek R1, Stable Diffusion, Whisper).",
            "Разработка системы отслеживания продуктовых метрик: DAU, MAU, Retention.",
            "Управление бэклогом и координация кросс-функциональной команды."
          ],
          tags: ["Fintech", "AI/ML", "Agile/Scrum", "Analytics"]
        },
        {
          id: "3",
          role: "Ведущий SMM-специалист / Project Manager",
          company: "Agat Credit",
          period: "Сент 2023 — Июнь 2024",
          description: "Управление маркетинговыми проектами и командой из 10 человек.",
          achievements: [
            "Снижение CPL на 15% и повышение конверсии на 18%.",
            "Запуск медиа-планов (SMM, таргет, оффлайн).",
            "Планирование бюджета и контроль сроков."
          ],
          tags: ["Marketing", "Management", "Analytics"]
        },
        {
          id: "4",
          role: "3D Motion Designer / Project Lead",
          company: "Fiverr (Freelance)",
          period: "Июнь 2020 — Авг 2023",
          description: "Управление фриланс-проектами для клиентов из Румынии, Индии, Нигерии, США.",
          achievements: [
            "Создание 3D-анимаций в Blender.",
            "Переговоры с заказчиками и формализация требований."
          ],
          tags: ["3D Design", "Freelance", "English"]
        }
      ]
    },
    skills: {
      title: "Навыки и Инструменты",
      categories: [
        {
          title: "Управление",
          skills: ["Agile", "Scrum", "Kanban", "Waterfall", "Jira", "Asana", "Confluence", "SLA", "User Flow"]
        },
        {
          title: "Технологии & AI",
          skills: ["Python", "SQL (PostgreSQL, SQLite)", "ChatGPT 4", "DeepSeek", "Stable Diffusion", "Whisper", "API"]
        },
        {
          title: "Маркетинг & Аналитика",
          skills: ["Google Ads", "Unit Economics", "B2B/B2C Marketing", "Affiliate Marketing", "DAU/MAU/ARPU"]
        },
        {
          title: "Языки",
          skills: ["Русский (Родной)", "Английский (B2)", "Узбекский (C2)"]
        }
      ]
    },
    education: {
      title: "Образование",
      items: [
        {
          id: "edu1",
          school: "Национальный университет имени Мирзо Улугбека",
          degree: "Экономика, HR",
          year: "2027"
        }
      ],
      certTitle: "Сертификаты",
      certs: [
        { id: "c1", name: "Fundamentals of Predictive Project Management", issuer: "PMI", year: "2024" },
        { id: "c2", name: "Google Ads для вашего бизнеса", issuer: "Udemy", year: "2024" },
        { id: "c3", name: "Нейросети для маркетолога", issuer: "Maed", year: "2024" },
        { id: "c4", name: "IELTS", issuer: "Band 6.5", year: "2025" }
      ]
    },
    contact: {
      title: "Давайте работать вместе",
      subtitle: "Готов к переезду и редким командировкам.",
      email: "kamasultanov8@gmail.com",
      phone: "+998 (88) 1116612",
      location: "Ташкент, Узбекистан",
      footer: "© 2025 Komil Sultonov. All rights reserved."
    }
  },
  en: {
    nav: {
      about: "About",
      experience: "Experience",
      skills: "Skills",
      education: "Education",
      contact: "Contact"
    },
    hero: {
      greeting: "Hello, I am",
      name: "Komil Sultonov",
      role: "Product Manager | Product Owner",
      description: "Business Analyst and Product Designer transforming complex data into successful digital products.",
      cta_primary: "Get in Touch",
      cta_secondary: "Download CV"
    },
    about: {
      title: "About Me",
      content: [
        "Proactive IT Project Manager with experience in Fintech, AI/ML, and Digital.",
        "I manage projects with a focus on automation, efficiency, and results. Obsessed with process optimization and implementing technological solutions that increase team speed and quality.",
        "Project Management experience — 5 years, including 2 years as a Project Manager in IT and Digital."
      ],
      stats: [
        { label: "Years Exp", value: "5+" },
        { label: "Projects", value: "20+" },
        { label: "Languages", value: "3" }
      ]
    },
    experience: {
      title: "Work Experience",
      items: [
        {
          id: "1",
          role: "Business Development Manager / Acting PM",
          company: "Softex",
          period: "Oct 2025 — Nov 2025",
          description: "Responsible for market research, company audit, and product strategy creation. Acted as Product Manager/Product Owner.",
          achievements: [
            "Conducted large-scale real estate market analysis (6 segments, 16 niches).",
            "Formed a database of 600+ realtors, organized 300 structured interviews.",
            "Formulated product strategy for Marketplace and CRM.",
            "Designed a realtor rating system."
          ],
          tags: ["Market Research", "Product Strategy", "CRM"]
        },
        {
          id: "2",
          role: "Project Manager (Fintech + AI/ML)",
          company: "WatchWithNoHands",
          period: "June 2024 — Oct 2025",
          description: "Full cycle project management: from idea and requirements gathering to release and maintenance.",
          achievements: [
            "Developed DB architecture, integrated payment systems (YooKassa, Payme).",
            "Automated workflows using AI (DeepSeek R1, Stable Diffusion, Whisper).",
            "Developed product metrics tracking system: DAU, MAU, Retention.",
            "Managed backlog and coordinated cross-functional teams."
          ],
          tags: ["Fintech", "AI/ML", "Agile/Scrum", "Analytics"]
        },
        {
          id: "3",
          role: "Lead SMM Specialist / Project Manager",
          company: "Agat Credit",
          period: "Sept 2023 — June 2024",
          description: "Managed marketing projects and a team of 10 people.",
          achievements: [
            "Reduced CPL by 15% and increased conversion by 18%.",
            "Launched media plans (SMM, target, offline).",
            "Budget planning and deadline control."
          ],
          tags: ["Marketing", "Management", "Analytics"]
        },
        {
          id: "4",
          role: "3D Motion Designer / Project Lead",
          company: "Fiverr (Freelance)",
          period: "June 2020 — Aug 2023",
          description: "Managed freelance projects for clients from Romania, India, Nigeria, USA.",
          achievements: [
            "Created 3D animations in Blender.",
            "Negotiated with clients and formalized requirements."
          ],
          tags: ["3D Design", "Freelance", "English"]
        }
      ]
    },
    skills: {
      title: "Skills & Tools",
      categories: [
        {
          title: "Management",
          skills: ["Agile", "Scrum", "Kanban", "Waterfall", "Jira", "Asana", "Confluence", "SLA", "User Flow"]
        },
        {
          title: "Tech & AI",
          skills: ["Python", "SQL (PostgreSQL, SQLite)", "ChatGPT 4", "DeepSeek", "Stable Diffusion", "Whisper", "API"]
        },
        {
          title: "Marketing & Analytics",
          skills: ["Google Ads", "Unit Economics", "B2B/B2C Marketing", "Affiliate Marketing", "DAU/MAU/ARPU"]
        },
        {
          title: "Languages",
          skills: ["Russian (Native)", "English (B2)", "Uzbek (C2)"]
        }
      ]
    },
    education: {
      title: "Education",
      items: [
        {
          id: "edu1",
          school: "National University of Uzbekistan",
          degree: "Economics, HR",
          year: "2027"
        }
      ],
      certTitle: "Certifications",
      certs: [
        { id: "c1", name: "Fundamentals of Predictive Project Management", issuer: "PMI", year: "2024" },
        { id: "c2", name: "Google Ads for Business", issuer: "Udemy", year: "2024" },
        { id: "c3", name: "Neural Networks for Marketers", issuer: "Maed", year: "2024" },
        { id: "c4", name: "IELTS", issuer: "Band 6.5", year: "2025" }
      ]
    },
    contact: {
      title: "Let's Work Together",
      subtitle: "Ready for relocation and occasional business trips.",
      email: "kamasultanov8@gmail.com",
      phone: "+998 (88) 1116612",
      location: "Tashkent, Uzbekistan",
      footer: "© 2025 Komil Sultonov. All rights reserved."
    }
  }
};