interface ProfileData {
  name: string;
  title?: string;
  about?: string;
  location?: string;
  company?: string;
  website?: string;
  email?: string;
  resumeUrl?: string;
  mission?: string;
  focus?: string;
  selectedTechs: Record<string, { name: string; badge: string; selected: boolean }[]>;
  socials: { name: string; value: string; badgeUrl: string }[];
  showStats?: boolean;
  showTopLangs?: boolean;
  showTrophies?: boolean;
  showProfileViews?: boolean;
  currentWork?: string;
  learning?: string;
  collaboration?: string;
  funFact?: string;
  theme?: 'dark' | 'light' | 'radical' | 'merko' | 'gruvbox';
  showAchievements?: boolean;
  achievements?: string[];
  showProjects?: boolean;
  projects?: { name: string; url: string }[];
  showBlogPosts?: boolean;
  blogPosts?: { title: string; url: string }[];
  language?: 'en' | 'es' | 'fr';
  showDevToArticles?: boolean;
  devToArticles?: { title: string; url: string }[];
}

export const generateMarkdown = ({
  name,
  title,
  about,
  location,
  company,
  website,
  email,
  currentWork,
  learning,
  collaboration,
  funFact,
  selectedTechs,
  socials,
  showStats = true,
  showTopLangs = true,
  showTrophies = true,
  showProfileViews = true,
  showDevToArticles = true,
  devToArticles = [],
  theme = 'radical',
  language = 'en',
}: ProfileData) => {
  const techBadges = Object.entries(selectedTechs)
    .flatMap(([category, techs]) =>
      techs.filter(tech => tech.selected)
        .map(tech => `![${tech.name}](${tech.badge})`)
    )
    .join(' ');

  const socialLinks = socials
    .filter(social => social.value)
    .map(social => {
      let url = '';
      switch (social.name) {
        case 'Twitter':
          url = `https://twitter.com/${social.value}`;
          break;
        case 'LinkedIn':
          url = social.value;
          break;
        case 'Instagram':
          url = `https://instagram.com/${social.value}`;
          break;
        default:
          url = social.value;
      }
      return `[![${social.name}](${social.badgeUrl})](${url})`;
    })
    .join(' ');

  const greeting = {
    en: 'Hi there! 👋 I\'m',
    es: '¡Hola! 👋 Soy',
    fr: 'Salut ! 👋 Je suis',
  }[language];

  // Add Dev.to articles section if enabled
  const devToSection = showDevToArticles && devToArticles.length > 0
    ? `
<h2 align="center">📝 Latest Blog Posts</h2>

<div align="center">

${devToArticles.map(article => `
<a href="${article.url}" target="_blank">
  <img src="https://img.shields.io/badge/${encodeURIComponent(article.title)}-000000?style=for-the-badge&logo=dev.to&logoColor=white" alt="${article.title}" />
</a>
`).join('\n')}

</div>`
    : '';

  return `
<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=200&section=header&text=${encodeURIComponent(name)}&fontSize=80&fontAlignY=35&animation=twinkling&fontColor=white" />
</div>

<h1 align="center">${greeting} ${name}</h1>

<p align="center">
  <a href="https://git.io/typing-svg">
    <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=25&duration=3000&pause=1000&color=2F81F7&center=true&vCenter=true&width=435&lines=${encodeURIComponent(
      about || 'Welcome to my GitHub profile!'
    )}" alt="About Me" />
  </a>
</p>

${socialLinks ? `
<div align="center">
  <img src="https://github-profile-trophy.vercel.app/?username=${name}&theme=${theme}&no-frame=true&margin-w=15&column=-1" alt="GitHub Trophies" />
</div>

<p align="center">${socialLinks}</p>` : ''}

<div align="center">
  ${currentWork ? `<p>🔭 I'm currently working on ${currentWork}</p>` : ''}
  ${learning ? `<p>🌱 I'm currently learning ${learning}</p>` : ''}
  ${collaboration ? `<p>👯 I'm looking to collaborate on ${collaboration}</p>` : ''}
  ${funFact ? `<p>⚡ Fun fact: ${funFact}</p>` : ''}
</div>

<h2 align="center">🛠️ Technologies & Tools</h2>

<div align="center">
  <img src="https://github-readme-tech-stack.vercel.app/api/cards?title=&lineCount=3&theme=${theme}&line1=${encodeURIComponent(techBadges)}" alt="Tech Stack" />
</div>

${devToSection}

${showStats ? `
<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${name}&show_icons=true&theme=${theme}&hide_border=true&count_private=true" alt="GitHub Stats" />
</div>` : ''}

${showTopLangs ? `
<div align="center">
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${name}&layout=compact&theme=${theme}&hide_border=true" alt="Top Languages" />
</div>` : ''}

<div align="center">
  <img src="https://github-readme-streak-stats.herokuapp.com/?user=${name}&theme=${theme}&hide_border=true" alt="GitHub Streak" />
</div>

<div align="center">
  <img src="https://github-contribution-stats.vercel.app/api/?username=${name}" alt="Contribution Stats" />
</div>

<div align="center">
  <img src="https://github-readme-activity-graph.vercel.app/graph?username=${name}&theme=${theme}&hide_border=true&custom_title=Contribution%20Graph" alt="Activity Graph" />
</div>

<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=100&section=footer" />
</div>`;
};