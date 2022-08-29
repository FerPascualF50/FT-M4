const { Sequelize, DataTypes } = require('sequelize');
 
// Opción 1: Connection URI                                 // deploy
const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/demo28seque', {logging: false})

// psql -U postgres <---
// pass: postgres
// create database demoft28

const Player = sequelize.define('Player', {
    firstName: {
        type: DataTypes.STRING, // varchar,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        unique: true
    },
    age: {
        type: DataTypes.INTEGER,
        defaultValue: 25
    }
}, {
    timestamps: true,
    createdAt: false,
    updatedAt: 'actualizado'
});
// Player


const Team = sequelize.define('Team', {
    code: {
        type: DataTypes.INTEGER(3),
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    },
    uniqueOne: { 
        type: DataTypes.STRING,  
        unique: 'compositeIndex' 
    },
    uniqueTwo: { 
        type: DataTypes.INTEGER, 
        unique: 'compositeIndex' 
    },
})
// code name         uniqueOne   uniqueTwo
// NBA  Boca Juniors  'F'           1
// NFL  River         'F'           2

sequelize.sync({force: true})
    .then(async () => {
        console.log('Conexion exitosa!!')
        
        const team = await Team.create({
            code: 123,
            name: 'Boca Juniors',
            uniqueOne: 'F',
            uniqueTwo: 1
        })

        const team2 = await Team.create({
            code: 111,
            name: 'Spurs',
            uniqueOne: 'F',
            uniqueTwo: 2
        })

        const player = await Player.create({
            firstName: 'Juani',
            lastName: 'Solari',
            age: 23
        })

        const player2 = await Player.create({
            firstName: 'Juani',
            lastName: 'Henry'
        })

        const player3 = await Player.create({
            firstName: 'Nicolas',
            lastName: 'Lo Guidice',
            age: 28
        })

        const player4 = await Player.create({
            firstName: 'Lautaro',
            lastName: 'Lesniewicz'
        })

       /*  player.firstName = 'Ignacio'
        await player.save() */

       //  const players = await Player.findAll();

        const team1 = await Team.findAll({
            attributes: {exclude: ['name']},
            where: {
                code: 123
            }
          });
          
          // console.log(team1.map(p => p.toJSON()))

      /*   const instances = await Player.findAll({
            where: {
                firstName: 'Juani',
                lastName: 'Solari'
            }
        });
 */
        /* const findByPk = await Player.findByPk(1) */

        	
      /*   const instance = await Player.findOne({
            where: { firstName: 'Juani' } 
        }) */

        	
        const [instance, created] = await Player.findOrCreate({
            where: { lastName: 'P' },
            defaults: {
                firstName: 'Mm',
                lastName: 'Saiyan',
                age: 90
            }
        });
        // created: false
        // instance: 
        console.log(created)
        console.log(instance.toJSON())
})

// Player.sync()
//     .then(() => {
//         console.log('Successful sync')
//     })
// Team.sync()
//     .then(() => {
//         console.log('Successful sync')
//     })
    
/* sequelize.authenticate()
    .then(() => {
        console.log('Conexion exitosa!!')
    })
    .catch(err => {
        console.log(err)
    }) */
	