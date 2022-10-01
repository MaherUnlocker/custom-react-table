import React from 'react';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function MultiSelectColumnFilter({ column: { filterValue, setFilter, preFilteredRows, id } }: any) {
  console.log(
    '🚀 ~ file: MultipleSelectCo.tsx ~ line 5 ~ MultiSelectColumnFilter ~ filterValue',
    filterValue,
    preFilteredRows
  );
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row: any) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <div>
      {/* <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        defaultValue={[colourOptions[4], colourOptions[5]]}
        isMulti
        options={colourOptions}
      /> */}

      <select
        multiple // this prop for multiselect
        value={filterValue}
        // an appropriate multiselect handler (use Ctrl key to select multiple)
        onChange={(e) => {
          const allValues = Array.from(e.target.selectedOptions)
            .map((o) => o.value)
            .filter(Boolean);
          setFilter(allValues && allValues.length ? [1, 2] : undefined);
        }}
      >
        <option value=''>All</option>
        {options.map((option: any) => (
          <option value={option?.toString()}>{option}</option>
        ))}
      </select>
    </div>
  );
}
