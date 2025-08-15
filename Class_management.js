const express = require('express');
const app = express();
const PORT = 3000;

const users = [
    { id: 1, lastName: 'Estoya', firstName: 'John', section: 'BSIT-4C', status: 'present' },
    { id: 2, lastName: 'Dimarukit', firstName: 'Pedro', section: 'BSIT-4C', status: 'absent' },
    { id: 3, lastName: 'Johnson', firstName: 'Alice', section: 'BSIT-4C', status: 'present' }
];
app.get('/',(req,res) =>{
    res.send('Welcome to the Class Management System');
}); 

app.listen(PORT,()=> {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/user', (req, res) => {
    console.log('GET request received at /users');
    const { firstName, lastName, section, status } = req.body;
    const userIndex = users.findIndex(user => user.lastName === lastName && user.firstName === firstName);
    if (userIndex !== -1) {
        users[userIndex].status = status;
        console.log(`Updated attendance for ${firstName} ${lastName} in ${section} to ${status}`);
        res.status(200).json({message: `Attendance for ${firstName} ${lastName} in ${section} updated to ${status}`});
    } else {
        const newUser = {
            id: users.length + 1,
            firstName,
            lastName,
            section,
            status
        };
        users.push(newUser);
        console.log(`Added new user ${firstName} ${lastName} to ${section} with status ${status}`);
        res.status(201).json({message: `New user ${firstName} ${lastName} added to ${section} with status ${status}`});
    }
});

app.get('/users', (req, res) => {
    res.send(users);
    console.log('GET request received at /users');
});

app.post('/users', (req, res) => {
    console.log('POST request received at /users');
    const { firstName, lastName, section } = req.body;
    if (!firstName || !lastName || !section) {   
        return res.status(400).json({ error: 'All fields are required' });
    }
    const newUser = {
        id: users.length + 1,
        firstName,
        lastName,
        section
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

module.exports = app; 
