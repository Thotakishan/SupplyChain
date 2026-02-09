import * as React from "react";

import { cn } from "./utils.js";

function Input({ className, type, ...props }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn("input", className)}
      {...props}
    />
  );
}

export { Input };
