const express = require("express")
const app = express()
const mysql = require("mysql2/promise")

// parse application/json, för att hantera att man POSTar med JSON
const bodyParser = require("body-parser")

// Inställningar av servern.
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

async function getDBConnnection() {
  // Här skapas ett databaskopplings-objekt med inställningar för att ansluta till servern och databasen.
  return await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test",
  })
}

app.get("/", (req, res) => {
  res.send(`<h1>Doumentation av API</h1>
  <ul><li> GET /users</li></ul>`)
})

/*
  app.post() hanterar en http request med POST-metoden.
*/
app.post("/users", function (req, res) {
  // Data som postats till routen ligger i body-attributet på request-objektet.
  console.log(req.body)

  // POST ska skapa något så här kommer det behövas en INSERT
  let sql = `INSERT INTO users (id, username, password, name, email)`
  .get 
  app.post("/users , function(req , res)")
  req.body
  res.json(req.body)
})



const port = 5000
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test"
});

app.get('/users', async function(req, res) {
  let connection = await getDBConnnection()
  let sql = `SELECT * FROM users`   
  let [results] = await connection.execute(sql)

  //res.json() skickar resultat som JSON till klienten
  res.json(results)
});

app.get('/users/:id', async function(req, res) {
  //kod här för att hantera anrop…
  let connection = await getDBConnnection()

  let sql = "SELECT * FROM users WHERE id = ?"
  let [results] = await connection.execute(sql, [req.params.id])
  res.json(results[0]) //returnerar första objektet i arrayen
});

