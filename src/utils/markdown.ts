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
  // Get GitHub username from socials
  const githubUsername = socials.find(social => social.name === 'GitHub')?.value || name;

  // Generate tech badges by category
  const techStackSection = Object.entries(selectedTechs)
    .map(([category, techs]) => {
      const selectedTechs = techs.filter(tech => tech.selected);
      if (selectedTechs.length === 0) return '';

      return `
<details>
<summary><b>💻 ${category}</b></summary>
<br>

${selectedTechs.map(tech => `![${tech.name}](${tech.badge})`).join(' ')}

</details>`;
    })
    .filter(section => section !== '')
    .join('\n\n');

  const socialLinks = socials
    .filter(social => social.value)
    .map(social => {
      let url = '';
      switch (social.name) {
        case 'GitHub':
          url = `https://github.com/${social.value}`;
          break;
        case 'Twitter':
          url = `https://twitter.com/${social.value}`;
          break;
        case 'LinkedIn':
          url = social.value;
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

${socialLinks ? `<p align="center">${socialLinks}</p>` : ''}

<div align="center">
  ${currentWork ? `<p>🔭 I'm currently working on ${currentWork}</p>` : ''}
  ${learning ? `<p>🌱 I'm currently learning ${learning}</p>` : ''}
  ${collaboration ? `<p>👯 I'm looking to collaborate on ${collaboration}</p>` : ''}
  ${funFact ? `<p>⚡ Fun fact: ${funFact}</p>` : ''}
</div>

<h2 align="center">🛠️ Technologies & Tools</h2>

${techStackSection}

${showStats ? `
<h2 align="center">📊 GitHub Stats</h2>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${githubUsername}&show_icons=true&theme=${theme}&hide_border=true&count_private=true" alt="GitHub Stats" />
</div>` : ''}

${showTopLangs ? `
<h2 align="center">📈 Top Languages</h2>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${githubUsername}&layout=compact&theme=${theme}&hide_border=true" alt="Top Languages" />
</div>` : ''}

${showTrophies ? `
<h2 align="center">🏆 GitHub Trophies</h2>

<div align="center">
  <img src="https://github-profile-trophy.vercel.app/?username=${githubUsername}&theme=${theme}&no-frame=true&margin-w=15&column=-1" alt="GitHub Trophies" />
</div>` : ''}

<h2 align="center">🔥 GitHub Streak</h2>

<div align="center">
  <img src="https://github-readme-streak-stats.herokuapp.com/?user=${githubUsername}&theme=${theme}&hide_border=true" alt="GitHub Streak" />
</div>

${showProfileViews ? `
<div align="center">
  <img src="https://komarev.com/ghpvc/?username=${githubUsername}&style=for-the-badge&color=blueviolet" alt="Profile Views" />
</div>` : ''}

<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=100&section=footer" />
</div>`;
};