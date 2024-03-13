import Button from './Button';

const ImageCard = ({
  element,
  onClickDownload,
  onClickDelete,
  className,
  text,
}) => {
  const file = document.createElement('div');
  file.className = 'history-block__file';

  const img = document.createElement('img');
  img.src = element.url;
  img.className = 'history-block__file-picture';
  img.addEventListener('click', () => onClickDownload(element));

  file.append(img);

  if (onClickDelete) {
    const buttonDelete = Button({
      onClick: onClickDelete,
      className,
      text,
    });

    file.append(buttonDelete);
  }

  return file;
};

export default ImageCard;
