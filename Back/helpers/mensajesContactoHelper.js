import { check } from 'express-validator';

export const validacionMensajesContacto = [
    check("nombre")
        .trim()
        .escape()
        .notEmpty().withMessage("Debe ingresar el nombre")
        .bail()
        .isLength({ min: 3, max: 50 }).withMessage("El nombre debe tener entre 3 y 50 caracteres"),
    check("email")
        .escape()
        .notEmpty().withMessage("Debe ingresar una dirección de email")
        .bail()
        .isLength({ max: 50 }).withMessage("El e-mail no puede tener más de 50 caracteres")
        .bail()
        .isEmail().withMessage("Debe ingresar una dirección de e-mail válida"),
    check("telefono")
        .optional({ checkFalsy: true })
        .isNumeric().withMessage("Para indicar el teléfono hay que ingresar sólo números"),
    check("asunto")
        .escape()
        .notEmpty().withMessage("Debe ingresar el asunto")
        .bail()
        .isLength({ max: 50 }).withMessage("El asunto no puede tener más de 50 caracteres"),
    check("mensaje")
        .escape()
        .notEmpty().withMessage("El mensaje no puede quedar vacío")
        .bail()
        .isLength({ min: 10, max: 500 }).withMessage("El mensaje debe tener entre 10 y 500 caracteres")
];