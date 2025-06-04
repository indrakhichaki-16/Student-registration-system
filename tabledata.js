// This page contains all the JavaScript logic for managing student records

// Array to store student records
let students = [];

// Index of the student details being edited (-1 means no student is currently being edited)
let editIndex = -1;

// To load student details from localStorage when the page is refreshed
window.onload = function() {
    const stored = localStorage.getItem('students');    // Retrieve saved data
    if (stored) {
        students = JSON.parse(stored);  // Parse JSON string into array
    }
    renderTable();  // Display student details in the table
};

// To save the current student list to localStorage
function saveToLocalStorage() {
    localStorage.setItem('students', JSON.stringify(students)); // Convert array to JSON and save to local storage
}

// To render the student details list from the HTML table
function renderTable() {
    const tbody = document.querySelector('#studentTable tbody');
    tbody.innerHTML = ''; 

    // To display message if the table is empty
    if (students.length === 0) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td colspan="9" style="text-align:center; padding: 8px; color: gray;">
            No student records found.
          </td>
        `;
        tbody.appendChild(tr);
        return;
    }

    // To loop through each student detail and create a table row
    students.forEach((student, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${student.name}</td>
            <td>${student.studentId}</td>
            <td>${student.class}</td>
            <td>${student.rollNo}</td>
            <td>${student.address}</td>
            <td>${student.contact}</td>
            <td>${student.email || ''}</td>
            <td><button class="action-btn edit-btn" onclick="editStudent(${idx})">Edit</button></td>
            <td><button class="action-btn delete-btn" onclick="deleteStudent(${idx})">Delete</button></td>
        `;
        tbody.appendChild(tr); 
    });
}

// To handle form submission for adding or updating students
document.getElementById('studentForm').onsubmit = function(e) {
    e.preventDefault();     // To prevent page reload on form submit

    // To get values from the form section
    const name = document.getElementById('name').value.trim();
    const studentId = document.getElementById('studentId').value.trim();
    const classVal = document.getElementById('class').value.trim();
    const rollNo = document.getElementById('rollNo').value.trim();
    const address = document.getElementById('address').value.trim();
    const contact = document.getElementById('contact').value.trim();
    const email = document.getElementById('email').value.trim();

    if (editIndex === -1) {
        // ADD new student
        students.push({ name, studentId, class: classVal, rollNo, address, contact, email });
    } else {
        // UPDATE existing student
        students[editIndex] = { name, studentId, class: classVal, rollNo, address, contact, email };
        editIndex = -1;     
        document.getElementById('addBtn').textContent = 'ADD';  
    }

    this.reset();               // Clear the form fields
    saveToLocalStorage();       // Save the data to local storage
    renderTable();              // Refresh the table with updated data
};

// Creating function to populate form with selected student data for editing purpose
window.editStudent = function(idx) {
    const student = students[idx];

    // Populate form fields with existing data to make editing easier
    document.getElementById('name').value = student.name;
    document.getElementById('studentId').value = student.studentId;
    document.getElementById('class').value = student.class;
    document.getElementById('rollNo').value = student.rollNo;
    document.getElementById('address').value = student.address;
    document.getElementById('contact').value = student.contact;
    document.getElementById('email').value = student.email || '';

    // Update global index to current editing item
    editIndex = idx;

    // Change button text to "UPDATE" to submit the edited details
    document.getElementById('addBtn').textContent = 'UPDATE';
};

// Function to delete a student from the list
window.deleteStudent = function(idx) {
    if (confirm('Are you sure you want to delete this record?')) {
        students.splice(idx, 1);    // Remove student from array
        saveToLocalStorage();       // Update localStorage
        renderTable();              // Refresh the table
    }
};
