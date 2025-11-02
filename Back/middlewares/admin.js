import jwt from 'jsonwebtoken';

const admin = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token || token === 'null') return res.status(401).json({ error: 'Token no proporcionado' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log(decoded);

        next();
    } catch (err) {
        return res.status(401).json({ error: `Token inválido o expirado (${err.message})` });
    }
};

export { admin };