import TinderContainer from './TinderContainer';
import HistoryContainer from './HistoryContainer';
import DataManager from '../models/DataManager';
import ImageModel from '../models/ImageModel';
import Modal from './Modal';
import Button from './Button';
import { CatApi, CatassApi } from '../api-image-sources/ImageSourceApi';
import { getFromLocalStorage, setInLocalStorage } from '../managers/LocalStorageManager';

const getNewImage = async ({ sourceType }) => {
  let countNumber = getFromLocalStorage({
    name: 'count-view',
  });

  countNumber += 1;

  setInLocalStorage({
    name: 'count-view',
    data: JSON.stringify(countNumber),
  });

  let adapter;
  if (sourceType === 'catAPI') {
    adapter = CatApi;
  }
  if (sourceType === 'catass') {
    adapter = CatassApi;
  }

  let universalUrl;
  try {
    universalUrl = await adapter.getRandomCatUrl();
  } catch (e) {
    alert('Ошибка загрузки нового изображения');
    return 1;
  }
  const tempImage = new ImageModel({
    url: universalUrl,
    emotion: 'think',
  });

  return tempImage;
};

const generateDownloadLink = async (elem) => {
  const splitUrl = elem.url.split('/');
  const filename = splitUrl[splitUrl.length - 1];

  let response;
  try {
    response = await fetch(`${elem.url}`);
  } catch (e) {
    alert(`Ошибка скачивания картинки ${elem.url}`);
    return;
  }
  const blobImage = await response.blob();

  const href = window.URL.createObjectURL(blobImage);

  const anchorElement = document.createElement('a');
  anchorElement.href = href;
  anchorElement.download = filename;

  document.body.appendChild(anchorElement);
  anchorElement.click();

  document.body.removeChild(anchorElement);
  window.URL.revokeObjectURL(href);
};

const disableTinderBtn = () => {
  const tinderBlock = document.getElementsByClassName('tinder-block')[0];
  const innerBtn = tinderBlock.querySelectorAll('button');

  innerBtn.forEach((button) => {
    if (button.hasAttribute('disabled')) {
      button.removeAttribute('disabled');
    } else {
      button.setAttribute('disabled', true);
    }
  });
};

const App = async () => {
  const instance = new DataManager();
  instance.readHistoryFromLocalStorage();
  // instance.filterLikeHistoryCurr();

  try {
    instance.appendSessionHistory(await getNewImage({
      sourceType: instance.currentSource,
    }));
  } catch (e) {
    alert('Ошибка загрузки начального изображения');
    return;
  }

  const root = document.getElementById('root');

  const onDownloadHandler = async (updateFn, elem) => {
    if (instance.currentTab === 'curr') {
      instance.appendAllLikeHistory(elem);
      // instance.setTab('curr');
      updateFn();
    }
    // onCurrHandler(updateFn);
    generateDownloadLink(elem);
  };

  const onDownloadAllHandler = async (updateFn, colorFn) => {
    console.log(instance.getCurrLikeHistory());
    const tempHistory = [...instance.getCurrLikeHistory()];

    tempHistory.forEach((element) => {
      instance.appendAllLikeHistory(element);
      generateDownloadLink(element);
    });
    instance.setTab('all');
    colorFn();
    updateFn();

    // onAllHandler(updateFn);
  };

  const onSaveSourceHandler = (choice, hide) => {
    console.log(choice.innerText);
    instance.currentSource = choice.innerText;
    hide();
  };

  let tempUpdateEmodji;
  const onDeleteHandler = (updateFn, elem) => {
    instance.deleteFile(elem);
    instance.setTab('curr');
    updateFn();
    tempUpdateEmodji({ newEmodji: instance.getCurrentElement().emotion });
  };

  const [modalBlock, selected, showModal, hideModal] = Modal({
    instance,
    title: 'Cat source',
    onClickSaveBtn: () => onSaveSourceHandler(selected, hideModal),
  });

  const sourceButton = Button({ onClick: showModal, className: ['history-block__source-button'], text: 'Source' });

  const [historyContainer, updateHistory, colorTabButton] = HistoryContainer({
    instance,
    sourceButton,
    // onClickCurrBtn: () => onCurrHandler(updateHistory),
    // onClickAllBtn: () => onAllHandler(updateHistory),
    onClickDownloadBtn: (elem) => onDownloadHandler(updateHistory, elem),
    onClickDownloadAllBtn: () => onDownloadAllHandler(updateHistory, colorTabButton),
    onClickDeleteBtn: (elem) => onDeleteHandler(updateHistory, elem),
  });

  const onLikeHandler = async (updateSl, updateAn, moveSl, updateEm, getCount) => {
    disableTinderBtn();
    updateAn();

    if (instance.checkIndexRepeatElem() === -1) {
      instance.setEmotion('like');
      updateEm({ newEmodji: instance.getCurrentElement().emotion });

      instance.appendCurrLikeHistory();
      instance.setTab('curr');
      colorTabButton(instance.currentTab);
      updateHistory();
    }

    // если элемент последний
    if (instance.currentIndex.index >= instance.sessionHistory.length - 1) {
      try {
        instance.appendSessionHistory(await getNewImage({
          sourceType: instance.currentSource,
        }));
      } catch (e) {
        alert('Ошибка загрузки нового изображения');
      }
    }

    instance.moveInHistoryNext();
    updateSl({ newSessionHistory: instance.sessionHistory });
    setTimeout(moveSl, 10);

    setTimeout(() => {
      updateEm({ newEmodji: instance.getCurrentElement().emotion });
      disableTinderBtn();
    }, 500);
    getCount();
  };

  const onDislikeHandler = async (updateSl, updateAn, moveSl, updateEm, getCount) => {
    disableTinderBtn();
    updateAn();

    const repeatElemIndex = instance.checkIndexRepeatElem();

    instance.setEmotion('dislike');
    updateEm({ newEmodji: instance.getCurrentElement().emotion });

    if (repeatElemIndex > -1) {
      instance.deleteRepeatHistoryElem(repeatElemIndex);
      setInLocalStorage({
        name: 'cats-history',
        data: JSON.stringify(instance.getCurrLikeHistory()),
      });

      instance.setTab('curr');
      colorTabButton(instance.currentTab);
      updateHistory();
    }

    // если элемент последний
    if (instance.currentIndex.index >= instance.sessionHistory.length - 1) {
      try {
        instance.appendSessionHistory(await getNewImage({
          sourceType: instance.currentSource,
        }));
      } catch (e) {
        alert('Ошибка загрузки нового изображения');
        return;
      }
    }

    instance.moveInHistoryNext();
    updateSl({ newSessionHistory: instance.sessionHistory });
    setTimeout(moveSl, 10);

    setTimeout(() => {
      updateEm({ newEmodji: instance.getCurrentElement().emotion });
      disableTinderBtn();
    }, 500);
    getCount();
  };

  const onPrevHandler = (updateSl, moveSl, updateEm) => {
    if (instance.sessionHistory.length !== 0) {
      instance.moveInHistoryPrev();
      updateSl({ newSessionHistory: instance.sessionHistory }); // зачем его перерисовывать здесь
      setTimeout(moveSl, 10);
      updateEm({ newEmodji: instance.getCurrentElement().emotion });
    }
  };
  const onNextHandler = async (updateSl, moveSl, updateEm, getCount) => {
    // если последний элемент - новая картинка
    if (instance.currentIndex.index >= instance.sessionHistory.length - 1) {
      disableTinderBtn();
      try {
        instance.appendSessionHistory(await getNewImage({
          sourceType: instance.currentSource,
        }));
        disableTinderBtn();
      } catch (e) {
        alert('Ошибка загрузки нового изображения');
        return;
      }
    }
    instance.moveInHistoryNext();
    updateSl({ newSessionHistory: instance.sessionHistory });
    setTimeout(moveSl, 10);
    setTimeout(() => {
      updateEm({ newEmodji: instance.getCurrentElement().emotion });
    }, 500);
    getCount();
  };
  const onLastHandler = (updateSl, moveSl, updateEm) => {
    instance.moveInHistoryLast();
    updateSl({ newSessionHistory: instance.sessionHistory });
    setTimeout(moveSl, 10);
    updateEm({ newEmodji: instance.getCurrentElement().emotion });
  };

  const [
    tinderContainer,
    updateSlider,
    runLikeAnimation,
    runDislikeAnimation,
    moveSliderPrev,
    moveSliderNext,
    moveSliderLast,
    updateEmodji,
    getCountView,
  ] = TinderContainer({
    instance,
    onClickPrevBtn: () => onPrevHandler(updateSlider, moveSliderPrev, updateEmodji),
    onClickNextBtn: () => onNextHandler(updateSlider, moveSliderNext, updateEmodji, getCountView),
    onClickLastBtn: () => onLastHandler(updateSlider, moveSliderLast, updateEmodji),
    onClickLikeBtn: () => onLikeHandler(
      updateSlider,
      runLikeAnimation,
      moveSliderNext,
      updateEmodji,
      getCountView,
    ),
    onClickDislikeBtn: () => onDislikeHandler(
      updateSlider,
      runDislikeAnimation,
      moveSliderNext,
      updateEmodji,
      getCountView,
    ),
  });

  tempUpdateEmodji = updateEmodji;

  let extendButton;
  const hideHistoryBlock = () => {
    historyContainer.classList.toggle('active');
    tinderContainer.classList.toggle('active');
    if (historyContainer.classList.contains('active')) {
      // historyContainer.style.display = 'flex';
      extendButton.innerText = '⮜';
    } else {
      // historyContainer.style.display = 'none';
      // tinderContainer.classList.toggle('active');
      // historyContainer.classList.toggle('active');
      extendButton.innerText = '➤';
    }
  };

  extendButton = Button({ onClick: hideHistoryBlock, className: ['history-block__download-extend'], text: '➤' });

  instance.setTab('curr');
  updateHistory();
  updateEmodji({ newEmodji: instance.getCurrentElement().emotion });

  root.append(extendButton, modalBlock, historyContainer, tinderContainer);
};

App();
