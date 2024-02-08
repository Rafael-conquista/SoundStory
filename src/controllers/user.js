import { bcCompare, decrypt_password } from '../utils/password_crypt.js'
import { jwt_sign } from '../utils/jwt_utils.js';
import { jwt_verify } from '../utils/jwt_utils.js';
import User from '../models/users.js';
import { decode } from 'jsonwebtoken';


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
      user.logged = false
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
      if (!user){
        return res.status(401).json(
          {
            message: "email e/ou senha incorreto(s)"
          }
        )
      }
        
      const decrypted_password = decrypt_password(req.body.senha)

      const compared_password = await bcCompare(decrypted_password, user.senha);

      if (req.body.email === user.email && compared_password) {
        const token = jwt_sign(email)
        user.save()
        res.header('Authorization', `Bearer ${token}`);
        return res.status(200).json({
          message: " Usuário logado com sucesso",
          'id': user.id,
          'token': token
        });
      }
      return res.status(403).json({ message: "email e/ou senha incorreto(s)" })
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async verify_token(req, res) {
    try {
      const decoded = jwt_verify(req.body.token)
      const email = decoded.infos.email
      console.log(decoded.infos.email)
      res.status(200).json({ "email": email });
    } catch {
      res.status(401).json({ message: "token inválido" })
    }
  }

  async get_id_by_jwt(req, res){
    try{
      const decoded = jwt_verify(req.body.token)
      if(decoded.available == true){
        const email = decoded.infos.email
        const user = await User.findOne({ email: email }).select('id nome');
        res.status(200).json(user)
      }else{
        throw new Error('token inválido')
      }
    }catch(error){
      res.status(401).json({ message: error })
    }
  }
}




export default new UserController();