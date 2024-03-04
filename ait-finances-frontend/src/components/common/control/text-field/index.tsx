import classNames from "classnames";
import { useFormikContext } from "formik";
import { InputBaseProps } from "src/types/control-components";

export default function TextField({ field_key, label, ...props }: InputBaseProps) {
  const { getFieldProps, errors } = useFormikContext<{ [key: string]: boolean }>();

  return (
    <div>
      {label && (
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field_key}>
          {label}
        </label>
      )}
      <input
        className={classNames(
          "shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline",
          {
            "border-red-500": errors[field_key]
          }
        )}
        id={field_key}
        type="text"
        placeholder={`Enter your ${field_key}`}
        {...getFieldProps(field_key)}
        {...props}
      />
      {errors[field_key] && <p className="text-red-500 text-sm italic mt-1">{errors[field_key]}</p>}
    </div>
  );
}
