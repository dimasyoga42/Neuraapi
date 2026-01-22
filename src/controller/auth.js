import bcrypt from "bcryptjs";
import { supabase } from "../db/supabase.js";
import jwt from "jsonwebtoken";
export const Register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // validasi input
    if (!username || !password) {
      return res.json({
        message: "kolom username dan password harap di isi"
      });
    }

    if (password.length < 6) {
      return res.json({
        message: "password anda harus lebih dari 6 karakter"
      });
    }

    // cek username apakah sudah ada
    const { data: userExist, error: userError } = await supabase
      .from("user")
      .select("username")
      .eq("username", username)
      .single();

    if (userExist) {
      return res.json({
        message: "username anda sudah digunakan tolong ganti yang lain"
      });
    }

    // hash password
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    // insert user baru
    const { error: insertError } = await supabase
      .from("user")
      .insert({
        username: username,
        password: hashPassword
      });

    if (insertError) {
      return res.json({
        message: "gagal mendaftarkan user",
        error: insertError.message
      });
    }

    // response sukses
    return res.json({
      message: "registrasi berhasil"
    });

  } catch (err) {
    return res.status(500).json({
      message: "terjadi kesalahan server",
      error: err.message
    });
  }
};

export const Login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.json({
        message: "username dan password wajib di isi"
      });
    }

    const { data: user, error } = await supabase
      .from("user")
      .select("*")
      .eq("username", username)
      .single();

    if (!user) {
      return res.json({
        message: "username atau password salah"
      });
    }

    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      return res.json({
        message: "username atau password salah"
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true jika HTTPS
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000
    });

    return res.json({
      message: "login berhasil"
    });

  } catch (err) {
    return res.status(500).json({
      message: "terjadi kesalahan server",
      error: err.message
    });
  }
};
