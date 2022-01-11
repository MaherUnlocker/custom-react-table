import React from 'react';

import DotIcon from './DotIcon.svg';

function SelectAccountDropdown() {
  return (
    <div
      className='w-100
      '
    >
      <div className='dropdown'>
        <img
          src={DotIcon}
          id='dropdownMenuButton1'
          data-bs-toggle='dropdown'
          className=' dropdown-toggle'
          alt='parmetrage'
        />
        <div className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
          <div className='dropdown-item'>Accéder à la carte</div>
          <div className='dropdown-item'>Voir la liste des boutiques</div>
        </div>
      </div>
    </div>
  );
}

export default SelectAccountDropdown;
