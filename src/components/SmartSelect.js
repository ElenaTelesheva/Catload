const SmartSelect = ({ instance }) => {
  const selectContainer = document.createElement('div');
  selectContainer.className = 'smart-select';

  const selectBox = document.createElement('div');
  selectBox.className = 'smart-select__select-box';

  const selected = document.createElement('div');
  selected.innerText = 'Select cat source';
  selected.className = 'smart-select__selected';

  const optionsContainer = document.createElement('div');
  optionsContainer.className = 'smart-select__options-container';
  // optionsContainer.classList.add('smart-select__options-container', 'active');

  const renderOptions = () => {
    optionsContainer.innerHTML = '';
    instance.sources.forEach((element) => {
      const option = document.createElement('div');
      option.className = 'smart-select__option';
      const input = document.createElement('input');
      input.type = 'radio';
      input.className = 'radio';
      // input.id = 'cats';
      input.name = 'category';

      const label = document.createElement('label');
      label.innerText = element;

      option.append(input, label);

      option.addEventListener('click', () => {
        selected.innerHTML = element;
        optionsContainer.classList.remove('active');
      });

      optionsContainer.appendChild(option);
    });
  };
  renderOptions();
  const searchBox = document.createElement('div');
  searchBox.className = 'smart-select__search-box';
  const input = document.createElement('input');
  input.className = 'smart-select__input';
  input.type = 'text';
  input.placeholder = 'Start Typing...';

  const filterOptions = (filterParam) => {
    const optionsList = optionsContainer.querySelectorAll('.smart-select__option');
    const lowFilterParam = filterParam.toLowerCase();
    optionsList.forEach((item) => {
      const option = item;
      const label = item.querySelector('label').innerHTML.toLowerCase();

      if (label.indexOf(lowFilterParam) !== -1) {
        option.style.display = 'block';
      } else {
        option.style.display = 'none';
      }
    });
  };

  const clearFilter = () => {
    input.value = '';
    filterOptions('');
  };
  const closeSmartSelect = () => {
    clearFilter();
    optionsContainer.classList.remove('active');
  };

  selected.addEventListener('click', () => {
    optionsContainer.classList.toggle('active');

    clearFilter();

    if (optionsContainer.classList.contains('active')) {
      input.focus();
    }
  });

  searchBox.addEventListener('keyup', (e) => {
    filterOptions(e.target.value);
  });

  searchBox.append(input);

  selectBox.append(optionsContainer, selected, searchBox);
  selectContainer.append(selectBox);

  // const selectBox = document.createElement('div');

  return [selectContainer, selected, closeSmartSelect];
};

export default SmartSelect;
