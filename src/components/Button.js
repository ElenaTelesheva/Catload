const Button = ({ onClick, className, text }) => {
  const button = document.createElement('button');

  if (onClick != null) {
    button.addEventListener('click', onClick);
  }

  button.type = 'button';
  button.classList.add(...className);
  button.innerText = text;

  // if (type === 'Like') {
  //   button.className = 'btn btn-success';
  //   button.innerText = type;
  // }
  // if (type === 'Dislike') {
  //   button.className = 'btn btn-danger';
  //   button.innerText = type;
  // }
  // if (type === 'Prev' || type === 'Next') {
  //   button.className = 'btn btn-info';
  //   button.innerText = type;
  // }
  // if (type === 'Last' || type === 'All' || type === 'Curr' || type === 'Download'
  //  || type === 'Source' || type === 'Save') {
  //   button.className = 'btn btn-primary';
  //   button.innerText = type;
  // }
  // if (type === 'Delete') {
  //   button.className = 'btn btn-danger history-block__delete-button';
  //   button.innerText = 'X';
  // }
  // if (type === 'Close-l') {
  //   button.className = 'close';
  //   button.setAttribute('datac-dismiss', 'modal');
  //   button.setAttribute('aria-label', 'Close');
  // }
  // if (type === 'Close-b') {
  //   button.className = 'btn btn-secondary';
  //   button.setAttribute('data-dismiss', 'modal');
  //   button.innerText = 'Close';
  // }

  return button;
};
export default Button;
