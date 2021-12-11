const Joi = require('joi');
const express= require('express');
const app = express();

app.use(express.json());

const courses=[
    {id:1,course:"book one"},
    {id:2,course:"book 2"}
];

app.get('/',(req,res)=>{
    res.send('Hello world');
});

app.get('/api/courses',(req,res)=>{
    res.send(courses);
});

app.get('/api/courses/:id',(req,res)=>{
    let course= courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("course not found");
    res.send(course);
    
});
app.post('/api/courses',(req,res)=>{
    const {error}=validate(req.body);

    if(error) return res.status(400).send(error.details[0].message);
        

    const course={id: courses.length+1,course:req.body.name};
    courses.push(course);
    res.send(courses);
});

app.put('/api/courses/:id',(req,res)=>{
    let course= courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("course not found");

    const {error}=validate(req.body);

    if(error) return res.status(400).send(error.details[0].message);
    

    course.course=req.body.name;
    res.send(course);


})

app.delete('/api/courses/:id',(req,res)=>{
    let course= courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("course not found");
    
    const index=courses.indexOf(course);
    courses.splice(index,1);
    return course;
    
})

function validate(course){
    const schema={
        name: Joi.string().min(3).required() 
    }
    return Joi.validate(course,schema);
}

app.listen(3000,()=>console.log("hi"));