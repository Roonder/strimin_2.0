'use client';
import { Input } from "@/components/utils/Input";
import { Button } from "@/components/utils/Button";
import { Alert } from "@/components/Alert";
import {useState} from "react";
import {useForm} from "react-hook-form";
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
        <form onSubmit={handleSubmit(onSubmit)}>

            {error && <Alert message={error} type="error" />}

            <Input
                name="userOrEmail"
                label="Usuario o Correo Electrónico"
                type="text"
                placeholder="john@doe.com | johndoe"
                alert={errors?.userOrEmail?.message}
                {...register("userOrEmail",{
                    required: "Requerido",
                    validate: v => emailRegex.test(v) || "Inserta un correo válido"
                })}
            />
            <Input
                name="password"
                label="Contraseña"
                type="password"
                placeholder="password"
                alert={errors?.password?.message}
                {...register("password",{required: "Requerido"})}
            />

            <Button
                type="submit"
                disabled={isSubmitting}
            >Ingresar</Button>
        </form>
    )
}
