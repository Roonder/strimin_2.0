"use client"

import { Alert } from "../utils/Alert";
import { Input } from "../utils/Input";
import { Button } from "../utils/Button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useContacts } from "@/hooks/useContacts";
import { useContact } from "@/hooks/useContact";


export default function ContactsForm({contact, closeModal}) {
    const [error, setError] = useState();
    const {mutate} = useContacts();
    // React hook form
    const {register, handleSubmit, formState: {errors, isSubmitting}, getValues} = useForm({
        defaultValues: {
            name: contact ? contact.name : "",
            phone: contact ? contact.phone : "+58"
        }
    });

    console.log(contact)

    // Handle Submit
    const onSubmit = async (form) => {
        // If contact exits, edit. Otherwise, create
        if(contact) {
            try {
                const {data} = await axios.put(`/api/contacts/${contact._id}`, form)
                mutate();
            } catch (error) {
                setError(error.response.data.error);
            }
        } else {
            try {
                const {data} = await axios.post("/api/contacts", form)
                mutate();
            } catch (error) {
                setError(error.response.data.error);
            }
        }


        closeModal();
    } 

    return(
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            {error && <Alert message={error} type="error" />}

            <Input
                name="name"
                label="Nombre de Contacto"
                type="text"
                alert={errors?.name?.message}
                labelTextColor="text-black-light"
                inputClassName=""
                placeholder="John Doe"
                {...register("name", {
                    required: "Requerido"
                })}
            />
            <Input
                name="phone"
                label="Teléfono de Contacto"
                type="tel"
                alert={errors?.phone?.message}
                labelTextColor="text-black-light"
                inputClassName=""
                placeholder="+58 412 123 4567"
                {...register("phone", {
                    required: "Requerido"
                })}
            />

            <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-black-light text-gray-light white-hover rounded shadow font-semibold"
            >{contact ? "Actualizar" : "Agregar"}</Button>

        </form>
    )
}