import connection from '../database/mysql.js';

class Comision {
    static async getAll() {
        try {
            const [rows] = await connection.query('SELECT * FROM ComisionDirectiva');
            return rows;
        } catch (error) {
            throw new Error('Error al obtener comisión directiva: ' + error.message);
        }
    }
}

export default Comision;