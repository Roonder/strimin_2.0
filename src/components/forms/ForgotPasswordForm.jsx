'use client';
import { Input } from "@/components/utils/Input";
import { Button } from "@/components/utils/Button";
import { Alert } from "@/components/Alert"
import {useState} from "react";
import {useForm} from "react-hook-form";
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
        <form onSubmit={handleSubmit(onSubmit)}>

            {error && <Alert message={error} type="error" />}

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

            <Button
                type="submit"
                disabled={isSubmitting}
            >Enviar Instrucciones</Button>
        </form>
    )
}