import React, { useState } from 'react';
import './modal.css';

function Modal(props: any) {
  return (
    <div className={'modalMain ' + (props.openModal ? 'show' : 'closed')}>
      <div className="main-container">
        <div className={'modal-container'}>{props.children}</div>
      </div>
    </div>
  );
}

export default Modal;
