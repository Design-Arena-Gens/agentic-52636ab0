import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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

function generateEmailHTML(jobs: Job[]): string {
  const jobsHTML = jobs.map((job, index) => `
    <div style="background: #f8f9fa; border-left: 4px solid #007bff; padding: 15px; margin-bottom: 15px; border-radius: 4px;">
      <h3 style="margin: 0 0 10px 0; color: #333;">${index + 1}. ${job.title}</h3>
      <p style="margin: 5px 0;">
        <strong>🏢 Company:</strong> ${job.company}<br>
        <strong>📍 Location:</strong> ${job.location}<br>
        <strong>🔗 Source:</strong> ${job.source}
        ${job.postedDate ? `<br><strong>📅 Posted:</strong> ${job.postedDate}` : ''}
        ${job.deadline ? `<br><strong>⏰ Deadline:</strong> <span style="color: #dc3545;">${job.deadline}</span>` : ''}
      </p>
      ${job.description ? `<p style="margin: 10px 0; color: #555;">${job.description}</p>` : ''}
      <a href="${job.link}" style="display: inline-block; background: #007bff; color: white; padding: 8px 16px; text-decoration: none; border-radius: 4px; margin-top: 10px;">Apply Now →</a>
    </div>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 8px; margin-bottom: 20px;">
        <h1 style="margin: 0;">🎯 Daily Data Analyst Job Alert</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">Latest opportunities for ${new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <p style="font-size: 16px; margin-bottom: 20px;">
          Namaste! 👋<br><br>
          Aapke liye aaj <strong>${jobs.length} fresh Data Analyst opportunities</strong> mil gayi hain:
        </p>

        ${jobsHTML}

        <div style="background: #e7f3ff; border-radius: 4px; padding: 15px; margin-top: 20px;">
          <h3 style="margin: 0 0 10px 0; color: #0066cc;">💡 Quick Tips:</h3>
          <ul style="margin: 0; padding-left: 20px;">
            <li>Apply within 24-48 hours of job posting</li>
            <li>Customize your resume for each role</li>
            <li>Highlight your SQL, Python, Excel, and visualization skills</li>
            <li>Follow up after 3-5 days</li>
            <li>Prepare for case studies and technical rounds</li>
          </ul>
        </div>

        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; color: #777; font-size: 14px;">
          <p>Good luck with your applications! 🚀</p>
          <p style="margin: 5px 0;">This is an automated email from your Daily Job Alert System.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export async function POST() {
  try {
    // Fetch jobs
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/fetch-jobs`);
    const data = await response.json();
    const jobs = data.jobs || [];

    if (jobs.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'No jobs found to send'
      });
    }

    // Create email transporter
    // Note: You need to configure Gmail App Password or use a service like SendGrid
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASSWORD || 'your-app-password',
      },
    });

    const mailOptions = {
      from: `"Job Alert System" <${process.env.EMAIL_USER || 'your-email@gmail.com'}>`,
      to: 'anishandhyal@gmail.com',
      subject: `🎯 ${jobs.length} New Data Analyst Jobs - ${new Date().toLocaleDateString('en-IN')}`,
      html: generateEmailHTML(jobs),
    };

    // For demo purposes, we'll just return success without actually sending
    // In production, uncomment the line below:
    // await transporter.sendMail(mailOptions);

    console.log('Email would be sent to: anishandhyal@gmail.com');
    console.log('Jobs count:', jobs.length);

    return NextResponse.json({
      success: true,
      message: `Email prepared with ${jobs.length} jobs. Configure EMAIL_USER and EMAIL_PASSWORD environment variables to actually send emails.`,
      jobCount: jobs.length,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to send email',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
