import React from 'react';
import Select from 'react-select';

type optionType = {
  label: string;
  value: string;
};

type selectComponentType = {
  options: optionType[];
  setDesignationFilter: React.Dispatch<React.SetStateAction<string>>;
  handleSavedFiltersSelect: (selectedValue: any) => void;
};
export function SelectComponent({
  options,
  setDesignationFilter,
  handleSavedFiltersSelect,
}: selectComponentType): JSX.Element {
  const [inputValue, setInputValue] = React.useState('');
  const [value, setValue] = React.useState(options[0]); //{ label: '', value: '' });
  const onInputChange = (option: any, { action }: any) => {
    if (action === 'input-change') {
      const optionLength = option.length;
      const inputValueLength = inputValue.length;

      const myObject = {
        label: option,
        value: option,
      };

      const newValue: any =
        optionLength < inputValueLength
          ? myObject
          : { value: value.value + option[option.length - 1], label: value.label + option[option.length - 1] };

      setValue(newValue);

      const newInputValue = optionLength < inputValueLength ? option : inputValue + option[option.length - 1];
      setInputValue(newInputValue);
      setDesignationFilter(newInputValue);
    }
  };

  const onChange = (option: any, { action }: any) => {
    setValue(option);
    setDesignationFilter(option);
    handleSavedFiltersSelect(option);
  };

  return (
    <div className='App'>
      <Select
        id='savedFilter'
        name='savedFilter'
        placeholder={options.length > 0 ? 'Sélectionner ...' : 'Aucune'}
        options={options}
        onChange={onChange}
        onInputChange={onInputChange}
        inputValue={inputValue}
        value={value}
      />
    </div>
  );
}
