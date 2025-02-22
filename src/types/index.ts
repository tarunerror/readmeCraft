export interface Technology {
  name: string;
  badge: string;
  selected: boolean;
}

export interface Social {
  name: string;
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  badgeUrl: string;
}

export interface GitHubUser {
  login: string;
  name: string;
  bio?: string;
  company?: string;
  location?: string;
  blog?: string;
  email?: string;
  twitter_username?: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  avatar_url: string;
}

export interface Repository {
  name: string;
  html_url: string;
  description?: string;
  homepage?: string;
  stargazers_count: number;
  forks_count: number;
  language?: string;
}

export interface DevToArticle {
  id: number;
  title: string;
  description: string;
  url: string;
  published_at: string;
  tag_list: string[];
  reading_time_minutes: number;
}