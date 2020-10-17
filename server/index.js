const express = require('express')
const cors = require('cors');
const app = express();
const port = 3300;
const pool = require("./db");

app.use(express.json()) // req.body
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.get("/todos", async (req, res) => {
    try {
        const todos = await pool.query("select * from todo order by id");
        res.json(todos.rows);
    } catch (e) {
        console.error(e.message);
    }
});

app.get("/todos/:id", async (req, res) => {
    try {
        const todo = await pool.query("select * from todo where id = $1", [req.params.id]);
        if(todo.rows[0] === undefined) {
            res.json("Not found", 404);
        }
        res.json(todo.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
});

app.put("/todos/:id", async (req, res) => {
    try {
        await pool.query("update todo set description = $2 where id = $1", [req.params.id, req.body.description]);

        res.json("Updated");
    } catch (error) {
        console.error(error.message);
    }
});

app.post("/todos", async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query("insert into public.todo(description) values ($1) RETURNING *;", [description]);

        res.json(newTodo.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
})

app.delete("/todos/:id", async (req, res) => {
    try {
        await pool.query("delete from todo where id = $1", [req.params.id]);

        res.json("Deleted");
    } catch (error) {
        console.error(error.message);
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})