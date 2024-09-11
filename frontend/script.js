const form = document.getElementById('childForm');
const childrenList = document.getElementById('childrenList');

// Fetch all children and display them
async function fetchChildren() {
    const response = await fetch('http://127.0.0.1:5000/children');
    const data = await response.json();

    // Clear the existing list
    childrenList.innerHTML = '';

    // Add children to the list
    data.forEach(child => {
        const li = document.createElement('li');
        li.textContent = `${child.name}, Age: ${child.age}`;
        childrenList.appendChild(li);
    });
}

// Add a new child
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;

    // Send POST request to add a new child
    const response = await fetch('http://127.0.0.1:5000/children', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, age }),
    });

    // After adding, refresh the list
    fetchChildren();

    // Clear the form inputs
    form.reset();
});

// Fetch and display children on page load
fetchChildren();
