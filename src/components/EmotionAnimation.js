const EmotionAnimation = () => {
  const animationContainer = document.createElement('div');
  animationContainer.className = 'animation-container';
  const objectAnimationLike = document.createElement('div');
  objectAnimationLike.className = 'animation-container__like';

  const objectAnimationDislike = document.createElement('div');
  objectAnimationDislike.className = 'animation-container__dislike';

  // linkAnimation.addEventListener('click', () => {
  //   linkAnimation.classList.toggle('press');
  //   titleAnimation.classList.toggle('press');
  // });

  animationContainer.append(objectAnimationLike, objectAnimationDislike);

  const runLikeAnimation = () => {
    objectAnimationLike.classList.toggle('show');

    setTimeout(() => {
      objectAnimationLike.classList.toggle('show');
    }, 500);

    console.log('анимашка like');
  };

  const runDislikeAnimation = () => {
    objectAnimationDislike.classList.toggle('show');

    setTimeout(() => {
      objectAnimationDislike.classList.toggle('show');
    }, 500);

    console.log('анимашка dislike');
  };

  return [animationContainer, runLikeAnimation, runDislikeAnimation];
};

export default EmotionAnimation;
