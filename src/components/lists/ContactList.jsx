"use client"
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import { useContacts } from "@/hooks/useContacts";
import ContactModal from "@/components/modals/ContactModal";
import { Button } from "@/components/utils/Button";

export function ContactList() {
    const {contacts, isLoading, isError, mutate} = useContacts();
    const [error, setError] = useState({});

    if(isLoading) return <p>Ta cargando mi negro</p>
    if(isError) return <p>Hay un error mi negro</p>

    const deleteContact = id => {
        Swal.fire({
            toast: true,
            title: '¿Seguro de borrar tu contacto?',
            text: "No podrás revertir este cambio.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#b00038',
            cancelButtonColor: '#400ee1',
            confirmButtonText: 'Sí, borrar',
            cancelButtonText: "Cancelar",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const {data} = await axios.delete(`/api/contacts/${id}`);
                    Swal.fire({
                        toast: true,
                        title: "Borrado!",
                        text: "Tu contacto ha sido borrado exitosamente.",
                        icon: "success",
                        timer: 5e3,
                        timerProgressBar: true,
                        confirmButtonColor: '#400ee1',
                    });
                  mutate();
                } catch (error) {
                  setError(error.response.data.error);
                  console.log(error);
                }
            }
        });
      }

    return contacts?.map(contact => (
        <div key={contact._id} className="p-4 border shadow flex gap-4">
            <p >
                el contacto mi negro: {" "}
                {contact.name} - {contact.phone}
            </p>

            <ContactModal edit={true} contact={contact}/>
            <Button className="bg-red-neutral text-white" onClick={() => deleteContact(contact._id)}>Eliminar Contacto</Button>
        </div>
    ))
}