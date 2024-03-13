// import imageThink from '../images/think.png';
// import imageLike from '../images/like.png';
// import imageDislike from '../images/dislike.png';
import Button from './Button';
import Heart from '../svg-components/Heart';
import BrokenHeart from '../svg-components/BrokenHeart';
import Think from '../svg-components/Think';
import { getFromLocalStorage } from '../managers/LocalStorageManager';

const TopPanel = ({ onClickPrevBtn, onClickNextBtn, onClickLastBtn }) => {
  const topPanel = document.createElement('div');
  topPanel.className = 'tinder-block__switch-buttons-container';

  const emodjiBlock = document.createElement('div');
  emodjiBlock.className = 'tinder-block__emodji-block';
  const emodji = document.createElement('img');
  emodji.className = 'tinder-block__emodji';
  emodji.alt = 'Эмодзи';
  emodjiBlock.append(emodji);

  const svgHeart = Heart({ className: 'tinder-block__emodji-svg' });
  const svgBrokenHeart = BrokenHeart({ className: 'tinder-block__emodji-svg' });
  const svgThink = Think({ className: 'tinder-block__emodji-svg' });

  /**
   * @param {string} newEmodji - emoji type (valid values : 'think', 'like', 'dislike')
   */
  const updateEmodji = ({ newEmodji }) => {
    emodjiBlock.innerHTML = '';
    switch (newEmodji) {
      case 'think': emodjiBlock.append(svgThink); break;
      case 'like': emodjiBlock.append(svgHeart); break;
      case 'dislike': emodjiBlock.append(svgBrokenHeart); break;
      default: break;
    }
  };
  updateEmodji('Think');

  const countViewImages = document.createElement('div');
  countViewImages.className = 'tinder-block__counter';

  const getCountView = () => {
    countViewImages.innerText = getFromLocalStorage({
      name: 'count-view',
    });
  };
  getCountView();

  const buttonPrev = Button({
    onClick: onClickPrevBtn,
    className: ['tinder-block__top-panel-button', 'tinder-block__prev-button'],
    text: '< Back',
  });
  const buttonNext = Button({
    onClick: onClickNextBtn,
    className: ['tinder-block__top-panel-button', 'tinder-block__next-button'],
    text: '> Next',
  });
  const buttonLast = Button({
    onClick: onClickLastBtn,
    className: ['tinder-block__top-panel-button', 'tinder-block__last-button'],
    text: '>> Last',
  });

  const nearButtonBlock = document.createElement('div');
  nearButtonBlock.className = 'tinder-block__near-buttons-block';
  nearButtonBlock.append(buttonNext, buttonLast);

  const pairDiv = document.createElement('div');
  pairDiv.className = 'tinder-block__pair';
  pairDiv.append(emodjiBlock, countViewImages);

  topPanel.append(buttonPrev, pairDiv, nearButtonBlock);

  return [topPanel, updateEmodji, getCountView];
};
export default TopPanel;
