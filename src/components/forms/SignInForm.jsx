'use client';
import { Input } from "@/components/utils/Input";
import { Button } from "@/components/utils/Button";
import { Alert } from "@/components/utils/Alert";
import {useState} from "react";
import {useForm} from "react-hook-form";
import Link from "next/link";
import axios from "axios";

export default function SignInForm() {
    const [error, setError] = useState();
    // React hook form
    const {register, handleSubmit, formState: {errors, isSubmitting}, getValues} = useForm({
        defaultValues: {
            userOrEmail: "",
            password: "",
        }
    });

    // Handle Submit
    const onSubmit = async (form) => {
        try {
            const {data} = await axios.post('/api/strimers/login', form);
        } catch (error) {
            setError(error.response.data.error)
        }
    } 

    const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;


    return (
    <>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">

            {error && <Alert message={error} type="error" />}

            <Input
                name="userOrEmail"
                label="Usuario o Correo Electrónico"
                type="text"
                placeholder="john@doe.com | johndoe"
                alert={errors?.userOrEmail?.message}
                labelTextColor="text-white"
                inputClassName="text-white placeholder:text-white/50"
                {...register("userOrEmail",{
                    required: "Requerido",
                    // validate: v => emailRegex.test(v) || "Inserta un correo válido"
                })}
            />

            <div className="relative pb-7">
                <Input
                    name="password"
                    label="Contraseña"
                    type="password"
                    placeholder="password"
                    alert={errors?.password?.message}
                    labelTextColor="text-white"
                    inputClassName="text-white placeholder:text-white/50"
                    {...register("password",{required: "Requerido"})}
                />
                
                <Link href={"/forgot-password"} className="text-white text-sm font-semibold uppercase absolute bottom-0 right-0 pt-4 pr-1 hover:text-white/70 active:text-white/70 transition-all delay-100">
                    Olvidé mi contraseña
                </Link>
            </div>

            <div className="flex flex-col gap-2 w-full">
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gray-light text-black-light white-hover rounded shadow font-semibold"
                >Ingresar</Button>

                <p className="text-white font-semibold text-center font-sans">o</p>

                <Link className="px-4 py-3 border border-neutral-200 text-center text-white font-semibold rounded neon-hover hover:border-none" href={"/signup"}>
                    ¡Regístrate!
                </Link>
            </div>

        </form>
    </>
    )
}
