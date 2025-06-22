import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authAdmin = async (req, res, next) => {
  try {
    const { atoken } = req.headers;

    if (!atoken) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized. Login sir",
      });
    }

    const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);

    if (token_decode.email !== process.env.ADMIN_EMAIL) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin credentials. Login Again",
      });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({
      success: false,
      message: "Token verification failed. Please login again.",
    });
  }
};

export default authAdmin;
