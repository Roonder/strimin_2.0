import ContactsForm from "@/components/forms/ContactsForm"
import { ContactList } from "@/components/lists/ContactList"
import { Button } from "@/components/utils/Button"
import ContactModal from "@/components/modals/ContactModal";

export default function Contacts() {
   

    return (
    <>
        {/* <Button className="bg-neon-purple text-white" onClick={() => setOpenModal(true)}>Agregar Contacto</Button> */}
        <ContactModal />

        <div className="flex flex-col">
            <ContactList />
        </div>
    </>
    )
}