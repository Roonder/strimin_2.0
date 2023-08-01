import {forwardRef} from "react";

export const Button = forwardRef(({
    children,
    type = "button",
    className = "",
    ...props
}, ref) => {
    return (
      <button
        ref={ref}
        className={`px-3 py-2 ${className}`}
        type={type}
        {...props}
      >{children}</button>  
    );
});

Button.displayName = "Button"