import { User } from "../models/User.js";
import { getTemplate, sendEmail } from "../utils/mailer.js";
import { generateToken, getTokenData } from "../utils/tokenManager.js";

export const register = async (req, res) => {
  const { username, email, password, terms } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "Ya existe este usuario" });
    }
    user = new User({ username, email, password, terms });

    // Crear un token para el email
    const emailToken = generateToken(username);

    //Obtener el template
    const template = getTemplate(username, emailToken);

    // Enviar Email
    await sendEmail(email, template);

    await user.save();

    res.json({
      status: "SUCESS",
      message: "Usuario creado exitosamente, revisa tu email y confirma tu cuenta"
    });
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

export const confirmUser = async (req, res) => {
  try {
    //Obtener el token
    const { emailToken } = req.params;
    //Verificar el usuario
    const verify = await getTokenData(emailToken);
    !verify.data
      ? res.json({ sucess: false, message: `Error al confirmar el usuario, error: ${verify.err}` })
      : res.json({
          sucess: true,
          message: "El usuario se ha confirmado exitosamente"
        });
  } catch (error) {
    res.json({ sucess: false, message: `Error al confirmar el usuario ${error}` });
  }
};
