'use client';

import { useState } from 'react';

export default function Home() {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState<any[]>([]);

  const fetchJobs = async () => {
    setLoading(true);
    setStatus('Fetching jobs...');
    try {
      const response = await fetch('/api/fetch-jobs');
      const data = await response.json();
      setJobs(data.jobs || []);
      setStatus(`Found ${data.jobs?.length || 0} jobs`);
    } catch (error) {
      setStatus('Error fetching jobs');
    }
    setLoading(false);
  };

  const sendTestEmail = async () => {
    setLoading(true);
    setStatus('Sending test email...');
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
      });
      const data = await response.json();
      setStatus(data.message || 'Email sent successfully!');
    } catch (error) {
      setStatus('Error sending email');
    }
    setLoading(false);
  };

  const setupCron = async () => {
    setLoading(true);
    setStatus('Setting up daily alerts...');
    try {
      const response = await fetch('/api/setup-cron', {
        method: 'POST',
      });
      const data = await response.json();
      setStatus(data.message || 'Cron job setup successfully!');
    } catch (error) {
      setStatus('Error setting up cron job');
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Daily Job Alert System 🔔
          </h1>
          <p className="text-gray-600 mb-6">
            Automated Data Analyst job alerts for anishandhyal@gmail.com
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <button
              onClick={fetchJobs}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition disabled:opacity-50"
            >
              🔍 Fetch Jobs Now
            </button>

            <button
              onClick={sendTestEmail}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition disabled:opacity-50"
            >
              📧 Send Test Email
            </button>

            <button
              onClick={setupCron}
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition disabled:opacity-50"
            >
              ⏰ Setup Daily Alerts
            </button>
          </div>

          {status && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-blue-800 font-medium">{status}</p>
            </div>
          )}
        </div>

        {jobs.length > 0 && (
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Latest Data Analyst Jobs ({jobs.length})
            </h2>
            <div className="space-y-4">
              {jobs.map((job, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {job.company}
                    </span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      {job.location}
                    </span>
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                      {job.source}
                    </span>
                  </div>
                  {job.description && (
                    <p className="text-gray-600 text-sm mb-2">{job.description}</p>
                  )}
                  {job.deadline && (
                    <p className="text-red-600 text-sm mb-2">
                      Deadline: {job.deadline}
                    </p>
                  )}
                  <a
                    href={job.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Apply Now →
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            📚 Complete Guide
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                A) Manual Method
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>LinkedIn Jobs: linkedin.com/jobs - Filter by "Data Analyst" + "Entry Level"</li>
                <li>Naukri.com: naukri.com - Search "Data Analyst Fresher"</li>
                <li>Indeed: indeed.co.in - Filter by experience 0-1 years</li>
                <li>Internshala: internshala.com - Data Analytics internships</li>
                <li>AngelList/Wellfound: wellfound.com - Startup jobs</li>
                <li>Instahyre: instahyre.com - Tech jobs for freshers</li>
                <li>Company Career Pages: Google Careers, Amazon Jobs, Microsoft Careers</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                B) Semi-Automated Method
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>LinkedIn Job Alerts: Set job preferences → Enable notifications</li>
                <li>Google Alerts: Create alerts for "Data Analyst jobs India fresher"</li>
                <li>Naukri Email Alerts: Register + set job preferences</li>
                <li>Indeed Job Alert: Create saved search → Email daily</li>
                <li>Internshala Alerts: Enable push notifications for new internships</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                C) Fully Automated (This System)
              </h3>
              <p className="text-gray-700 mb-2">
                This web application provides automated job scraping and email alerts at 6 AM IST daily.
              </p>
              <p className="text-gray-700">
                It uses web scraping APIs to fetch jobs from multiple sources and sends formatted emails.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                D) AI Tools & Services
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Simplify.jobs - Auto-apply with one click</li>
                <li>Sonara.ai - AI job search assistant</li>
                <li>Teal - Job tracking + resume builder</li>
                <li>Huntr - Job application tracker</li>
                <li>LazyApply - Auto-apply to multiple jobs</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
