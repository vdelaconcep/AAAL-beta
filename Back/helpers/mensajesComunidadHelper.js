import { check } from 'express-validator';

export const validacionMensajesComunidad = [
    check("nombre")
        .trim()
        .escape()
        .notEmpty().withMessage("Debe ingresar el nombre")
        .bail()
        .isLength({ min: 3, max: 50 }).withMessage("El nombre debe tener entre 3 y 50 caracteres"),
    check("relacion")
        .trim()
        .escape()
        .notEmpty().withMessage("Debe indicar su relación con el club")
        .bail()
        .isLength({ max: 50 }).withMessage("El campo 'relación' no puede tener más de 50 caracteres"),
    check("titulo")
        .trim()
        .escape()
        .notEmpty().withMessage("Debe ingresar un título para el mensaje")
        .bail()
        .isLength({ max: 50 }).withMessage("El campo 'título' no puede tener más de 50 caracteres"),
    check("mensaje")
        .escape()
        .notEmpty().withMessage("El mensaje no puede quedar vacío")
        .bail()
        .isLength({ min: 10, max: 1000 }).withMessage("El mensaje debe tener entre 10 y 1000 caracteres"),
    check("imagen")
        .optional({ checkFalsy: true })
        .custom((value, { req }) => {
            if (!req.file) {
                return true;
            };

            if (req.file.mimetype !== ("image/jpeg") && req.file.mimetype !== ("image/jpg") && req.file.mimetype !== ("image/png") && req.file.mimetype !== ("image/webp")) {
                throw new Error("Debe subir una imagen en formato .jpg, .jpeg, .png o .webp");
            };

            if (req.file.size > 2 * 1024 * 1024) {
                throw new Error("La imagen no debe superar 2 Mb");
            };

            return true;
        })
];