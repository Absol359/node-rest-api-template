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

app.post("/users", async function (req, res) {
  try {
    const { id, username, password, name, email } = req.body

    const connection = await getDBConnnection()
    const sql = `INSERT INTO users (username, password, name, email) VALUES (?, ?, ?, ?)`
    const [result] = await connection.execute(sql, [username, password, name, email])

    res.status(201).json({
      message: "User sucessfully created",
      userId: result.insertId || id,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Something went wrong!" })
  }
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

