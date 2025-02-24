import { GitHubUser, Repository, DevToArticle } from '../types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const fetchWithRetry = async (url: string, options: RequestInit = {}, retries = 3): Promise<Response> => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          ...options.headers,
        }
      });

      if (response.status === 403) {
        const resetTime = response.headers.get('X-RateLimit-Reset');
        if (resetTime) {
          const waitTime = (parseInt(resetTime) * 1000) - Date.now();
          if (waitTime > 0 && i < retries - 1) {
            await delay(Math.min(waitTime, 60000)); // Wait up to 1 minute
            continue;
          }
        }
        throw new Error(
          'GitHub API rate limit exceeded. Please try:\n' +
          '1. Wait a few minutes and try again\n' +
          '2. Use a different network connection\n' +
          '3. Add your GitHub token (coming soon)'
        );
      }

      if (response.status === 404) {
        throw new Error(`GitHub user not found. Please check the username and try again.`);
      }

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
      }

      return response;
    } catch (error) {
      if (i === retries - 1) throw error;
      await delay(1000 * Math.pow(2, i)); // Exponential backoff
    }
  }
  throw new Error('Failed to fetch after multiple retries');
};

export const fetchGitHubUser = async (username: string): Promise<GitHubUser> => {
  try {
    const response = await fetchWithRetry(`https://api.github.com/users/${username}`);
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('An unexpected error occurred while fetching GitHub user data');
  }
};

export const fetchRepositories = async (username: string): Promise<Repository[]> => {
  try {
    const response = await fetchWithRetry(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=5`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('An unexpected error occurred while fetching repositories');
  }
};

export const fetchDevToArticles = async (username: string): Promise<DevToArticle[]> => {
  try {
    const response = await fetch(`https://dev.to/api/articles?username=${username}&per_page=3`);
    
    if (!response.ok) {
      if (response.status === 404) {
        return [];
      }
      throw new Error(`Dev.to API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Don't throw error for Dev.to articles, just return empty array
    console.warn('Error fetching Dev.to articles:', error);
    return [];
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