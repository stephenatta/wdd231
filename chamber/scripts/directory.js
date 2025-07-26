const membersContainer = document.querySelector('#members');
const gridViewBtn = document.querySelector('#gridView');
const listViewBtn = document.querySelector('#listView');

// Fetch and display members
async function getMembers() {
  const response = await fetch('data/members.json');
  const data = await response.json();
  displayMembers(data.members);
}

// Create member cards
function displayMembers(members) {
  membersContainer.innerHTML = ''; // Clear any existing content

  members.forEach(member => {
    const card = document.createElement('div');
    card.classList.add('member-card');

    const img = document.createElement('img');
    img.src = `images/${member.image}`;
    img.alt = `${member.name} logo`;

    const name = document.createElement('h3');
    name.textContent = member.name;

    const address = document.createElement('p');
    address.textContent = member.address;

    const phone = document.createElement('p');
    phone.textContent = member.phone;

    const website = document.createElement('a');
    website.href = member.website;
    website.target = "_blank";
    website.textContent = 'Visit Website';

    const level = document.createElement('p');
    level.textContent = `Membership Level: ${member.membership}`;

    // Append to card
    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(address);
    card.appendChild(phone);
    card.appendChild(website);
    card.appendChild(level);

    membersContainer.appendChild(card);
  });
}

// View Toggle Functionality
gridViewBtn.addEventListener('click', () => {
  membersContainer.classList.add('grid-view');
  membersContainer.classList.remove('list-view');
});

listViewBtn.addEventListener('click', () => {
  membersContainer.classList.add('list-view');
  membersContainer.classList.remove('grid-view');
});

getMembers();
