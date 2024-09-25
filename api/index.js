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
app.get('/', (req, res)=>{
    res.json({mensage: "funciona"})
})

//create
app.post('/person', async(req, res)=> {
    const {name, salary, approved} = req.body;

    const person = {
        name, 
        salary, 
        approved
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

//read by id
app.get("/person/:id", async (req, res)=>{
    const id = req.params.id
    try{
        const peaple = await Person.findOne({_id: id})

        if(!peaple){
            res.status(422).json({message: "Usuário não encontrado!"})
            return
        }

    res.status(200).json(peaple)
    
    } catch(error){
        res.status(500).json({erro: error})
    }
})

//update 
app.patch("/person/:id", async (req, res)=>{
    const id = req.params.id

    const {name, salary, approved} = req.body

    const person = {
        name,
        salary,
        approved,
    }

    try{
        const updatePerson = await Person.updateOne({_id: id}, person)

        if(updatePerson.matchedCount === 0){
            res.status(422).json({message: "O usuário não foi encontrado!"})
            return
        }
        res.status(200).json(Person)
    } catch(error){
        res.status(500).json({erro: eroor})
    }
})

//delete 
app.delete("/person/:id", async (req, res)=>{

    const id = req.params.id

    const person = await Person.findOne({_id: id})

    if(!person){
        res.status(422).json({menssage: "Usuário não encontrado!"})
        return
    }

    try{
        await Person.deleteOne({_id: id})
        res.status(200).json({menssage: "Usuário removido com sucesso!"})
    }catch(error){
        res.status(500).json({erro: error})
    }
})

mongosse.connect("mongodb://localhost:27017").then(()=>{
    console.log("uhull,conectamo")
})