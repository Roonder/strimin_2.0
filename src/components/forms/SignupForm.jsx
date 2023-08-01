'use client';
import { Input } from "@/components/utils/Input";
import { Button } from "@/components/utils/Button";
import {useState} from "react";
import {useForm} from "react-hook-form";
import axios from "axios";

export default function SignupForm() {
    const [error, setError] = useState();
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
            setError(error.message)
        }
    } 

    return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <Input
            name="email"
            label="Correo Electrónico"
            type="email"
            placeholder="john@doe.com"
            {...register("email",{required: "Requerido"})}
        />
        <Input
            name="user"
            label="Usuario"
            type="text"
            placeholder="johndoe"
            {...register("user",{required: "Requerido"})}
        />
        <Input
            name="password"
            label="Contraseña"
            type="password"
            placeholder="password"
            {...register("password",{required: "Requerido"})}
        />
        <Input
            name="password"
            label="Repite tu Contraseña"
            type="password"
            placeholder="password"
            {...register("rePassword",{required: "Requerido"})}
        />

        <Button
            type="submit"
        >Crear Cuenta</Button>
    </form>
)
}
