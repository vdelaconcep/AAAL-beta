import { check } from 'express-validator';

export const validacionClasificados = [
    check("titulo")
        .trim()
        .notEmpty().withMessage("Debe ingresar el título (nombre y año del vehículo)")
        .bail()
        .isLength({ min: 3, max: 50 }).withMessage("El título (nombre y año del vehículo) debe tener entre 3 y 50 caracteres"),
    check("descripcion")
        .trim()
        .notEmpty().withMessage("Debe agregar una descripción del vehículo")
        .bail()
        .isLength({ max: 500 }).withMessage("El campo 'descripción' no puede tener más de 500 caracteres"),
    check("contacto")
        .trim()
        .notEmpty().withMessage("Debe ingresar un contacto (e-mail, whatsapp, etc.)")
        .bail()
        .isLength({ max: 100 }).withMessage("El campo 'contacto' no puede tener más de 100 caracteres"),
    check("foto")
        .custom((value, { req }) => {
            if (!req.file) {
                throw new Error("Debe incluir una fotografía del vehículo");
            };

            if (req.file.mimetype !== ("image/jpeg") && req.file.mimetype !== ("image/jpg") && req.file.mimetype !== ("image/png") && req.file.mimetype !== ("image/webp")) {
                throw new Error("Debe subir una imagen en formato .jpg, .jpeg, .png o .webp");
            };

            if (req.file.size > 10 * 1024 * 1024) {
                throw new Error("La imagen no debe superar 10 Mb");
            };

            return true;
        })
];