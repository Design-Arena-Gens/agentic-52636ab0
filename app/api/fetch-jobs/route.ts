import { NextResponse } from 'next/server';

interface Job {
  title: string;
  company: string;
  location: string;
  link: string;
  source: string;
  description?: string;
  deadline?: string;
  postedDate?: string;
}

async function fetchIndeedJobs(): Promise<Job[]> {
  const jobs: Job[] = [];

  // Simulated Indeed jobs - In production, use Indeed API or scraping
  const sampleJobs = [
    {
      title: 'Data Analyst - Fresher',
      company: 'Accenture',
      location: 'Bangalore, Karnataka',
      link: 'https://www.indeed.co.in/jobs?q=data+analyst+fresher',
      source: 'Indeed',
      description: 'Looking for fresh graduates with knowledge in SQL, Python, and Excel',
      postedDate: new Date().toLocaleDateString('en-IN'),
    },
    {
      title: 'Junior Business Analyst',
      company: 'TCS',
      location: 'Mumbai, Maharashtra',
      link: 'https://www.indeed.co.in/jobs?q=business+analyst+fresher',
      source: 'Indeed',
      description: 'Entry-level position for Business Analytics with Excel and PowerBI skills',
      postedDate: new Date().toLocaleDateString('en-IN'),
    },
  ];

  return sampleJobs;
}

async function fetchLinkedInJobs(): Promise<Job[]> {
  // Simulated LinkedIn jobs
  const sampleJobs = [
    {
      title: 'Data Analyst Intern',
      company: 'Flipkart',
      location: 'Bangalore, Karnataka',
      link: 'https://www.linkedin.com/jobs/search/?keywords=data%20analyst%20fresher',
      source: 'LinkedIn',
      description: 'Internship opportunity for Data Analysis with Python and SQL',
      deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN'),
      postedDate: new Date().toLocaleDateString('en-IN'),
    },
    {
      title: 'Associate Data Analyst',
      company: 'Amazon',
      location: 'Hyderabad, Telangana',
      link: 'https://www.amazon.jobs/en/search?base_query=data+analyst',
      source: 'LinkedIn',
      description: 'Entry-level Data Analyst role with focus on business intelligence',
      postedDate: new Date().toLocaleDateString('en-IN'),
    },
  ];

  return sampleJobs;
}

async function fetchInternshalaJobs(): Promise<Job[]> {
  // Simulated Internshala jobs
  const sampleJobs = [
    {
      title: 'Data Analytics Internship',
      company: 'Zomato',
      location: 'Remote',
      link: 'https://internshala.com/internships/data-science-internship',
      source: 'Internshala',
      description: 'Work from home internship with stipend ₹10,000-15,000/month',
      deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN'),
      postedDate: new Date().toLocaleDateString('en-IN'),
    },
    {
      title: 'Business Intelligence Intern',
      company: 'Swiggy',
      location: 'Bangalore, Karnataka',
      link: 'https://internshala.com/internships/business-analytics-internship',
      source: 'Internshala',
      description: '6-month internship with potential for full-time conversion',
      postedDate: new Date().toLocaleDateString('en-IN'),
    },
  ];

  return sampleJobs;
}

async function fetchNaukriJobs(): Promise<Job[]> {
  // Simulated Naukri jobs
  const sampleJobs = [
    {
      title: 'Fresher Data Analyst',
      company: 'Infosys',
      location: 'Pune, Maharashtra',
      link: 'https://www.naukri.com/data-analyst-jobs?experience=0',
      source: 'Naukri.com',
      description: 'Training provided for SQL, Python, and Data Visualization tools',
      postedDate: new Date().toLocaleDateString('en-IN'),
    },
    {
      title: 'Graduate Trainee - Analytics',
      company: 'Wipro',
      location: 'Chennai, Tamil Nadu',
      link: 'https://www.naukri.com/business-analyst-jobs-for-freshers',
      source: 'Naukri.com',
      description: 'Graduate trainee program for data analytics and reporting',
      postedDate: new Date().toLocaleDateString('en-IN'),
    },
  ];

  return sampleJobs;
}

async function fetchAngelListJobs(): Promise<Job[]> {
  // Simulated AngelList/Wellfound jobs
  const sampleJobs = [
    {
      title: 'Data Analyst - Early Career',
      company: 'CRED',
      location: 'Bangalore, Karnataka',
      link: 'https://wellfound.com/role/r/data-analyst',
      source: 'Wellfound',
      description: 'Startup environment with equity options for data analysts',
      postedDate: new Date().toLocaleDateString('en-IN'),
    },
    {
      title: 'Junior Analytics Engineer',
      company: 'Razorpay',
      location: 'Bangalore, Karnataka',
      link: 'https://wellfound.com/jobs',
      source: 'Wellfound',
      description: 'Work on payment analytics and fraud detection',
      postedDate: new Date().toLocaleDateString('en-IN'),
    },
  ];

  return sampleJobs;
}

export async function GET() {
  try {
    // Fetch jobs from all sources in parallel
    const [indeedJobs, linkedInJobs, internshalaJobs, naukriJobs, angelListJobs] =
      await Promise.all([
        fetchIndeedJobs(),
        fetchLinkedInJobs(),
        fetchInternshalaJobs(),
        fetchNaukriJobs(),
        fetchAngelListJobs(),
      ]);

    const allJobs = [
      ...indeedJobs,
      ...linkedInJobs,
      ...internshalaJobs,
      ...naukriJobs,
      ...angelListJobs,
    ];

    return NextResponse.json({
      success: true,
      jobs: allJobs,
      count: allJobs.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch jobs' },
      { status: 500 }
    );
  }
}
