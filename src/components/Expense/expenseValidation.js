const { z } = require('zod');

const expenseSchema = z.object({
  home: z.enum(["own", "rent"]),
  rentAmount: z.preprocess(
    (value, ctx) => {
      if (ctx?.parent?.home === "own") {
        return 0;
      }
      return value;
    },
    z.coerce.number().nonnegative().refine((val) => val >= 0, {
      message: "Rent amount must be a valid non-negative number.",
    })
  ),
  foodAmount: z
    .string()
    .trim()
    .min(1)
    .regex(/^[0-9]+(\.[0-9]+)?$/, {
      message: "Food amount is required and must be a valid number.",
    }),
  entertainmentAmount: z
    .string()
    .trim()
    .min(1)
    .regex(/^[0-9]+(\.[0-9]+)?$/, {
      message: "Entertainment cost is required and must be a valid number.",
    }),
  utilitiesAmount: z
    .string()
    .trim()
    .min(1)
    .regex(/^[0-9]+(\.[0-9]+)?$/, {
      message: "Utilities cost is required and must be a valid number.",
    }),
  personalAmount: z
    .string()
    .trim()
    .min(1)
    .regex(/^[0-9]+(\.[0-9]+)?$/, {
      message: "Personal cost is required and must be a valid number.",
    }),
  othersAmount: z
    .string()
    .trim()
    .min(1)
    .regex(/^[0-9]+(\.[0-9]+)?$/, {
      message: "Others cost is required and must be a valid number.",
    }),
  monthlyAmount: z
    .string()
    .trim()
    .min(1)
    .regex(/^[0-9]+(\.[0-9]+)?$/, {
      message: "Monthly Salary is required and must be a valid number.",
    }),
});

module.exports = expenseSchema;
