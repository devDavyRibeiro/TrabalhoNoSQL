import { check, validationResult } from 'express-validator';

export const validateAgenda = [
  check('nome_tutor')
    .notEmpty()
    .withMessage('Nome do Tutor é obrigatório')
    .isLength({ min: 3, max: 80 })
    .withMessage('Nome do Tutor deve ter entre 3 e 80 caracteres'),

  check('cpfCliente')
    .notEmpty()
    .withMessage('CPF Tutor é obrigatório')
    .bail()
    .custom((value) => {
      const cpfFormatado = value.replace(/\D/g, ""); // Remove a pontuação
      if (cpfFormatado.length !== 11) {
        throw new Error('CPF deve ter 11 dígitos');
      }
      return true;
    }),

  check('nome')
    .notEmpty()
    .withMessage('Nome do Pet é obrigatório')
    .isLength({ max: 50 })
    .withMessage('Nome do Pet deve ter no máximo 50 caracteres'),

  check('data_entrada')
    .notEmpty()
    .withMessage('Data de Entrada é obrigatória')
    .isISO8601()
    .withMessage('Data de Entrada deve ser válida'),

  check('data_saida')
    .notEmpty()
    .withMessage('Data de Saída é obrigatória')
    .isISO8601()
    .withMessage('Data de Saída deve ser válida')
    .custom((value, { req }) => {
      if (new Date(value) < new Date(req.body.data_entrada)) {
        throw new Error('Data de Saída não pode ser anterior à Data de Entrada');
      }
      return true;
    }),

];

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: true,
      message: 'Erro de validação',
      errors: errors.array(),
    });
  }
  next();
};
