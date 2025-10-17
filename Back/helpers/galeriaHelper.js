import { check } from 'express-validator';

export const validacionEventoGaleria = [
    check("nombre")
        .trim()
        .notEmpty().withMessage("Debe ingresar el nombre del evento")
        .bail()
        .isLength({ min: 3, max: 60 }).withMessage("El nombre del evento debe tener entre 3 y 60 caracteres"),
    check("fecha")
        .trim()
        .notEmpty().withMessage("Debe indicar la fecha del evento")
        .bail()
        .matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('El formato de la fecha debe ser YYYY-MM-DD')
        .isISO8601().withMessage('La fecha de evento ingresada no es válida')
        .bail()
        .custom((value) => {
            const fecha = new Date(value);
            if (fecha > new Date()) {
                throw new Error('La fecha del evento a mostrarse en galería no puede ser futura');
            }
            return true;
        }),
    check("descripcion")
        .optional({ checkFalsy: true })
        .bail()
        .trim()
        .isLength({ max: 140 }).withMessage("La descripción no puede tener más de 140 caracteres"),
    check("usuario")
        .notEmpty().withMessage("Debe indicarse el id del usuario que inicializa el evento")
        .bail()
        .isLength({ max: 36 }).withMessage("El id del usuario no puede pasar los 36 caracteres"),
    check("fotos")
        .custom((value, { req }) => {
            if (!req.files) {
                throw new Error('Debe enviarse al menos una imagen para el evento')
            };

            const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
            const maxSize = 2 * 1024 * 1024;

            for (const file of req.files) {
                // Validar tipo de archivo
                if (!allowedMimes.includes(file.mimetype)) {
                    throw new Error(`Las imágenes deben estar en formato .jpg, .jpeg, .png o .webp`);
                }

                // Validar tamaño
                if (file.size > maxSize) {
                    throw new Error(`Las imágenes no deben superar cada una los 2 MB`);
                }
            }

            return true;
        })
];