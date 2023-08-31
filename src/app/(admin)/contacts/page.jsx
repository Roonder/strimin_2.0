import { ContactList } from "@/components/lists/ContactList"
import { Button } from "@/components/utils/Button"
import ContactModal from "@/components/modals/ContactModal";

export default function Contacts() {
   
    return (
    <>
        <section className="p-2 h-fit">
            <h1 className="font-bold text-2xl text-black-light my-1">Contactos</h1>
            <ContactModal />
        </section>

        <div className="flex flex-col w-full p-2 gap-2 max-h-[65vh] overflow-y-auto">
            <ContactList />
        </div>
    </>
    )
}