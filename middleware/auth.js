import jwt from "jsonwebtoken";

export function auth(req, res, next) {

  const token = req.cookies.token;

  if (!token) {
    return res.redirect("/login");
  }

  try {

    req.user = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    next();

  } catch {

    res.clearCookie("token");

    return res.redirect("/login");

  }

}

export function adminOnly(req, res, next) {

  const token = req.cookies.token;

  if (!token) {
    return res.redirect("/login");
  }

  try {

    const user = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    if (user.role !== "admin") {
      return res.redirect("/");
    }

    req.user = user;

    next();

  } catch {

    res.clearCookie("token");

    return res.redirect("/login");

  }

}
