'use client';
import { Input } from "@/components/utils/Input";
import { Button } from "@/components/utils/Button";
import { Alert } from "@/components/Alert";
import {useState} from "react";
import {useForm} from "react-hook-form";
import axios from "axios";

export default function SignupForm() {
    const [error, setError] = useState(null);
    // React hook form
    const {register, handleSubmit, formState: {errors, isSubmitting}, getValues} = useForm({
        defaultValues: {
            user: "",
            email: "",
            password: "",
            rePassword: ""
        }
    });

    // Handle Submit
    const onSubmit = async (form) => {
        try {
            const {data} = await axios.post('/api/strimers/signup', form);
        } catch (error) {
            setError(error.response.data.error)
        }
    } 

    const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

    return (
    <form onSubmit={handleSubmit(onSubmit)}>

        {error && <Alert message={error} type={"error"} />}

        <Input
            name="email"
            label="Correo Electrónico"
            type="email"
            alert={errors?.email?.message}
            placeholder="john@doe.com"
            {...register("email",{
                required: "Requerido",
                validate: v => emailRegex.test(v) || "Inserta un correo válido"
            })}
        />
        <Input
            name="user"
            label="Usuario"
            type="text"
            placeholder="johndoe"
            alert={errors?.user?.message}
            {...register("user",{required: "Requerido"})}
        />
        <Input
            name="password"
            label="Contraseña"
            type="password"
            placeholder="password"
            alert={errors?.password?.message}
            {...register("password",{
                required: "Requerido",
                minLength: {
                    value: 6,
                    message: "La contraseña debe de ser de mínimo 6 caracteres"
                }
            })}
        />
        <Input
            name="password"
            label="Repite tu Contraseña"
            type="password"
            placeholder="password"
            alert={errors?.rePassword?.message}
            {...register("rePassword",{
                required: "Requerido",
                validate: v => v === getValues("password") || "Las contraseñas no coinciden"
            })}
        />

        <Button
            type="submit"
            disabled={isSubmitting}
        >Crear Cuenta</Button>
    </form>
)
}
