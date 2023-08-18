'use client';
import { Input } from "@/components/utils/Input";
import { Button } from "@/components/utils/Button";
import { Alert } from "@/components/utils/Alert"
import {useState, useEffect} from "react";
import {useForm} from "react-hook-form";
import Link from "next/link";
import axios from "axios";

export default function RecoverPasswordForm({token}) {
    const [error, setError] = useState();
    const [saved, setSaved] = useState(false);
    // React hook form
    const {register, handleSubmit, formState: {errors, isSubmitting}, getValues} = useForm({
        defaultValues: {
            password: "",
            rePassword: ""
        }
    });

    // Check if the token is a valid token
    useEffect(() => {
        const verifyToken = async () => {
            try {
                const {data} = await axios(`/api/strimers/recover-password/${token}`);
            } catch (error) {
                setError(error.response.data.error);
            }
        }

        verifyToken();
    }, [token])

    // Handle Submit
    const onSubmit = async (form) => {
        try {
            const {data} = await axios.post(`/api/strimers/recover-password/${token}`, form);
        } catch (error) {
            setError(error.response.data.error)
        }
    } 

    return !saved ? (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">

            {error && <Alert message={error} type="error" />}

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

        <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-gray-light text-black-light white-hover rounded shadow font-semibold"
        >Guardar Cambios</Button>
        </form>
        
    ) : (
        <Link className="px-4 py-3 border border-neutral-200 text-center text-white font-semibold rounded neon-hover hover:border-none" href={"/login"}>
            ¡Inicia Sesión!
        </Link>
    )
}