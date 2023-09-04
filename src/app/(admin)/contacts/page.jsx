import { ContactList } from "@/components/lists/ContactList"
import { LastContactList } from "@/components/lists/LastContactList";
import ContactModal from "@/components/modals/ContactModal";

export default function Contacts() {
   
    return (
    <div className="md:grid md:grid-cols-[50vw_38.5vw] md:gap-4">
        <section className="p-2 h-fit">
            <h1 className="font-bold text-2xl text-black-light my-1">Contactos</h1>
            <ContactModal />

            <div className="hidden md:flex md:flex-col md:justify-self-end w-full md:w-[50vw] mt-4 p-4 gap-2 max-h-[50vh] md:max-h-[75vh] md:h-[75vh] overflow-y-auto bg-white shadow-xl rounded">
                <h3 className="font-bold text-xl">Últimos 20 Contactos Añadidos</h3>
                <LastContactList />
            </div>
        </section>

        <section className="p-2 md:justify-self-end">
            <div className="flex flex-col w-full md:w-[35vw] p-4 gap-2 max-h-[60vh] md:max-h-[90vh] md:h-[90vh] overflow-y-auto bg-white shadow-xl rounded">
                <h3 className="font-bold text-xl">Todos los Contactos</h3>
                <ContactList />
            </div>
        </section>
    </div>
    )
}