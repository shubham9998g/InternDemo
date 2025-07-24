document.addEventListener('DOMContentLoaded', () => {
  // --- Global Navigation & Utility ---

  // Handle logout
  const logoutButtons = document.querySelectorAll('#logoutBtn');
  logoutButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      // In a real application, you would clear session storage, cookies, etc.
      alert('Logged out successfully!');
      window.location.href = 'index.html'; // Redirect to landing page
    });
  });

  // Basic form submission simulation for index.html
  const studentLoginForm = document.getElementById('studentLoginForm');
  if (studentLoginForm) {
    studentLoginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Simulate login logic
      const email = e.target.email.value;
      const password = e.target.password.value;
      console.log('Student Login Attempt:', { email, password });
      alert('Student Login Simulated. Redirecting to dashboard.');
      // In a real app, validate credentials and then redirect
      window.location.href = 'student-dashboard.html';
    });
  }

  const studentRegisterForm = document.getElementById('studentRegisterForm');
  if (studentRegisterForm) {
    studentRegisterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Simulate registration logic
      const name = e.target.name.value;
      const email = e.target.email.value;
      const password = e.target.password.value;
      const confirmPassword = e.target.confirmPassword.value;

      if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
      console.log('Student Register Attempt:', { name, email, password });
      alert(
        'Student Registration Simulated. You can now login or proceed to dashboard.'
      );
      // In a real app, save user data and then redirect
      window.location.href = 'student-dashboard.html';
    });
  }

  const recruiterLoginForm = document.getElementById('recruiterLoginForm');
  if (recruiterLoginForm) {
    recruiterLoginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Simulate login logic
      const email = e.target.email.value;
      const password = e.target.password.value;
      console.log('Recruiter Login Attempt:', { email, password });
      alert('Recruiter Login Simulated. Redirecting to dashboard.');
      // In a real app, validate credentials and then redirect
      window.location.href = 'recruiter-dashboard.html';
    });
  }

  const recruiterRegisterForm = document.getElementById(
    'recruiterRegisterForm',
  );
  if (recruiterRegisterForm) {
    recruiterRegisterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Simulate registration logic
      const companyName = e.target.companyName.value;
      const email = e.target.email.value;
      const password = e.target.password.value;
      const confirmPassword = e.target.confirmPassword.value;

      if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
      console.log('Recruiter Register Attempt:', {
        companyName,
        email,
        password,
      });
      alert(
        'Recruiter Registration Simulated. You can now login or proceed to dashboard.'
      );
      // In a real app, save company data and then redirect
      window.location.href = 'recruiter-dashboard.html';
    });
  }
});

// Helper function to simulate fetching data
const simulateFetch = (data, delay = 500) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
};