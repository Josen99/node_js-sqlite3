const express = require('express');
const bodyParser = require('body-parser');
const jwt =require ('jsonwebtoken')
const users = require('./users.json');
const serverStatic=require('serve-statoc');

const app = express();
app.use(bodyParser.json());
app.use(serverStatic('public'));



