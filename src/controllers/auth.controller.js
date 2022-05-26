import { User } from "../models/User.js";

export const register = async (req, res) => {
  const { username, email, password, terms } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "Ya existe este usuario" });
    }
    user = new User({ username, email, password, terms });
    await user.save();
    return res.json({ ok: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error de servidor" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(403).json({ error: "No existe el usuario" });

    const answerPassword = await user.comparePassword(password);
    if (!answerPassword) return res.status(403).json({ error: "Credenciales incorrectas" });
    res.json({ ok: "login" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error de servidor" });
  }
};
