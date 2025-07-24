document.addEventListener('DOMContentLoaded', () => {
  // Simulate student data (would come from backend)
  const studentData = {
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '+1 (123) 456-7890',
    location: 'Seattle, WA',
    education: {
      university: 'University of Washington',
      degree: 'B.S. in Computer Science',
      graduationYear: 2025,
    },
    skills: {
      technical: ['JavaScript', 'React', 'Node.js', 'AWS', 'SQL', 'Git'],
      soft: ['Communication', 'Problem-solving', 'Teamwork', 'Adaptability'],
    },
    links: {
      github: 'https://github.com/janedoe_dev',
      linkedin: 'https://www.linkedin.com/in/janedoe',
    },
    resumeUrl: 'assets/jane_doe_resume.pdf', // Placeholder
  };

  // Simulate internship data (would come from backend)
  const allInternships = [
    {
      id: 1,
      title: 'Full-Stack Web Development Intern',
      company: 'Innovate Solutions',
      location: 'Remote',
      stipend: 1200,
      skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'REST API'],
      domain: 'Software Development',
      type: 'Internship',
      postedDate: '2025-07-22',
    },
    {
      id: 2,
      title: 'Data Science Intern',
      company: 'Global Analytics',
      location: 'New York, NY',
      stipend: 1500,
      skills: ['Python', 'SQL', 'Pandas', 'Machine Learning', 'Statistics'],
      domain: 'Data Science',
      type: 'Internship',
      postedDate: '2025-07-20',
    },
    {
      id: 3,
      title: 'Cloud Engineering Intern',
      company: 'CloudWorks',
      location: 'Hybrid, San Francisco, CA',
      stipend: 1300,
      skills: ['AWS', 'Docker', 'Kubernetes', 'Linux', 'Python'],
      domain: 'Cloud Computing',
      type: 'Internship',
      postedDate: '2025-07-23',
    },
    {
      id: 4,
      title: 'UI/UX Design Intern',
      company: 'Creative Hub',
      location: 'Remote',
      stipend: 900,
      skills: ['Figma', 'Sketch', 'Adobe XD', 'User Research', 'Prototyping'],
      domain: 'Design',
      type: 'Internship',
      postedDate: '2025-07-18',
    },
    {
      id: 5,
      title: 'Financial Analyst Intern',
      company: 'Capital Investments',
      location: 'Chicago, IL',
      stipend: 1100,
      skills: ['Excel', 'Financial Modeling', 'Data Analysis', 'Accounting'],
      domain: 'Finance',
      type: 'Internship',
      postedDate: '2025-07-21',
    },
    {
      id: 6,
      title: 'Product Management Intern',
      company: 'Innovate Solutions',
      location: 'Remote',
      stipend: 1400,
      skills: ['Market Research', 'Agile', 'Jira', 'Communication', 'Roadmapping'],
      domain: 'Product Management',
      type: 'Internship',
      postedDate: '2025-07-24',
    },
    {
      id: 7,
      title: 'Marketing & SEO Specialist',
      company: 'Growth Digital',
      location: 'Remote',
      stipend: 1000,
      skills: ['SEO', 'Content Marketing', 'Google Analytics', 'Social Media'],
      domain: 'Marketing',
      type: 'Internship',
      postedDate: '2025-07-15',
    },
  ];

  // Simulate applied internships (IDs)
  let appliedInternshipIds = [1]; // John Doe applied to Full-Stack Web Dev

  // --- Student Dashboard Functionality ---
  const studentNameDisplay = document.getElementById('studentNameDisplay');
  if (studentNameDisplay) {
    studentNameDisplay.textContent = studentData.name;
    loadRecommendedInternships();
    loadAppliedInternships();
  }

  function calculateSkillMatch(studentSkills, jobSkills) {
    if (!studentSkills || !jobSkills) return 0;
    const studentSkillsSet = new Set(
      studentSkills.map((s) => s.toLowerCase()),
    );
    const jobSkillsSet = new Set(jobSkills.map((s) => s.toLowerCase()));

    let matchingSkillsCount = 0;
    jobSkillsSet.forEach((skill) => {
      if (studentSkillsSet.has(skill)) {
        matchingSkillsCount++;
      }
    });

    return (matchingSkillsCount / jobSkillsSet.size) * 100;
  }

  function displayInternships(internships, containerId, isRecommended = false) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = ''; // Clear placeholders

    if (internships.length === 0) {
      container.innerHTML = `<div class="message-card"><p>${
        isRecommended
          ? 'No recommendations found. Update your skills for better matches!'
          : 'No internships found based on your criteria.'
      }</p></div>`;
      return;
    }

    internships.forEach((job) => {
      const card = document.createElement('div');
      card.classList.add('internship-card');
      let skillMatchHTML = '';
      if (isRecommended) {
        const matchPercent = calculateSkillMatch(
          studentData.skills.technical.concat(studentData.skills.soft),
          job.skills,
        );
        skillMatchHTML = `<p class="skill-match">Match: <strong>${matchPercent.toFixed(
          0,
        )}%</strong></p>`;
      }

      const isApplied = appliedInternshipIds.includes(job.id);
      const applyButtonHTML = isApplied
        ? `<button class="btn btn-secondary" disabled>Applied</button>`
        : `<button class="btn btn-primary apply-btn" data-id="${job.id}">Apply Now</button>`;

      card.innerHTML = `
                <h3>${job.title}</h3>
                <p class="company-name">${job.company}</p>
                <p class="location">Location: ${job.location}</p>
                <p class="stipend">Stipend: ${
                  job.stipend ? `$${job.stipend}/month` : 'Unpaid'
                }</p>
                <p class="skills">Skills: ${job.skills.join(', ')}</p>
                ${skillMatchHTML}
                ${applyButtonHTML}
                <button class="btn btn-secondary bookmark-btn" data-id="${job.id}">Bookmark</button>
            `;
      container.appendChild(card);
    });

    // Add event listeners for apply buttons
    container.querySelectorAll('.apply-btn').forEach((button) => {
      button.addEventListener('click', (e) => {
        const jobId = parseInt(e.target.dataset.id);
        if (!appliedInternshipIds.includes(jobId)) {
          appliedInternshipIds.push(jobId);
          e.target.textContent = 'Applied';
          e.target.disabled = true;
          e.target.classList.remove('btn-primary');
          e.target.classList.add('btn-secondary');
          alert('Application submitted successfully!');
          console.log(`Applied to job ID: ${jobId}`);
          // In a real app, send application to backend
          loadAppliedInternships(); // Refresh applied section
        }
      });
    });

    container.querySelectorAll('.bookmark-btn').forEach((button) => {
      button.addEventListener('click', (e) => {
        const jobId = parseInt(e.target.dataset.id);
        alert(`Internship ID ${jobId} bookmarked! (Feature coming soon)`);
        console.log(`Bookmarked job ID: ${jobId}`);
      });
    });
  }

  async function loadRecommendedInternships() {
    const studentSkills = studentData.skills.technical.concat(
      studentData.skills.soft,
    );

    // Simulate fetching all internships
    const internships = await simulateFetch(allInternships);

    // Recommendation Logic:
    const scoredInternships = internships
      .map((job) => {
        const matchPercent = calculateSkillMatch(studentSkills, job.skills);
        return { ...job, matchPercent: matchPercent };
      })
      .filter((job) => job.matchPercent > 0) // Only show jobs with some skill match
      .sort((a, b) => {
        // Primary sort: Skill Match (descending)
        if (b.matchPercent !== a.matchPercent) {
          return b.matchPercent - a.matchPercent;
        }
        // Secondary sort: Posting Time (newer first)
        return new Date(b.postedDate) - new Date(a.postedDate);
      });

    // Tiered display (conceptual for frontend, backend would handle full tiers)
    const tier1 = scoredInternships.filter((job) => job.matchPercent >= 70); // High match
    const tier2 = scoredInternships.filter(
      (job) => job.matchPercent >= 30 && job.matchPercent < 70,
    ); // Partial match

    const recommendedForDisplay = [...tier1, ...tier2]; // Combine for simplicity, in a real UI, you might have separate sections

    displayInternships(recommendedForDisplay, 'recommendedInternships', true);
  }

  async function loadAppliedInternships() {
    const appliedJobs = allInternships.filter((job) =>
      appliedInternshipIds.includes(job.id),
    );
    displayInternships(appliedJobs, 'appliedInternships');
  }

  // --- Student Profile Functionality ---
  const personalInfoForm = document.getElementById('personalInfoForm');
  if (personalInfoForm) {
    // Populate form with existing data
    document.getElementById('studentName').value = studentData.name;
    document.getElementById('studentEmail').value = studentData.email;
    document.getElementById('studentPhone').value = studentData.phone;
    document.getElementById('studentLocation').value = studentData.location;

    personalInfoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // In a real app, send updated data to backend
      studentData.name = document.getElementById('studentName').value;
      studentData.phone = document.getElementById('studentPhone').value;
      studentData.location = document.getElementById('studentLocation').value;
      alert('Personal information updated!');
      console.log('Updated studentData:', studentData);
    });
  }

  const educationForm = document.getElementById('educationForm');
  if (educationForm) {
    document.getElementById('university').value =
      studentData.education.university;
    document.getElementById('degree').value = studentData.education.degree;
    document.getElementById('graduationYear').value =
      studentData.education.graduationYear;

    educationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      studentData.education.university =
        document.getElementById('university').value;
      studentData.education.degree = document.getElementById('degree').value;
      studentData.education.graduationYear = parseInt(
        document.getElementById('graduationYear').value,
      );
      alert('Education details updated!');
      console.log('Updated studentData:', studentData);
    });
  }

  const skillsForm = document.getElementById('skillsForm');
  if (skillsForm) {
    document.getElementById('technicalSkills').value =
      studentData.skills.technical.join(', ');
    document.getElementById('softSkills').value =
      studentData.skills.soft.join(', ');

    skillsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      studentData.skills.technical = document
        .getElementById('technicalSkills')
        .value.split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      studentData.skills.soft = document
        .getElementById('softSkills')
        .value.split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      alert('Skills updated!');
      console.log('Updated studentData:', studentData);
      // Trigger recommendations refresh if on dashboard
      if (document.body.classList.contains('dashboard-container')) {
        loadRecommendedInternships();
      }
    });
  }

  const linksForm = document.getElementById('linksForm');
  if (linksForm) {
    document.getElementById('githubLink').value = studentData.links.github;
    document.getElementById('linkedinLink').value = studentData.links.linkedin;

    linksForm.addEventListener('submit', (e) => {
      e.preventDefault();
      studentData.links.github = document.getElementById('githubLink').value;
      studentData.links.linkedin = document.getElementById(
        'linkedinLink',
      ).value;
      alert('Links updated!');
      console.log('Updated studentData:', studentData);
    });
  }

  const resumeUpload = document.getElementById('resumeUpload');
  const currentResumeLink = document.getElementById('currentResumeLink');
  if (resumeUpload && currentResumeLink) {
    currentResumeLink.href = studentData.resumeUrl;
    resumeUpload
      .closest('.form-group')
      .querySelector('button')
      .addEventListener('click', () => {
        if (resumeUpload.files.length > 0) {
          const fileName = resumeUpload.files[0].name;
          alert(`Resume "${fileName}" uploaded successfully!`);
          // In a real app, send file to server and update studentData.resumeUrl
          currentResumeLink.textContent = fileName;
          // Optionally update last updated date
        } else {
          alert('Please select a PDF file to upload.');
        }
      });
  }

  // --- Internship Listings Functionality ---
  const internshipListDiv = document.getElementById('internshipList');
  if (internshipListDiv) {
    // Initial load of all internships
    loadInternshipListings(allInternships);

    // Filter functionality
    const applyFiltersBtn = document.getElementById('applyFiltersBtn');
    const clearFiltersBtn = document.getElementById('clearFiltersBtn');

    applyFiltersBtn.addEventListener('click', () => {
      const domain = document.getElementById('domainFilter').value;
      const location = document.getElementById('locationFilter').value.toLowerCase();
      const type = document.getElementById('typeFilter').value;
      const stipend = parseInt(document.getElementById('stipendFilter').value);
      const skillsInput = document.getElementById('skillsFilter').value;
      const filterSkills = skillsInput
        .split(',')
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean);

      let filteredInternships = allInternships.filter((job) => {
        let matches = true;
        if (domain && job.domain !== domain) {
          matches = false;
        }
        if (location && !job.location.toLowerCase().includes(location)) {
          matches = false;
        }
        if (type && job.type !== type) {
          matches = false;
        }
        if (stipend && (job.stipend === undefined || job.stipend < stipend)) {
          matches = false;
        }
        if (filterSkills.length > 0) {
          const jobSkillsLower = job.skills.map((s) => s.toLowerCase());
          const hasAllSkills = filterSkills.every((skill) =>
            jobSkillsLower.includes(skill),
          );
          if (!hasAllSkills) {
            matches = false;
          }
        }
        return matches;
      });

      loadInternshipListings(filteredInternships);
    });

    clearFiltersBtn.addEventListener('click', () => {
      document.getElementById('domainFilter').value = '';
      document.getElementById('locationFilter').value = '';
      document.getElementById('typeFilter').value = '';
      document.getElementById('stipendFilter').value = '';
      document.getElementById('skillsFilter').value = '';
      loadInternshipListings(allInternships); // Reload all
    });
  }

  function loadInternshipListings(internshipsToDisplay) {
    const internshipListDiv = document.getElementById('internshipList');
    const noInternshipsFoundMsg = document.getElementById(
      'noInternshipsFound',
    );
    internshipListDiv.innerHTML = ''; // Clear current listings

    if (internshipsToDisplay.length === 0) {
      noInternshipsFoundMsg.style.display = 'block';
    } else {
      noInternshipsFoundMsg.style.display = 'none';
      displayInternships(internshipsToDisplay, 'internshipList'); // Reuse display function
    }
  }
});