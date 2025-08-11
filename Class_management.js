const express = require('express');
const app = express();
const PORT = 3000;

const text_msg = 'Class management';
    
app.get('/',(req,res) =>{
    res.send(`${text_msg}`)
});

app.listen(PORT,()=> {
    console.log(`Server is running on http://localhost:${PORT}`);
});

