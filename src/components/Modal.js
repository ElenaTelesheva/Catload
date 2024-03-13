import Button from './Button';
import SmartSelect from './SmartSelect';

const Modal = ({ instance, title, onClickSaveBtn }) => {
  const modalBlock = document.createElement('div');
  modalBlock.className = 'modal';
  modalBlock.tabIndex = '-1';
  modalBlock.role = 'dialog';

  const modalDialog = document.createElement('div');
  modalDialog.className = 'modal-dialog';
  modalDialog.role = 'document';

  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';
  const modalHeader = document.createElement('div');
  modalHeader.className = 'modal-header';

  const modalTitle = document.createElement('h5');
  modalTitle.className = 'modal-title';
  modalTitle.innerHTML = title;

  // const modalSpan = document.createElement('span');
  // modalSpan.setAttribute('aria-hidden', 'modal');
  // modalSpan.innerHTML = '&times;';

  // buttonCloseLittle.appendChild(modalSpan);

  const modalBody = document.createElement('div');
  modalBody.className = 'modal-body';

  const [selectContainer, selected, closeSmartSelect] = SmartSelect({ instance });

  const showModal = () => {
    selected.innerHTML = instance.currentSource;
    modalBlock.classList.add('d-block');
    modalBlock.classList.add('modal-backdrop');
  };
  const hideModal = () => {
    modalBlock.classList.remove('d-block');
    modalBlock.classList.remove('modal-backdrop');
    closeSmartSelect();
  };

  const buttonCloseLittle = Button({ onClick: hideModal, className: ['btn-close'], text: '' });
  modalHeader.append(modalTitle, buttonCloseLittle);
  // const modalText = document.createElement('p');
  // modalText.innerHTML = 'Select with search goes here.';

  modalBody.appendChild(selectContainer);

  const modalFooter = document.createElement('div');
  modalFooter.className = 'modal-footer';
  const buttonSave = Button({ onClick: onClickSaveBtn, className: ['btn', 'btn-success'], text: 'Save source' });
  const buttonCloseBig = Button({ onClick: hideModal, className: ['btn', 'btn-secondary'], text: 'Close' });

  modalFooter.append(buttonSave, buttonCloseBig);
  modalContent.append(modalHeader, modalBody, modalFooter);
  modalDialog.appendChild(modalContent);
  modalBlock.appendChild(modalDialog);

  return [modalBlock, selected, showModal, hideModal];
};

export default Modal;
