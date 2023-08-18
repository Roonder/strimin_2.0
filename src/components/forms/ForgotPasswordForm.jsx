'use client';
import { Input } from "@/components/utils/Input";
import { Button } from "@/components/utils/Button";
import { Alert } from "@/components/utils/Alert"
import {useState} from "react";
import {useForm} from "react-hook-form";
import Link from "next/link";
import axios from "axios";

export default function ForgotPasswordForm() {
    const [error, setError] = useState();
    // React hook form
    const {register, handleSubmit, formState: {errors, isSubmitting}, getValues} = useForm({
        defaultValues: {
            email: ""
        }
    });

    // Handle Submit
    const onSubmit = async (form) => {
        try {
            const {data} = await axios.post('/api/strimers/forgot-password', form);
        } catch (error) {
            setError(error.response.data.error);
        }
    } 

    const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">

            {error && <Alert message={error} type="error" />}

            <Input
            name="email"
            label="Correo Electrónico"
            type="email"
            alert={errors?.email?.message}
            labelTextColor="text-white"
            inputClassName="text-white placeholder:text-white/50"
            placeholder="john@doe.com"
            {...register("email",{
                required: "Requerido",
                validate: v => emailRegex.test(v) || "Inserta un correo válido"
            })}
            />

            <div className="flex flex-col gap-2 w-full">
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gray-light text-black-light white-hover rounded shadow font-semibold"
                >Enviar Solicitud</Button>

                <p className="text-white font-semibold text-center font-sans">o</p>

                <Link className="px-4 py-3 border border-neutral-200 text-center text-white font-semibold rounded neon-hover hover:border-none" href={"/login"}>
                    ¡Inicia Sesión!
                </Link>
            </div>
        </form>
    )
}