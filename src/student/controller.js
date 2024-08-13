

const pool = require('../../db');
const queries = require('./queries');

const getStudents = async (req, res) => {
   pool.query(queries.getStudents, (error, results) => {
       if (error) {
           throw error;
       }
       res.status(200).json(results.rows);
   });
}

const getStudentById = async (req, res) => {    
    const id = parseInt(req.params.id);
    pool.query(queries.getStudentsById, [id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
}
const addStudent = (req, res) => {
    try {
        const { name, email, age, dob } = req.body;
        pool.query(queries.checkEmailExist, [email], (error, results) => {
            if (error) {
                return res.status(500).send('An error occurred while checking email');
            }
            if (results.rows.length) {
                return res.status(400).send('Email already exists');
            }
            
            pool.query(
                queries.addStudent,
                [name, email, age, dob],
                (error, results) => {
                    if (error) {
                        return res.status(500).send('An error occurred while adding the student');
                    }
                    res.status(201).send(`Student added with ID: ${results.rows[0].id}`);
                }
            );
        });
    } catch (error) {
        res.status(500).send('Server error');
    }
}

const deleteStudent = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getStudentsById, [id], (error, results) => {
        const noStudent = results.rowCount === 0;
        if (noStudent) {
            return res.status(404).send('Student not found');
        }
        if (error) {
            throw error;
        }
        pool.query(queries.deleteStudent, [id], (error, results) => {
            if (error) {
                throw error;
            }
            res.status(200).send(`Student deleted with ID: ${id}`);
        });
        res.status(200).send(`Student deleted with ID: ${id}`);
    });
    
}


const updateStudent = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email, age, dob } = req.body;

    pool.query(queries.getStudentsById, [id], (error, results) => {
        const noStudent = results.rowCount === 0;
        if (noStudent) {
            return res.status(404).send('Student not found');
        }
        if (error) {
            throw error;
        }
        pool.query(
            queries.updateStudent,
            [name, email, age, dob, id],
            (error, results) => {
                if (error) {
                    throw error;
                }
                res.status(200).send(`Student modified with ID: ${id}`);
            }
        );
    });
}

module.exports = { getStudents, getStudentById,addStudent ,deleteStudent,updateStudent};