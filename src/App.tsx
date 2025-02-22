import React, { useState, useEffect } from 'react';
import { Github, Twitter, Linkedin, Instagram, Code2, Terminal, Hash, Binary, Cpu, Sun, Moon } from 'lucide-react';
import { TechnologySelector } from './components/TechnologySelector';
import { SocialLinks } from './components/SocialLinks';
import { ProfileFeatures } from './components/ProfileFeatures';
import { LivePreview } from './components/LivePreview';
import { DevToArticles } from './components/DevToArticles';
import { techCategories } from './data/techCategories';
import { generateMarkdown } from './utils/markdown';
import { fetchGitHubUser, fetchRepositories, fetchDevToArticles } from './utils/github';
import type { Technology, Social, GitHubUser, Repository, DevToArticle } from './types';

function App() {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [location, setLocation] = useState('');
  const [company, setCompany] = useState('');
  const [website, setWebsite] = useState('');
  const [email, setEmail] = useState('');
  const [currentWork, setCurrentWork] = useState('');
  const [learning, setLearning] = useState('');
  const [collaboration, setCollaboration] = useState('');
  const [funFact, setFunFact] = useState('');

  const [showStats, setShowStats] = useState(true);
  const [showTopLangs, setShowTopLangs] = useState(true);
  const [showTrophies, setShowTrophies] = useState(true);
  const [showProfileViews, setShowProfileViews] = useState(true);
  const [showDevToArticles, setShowDevToArticles] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [githubUser, setGithubUser] = useState<GitHubUser | null>(null);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [devToArticles, setDevToArticles] = useState<DevToArticle[]>([]);

  const [technologies, setTechnologies] = useState(
    Object.entries(techCategories).map(([category, techs]) => ({
      category,
      techs: techs.map(tech => ({ ...tech, selected: false }))
    }))
  );

  const [socials, setSocials] = useState<Social[]>([
    {
      name: 'GitHub',
      icon: <Github className="w-6 h-6" />,
      placeholder: 'GitHub username',
      value: '',
      badgeUrl: 'https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white'
    },
    {
      name: 'Twitter',
      icon: <Twitter className="w-6 h-6" />,
      placeholder: 'Twitter username',
      value: '',
      badgeUrl: 'https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-6 h-6" />,
      placeholder: 'LinkedIn profile URL',
      value: '',
      badgeUrl: 'https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white'
    },
    {
      name: 'LeetCode',
      icon: <Code2 className="w-6 h-6" />,
      placeholder: 'LeetCode username',
      value: '',
      badgeUrl: 'https://img.shields.io/badge/LeetCode-FFA116?style=for-the-badge&logo=leetcode&logoColor=black'
    },
    {
      name: 'CodeForces',
      icon: <Terminal className="w-6 h-6" />,
      placeholder: 'CodeForces username',
      value: '',
      badgeUrl: 'https://img.shields.io/badge/Codeforces-445f9d?style=for-the-badge&logo=codeforces&logoColor=white'
    },
    {
      name: 'CodeChef',
      icon: <Hash className="w-6 h-6" />,
      placeholder: 'CodeChef username',
      value: '',
      badgeUrl: 'https://img.shields.io/badge/CodeChef-5B4638?style=for-the-badge&logo=codechef&logoColor=white'
    },
    {
      name: 'HackerRank',
      icon: <Binary className="w-6 h-6" />,
      placeholder: 'HackerRank username',
      value: '',
      badgeUrl: 'https://img.shields.io/badge/HackerRank-2EC866?style=for-the-badge&logo=hackerrank&logoColor=white'
    },
    {
      name: 'HackerEarth',
      icon: <Cpu className="w-6 h-6" />,
      placeholder: 'HackerEarth username',
      value: '',
      badgeUrl: 'https://img.shields.io/badge/HackerEarth-2C3454?style=for-the-badge&logo=hackerearth&logoColor=white'
    }
  ]);

  const handleTechnologyToggle = (categoryIndex: number, techIndex: number) => {
    setTechnologies(prev => prev.map((category, idx) =>
      idx === categoryIndex
        ? {
            ...category,
            techs: category.techs.map((tech, tIdx) =>
              tIdx === techIndex ? { ...tech, selected: !tech.selected } : tech
            )
          }
        : category
    ));
  };

  const handleSocialUpdate = (index: number, value: string) => {
    setSocials(prev => prev.map((social, idx) =>
      idx === index ? { ...social, value } : social
    ));
  };

  const fetchUserData = async (username: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const user = await fetchGitHubUser(username);
      const repos = await fetchRepositories(username);
      let articles: DevToArticle[] = [];
      
      try {
        articles = await fetchDevToArticles(username);
      } catch (error) {
        console.warn('Failed to fetch Dev.to articles:', error);
      }

      setGithubUser(user);
      setRepositories(repos);
      setDevToArticles(articles);

      // Auto-fill form fields
      setName(user.name || user.login);
      setAbout(user.bio || '');
      setLocation(user.location || '');
      setCompany(user.company || '');
      setWebsite(user.blog || '');
      setEmail(user.email || '');

      // Update GitHub social link
      handleSocialUpdate(0, user.login);
      
      if (user.twitter_username) {
        handleSocialUpdate(1, user.twitter_username);
      }

    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch user data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateMarkdown = () => {
    if (!name) {
      alert('Please enter your GitHub username.');
      return;
    }

    const markdown = generateMarkdown({
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
      selectedTechs: technologies.reduce((acc, category) => ({
        ...acc,
        [category.category]: category.techs
      }), {}),
      socials,
      showStats,
      showTopLangs,
      showTrophies,
      showProfileViews,
      showDevToArticles,
      devToArticles: devToArticles.map(article => ({
        title: article.title,
        url: article.url
      }))
    });

    // Create a blob and download the markdown file
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const toggleTheme = () => {
    setIsDarkTheme(prev => !prev);
    document.documentElement.classList.toggle('dark');
  };

  useEffect(() => {
    // Set initial theme
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkTheme(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold gradient-text mb-4">DevFolio - GitHub Profile README Generator</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">Create an awesome GitHub profile README in minutes</p>
          <button
            onClick={toggleTheme}
            className="btn btn-primary"
          >
            {isDarkTheme ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            <span className="ml-2">{isDarkTheme ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>

        <div className="card p-6 space-y-6">
          <div className="space-y-4">
            <h2 className="section-title">Basic Information</h2>
            <div className="input-group">
              <label className="input-label" htmlFor="github-username">GitHub Username</label>
              <div className="flex gap-4">
                <input
                  type="text"
                  id="github-username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter GitHub username"
                  className="flex-1 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <button
                  onClick={() => fetchUserData(name)}
                  disabled={isLoading}
                  className="btn btn-primary"
                >
                  {isLoading ? 'Loading...' : 'Fetch Data'}
                </button>
              </div>
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="input-group">
                <label className="input-label" htmlFor="title">Professional Title</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Full Stack Developer"
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div className="input-group">
                <label className="input-label" htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., San Francisco, CA"
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div className="input-group">
                <label className="input-label" htmlFor="company">Company</label>
                <input
                  type="text"
                  id="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Current company"
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div className="input-group">
                <label className="input-label" htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="Your website URL"
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div className="input-group">
                <label className="input-label" htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="about">About Me</label>
              <textarea
                id="about"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                placeholder="Write a brief introduction about yourself"
                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                rows={4}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="section-title">Current Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="input-group">
                <label className="input-label" htmlFor="current-work">Current Work</label>
                <input
                  type="text"
                  id="current-work"
                  value={currentWork}
                  onChange={(e) => setCurrentWork(e.target.value)}
                  placeholder="What are you working on?"
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div className="input-group">
                <label className="input-label" htmlFor="learning">Learning</label>
                <input
                  type="text"
                  id="learning"
                  value={learning}
                  onChange={(e) => setLearning(e.target.value)}
                  placeholder="What are you learning?"
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div className="input-group">
                <label className="input-label" htmlFor="collaboration">Collaboration</label>
                <input
                  type="text"
                  id="collaboration"
                  value={collaboration}
                  onChange={(e) => setCollaboration(e.target.value)}
                  placeholder="Looking to collaborate on..."
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div className="input-group">
                <label className="input-label" htmlFor="fun-fact">Fun Fact</label>
                <input
                  type="text"
                  id="fun-fact"
                  value={funFact}
                  onChange={(e) => setFunFact(e.target.value)}
                  placeholder="Share a fun fact about yourself"
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="section-title">Technologies</h2>
            {technologies.map((category, categoryIndex) => (
              <TechnologySelector
                key={category.category}
                technologies={category.techs}
                onToggle={(techIndex) => handleTechnologyToggle(categoryIndex, techIndex)}
                category={category.category}
              />
            ))}
          </div>

          <div className="space-y-4">
            <h2 className="section-title">Social Links</h2>
            <SocialLinks
              socials={socials}
              onUpdate={handleSocialUpdate}
            />
          </div>

          <div className="space-y-4">
            <h2 className="section-title">Profile Features</h2>
            <ProfileFeatures
              showStats={showStats}
              showTopLangs={showTopLangs}
              showTrophies={showTrophies}
              showProfileViews={showProfileViews}
              showDevToArticles={showDevToArticles}
              onToggleStats={setShowStats}
              onToggleTopLangs={setShowTopLangs}
              onToggleTrophies={setShowTrophies}
              onToggleProfileViews={setShowProfileViews}
              onToggleDevToArticles={setShowDevToArticles}
            />
          </div>

          {devToArticles.length > 0 && (
            <div className="space-y-4">
              <h2 className="section-title">Latest Dev.to Articles</h2>
              <DevToArticles articles={devToArticles} />
            </div>
          )}

          <LivePreview
            markdown={generateMarkdown({
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
              selectedTechs: technologies.reduce((acc, category) => ({
                ...acc,
                [category.category]: category.techs
              }), {}),
              socials,
              showStats,
              showTopLangs,
              showTrophies,
              showProfileViews,
              showDevToArticles,
              devToArticles: devToArticles.map(article => ({
                title: article.title,
                url: article.url
              }))
            })}
          />

          <button
            onClick={handleGenerateMarkdown}
            className="w-full btn btn-primary flex items-center justify-center gap-2"
          >
            <Code2 className="w-5 h-5" />
            Generate README
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;