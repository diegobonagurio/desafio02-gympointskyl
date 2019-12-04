import * as Yup from 'yup';
import Student from '../models/Student';

class UserController {
  async store(req, res) {
    // cadastro de estudante
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      idade: Yup.number()
        .integer()
        .required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const studentsExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (studentsExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const { id, name, email, idade, weight, height } = await Student.create(
      req.body
    );

    return res.json({
      id,
      name,
      email,
      idade,
      weight,
      height,
    });
  }

  // update de usuario

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      idade: Yup.number().integer(),
      weight: Yup.number(),
      height: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const { email } = req.body;

    // O email vai ser a chave principal para encontrar o estudante para mudar
    // o cadastro

    const student = await Student.findOne({ where: { email } });

    if (email !== student.email) {
      const studentsExists = await Student.findOne({ where: { email } });

      if (studentsExists) {
        return res.status(400).json({ error: 'Student already exists' });
      }

      const { id, name, idade, weight, height } = await student.update(
        req.body
      );

      return res.json({
        id,
        name,
        email,
        idade,
        weight,
        height,
      });
    }
  }
}

export default new UserController();
