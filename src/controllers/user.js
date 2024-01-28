import { bcCompare, decrypt_password } from '../utils/password_crypt.js'
import { jwt_sign } from '../utils/jwt_utils.js';
import { jwt_verify } from '../utils/jwt_utils.js';
import User from '../models/users.js';


class UserController {
  async index(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async show(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async store(req, res) {
    try {
      const user = new User(req.body);
      !user.logged ? user.logged = true : user.logged
      await user.save();
      res.status(201).json({ message: 'Usuário criado com sucesso' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      res.json({ message: 'Usuário excluído com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async login(req, res) {
    try {
      const email = req.body.email
      const user = await User.findOne({ email: email });

      const decrypted_password = decrypt_password(req.body.senha)

      const compared_password = await bcCompare(decrypted_password, user.senha);

      if (user.logged) {
        return res.status(200).json({ message: " Usuário já se encontra logado " })
      }
      if (req.body.email === user.email && compared_password) {
        const token = jwt_sign(email)
        const teste = jwt_verify(token)
        //adicionar este trecho de código quando for preciso verificar o token
        user.logged = true
        user.save()
        res.header('Authorization', `Bearer ${token}`);
        return res.status(201).json({ message: " Usuário logado com sucesso" });
      }
      return res.status(403).json({ message: "email e/ou senha incorreto(s)" })
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async logoff(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user.logged) {
        return res.status(200).json({ message: " Usuário já se encontra deslogado " })
      }
      user.logged = false
      user.save()
      res.status(201).json({ message: "Usuário deslogado" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}


export default new UserController();