const express = require('express');
const app = express();
const PORT = 3000;

const users = [
    { id: 1, lastName: 'Estoya', firstName: 'John', section: 'BSIT-4C' },
    { id: 2, lastName: 'Smith', firstName: 'Jane', section: 'BSIT-4C' },
    { id: 3, lastName: 'Johnson', firstName: 'Alice', section: 'BSIT-4C' }
];
app.get('/',(req,res) =>{
    res.use(express.json());
}); 

app.listen(PORT,()=> {
    console.log(`Server is running on http://localhost:${PORT}`);
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
