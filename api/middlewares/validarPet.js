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

export const validatePet = [
  check("nome")
    .notEmpty()
    .withMessage("O nome do pet é obrigatório")
    .isLength({ max: 50 })
    .withMessage("O nome do pet deve ter no máximo 50 caracteres"),

  check("especie")
    .notEmpty()
    .withMessage("A espécie é obrigatória"),

  check("raca")
    .notEmpty()
    .withMessage("A raça é obrigatória"),

  check("sexo")
    .notEmpty()
    .withMessage("O sexo é obrigatório")
    .isIn(["macho","fêmea","Macho","Fêmea"])
    .withMessage("Sexo deve ser 'Macho' ou 'Fêmea'"),

  check("porte")
    .notEmpty()
    .withMessage("O porte é obrigatório")
    .isIn(["pequeno", "medio", "grande"])
    .withMessage("Porte deve ser 'Pequeno', 'Médio' ou 'Grande'"),
    
  check("idade")
    .notEmpty()
    .withMessage("A idade é obrigatória")
    .isInt()
    .withMessage("Tem que ser valor numérico"),
  
    check("nome_tutor")
    .notEmpty()
    .withMessage("O nome do Tutor é obrigatório")
    .isLength({ max: 50 })
    .withMessage("O nome do Tutor deve ter no máximo 50 caracteres"),

  check("cpfCliente")
    .notEmpty()
    .withMessage("CPF é obrigatório")
    .isLength({min:11,max:11})
    .withMessage("Deve ter 11 dígitos"),

  // Data de nascimento e observações são opcionais
  check("observacoes")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Observações devem ter no máximo 500 caracteres"),

  validateRequest,
];
