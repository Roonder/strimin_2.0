import RecoverPasswordForm from "@/components/forms/RecoverPasswordForm";

export default function RecoverPassword({params}){
    const token = params?.token;

    return (
        <RecoverPasswordForm
            token={token}
        />
    )
}