import { Technology, Social, DevToArticle } from '../types';

interface MarkdownGeneratorProps {
  name: string;
  title: string;
  about: string;
  location: string;
  company: string;
  website: string;
  email: string;
  currentWork: string;
  learning: string;
  collaboration: string;
  funFact: string;
  selectedTechs: Record<string, Technology[]>;
  socials: Social[];
  showStats: boolean;
  showTopLangs: boolean;
  showTrophies: boolean;
  showProfileViews: boolean;
  showDevToArticles: boolean;
  devToArticles: { title: string; url: string; }[];
}

export function generateMarkdown({
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
  showStats,
  showTopLangs,
  showTrophies,
  showProfileViews,
  showDevToArticles,
  devToArticles
}: MarkdownGeneratorProps): string {
  const githubUsername = socials.find(social => social.name.toLowerCase() === 'github')?.value || name;

  const profileViewsSection = showProfileViews ? `
<div align="center">
  <img src="https://komarev.com/ghpvc/?username=${githubUsername}&style=for-the-badge&color=0e75b6" alt="Profile Views" />
</div>

` : '';

  const titleSection = `<div align="center">
  <h1>Hey there! 👋 I'm ${name}</h1>
  <h3>🚀 ${title || 'Full-Stack Developer'} | 💡 AI Explorer | ⚡ Tech Innovator</h3>
</div>

`;

  const achievementsSection = `<div align="center">
  <img src="https://github-profile-trophy.vercel.app/?username=${githubUsername}&theme=radical&no-frame=true&row=1&column=8" alt="Trophies" />
</div>

`;

  const passionSection = `<div align="center">
  <p>🔥 Passionate about building high-performance web applications, solving complex challenges, and pushing the boundaries of tech!</p>
  <p>🌱 Always learning & experimenting with AI, Cloud Computing, and Automation!</p>
</div>

`;

  const aboutSection = `<div align="center">
  <h2>🚀 About Me</h2>

  <p>
    ${website ? `🌐 <b>Website:</b> <a href="${website}">${website}</a><br>` : ''}
    ${email ? `📫 <b>Email:</b> <a href="mailto:${email}">${email}</a><br>` : ''}
    ${currentWork ? `🤖 <b>Currently:</b> ${currentWork}<br>` : ''}
    ${collaboration ? `🏗️ <b>Open to:</b> ${collaboration}<br>` : ''}
    ${funFact ? `⚡ <b>Fun fact:</b> ${funFact}` : ''}
  </p>
</div>

`;

  const socialSection = `<div align="center">
  <h2>🌐 Connect with Me</h2>

  <p>
    ${socials
      .filter(social => social.value)
      .map(social => `<a href="${getSocialLink(social)}" target="_blank">
      <img src="${social.badgeUrl}" alt="${social.name}" />
    </a>`).join('\n    ')}
  </p>
</div>

`;

  // Separate programming languages from other tech categories
  const programmingLanguages = selectedTechs['Programming Languages'];
  const otherTechCategories = Object.entries(selectedTechs).filter(([category]) => category !== 'Programming Languages');

  const programmingLanguagesSection = programmingLanguages ? `<div align="center">
  <h2>💻 Programming Languages</h2>

  <p>
    ${programmingLanguages
      .filter((tech: Technology) => tech.selected)
      .map((tech: Technology) => `<img src="${tech.badge}" alt="${tech.name}" />`).join('\n    ')}
  </p>
</div>

` : '';

  const techStackSection = `<div align="center">
  <h2>🛠️ Tech Stack</h2>

  ${otherTechCategories
    .map(([category, techs]) => {
      const selectedTechs = techs.filter((tech: Technology) => tech.selected);
      if (selectedTechs.length === 0) return '';
      
      return `<h3>${getEmoji(category)} ${category}</h3>
      
  <p>
    ${selectedTechs.map((tech: Technology) => 
      `<img src="${tech.badge}" alt="${tech.name}" />`
    ).join('\n    ')}
  </p>

`;
    })
    .filter(section => section)
    .join('\n')}
</div>

`;

  const githubStatsSection = showStats ? `<div align="center">
  <h2>📊 My GitHub Stats</h2>

  <p>
    <img src="https://github-readme-stats.vercel.app/api?username=${githubUsername}&show_icons=true&theme=radical&hide_border=true&count_private=true" alt="GitHub Stats" />
  </p>

  <h3>📈 Activity Graph</h3>
  <p>
    <img src="https://github-readme-activity-graph.vercel.app/graph?username=${githubUsername}&theme=tokyo-night&hide_border=true" alt="Activity Graph" />
  </p>

  <h3>🔥 Streak Stats</h3>
  <p>
    <img src="https://github-readme-streak-stats.herokuapp.com/?user=${githubUsername}&theme=radical&hide_border=true" alt="Streak Stats" />
  </p>
</div>

` : '';

  const topLanguagesSection = showTopLangs ? `<div align="center">
  <h3>📊 Top Languages</h3>
  <p>
    <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${githubUsername}&theme=radical&hide_border=true&layout=compact" alt="Top Languages" />
  </p>
</div>

` : '';

  const devToSection = showDevToArticles && devToArticles.length > 0 ? `<div align="center">
  <h2>📝 Latest Blog Posts</h2>

  <p>
    ${devToArticles.map(article => `• <a href="${article.url}">${article.title}</a>`).join('<br>\n    ')}
  </p>
</div>

` : '';

  const contributionSection = `<div align="center">
  <h2>🤝 Feel Free to Contribute!</h2>

  <p>
    🚀💡 I welcome contributions to my projects! If you have any ideas, suggestions, or improvements, don't hesitate to reach out or submit a pull request! ✨
  </p>
</div>

`;

  const footer = `<div align="center">
  <h2>Let's build something amazing together! 🚀</h2>
  
  <h3>⭐ Thank You for Visiting My Profile! ⭐</h3>
</div>
`;

  return `${titleSection}${profileViewsSection}${achievementsSection}${passionSection}---

${aboutSection}---

${socialSection}---

${programmingLanguagesSection}${techStackSection}---

${githubStatsSection}${topLanguagesSection}${devToSection}---

${contributionSection}---

${footer}`;
}

function getSocialLink(social: Social): string {
  const platform = social.name.toLowerCase();
  const username = social.value;

  const linkTemplates: Record<string, string> = {
    'github': `https://github.com/${username}`,
    'linkedin': `https://linkedin.com/in/${username}`,
    'twitter': `https://twitter.com/${username}`,
    'instagram': `https://instagram.com/${username}`,
    'hackerrank': `https://www.hackerrank.com/${username}`,
    'leetcode': `https://www.leetcode.com/${username}`,
    'hackerearth': `https://www.hackerearth.com/@${username}`,
    'codechef': `https://www.codechef.com/users/${username}`,
    'codeforces': `https://codeforces.com/profile/${username}`,
    'geeksforgeeks': `https://www.geeksforgeeks.org/user/${username}`
  };

  return linkTemplates[platform] || username;
}

function getEmoji(category: string): string {
  const emojis: Record<string, string> = {
    'Programming Languages': '💻',
    'Web & Frameworks': '🌐',
    'Mobile App Development': '📱',
    'Artificial Intelligence & Machine Learning': '🤖',
    'Cybersecurity & Ethical Hacking': '🔒',
    'Blockchain & Web3': '⛓️',
    'Game Development': '🎮',
    'Embedded Systems & IoT': '🔌',
    'Big Data & Analytics': '📊',
    'Software Testing & Automation': '🔍',
    'Networking & Cloud Security': '☁️',
    'Databases & Cloud': '🗄️',
    'DevOps & Tools': '🛠️'
  };

  return emojis[category] || '💻';
}