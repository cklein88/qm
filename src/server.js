const express = require('express');
const bodyParser = require('body-parser');
const SQL = require('sqlstring');
const app = express();

app.use(bodyParser.json());

const port = 3001;

const types = {
    STRING: "STRING",
    INTEGER: "INTEGER"
};

const operations = {
    EQUALS:(a,b) => SQL.format('?? = ?', [a, b.trim()]),
    CONTAINS:(a,b) => SQL.format('?? LIKE ?', [a, `%${b.trim()}%`]),
    STARTS:(a,b) => SQL.format('?? LIKE ?', [a, `${b.trim()}%`]),
    IN:(a,b) => SQL.format('?? IN (?)', [a, [...new Set(b.trim().split(",").filter(x => x !== '').map(x => x.trim()))]]),
    BETWEEN:(a,b,c) => SQL.format('?? BETWEEN ? AND ?', [a,b.trim(),c.trim()]),
    GREATER:(a,b) => SQL.format('?? > ?', [a,b.trim()]),
    LESS:(a,b) => SQL.format('?? < ?', [a,b.trim()])
};

const predicates = [
    {name: "User Email", value: "user_email", type: types.STRING},
    {name: "Screen Width", value: "screen_width", type: types.INTEGER},
    {name: "Screen Height", value: "screen_height", type: types.INTEGER},
    {name: "# of Visits", value: "visits", type: types.INTEGER},
    {name: "First Name", value: "user_first_name", type: types.STRING},
    {name: "Last Name", value: "user_last_name", type: types.STRING},
    {name: "Page Response time (ms)", value: "page_response", type: types.INTEGER},
    {name: "Domain", value: "domain", type: types.STRING},
    {name: "Page Path", value: "path", type: types.STRING},
];

const operators = {
    STRING: [
        {name: "equals", value: "equals", args: 1, operation: operations.EQUALS},
        {name: "contains", value: "contains", args: 1, operation: operations.CONTAINS},
        {name: "starts with", value: "starts", args: 1, operation: operations.STARTS},
        {name: "in list", value: "in", args: 1, operation: operations.IN}
        
    ],
    INTEGER: [
        {name: "equal to", value: "equals", args: 1, operation: operations.EQUALS},
        {name: "between", value: "between", args: 2, operation: operations.BETWEEN},
        {name: "greater than", value: "greater", args: 1, operation: operations.GREATER},
        {name: "less than", value: "less", args: 1, operation: operations.LESS},
        {name: "in list", value: "in", args: 1, operation: operations.IN},
    ]
};

const BASE_SQL = "SELECT *\nFROM sessions\nWHERE ";

const buildSQL = (clauses) => {
    return BASE_SQL + clauses
        .filter(c => c.inputs.every(i => !i.value || i.value.trim().length > 0))
        .map(c =>
        operators[c.predicate.type.toUpperCase()]
            .find(o => o.value === c.operator.value)
            .operation(c.predicate.value, c.inputs[0].value, c.inputs[1].value)).join("\nAND ");
};

app.get('/setup', (req,res) => res.json({predicates: predicates, operators: operators}));
app.post('/search', (req,res) => res.json({sql: buildSQL(req.body)}));

app.listen(port, () => console.log(`Server listening on port ${port}`));