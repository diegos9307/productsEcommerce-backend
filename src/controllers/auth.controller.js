import { User } from "../models/User.js";
import { generateToken } from "../utils/tokenManager.js";

export const register = async (req, res) => {
  const { username, email, password, terms } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "Ya existe este usuario" });
    }
    user = new User({ username, email, password, terms });
    await user.save();
    return res.json({ messsage: "Usuario creado exitosamente" });
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

    // Generar token de JWT
    const { token } = generateToken(user.id);

    res.json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error de servidor" });
  }
};
