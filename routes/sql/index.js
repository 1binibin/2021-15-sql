const path = require('path')
const express = require('express')
const router = express.Router()
const { error } = require('../../modules/util')
const { pool } = require('../../modules/mysql.js')



router.get('/list', async (req, res, next) => {
	let sql = 'SELECT * FROM books'
	let r = await pool.execute (sql)
		res.status(200).json(r)
})

router.get('/create', async(req, res, next) => {
	let title = '홍길동전'
	let writer = '허균'
	let content = '아버지를 아버지라...'
	let sql = `INSERT INTO books SET title='${title}', writer='${writer}', content='${content}' `
	let r = await pool.query (sql)
		res.status(200).json(r)
})


module.exports = router