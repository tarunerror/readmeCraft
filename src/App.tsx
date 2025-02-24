import React, { useState, useEffect } from 'react';
import { Github, Twitter, Linkedin, Instagram, Code2, Terminal, Hash, Binary, Cpu, Sun, Moon, Heart, AlertCircle } from 'lucide-react';
import { Header } from './components/Header';
import { ThemeToggle } from './components/ThemeToggle';
import { BasicInformation } from './components/BasicInformation';
import { TechnologySelector } from './components/TechnologySelector';
import { SocialLinks } from './components/SocialLinks';
import { ProfileFeatures } from './components/ProfileFeatures';
import { LivePreview } from './components/LivePreview';
import { DevToArticles } from './components/DevToArticles';
import { AboutMe } from './components/AboutMe';
import { Footer } from './components/Footer';
import { GenerateButton } from './components/GenerateButton';
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
    if (!username.trim()) {
      setErrorMessage('Please enter a GitHub username');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    
    try {
      const user = await fetchGitHubUser(username);
      const repos = await fetchRepositories(username);
      const articles = await fetchDevToArticles(username);

      setGithubUser(user);
      setRepositories(repos);
      setDevToArticles(articles);

      setName(user.name || user.login);
      setAbout(user.bio || '');
      setLocation(user.location || '');
      setCompany(user.company || '');
      setWebsite(user.blog || '');
      setEmail(user.email || '');

      handleSocialUpdate(0, user.login);
      
      if (user.twitter_username) {
        handleSocialUpdate(1, user.twitter_username);
      }

    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to fetch user data');
      setGithubUser(null);
      setRepositories([]);
      setDevToArticles([]);
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
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkTheme(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <div className="min-h-screen py-4 sm:py-8 px-2 sm:px-4 lg:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto spacing-responsive">
        <div className="flex flex-col items-center mb-8">
          <Header />
          <div className="mt-4">
            <ThemeToggle isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />
          </div>
        </div>
        
        <div className="card spacing-responsive">
          <BasicInformation
            name={name}
            setName={setName}
            title={title}
            setTitle={setTitle}
            location={location}
            setLocation={setLocation}
            company={company}
            setCompany={setCompany}
            website={website}
            setWebsite={setWebsite}
            email={email}
            setEmail={setEmail}
            about={about}
            setAbout={setAbout}
            isLoading={isLoading}
            errorMessage={errorMessage}
            fetchUserData={fetchUserData}
          />

          <AboutMe
            currentWork={currentWork}
            setCurrentWork={setCurrentWork}
            learning={learning}
            setLearning={setLearning}
            collaboration={collaboration}
            setCollaboration={setCollaboration}
            funFact={funFact}
            setFunFact={setFunFact}
          />

          <div className="spacing-responsive">
            <h2 className="section-title">Technologies</h2>
            <div className="space-y-6">
              {technologies.map((category, categoryIndex) => (
                <TechnologySelector
                  key={category.category}
                  technologies={category.techs}
                  onToggle={(techIndex) => handleTechnologyToggle(categoryIndex, techIndex)}
                  category={category.category}
                />
              ))}
            </div>
          </div>

          <div className="spacing-responsive">
            <h2 className="section-title">Social Links</h2>
            <SocialLinks
              socials={socials}
              onUpdate={handleSocialUpdate}
            />
          </div>

          <div className="spacing-responsive">
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
            <div className="spacing-responsive">
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

          <GenerateButton onGenerate={handleGenerateMarkdown} />
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default App;