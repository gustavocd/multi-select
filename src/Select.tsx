import * as React from "react";
import type { Option } from "./App";

interface SelectProps {
  options: Option[];
  transitionId: string;
  selectedOptions?: string[];
  placeholder?: string;
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>, transitionId: string) => void;
}

const Select = (props: SelectProps) => {
  const { selectedOptions = [], onChange, options, transitionId, placeholder = "Select an option", value = "" } = props;
  const [selectedValue, setSelectedValue] = React.useState(value);

  const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
    onChange(event, transitionId);
  };

  return (
    <select style={{ width: '250px' }} onChange={handleOnChange} value={selectedValue}>
      <option value="">{placeholder}</option>
      {options.filter(option => !selectedOptions.includes(option.value) || option.value === selectedValue).map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
    </select>
  );
};

export default Select;
