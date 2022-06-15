import jwt from "jsonwebtoken";

export const generateToken = (payload) => {
  const expiresIn = 60 * 60 * 8;
  try {
    const token = jwt.sign({ data: payload }, process.env.JWT_SECRET, { expiresIn });
    return token;
  } catch (error) {
    console.log(error);
  }
};

export const getTokenData = (token) => {
  let data = null;
  let err;
  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      err = error.message;
    } else {
      data = decoded;
    }
  });
  return { data, err };
};
