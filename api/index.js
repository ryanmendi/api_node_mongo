const express = require ('express')
const app = express()
const mongosse = require("mongoose")
const Person = require("./models/Person")

app.listen(3000)
app.use (
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

//rota 1 
app.get('/', (reg, res)=>{
    res.json({mensage: "funciona"})
})

//create
app.post('/person', async(req, res)=> {
    const {name, salary, approved} = req.body;

    const person = {
        approved,
    }

    try{
        await Person.create(person)
        res.status(200).json({message : "pessoa inserida"})
    } catch(error){
        res.status(500).json({erro: error})
    }
})

//read
app.get("/person", async (req, res) =>{
    try{
        const peaple = await Person.find()
        res.status(200).json(peaple)
    }catch(error){
        res.status(500).json({erro: error})
    }
})

mongosse.connect("mongodb://localhost:27017").then(()=>{
    console.log("uhull,conectamo")
})