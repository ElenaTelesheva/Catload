import Button from './Button';
import ImageCard from './ImageCard';

const HistoryContainer = ({
  instance,
  sourceButton,
  onClickDownloadBtn,
  onClickDownloadAllBtn,
  onClickDeleteBtn,
}) => {
  const historyContainer = document.createElement('div');
  historyContainer.className = 'history-block';

  const fileContainerCurr = document.createElement('div');
  fileContainerCurr.className = 'history-block__file-container';
  const fileContainerAll = document.createElement('div');
  fileContainerAll.className = 'history-block__file-container';
  fileContainerAll.style.display = 'none';

  const buttonDownLoad = Button({
    onClick: onClickDownloadAllBtn,
    className: ['history-block__download-button'],
    text: 'Download All',
  });

  const showCurr = (history) => {
    fileContainerAll.style.display = 'none';
    fileContainerCurr.style.display = 'flex';
    buttonDownLoad.style.display = 'inline-block';
    if (history.length === 0) {
      buttonDownLoad.style.display = 'none';
    }
  };
  const showAll = () => {
    fileContainerAll.style.display = 'flex';
    fileContainerCurr.style.display = 'none';
    buttonDownLoad.style.display = 'none';
  };

  const updateHistory = () => {
    fileContainerCurr.innerHTML = '';
    fileContainerAll.innerHTML = '';

    const mapHistoryGetters = {
      curr: instance.getCurrLikeHistory,
      all: instance.getAllLikeHistory,
      default: instance.getCurrLikeHistory,
    };

    const history = mapHistoryGetters[instance?.currentTab ?? 'default']?.();
    if (history === undefined) return;

    let cards = [];

    if (instance.currentTab === 'curr') {
      showCurr(history);
      cards = history
        .slice()
        .reverse()
        .map((element) => ImageCard(
          {
            element,
            onClickDownload: onClickDownloadBtn,
            onClickDelete: () => onClickDeleteBtn(element),
            className: ['history-block__delete-button'],
            text: '',
          },
        ));
      fileContainerCurr.append(...cards);
    }
    if (instance.currentTab === 'all') {
      showAll();
      cards = history
        .slice()
        .reverse()
        .map((element) => ImageCard(
          {
            element,
            onClickDownload: onClickDownloadBtn,
          },
        ));
      fileContainerAll.append(...cards);
    }
  };
  let colorTabButton;

  const onClickCurrBtn = () => {
    instance.setTab('curr');
    colorTabButton(instance.currentTab);
    updateHistory();
  };

  const onClickAllBtn = () => {
    instance.setTab('all');
    colorTabButton(instance.currentTab);
    updateHistory();
  };

  const buttonCurr = Button({
    onClick: onClickCurrBtn,
    className: ['history-block__curr-button', 'active'],
    text: 'Curr',
  });
  const buttonAll = Button({
    onClick: onClickAllBtn,
    className: ['history-block__all-button'],
    text: 'All',
  });

  colorTabButton = (type) => {
    if (type === 'curr' && buttonCurr.classList.contains('active')) return;
    if (type === 'all' && buttonAll.classList.contains('active')) return;
    buttonCurr.classList.toggle('active');
    buttonAll.classList.toggle('active');
  };

  updateHistory();
  // if (fileContainerCurr.innerHTML === '') buttonDownLoad.style.display = 'none';

  // fileContainerAll.appendChild();

  const pair = document.createElement('div');
  pair.className = 'history-block__pair';
  pair.append(buttonCurr, buttonAll);

  historyContainer.append(
    sourceButton,
    pair,
    fileContainerCurr,
    fileContainerAll,
    buttonDownLoad,
  );

  return [historyContainer, updateHistory, colorTabButton];
};

export default HistoryContainer;
