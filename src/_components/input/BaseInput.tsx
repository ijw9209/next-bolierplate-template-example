import { InputHTMLAttributes, forwardRef } from "react";

interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  isDisabled?: boolean;
}

const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  ({ label, error, isDisabled = false, className = "", ...props }, ref) => {
    return (
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        {label && (
          <label style={{ marginBottom: "4px", fontWeight: "500" }}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          disabled={isDisabled}
          style={{
            padding: "8px",
            borderRadius: "6px",
            border: `1px solid ${error ? "red" : "#ccc"}`,
            outline: "none",
          }}
          {...props}
        />
        {error && (
          <span style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
            {error}
          </span>
        )}
      </div>
    );
  }
);

//디버깅 컴포넌트 이름
BaseInput.displayName = "BaseInput";
export default BaseInput;
