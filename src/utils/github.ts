import { GitHubUser, Repository, DevToArticle } from '../types';

export const fetchGitHubUser = async (username: string): Promise<GitHubUser> => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) throw new Error(`Failed to fetch user ${username}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching GitHub user:', error);
    throw error;
  }
};

export const fetchRepositories = async (username: string): Promise<Repository[]> => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`);
    if (!response.ok) throw new Error(`Failed to fetch repositories for user ${username}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching repositories:', error);
    throw error;
  }
};

export const fetchDevToArticles = async (username: string): Promise<DevToArticle[]> => {
  try {
    const response = await fetch(`https://dev.to/api/articles?username=${username}&per_page=3`);
    if (!response.ok) throw new Error(`Failed to fetch Dev.to articles for user ${username}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching Dev.to articles:', error);
    throw error;
  }
};

export const extractSocialLinks = (user: GitHubUser) => {
  const socials = [];
  
  if (user.twitter_username) {
    socials.push({
      platform: 'Twitter',
      username: user.twitter_username,
      url: `https://twitter.com/${user.twitter_username}`
    });
  }
  
  if (user.blog) {
    socials.push({
      platform: 'Website',
      url: user.blog.startsWith('http') ? user.blog : `https://${user.blog}`
    });
  }
  
  return socials;
};