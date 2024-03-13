import { WIDTH_SLIDE } from '../config';
import EmotionAnimation from './EmotionAnimation';

const Slider = ({ sessionHistory }) => {
  const slider = document.createElement('div');
  slider.className = 'super-slider';

  const sliderContainer = document.createElement('div');
  sliderContainer.className = 'super-slider__container';

  let offset = 0;

  const [animationContainer, runLikeAnimation, runDislikeAnimation] = EmotionAnimation();

  const updateSlider = ({ newSessionHistory }) => {
    slider.innerHTML = '';
    sliderContainer.innerHTML = '';
    newSessionHistory.forEach((elem) => {
      const sliderSlide = document.createElement('div');
      sliderSlide.className = 'super-slider__slide';

      const img = document.createElement('img');
      img.src = elem.url;
      img.className = 'super-slider__img';

      sliderSlide.appendChild(img);

      sliderContainer.appendChild(sliderSlide);
    });
    slider.append(sliderContainer, animationContainer);
    // slider.append(sliderContainer);
    // renderAnimation();
  };

  const moveSliderPrev = () => {
    if (offset <= 0) return;
    offset -= WIDTH_SLIDE;
    sliderContainer.style.left = `${-offset}em`;
  };
  const moveSliderNext = () => {
    if (offset >= WIDTH_SLIDE * (sessionHistory.length - 1)) return;
    offset += WIDTH_SLIDE;
    sliderContainer.style.left = `${-offset}em`;
  };

  const moveSliderLast = () => {
    offset = (sessionHistory.length - 1) * WIDTH_SLIDE;
    sliderContainer.style.left = `${-offset}em`;
  };

  updateSlider({ newSessionHistory: sessionHistory });
  // renderAnimation();

  return [
    slider,
    updateSlider,
    runLikeAnimation,
    runDislikeAnimation,
    moveSliderPrev,
    moveSliderNext,
    moveSliderLast,
  ];
};

export default Slider;
