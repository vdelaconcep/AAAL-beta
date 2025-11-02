import { check } from 'express-validator';

export const validacionUsuarios = [
    check("nombre")
        .notEmpty().withMessage("Debe ingresar nombre")
        .bail()
        .isLength({ min: 3, max: 50 }).withMessage("El nombre debe tener entre 3 y 50 caracteres"),
    check("email")
        .notEmpty().withMessage("Debe ingresar una dirección de e-mail")
        .bail()
        .isEmail().withMessage("Debe ingresar una dirección de e-mail válida")
        .bail()
        .isLength({ max: 50 }).withMessage("El e-mail debe tener 50 caracteres como máximo"),
    check("password")
        .notEmpty().withMessage("Debe ingresar una contraseña")
        .bail()
        .isLength({ min: 8, max: 15 }).withMessage("La contraseña debe tener entre 8 y 15 caracteres")
        .bail()
        .isAlphanumeric().withMessage("La contraseña debe tener solamente letras y números")
];

export const validacionLogin = [
    check("email")
        .notEmpty().withMessage("Debe ingresar el e-mail")
        .bail()
        .isLength({ max: 50 }).withMessage("El e-mail ingresado es muy largo"),
    check("password")
        .notEmpty().withMessage("Debe introducir la contraseña")
        .bail()
        .isLength({ max: 50 }).withMessage("La contraseña ingresada es muy larga")
]