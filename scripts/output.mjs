export function setTitle(course) {
  const title = document.querySelector("#courseTitle");
  title.textContent = `${course.code}: ${course.name}`;
}

export function renderSections(sections) {
  const list = document.querySelector("#sectionList");
  list.innerHTML = "";
  sections.forEach(sec => {
    const item = document.createElement("li");
    item.textContent = \`\${sec.sectionNum} - \${sec.roomNum} - Enrolled: \${sec.enrolled} - \${sec.days} - \${sec.instructor}\`;
    list.appendChild(item);
  });
}
