'use client'
import {forwardRef} from "react";

export const Input = forwardRef(({
    name,
    label,
    alert,
    type,
    labelTextColor = "text-neutral-800",
    hideLabel = false,
    value = "",
    divClassName,
    labelClassName,
    inputClassName,
    ...props
}, ref) => {
    return (
        <div className={`flex flex-col gap-[1.5px] ${divClassName} relative`}>
        <label
          className={`${labelClassName} ${!alert ? labelTextColor : "text-red-500"} uppercase font-semibold text-sm`}
          htmlFor={name}
          hidden={hideLabel}
        >
          {label}
        </label>
        <input
          ref={ref}
          type={type}
          name={name}
          id={name}
          defaultValue={value}
          className={`${inputClassName} tracking-wider px-2 py-3 border-b-[1px] ${!alert ? "border-neutral-200" : "border-red-500"} outline-none transition-all ease-in-out w-full delay-100 ${!alert ? "bg-white/5" : "bg-red-500/5"} backdrop-blur-[10px] backdrop-opacity-5 rounded-t focus:border-neon-purple`}
          {...props}
        />
        {alert && <p className="text-sm font-semibold text-red-500 pt-[1.5px] absolute bottom-0 translate-y-full ml-1">{alert}</p>}
      </div>
    )
});

Input.displayName = "Input";