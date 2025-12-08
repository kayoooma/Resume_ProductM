export type Language = 'ru' | 'en';

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
  tags: string[];
}

export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  year: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  year: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface ContentData {
  nav: {
    about: string;
    experience: string;
    skills: string;
    education: string;
    contact: string;
  };
  hero: {
    greeting: string;
    name: string;
    role: string;
    description: string;
    cta_primary: string;
    cta_secondary: string;
  };
  about: {
    title: string;
    content: string[];
    stats: { label: string; value: string }[];
  };
  experience: {
    title: string;
    items: ExperienceItem[];
  };
  skills: {
    title: string;
    categories: SkillCategory[];
  };
  education: {
    title: string;
    items: EducationItem[];
    certTitle: string;
    certs: CertificationItem[];
  };
  contact: {
    title: string;
    subtitle: string;
    email: string;
    phone: string;
    location: string;
    footer: string;
  };
}