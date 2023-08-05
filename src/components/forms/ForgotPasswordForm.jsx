'use client';
import { Input } from "@/components/utils/Input";
import { Button } from "@/components/utils/Button";
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
            setError(error.message)
            console.log(error)
        }
    } 

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input
                name="email"
                label="Correo Electrónico"
                type="text"
                placeholder="john@doe.com"
                {...register("email",{required: "Requerido"})}
            />

            <Button
                type="submit"
            >Enviar Instrucciones</Button>
        </form>
    )
}