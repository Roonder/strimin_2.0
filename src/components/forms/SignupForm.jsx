'use client';
import { Input } from "@/components/utils/Input";
import { Button } from "@/components/utils/Button";
import { Alert } from "@/components/utils/Alert";
import {useState} from "react";
import {useForm} from "react-hook-form";
import Link from "next/link";
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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 md:grid md:grid-cols-2">

        {error && <Alert message={error} type={"error"} />}

        <Input
            name="email"
            label="Correo Electrónico"
            type="email"
            alert={errors?.email?.message}
            placeholder="john@doe.com"
            labelTextColor="text-white"
            inputClassName="text-white placeholder:text-white/50"
            divClassName="md:col-span-2"
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
            labelTextColor="text-white"
            inputClassName="text-white placeholder:text-white/50"
            divClassName="md:col-span-2"
            alert={errors?.user?.message}
            {...register("user",{required: "Requerido"})}
        />
        <Input
            name="password"
            label="Contraseña"
            type="password"
            placeholder="password"
            labelTextColor="text-white"
            inputClassName="text-white placeholder:text-white/50"
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
            labelTextColor="text-white"
            inputClassName="text-white placeholder:text-white/50"
            alert={errors?.rePassword?.message}
            {...register("rePassword",{
                required: "Requerido",
                validate: v => v === getValues("password") || "Las contraseñas no coinciden"
            })}
        />


        <div className="flex flex-col gap-2 w-full md:col-span-2">
            <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gray-light text-black-light white-hover rounded shadow font-semibold"
            >Crear Cuenta</Button>

            <p className="text-white font-semibold text-center font-sans">o</p>

            <Link className="px-4 py-3 border border-neutral-200 text-center text-white font-semibold rounded neon-hover hover:border-none" href={"/login"}>
                ¡Inicia Sesión!
            </Link>
        </div>
    </form>
)
}
