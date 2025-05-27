const express = require('express');

const app = express();
const port = 3000;




//GET endpoint 
app.get('/',async(req,res)=>{
    res.send("The endpoint Works.")
});
// GET endpoint
app.get('/squarenumber/:num', async (req, res, next) => {
    try {
        let x = req.params.num;
        if (isNaN(x)) {
            return next(new Error("Input not a number")); // Properly pass error to middleware
        }
        x = Number(x); // Convert to number before math
        res.json({ square: x * x });
    } catch (err) {
        next(err); // Catch any unexpected error
    }
});
//GET endpoint 
app.get('/cubenumber/:num',async(req,res)=>{
    let x = req.params.num;
    if(isNaN(x)){
        const err = new Error('Invalid Input') 
        err.statusCode = 400;
        err.details = 'The Input must be the number' ;
        next(err); }
        else{
            res.json({'cube':x*x*x});
        }
});
//GET endpoint 
app.get('/getelementatindex/:mystr/:idx',async(req,res)=>{
    let mystr = req.params.mystr;
    let idx = req.params.idx;
    if(idx <= mystr.length){
        let chatrAtIdx = mystr.charAt(idx-1);
        res.json({"Element at index":chatrAtIdx})
    }else{
        next(new Error("Index greater than string length"))
        
    }
})
app.use((err,req,res,next)=>{
    //Set default values for status coe and satus i not provided in the error object
    err.statusCode =err.statusCode || 500; 
    err.status = err.status || "Error";

    //log the error stack to the console for debugging purpose 
    console.log(err.stack);
    
    //Send a JSON response with formatted error details
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    })
});

//start the server
app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});