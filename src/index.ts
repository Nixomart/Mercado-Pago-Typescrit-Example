import app from './app'
import {sequelize} from './database/database'

async function main() {
    try {
        await sequelize.sync({force: false})
        app.listen(4000)
        console.log("in port: 4000")
    } catch (error) {
        console.log('error', error)
    }
}
main()


