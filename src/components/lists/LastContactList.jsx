"use client"
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import { useContacts } from "@/hooks/useContacts";
import { Disclosure } from "@headlessui/react";
import { HiOutlineChevronDown, HiTrash } from "react-icons/hi2"
import ContactModal from "@/components/modals/ContactModal";
import { Button } from "@/components/utils/Button";

export function LastContactList() {
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

    return contacts?.lastContacts?.map(contact => (
        <div key={contact._id} className="w-full rounded">
            <Disclosure>
                {({open}) => (
                    <>
                        <Disclosure.Button
                           className="flex w-full justify-between items-center px-4 py-2 bg-white/80 text-black-light rounded shadow border border-gray-soft/70" 
                        >
                            <div className="flex items-center w-3/4 gap-2">
                                <p className="truncate text-ellipsis">{contact.name}</p>
                                <span className="text-xs text-gray-neutral truncate text-ellipsis">{contact.phone}</span>
                            </div>
                            
                            <HiOutlineChevronDown className={`${open ? "rotate-180 transform" : ""} w-5 h-5 `} />
                        </Disclosure.Button>
                        <Disclosure.Panel
                            className="px-4 py-2 grid grid-cols-2 gap-x-4 md:gap-x-0 md:justify-evenly md:place-items-center bg-white/80 rounded shadow border border-gray-soft/70 mt-1"
                        >
                            <ContactModal edit={true} contact={contact}/>
                            <Button variant="danger" className="w-full md:w-fit flex gap-2 items-center justify-center text-xl" onClick={() => deleteContact(contact._id)}><HiTrash /> <span className="text-base">Eliminar</span></Button>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        </div>
    ))
}