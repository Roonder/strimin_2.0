import { forwardRef } from "react"

export const Alert = forwardRef((
    {type,
    message,
    ...props},
    ref
) => {
    return(
        <div aria-label={`${type} alert`}>
            {message}
        </div>
    )
} )

Alert.displayName = "Alert"