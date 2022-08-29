const { Router } = require('express');
const { Op, Character, Role } = require('../db');
const router = Router();

router.post('/', async (req, res) => {
    const {code, name, hp, mana} = req.body
    if(!code || !name || !mana || !hp) return res.status(404).send('Falta enviar datos obligatorios')
   
    try {
        const character = await Character.create(req.body)
        return res.status(201).json(character)
    } catch (error) {
        return res.status(404).send("Error en alguno de los datos provistos")
    }
})

router.get('/', async (req, res) => {
    const {race, age} = req.query // localhost:3000/character?age=23&name=Juani&
    // condition = {
    //     where: {
    //   
    //     }
    // }
    const condition = {}
    const where = {}

    if(race) where.race = race
    if(age) where.age = age
    condition.where = where
    
    const characters = await Character.findAll(condition) 
    return res.json(characters)
  
})

router.get('/young', async (req, res) => {
   const characters = await Character.findAll({
        where: {
        age: {[Op.lt]: 25}
        }
    })
    res.json(characters)  
})

router.get('/roles/:code', async (req, res) => {
    const {code} = req.params;

    const character = await Character.findByPk(code, {
        include: Role
    })

    res.json(character)
})

router.get('/:code', async (req, res) => {
    const {code} = req.params // code = 3
    const character = await Character.findByPk(code) // code = 3
    if(!character) return res.status(404).send(`El código ${code} no corresponde a un personaje existente`)
    return res.json(character)
})

/* {
    codeCharacter: 'TWO',
    abilities: [
      { name: 'abilityOne', mana_cost: 17.0 },
      { name: 'abilityTwo', mana_cost: 84.0 },
      { name: 'abilityThree', mana_cost: 23.0 }
    ]
  } */

router.put('/addAbilities', async (req, res) => {
    const {codeCharacter, abilities} = req.body;

    const character = await Character.findByPk(codeCharacter)
    // await character.createAbilitie()
    const promises = abilities.map(a => character.createAbility(a))
    await Promise.all(promises) // [a, a, a]
    res.send('Ok')
})



router.put('/:attribute', async (req, res) => {
    const {attribute} = req.params
    const {value} = req.query

    await Character.update({[attribute]: value}, {
        where: {
            [attribute]: null
        }
    })
    res.send('Personajes actualizados')
})






module.exports = router;