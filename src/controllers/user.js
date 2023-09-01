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
        console.log(user)
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
  }
  
  export default new HomeController();