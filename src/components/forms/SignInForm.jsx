'use client';
import { Input } from "@/components/utils/Input";
import { Button } from "@/components/utils/Button";
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
            setError(error.message)
            console.log(error)
        }
    } 

    return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <Input
            name="userOrEmail"
            label="Usuario o Correo Electrónico"
            type="text"
            placeholder="john@doe.com | johndoe"
            {...register("userOrEmail",{required: "Requerido"})}
        />
        <Input
            name="password"
            label="Contraseña"
            type="password"
            placeholder="password"
            {...register("password",{required: "Requerido"})}
        />

        <Button
            type="submit"
        >Ingresar</Button>
    </form>
)
}
