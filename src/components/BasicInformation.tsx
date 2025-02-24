import React from 'react';
import { AlertCircle } from 'lucide-react';

interface BasicInformationProps {
  name: string;
  setName: (value: string) => void;
  title: string;
  setTitle: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  company: string;
  setCompany: (value: string) => void;
  website: string;
  setWebsite: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  about: string;
  setAbout: (value: string) => void;
  isLoading: boolean;
  errorMessage: string | null;
  fetchUserData: (username: string) => Promise<void>;
}

export function BasicInformation({
  name,
  setName,
  title,
  setTitle,
  location,
  setLocation,
  company,
  setCompany,
  website,
  setWebsite,
  email,
  setEmail,
  about,
  setAbout,
  isLoading,
  errorMessage,
  fetchUserData
}: BasicInformationProps) {
  return (
    <div className="spacing-responsive">
      <h2 className="section-title">Basic Information</h2>
      <div className="input-group">
        <label className="input-label" htmlFor="github-username">GitHub Username</label>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          <input
            type="text"
            id="github-username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter GitHub username"
            className="flex-1"
            disabled={isLoading}
          />
          <button
            onClick={() => fetchUserData(name)}
            disabled={isLoading}
            className="btn btn-primary whitespace-nowrap"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                <span>Loading...</span>
              </div>
            ) : (
              'Fetch Data'
            )}
          </button>
        </div>
        {errorMessage && (
          <div className="mt-2 text-red-500 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg flex items-start gap-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div className="whitespace-pre-line">{errorMessage}</div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="input-group">
          <label className="input-label" htmlFor="title">Professional Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Full Stack Developer"
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
          />
        </div>

        <div className="input-group sm:col-span-2">
          <label className="input-label" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
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
          rows={4}
        />
      </div>
    </div>
  );
}