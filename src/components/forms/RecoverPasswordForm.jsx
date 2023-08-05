'use client';
import { Input } from "@/components/utils/Input";
import { Button } from "@/components/utils/Button";
import {useState, useEffect} from "react";
import {useForm} from "react-hook-form";
import axios from "axios";

export default function RecoverPasswordForm({token}) {
    const [error, setError] = useState();
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
            const {data} = await axios(`/api/strimers/recover-password/${token}`);
            console.log(data);
        }

        verifyToken();
    }, [token])

    // Handle Submit
    const onSubmit = async (form) => {
        try {
            const {data} = await axios.post(`/api/strimers/recover-password/${token}`, form);
        } catch (error) {
            setError(error.message)
            console.log(error)
        }
    } 

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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
            >Guardar Cambios</Button>
        </form>
    )
}