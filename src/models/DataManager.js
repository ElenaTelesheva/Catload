import { getFromLocalStorage, setInLocalStorage } from '../managers/LocalStorageManager';
import { MAX_CURR_LIKE_HISTORY, MAX_ALL_LIKE_HISTORY, MAX_SESSION_HISTORY } from '../config';

class DataManager {
  #currLikeHistory = [];

  #allLikeHistory = [];

  // #source = '';

  constructor() {
    this.sessionHistory = [];
    this.currentIndex = { index: 0 };
    this.sources = ['catAPI', 'catass'];

    this.currentSource = 'catAPI';
    this.currentTab = 'curr';
  }

  setTab = (tab) => {
    if (tab === 'curr') this.currentTab = 'curr';
    else if (tab === 'all') this.currentTab = 'all';
  };

  getCurrLikeHistory = () => this.#currLikeHistory;

  getAllLikeHistory = () => this.#allLikeHistory;

  readHistoryFromLocalStorage = () => {
    const tempCurr = getFromLocalStorage({
      name: 'curr-cats-history',
    });

    if (tempCurr != null) this.#currLikeHistory = tempCurr;

    const tempAll = getFromLocalStorage({
      name: 'all-cats-history',
    });

    if (tempAll != null) this.#allLikeHistory = tempAll;
  };

  moveInHistoryPrev = () => {
    if (this.currentIndex.index >= 1) this.currentIndex.index -= 1;
  };

  moveInHistoryNext = () => {
    if (this.currentIndex.index < this.sessionHistory.length - 1) {
      this.currentIndex.index += 1;
    }
  };

  moveInHistoryLast = () => {
    if (this.sessionHistory.length !== 0) {
      this.currentIndex.index = this.sessionHistory.length - 1;
    }
  };

  checkIndexRepeatElem = () => {
    let tempIndex = -1;
    console.log(this.getCurrentElement().url);
    this.#currLikeHistory.forEach((item, index) => {
      if (item.url === this.getCurrentElement().url) {
        tempIndex = index;
      }
    });
    return tempIndex;
  };

  deleteRepeatHistoryElem = (repeatElemIndex) => this.#currLikeHistory.splice(repeatElemIndex, 1);

  appendSessionHistory = (image) => {
    if (this.sessionHistory.length >= MAX_SESSION_HISTORY) this.sessionHistory.shift();
    this.sessionHistory.push(image);
  };

  appendCurrLikeHistory = () => {
    if (this.#currLikeHistory.length >= MAX_CURR_LIKE_HISTORY) this.#currLikeHistory.shift();
    const object = this.getCurrentElement();
    this.#currLikeHistory.push(object);
    setInLocalStorage({
      name: 'curr-cats-history',
      data: JSON.stringify(this.#currLikeHistory),
    });
  };

  getCurrentElement = () => this.sessionHistory[this.currentIndex.index];

  setEmotion = (emotion) => {
    this.getCurrentElement().emotion = emotion;
  };

  deleteFile = (element) => {
    let tempIndex = -1;
    this.sessionHistory.forEach((item, index) => {
      if (item.url === element.url) {
        tempIndex = index;
      }
    });
    if (tempIndex !== -1) {
      this.sessionHistory[tempIndex].emotion = 'think';
    }
    tempIndex = -1;
    this.#currLikeHistory.forEach((item, index) => {
      if (item.url === element.url) {
        tempIndex = index;
      }
    });
    if (tempIndex === -1) return;

    this.#currLikeHistory.splice(tempIndex, 1);
    setInLocalStorage({
      name: 'curr-cats-history',
      data: JSON.stringify(this.#currLikeHistory),
    });
  };

  deleteElemFromCurrHistory = (elem) => {
    this.#currLikeHistory.forEach((item, index) => {
      if (item.url === elem.url) {
        this.#currLikeHistory.splice(index, 1);
      }
    });
    setInLocalStorage({
      name: 'curr-cats-history',
      data: JSON.stringify(this.#currLikeHistory),
    });
  };

  appendAllLikeHistory = (elem) => {
    this.deleteElemFromCurrHistory(elem);

    if (this.#allLikeHistory.length >= MAX_ALL_LIKE_HISTORY) this.#allLikeHistory.shift();

    this.#allLikeHistory.push(elem);
    setInLocalStorage({
      name: 'all-cats-history',
      data: JSON.stringify(this.#allLikeHistory),
    });
  };
}

export default DataManager;
