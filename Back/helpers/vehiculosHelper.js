import { check } from 'express-validator';

export const validacionVehiculos = [
    check("marca")
        .trim()
        .notEmpty().withMessage("Debe ingresar la marca del vehículo")
        .bail()
        .isLength({ min: 3, max: 50 }).withMessage("La marca del vehículo debe tener entre 3 y 50 caracteres"),
    check("modelo")
        .trim()
        .notEmpty().withMessage("Debe indicar el modelo del vehículo")
        .bail()
        .isLength({ max: 50 }).withMessage("El campo 'modelo' no puede tener más de 50 caracteres"),
    check("anio")
        .trim()
        .notEmpty().withMessage("Debe ingresar el año del vehículo")
        .bail()
        .isInt({ min: 1880, max: new Date().getFullYear() }).withMessage('El año del vehículo debe estar entre 1880 y el año actual'),
    check("descripcion")
        .notEmpty().withMessage("La descripcion no puede quedar vacía")
        .bail()
        .isLength({ max: 100 }).withMessage("La descripción debe tener menos de 100 caracteres"),
    check("foto")
        .custom((value, { req }) => {
            if (!req.file) {
                throw new Error('Debe enviarse la foto del vehículo')
            };

            if (req.file.mimetype !== ("image/jpeg") && req.file.mimetype !== ("image/jpg") && req.file.mimetype !== ("image/png") && req.file.mimetype !== ("image/webp")) {
                throw new Error("Debe subir una imagen en formato .jpg, .jpeg, .png o .webp");
            };

            if (req.file.size > 10 * 1024 * 1024) {
                throw new Error("La imagen no debe superar 10 Mb");
            };

            return true;
        }),
    check("usuario")
        .notEmpty().withMessage('Debe indicarse el id del usuario que ingresa el registro del vehículo')
        .bail()
        .isLength({max: 36}).withMessage('El id del usuario debe tener hasta 36 caracteres')
];

export const validacionModificacionVehiculos = [
    check("id")
        .notEmpty().withMessage('Debe indicarse el id del vehículo a modificar')
        .bail()
        .isLength({ max: 36 }).withMessage('El id del vehículo debe tener hasta 36 caracteres'),
    check("marca")
        .optional({ checkFalsy: true })
        .bail()
        .trim()
        .isLength({ min: 3, max: 50 }).withMessage("La marca del vehículo debe tener entre 3 y 50 caracteres"),
    check("modelo")
        .optional({ checkFalsy: true })
        .bail()
        .trim()
        .isLength({ max: 50 }).withMessage("El campo 'modelo' no puede tener más de 50 caracteres"),
    check("anio")
        .optional({ checkFalsy: true })
        .bail()
        .trim()
        .isInt({ min: 1880, max: new Date().getFullYear() }).withMessage('El año del vehículo debe estar entre 1880 y el año actual'),
    check("descripcion")
        .optional({ checkFalsy: true })
        .bail()
        .isLength({ max: 100 }).withMessage("La descripción debe tener menos de 100 caracteres"),
    check("foto")
        .custom((value, { req }) => {
            if (!req.file) {
                return true
            };

            if (req.file.mimetype !== ("image/jpeg") && req.file.mimetype !== ("image/jpg") && req.file.mimetype !== ("image/png") && req.file.mimetype !== ("image/webp")) {
                throw new Error("Debe subir una imagen en formato .jpg, .jpeg, .png o .webp");
            };

            if (req.file.size > 10 * 1024 * 1024) {
                throw new Error("La imagen no debe superar 10 Mb");
            };

            return true;
        }),
    check("usuario")
        .notEmpty().withMessage('Debe indicarse el id del usuario que modifica el registro del vehículo')
        .bail()
        .isLength({max: 36}).withMessage('El id del usuario debe tener hasta 36 caracteres')
];