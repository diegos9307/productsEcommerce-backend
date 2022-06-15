import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS
  }
});

export const sendEmail = async (email, html) => {
  try {
    await transporter.sendMail({
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Correo de confirmación creación de usuario Products Ecommerce",
      html
    });
  } catch (err) {
    console.log(err);
    res.json({ status: "FAILED", messge: `Ha ocurrido un error ${err}` });
  }
};

export const getTemplate = (name, emailToken) => {
  return ` <article style="width: 400px; margin: 0 auto; text-align: center;">
    <h1 style="font-size: 30px;">Bienvenid@ a Products Ecommerce</h1>
    <img
      src="https://images.pexels.com/photos/2529147/pexels-photo-2529147.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      alt="shoes" style="width:100%; height: 200px; object-fit: cover;">
    <div style=" display: flex; height: 100px;">
      <img
        src="https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="technology" style="width: 33.33%; height: 100px; object-fit: cover;">
      <img
        src="https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="t-shirt" style="width: 33.33%; height: 100px; object-fit: cover;">
      <img
        src="https://images.pexels.com/photos/410635/pexels-photo-410635.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="electronics" style="width: 33.33%; height: 100px; object-fit: cover;">
    </div>
    <h2>Estas a un solo paso</h2>
    <p style="margin-bottom: 24px;">Hola <b>${name}</b> que gusto que hayas decidido unirte a nuestra comunidad, estamos
      felices de tenerte
      aquí, solo deber darle clic
      al botón para confirmar tu email
      y empezar tus compras.</p>
    <a href="http://localhost:3000/confirm/${emailToken}" target="_blank" style="text-decoration: none;
  cursor: pointer; background-color: #111827;
  border: 1px solid transparent;
  border-radius: 0.75rem;
  color: #ffffff;
  padding: 0.75rem 1.2rem;
  width: auto;">Empezar <span>&#9755</span></a>
  </article>`;
};

transporter.verify((error, sucess) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready for message");
    console.log(sucess);
  }
});
