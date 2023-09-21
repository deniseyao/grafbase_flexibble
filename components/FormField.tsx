type Props = {
  type?: string;
  title: string;
  state: string | null;
  placeholder: string;
  isTextArea?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  setState: (value: string) => void;
};

const FormField = ({
  type,
  title,
  state,
  placeholder,
  isTextArea,
  isDisabled,
  isRequired,
  setState,
}: Props) => {
  return (
    <div className="flexStart flex-col w-full gap-4">
      <label className="w-full text-gray-100">{title}</label>

      {isTextArea ? (
        <textarea
          placeholder={placeholder}
          value={state ?? ""}
          className={`form_field-input ${
            isDisabled ? "disabled:opacity-50 cursor-not-allowed" : ""
          }`}
          onChange={(e) => setState(e.target.value)}
          disabled={isDisabled}
        />
      ) : (
        <input
          type={type ?? "text"}
          placeholder={placeholder}
          required={isRequired}
          value={state ?? ""}
          className={`form_field-input ${
            isDisabled ? "disabled:opacity-50 cursor-not-allowed" : ""
          }`}
          onChange={(e) => setState(e.target.value)}
          disabled={isDisabled}
        />
      )}
    </div>
  );
};

export default FormField;
