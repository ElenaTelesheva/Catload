// import Image from './Image';
import Dislike from '../svg-components/Dislike';
import Like from '../svg-components/Like';
import Button from './Button';
import Slider from './Slider';
import TopPanel from './TopPanel';

const TinderContainer = ({
  instance,
  onClickPrevBtn,
  onClickNextBtn,
  onClickLastBtn,
  onClickLikeBtn,
  onClickDislikeBtn,
}) => {
  const tinderContainer = document.createElement('div');
  tinderContainer.classList.add('tinder-block', 'active');

  const [topPanel, updateEmodji, getCountView] = TopPanel({
    onClickPrevBtn,
    onClickNextBtn,
    onClickLastBtn,
  });

  const [
    slider,
    updateSlider,
    runLikeAnimation,
    runDislikeAnimation,
    moveSliderPrev,
    moveSliderNext,
    moveSliderLast,
  ] = Slider({
    sessionHistory: instance.sessionHistory,
  });

  // кнопки лайк и дизлайк
  const switchButtonsContainer = document.createElement('div');
  switchButtonsContainer.className = 'tinder-block__emotion-buttons-container';

  const buttonLike = Button({ onClick: onClickLikeBtn, className: ['tinder-block__like-button'], text: '' });
  const svgLike = Like({ className: 'tinder-block__like-svg' });
  buttonLike.append(svgLike);

  const buttonDisLike = Button({ onClick: onClickDislikeBtn, className: ['tinder-block__dislike-button'], text: '' });
  const svgDislike = Dislike({ className: 'tinder-block__dislike-svg' });
  buttonDisLike.append(svgDislike);

  switchButtonsContainer.append(buttonLike, buttonDisLike);

  tinderContainer.append(topPanel, slider, switchButtonsContainer);

  return [
    tinderContainer,
    updateSlider,
    runLikeAnimation,
    runDislikeAnimation,
    moveSliderPrev,
    moveSliderNext,
    moveSliderLast,
    updateEmodji,
    getCountView,
  ];
};

export default TinderContainer;
