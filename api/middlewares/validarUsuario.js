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

export const validateUsuario = [
  check("nome")
    .notEmpty()
    .withMessage("O nome do usuário é obrigatório")
    .isLength({ max: 50 })
    .withMessage("O nome do usuário deve ter no máximo 50 caracteres"),

    check("cpf")
    .notEmpty()
    .withMessage("CPF é obrigatório")
    .bail()
    .custom((value) => {
      const cpfSemMascara = value.replace(/\D/g, ""); 
      if (cpfSemMascara.length !== 11) {
        throw new Error("CPF deve ter 11 dígitos");
      }
      return true;
    })
    .custom(async (cpf, { req }) => {
        const db = req.app.locals.db
        if (req.method === "POST" ) { 
          const existe = await db.collection("client").countDocuments({cpf})
          if (existe > 0) {
            throw new Error("CPF já cadastrado")
          }

          return true
        }
      }),

  check("email")
    .notEmpty().withMessage("Email do usuário é obrigatório")
    .isEmail()
    .withMessage("Email Inválido")
    .custom(async (email, { req }) => {
      const db = req.app.locals.db
      if (req.method === "POST" ) { 
          const existe = await db.collection("client").countDocuments({email})
          if (existe > 0) {
            throw new Error("Email já cadastrado")
          }

          return true
        }
    }),
    
  check("senha")
    .notEmpty().withMessage("Senha é obrigatório")
    .isStrongPassword({
        minLength: 4,
        minUppercase:1,
        minNumbers: 1,
        minSymbols:1
    }).withMessage('Senha Fraca. Certifique-se se a senha tem pelo menos 4 caracteres, 1 letra maiuscula, um número e um símbolo'),
    
  validateRequest,
];

export const valideLogin = [
  check("email")
    .notEmpty().withMessage("Email do usuário é obrigatório")
    .isEmail()
    .withMessage("Email Inválido"),
  check("senha")
    .notEmpty().withMessage("Senha é obrigatório")
]
