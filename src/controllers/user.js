import User from '../models/users.js';
class HomeController {
    async index(req, res) {
      try {
        const users = await User.find();
        res.json(users);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }

    async show(req,res) {
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
        res.status(201).json(user);
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

    async delete(req, res){
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
        const user = await User.findById(req.params.id);
        if (user.logged){
          return res.status(200).json({ message: " Usuário já se encontra logado "})
        }
        if (req.body.nome === user.nome  && req.body.senha === user.senha){
          user.logged = true
          user.save()
          return res.status(201).json({message: " Usuário logado com sucesso"});
        }
        return res.status(403).json({message: "Nome e/ou senha incorreto(s)"})
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }

    async logoff(req, res) {
      try {
        const user = await User.findById(req.params.id);
        if (!user.logged){
          return res.status(200).json({ message: " Usuário já se encontra deslogado "})
        }
        user.logged = false
        user.save()
        res.status(201).json({ message: "Usuário deslogado" });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  }


  
  
  export default new HomeController();