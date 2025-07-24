document.addEventListener('DOMContentLoaded', () => {
  // Simulate recruiter/company data (would come from backend)
  const companyData = {
    companyName: 'Tech Innovators Inc.',
    email: 'hr@techinnovators.com',
    logoUrl: 'assets/techinnovators_logo.png',
    description:
      'Tech Innovators Inc. is a leading company in software solutions, dedicated to building innovative products that revolutionize industries. We are looking for bright, motivated individuals to join our team.',
  };

  // Simulate posted opportunities (would come from backend)
  const postedOpportunities = [
    {
      id: 101,
      title: 'Software Development Intern',
      company: 'Tech Innovators Inc.',
      location: 'Remote',
      stipend: 1000,
      skills: ['Python', 'Django', 'AWS', 'REST APIs'],
      domain: 'Software Development',
      type: 'Internship',
      postedDate: '2025-07-20',
      applicants: [
        { id: 1, name: 'John Doe', skills: ['Python', 'Django'], resume: '#' },
        {
          id: 2,
          name: 'Alice Smith',
          skills: ['Java', 'Spring'],
          resume: '#',
        },
      ], // Simplified applicants
    },
    {
      id: 102,
      title: 'Product Management Intern',
      company: 'Tech Innovators Inc.',
      location: 'Remote',
      stipend: 1400,
      skills: ['Market Research', 'Agile', 'Jira', 'Communication'],
      domain: 'Product Management',
      type: 'Internship',
      postedDate: '2025-07-15',
      applicants: [{ id: 3, name: 'Bob Johnson', skills: ['Agile'], resume: '#' }],
    },
  ];

  // --- Recruiter Dashboard Functionality ---
  const recruiterCompanyName = document.getElementById('recruiterCompanyName');
  if (recruiterCompanyName) {
    recruiterCompanyName.textContent = companyData.companyName;
    loadActivePostings();
  }

  function displayPostings(postings, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = ''; // Clear current postings

    if (postings.length === 0) {
      container.innerHTML = `<div class="internship-card placeholder">
                                <h3>No Active Postings</h3>
                                <p>Click "Post New Opportunity" to start finding candidates.</p>
                             </div>`;
      return;
    }

    postings.forEach((job) => {
      const card = document.createElement('div');
      card.classList.add('internship-card');
      card.innerHTML = `
                <h3>${job.title}</h3>
                <p class="company-name">${job.company}</p>
                <p class="location">Location: ${job.location}</p>
                <p class="stipend">Stipend: ${
                  job.stipend ? `$${job.stipend}/month` : 'Unpaid'
                }</p>
                <p class="skills">Skills: ${job.skills.join(', ')}</p>
                <p>Applicants: <strong>${
                  job.applicants ? job.applicants.length : 0
                }</strong></p>
                <button class="btn btn-primary" data-id="${job.id}">View Applicants</button>
                <button class="btn btn-secondary" data-id="${job.id}">Edit Posting</button>
            `;
      container.appendChild(card);
    });

    // Add event listeners for buttons
    container.querySelectorAll('.btn-primary').forEach((button) => {
      button.addEventListener('click', (e) => {
        const jobId = parseInt(e.target.dataset.id);
        alert(`Viewing applicants for job ID: ${jobId} (Feature Coming Soon)`);
        console.log('Applicants:', postedOpportunities.find(op => op.id === jobId)?.applicants);
      });
    });

    container.querySelectorAll('.btn-secondary').forEach((button) => {
      button.addEventListener('click', (e) => {
        const jobId = parseInt(e.target.dataset.id);
        alert(`Editing job ID: ${jobId} (Feature Coming Soon)`);
      });
    });
  }

  async function loadActivePostings() {
    // Simulate fetching active postings
    const postings = await simulateFetch(postedOpportunities);
    displayPostings(postings, 'activePostings');
  }

  // --- Post Opportunity Functionality ---
  const postOpportunityForm = document.getElementById('postOpportunityForm');
  if (postOpportunityForm) {
    postOpportunityForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const newOpportunity = {};
      for (const [key, value] of formData.entries()) {
        newOpportunity[key] = value;
      }

      // Add ID and current date (simulated)
      newOpportunity.id = postedOpportunities.length + 101;
      newOpportunity.company = companyData.companyName;
      newOpportunity.postedDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
      newOpportunity.applicants = []; // Start with no applicants

      // Convert skills string to array
      if (newOpportunity.technicalSkills) {
        newOpportunity.skills = newOpportunity.technicalSkills.split(',').map(s => s.trim());
      }
      if (newOpportunity.preferredSkills) {
        newOpportunity.skills = newOpportunity.skills.concat(newOpportunity.preferredSkills.split(',').map(s => s.trim()));
      }
      delete newOpportunity.technicalSkills;
      delete newOpportunity.preferredSkills;

      console.log('New Opportunity Submitted:', newOpportunity);
      postedOpportunities.push(newOpportunity); // Add to our simulated data
      alert('Opportunity posted successfully!');
      e.target.reset(); // Clear form
      // In a real app, redirect to dashboard or manage postings page
      window.location.href = 'recruiter-dashboard.html';
    });
  }

  // --- Company Profile (Placeholder for future development) ---
  // If you had a company profile page, you'd load/save data here similarly to student-profile.html
  // e.g., document.getElementById('companyDescription').value = companyData.description;
});