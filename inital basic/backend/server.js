import express from 'express';

const app = express();      

app.use(express.static('dist')); 

// app.get('/' , (req, res)=>{            
//     res.send('Server is ready , hello to the world');
// } );



app.get('/api/jokes' , (req , res) =>{
    const jokes = [
        {
            id:1,
            title:'A joke',
            content : ' this is a joke'
        },
        {
            id:2,
            title:'A 2nd joke',
            content : ' this is a joke'
        },
        {
            id:3,
            title:'A 3rd joke',
            content : ' this is a 3rd joke'
        },
        {
            id:4,
            title:'A joke',
            content : ' this is a 4th  joke'
        }
    ];
    // res.json(jokes);
});

const port = process.env.port || 3000 ;

app.listen(port, ()=>{
    console.log(`Server at http://localhost:${port}`); 
})
// hello world 