const courses = [
  { code: "WDD 130", name: "Web Fundamentals", credits: 3, subject: "WDD", completed: true },
  { code: "WDD 131", name: "Dynamic Web Fundamentals", credits: 3, subject: "WDD", completed: false },
  { code: "WDD 231", name: "Frontend Web Development I", credits: 3, subject: "WDD", completed: false },
  { code: "CSE 110", name: "Introduction to Programming", credits: 2, subject: "CSE", completed: true },
  { code: "CSE 111", name: "Programming with Functions", credits: 2, subject: "CSE", completed: true },
  { code: "CSE 121b", name: "JavaScript Language", credits: 3, subject: "CSE", completed: false },
  { code: "CSE 210", name: "Programming with Classes", credits: 2, subject: "CSE", completed: false }
];

const container = document.querySelector('#courses-container');
const totalCredits = document.querySelector('#total-credits');
const courseCount = document.querySelector('#course-count');

function displayCourses(list) {
  container.innerHTML = '';
  let credits = 0;

  list.forEach(course => {
    const card = document.createElement('div');
    card.classList.add('course-card');
    if (course.completed) card.classList.add('completed');
    card.innerHTML = `
      <h3>${course.code}</h3>
      <p>${course.name}</p>
      <p><strong>Credits:</strong> ${course.credits}</p>
    `;
    container.appendChild(card);
    credits += course.credits;
  });

  totalCredits.textContent = `Total Credits: ${credits}`;
  courseCount.textContent = `Total Courses: ${list.length}`;
}

// Event listeners
document.querySelector('#all').addEventListener('click', () => displayCourses(courses));
document.querySelector('#wdd').addEventListener('click', () => {
  const filtered = courses.filter(c => c.subject === "WDD");
  displayCourses(filtered);
});
document.querySelector('#cse').addEventListener('click', () => {
  const filtered = courses.filter(c => c.subject === "CSE");
  displayCourses(filtered);
});

// Initial load
displayCourses(courses);
