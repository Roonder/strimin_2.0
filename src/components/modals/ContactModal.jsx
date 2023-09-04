"use client"
import {Dialog, Transition} from "@headlessui/react"
import React,{useState, Fragment} from "react";
import ContactsForm from "@/components/forms/ContactsForm";
import { Button } from "@/components/utils/Button";
import { HiMiniPencilSquare, HiMiniPlusCircle } from "react-icons/hi2";
import { useContacts } from "@/hooks/useContacts";

export default function ContactModal({edit = false, contact}) {
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState({});
    const {mutate} = useContacts();

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    return (
    <>
      <Button className="w-full md:w-fit flex gap-2 items-center justify-center text-xl" onClick={open}>{edit ? (
        <>
          <HiMiniPencilSquare /> <span className="text-base">Editar</span>
            </> ) : (
        <>
          <HiMiniPlusCircle /> <span className="text-base">Agregar</span>
            </> )
      }</Button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={close}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black-dark bg-opacity-60" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-2 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-4 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-semibold leading-[3rem] text-gray-900"
                  >
                    {edit ? "Editar" : "Agregar"} Cliente
                    <hr className="border-black-light/20" />
                  </Dialog.Title>
                  <div className="mt-2">
                    <ContactsForm contact={contact} closeModal={close}/>
                  </div>
                  </Dialog.Panel>
                </Transition.Child>
                </div>
            </div>
            </Dialog>
        </Transition>
    </>
    )
}