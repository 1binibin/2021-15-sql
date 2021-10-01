const bcrypt = require('bcrypt')
const createError = require('http-errors')
const { pool } = require('../../modules/mysql-init')
const { existUser, findUser } = require('./find-user')
const isValid = require('./is-valid')


const updateUser = async (idx, passwd, username, email, sql, values) => {
	try {
		let { BCRYPT_SALT: salt, BCRYPT_ROUND: round } = process.env
		let { user } = await findUser('idx', idx)
		console.log('update-user.user: ',user)
		if(!username || !email || user.status < 3) {
			throw new Error('ERROR')
		}
		else if(user.status < 5){
			sql = " UPDATE users SET username=?, email=? WHERE idx=?"
			values = [ username, email, idx ]
			console.log('values',values)
		}
		else {
			let hashPasswd = await bcrypt.hash(passwd + salt, Number(round))
			sql = " UPDATE users SET passwd=? username=?, email=? WHERE idx=?"
			values = [hashPasswd, username, email, idx]
			console.log('values',values)
			await pool.execute(sql, values)
		}
		let [rs] = await pool.execute(sql, values)
		return rs.affectedRows === 1
	}
	catch(err) {
		throw new Error(err)
	}
}



module.exports = { updateUser }