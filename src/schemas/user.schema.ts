import { z } from 'zod'

export const createUserSchema = z.object({
    user_name: z
        .string({required_error: 'El nombre es obligatorio.'}),
    email: z
        .string({ required_error: 'El email es obligatorio.' })
        .email({ message: 'El email no es válido.' }),
    password: z
        .string({ required_error: 'La contraseña es obligatoria.' })
        .min(8, 'La contraseña debe tener al menos 8 caracteres.')
        .regex(/[a-z]/, 'La contraseña debe contener al menos una letra minúscula.')
        .regex(/[A-Z]/, 'La contraseña debe contener al menos una letra mayúscula.')
        .regex(/[0-9]/, 'La contraseña debe contener al menos un número.')
        .regex(/[^a-zA-Z0-9]/, 'La contraseña debe contener al menos un carácter especial.'),
})

export type CreateUserInput = z.infer<typeof createUserSchema>
