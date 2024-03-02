import * as React from "react";
import type { Option } from "./App";

interface SelectProps {
  options: Option[];
  transitionId: number;
  placeholder?: string;
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>, transitionId: number) => void;
}

const Select = (props: SelectProps) => {
  const { onChange, options, transitionId, placeholder = "Select an option", value = "" } = props;
  const [selectedValue, setSelectedValue] = React.useState(value);

  const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
    onChange(event, transitionId);
  };

  return (
    <select onChange={handleOnChange} value={selectedValue}>
      <option value="">{placeholder}</option>
      {options.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};

export default Select;
