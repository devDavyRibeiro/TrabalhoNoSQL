import { check, validationResult } from "express-validator";

// Middleware para verificar os erros de validação
export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: true,
      message: "Erro de validação",
      errors: errors.array(),
    });
  }
  next();
};

export const validateAgenda = [
    check("nome_cliente")
    .notEmpty()
    .withMessage("O nome do Tutor é obrigatório")
    .isLength({ max: 50 })
    .withMessage("O nome do Tutor deve ter no máximo 50 caracteres"),

    check("cpf_tutor")
    .notEmpty()
    .withMessage("CPF é obrigatório")
    .isLength({min:11,max:11})
    .withMessage("Deve ter 11 dígitos"),
 
    check("nome_pet")
    .notEmpty()
    .withMessage("O nome do pet é obrigatório")
    .isLength({ max: 50 })
    .withMessage("O nome do pet deve ter no máximo 50 caracteres"),

  check("data_entrada")
    .notEmpty()
    .withMessage("A data de entrada é obrigatória"),
    
  check("data_saida")
    .notEmpty()
    .withMessage("A data de saida é obrigatória"),

  validateRequest,
];