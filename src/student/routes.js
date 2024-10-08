const {Router} = require('express');
const controller = require('./controller');
const router = Router();

router.get('/', controller.getStudents);
router.put('/:id', controller.updateStudent);
router.post('/', controller.addStudent);
router.get('/:id', controller.getStudentById);
router.delete('/:id', controller.deleteStudent);
module.exports = router;
