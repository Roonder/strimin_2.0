import {forwardRef} from "react";

const styles = {
  primary: "bg-neon-purple shadow-black-light/70 text-white font-semibold hover:bg-neon-purple/70 active:bg-neon-purple/70 transition-all delay-100",
  danger: "bg-red-neutral shadow-black-light/70 text-white font-semibold hover:bg-red-neutral/70 active:bg-red-neutral/70 transition-all delay-100",
}

export const Button = forwardRef(({
    children,
    type = "button",
    className = "",
    variant = "primary",
    ...props
}, ref) => {
    return (
      <button
        ref={ref}
        className={`px-4 py-3 rounded shadow ${className} ${styles[variant]}`}
        type={type}
        {...props}
      >{children}</button>  
    );
});

Button.displayName = "Button"