import { check, body } from 'express-validator';

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

export const validacionModificarEventoGaleria = [
    body().custom((value, { req }) => {
        const { nombre, fecha, descripcion } = req.body;

        if (!nombre && !fecha && !descripcion) {
            throw new Error('Debe proporcionar al menos uno de los siguientes campos: nombre, fecha o descripción');
        }

        return true;
    }),
    check("nombre")
        .optional({ checkFalsy: true })
        .bail()
        .trim()
        .isLength({ max: 60 }).withMessage("El nombre del evento debe tener entre 3 y 60 caracteres"),
    check("fecha")
        .optional({ checkFalsy: true })
        .bail()
        .trim()
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
        .notEmpty().withMessage("Debe indicarse el id del usuario que modifica el evento")
        .bail()
        .isLength({ max: 36 }).withMessage("El id del usuario no puede pasar los 36 caracteres")
];

export const validacionFotosGaleria = [
    check("usuario")
        .notEmpty().withMessage("Debe indicarse el id del usuario que envía las fotos nuevas")
        .bail()
        .isLength({ max: 36 }).withMessage("El id del usuario no puede pasar los 36 caracteres"),
    check("fotos")
        .custom((value, { req }) => {
            if (!req.files) {
                throw new Error('Debe enviarse al menos una imagen para agregar al evento');
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

export const validacionModificarFotoGaleria = [
    check("descripcion")
        .trim()
        .notEmpty().withMessage("Debe ingresar una descripción para la foto")
        .bail()
        .isLength({ min: 3, max: 140 }).withMessage("La descripción de la foto debe tener entre 3 y 60 caracteres"),
    check("usuario")
        .notEmpty().withMessage("Debe indicarse el id del usuario que agrega/modifica la descripción de la foto")
        .bail()
        .isLength({ max: 36 }).withMessage("El id del usuario no puede pasar los 36 caracteres")
];

export const validacionEliminarFotosGaleria = [
    body().custom((value, { req }) => {
        const { fotos } = req.body;

        if (!Array.isArray(fotos) || fotos.length === 0) {
            throw new Error('Debe proporcionarse un array con los id de las fotos a eliminar');
        }

        for (const foto of fotos) {
            if (!typeof foto === 'string' || foto.length > 36) {
                throw new Error('Al menos uno de los id ingresados es incorrecto');
            }
        }

        return true;
    })
]