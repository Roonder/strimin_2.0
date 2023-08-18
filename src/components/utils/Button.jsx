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
        className={`px-4 py-3 ${className}`}
        type={type}
        {...props}
      >{children}</button>  
    );
});

Button.displayName = "Button"