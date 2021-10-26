export const calcLabels = data => {
  return data.map(point => point.x);
};
export const calcDatasets = data => {
  /**
   * colors ordered according to order of colors from outcome choice themes
   * {@link 'src/components/ChoiceSelector/ChoiceSelectorTheme.js'}
   */
  const colorSchema = {
    main: {
      0: ['rgba(255, 166, 84, 1)'],
      1: ['rgba(45, 203, 112, 1)'],
      2: ['rgba(248, 83, 251, 1)'],
      3: ['rgba(103, 81, 236, 1)'],
    },
    fill: {
      above: {
        0: 'rgba(255, 166, 84, 0)',
        1: 'rgba(45, 203, 112, 0)',
        2: 'rgba(248, 83, 251, 0)',
        3: 'rgba(103, 81, 236, 0)',
      },
    },
  };

  return data.map((dataset, index) => {
    return {
      fill: {
        target: 'origin',
        above: colorSchema.fill.above[index],
        below: 'rgb(0, 0, 255)',
      },
      label: dataset.outcomeName,
      data: dataset.data,
      backgroundColor: colorSchema.main[index],
      borderColor: colorSchema.main[index],
      borderWidth: 2,
      pointRadius: 0,
    };
  });
};

export const calcDohnutLabels = data => {
  const labels = data.map((item, index) => {
    return item.outcomeName;
  });
  return labels;
};
export const calcDohnutDatasets = data => {
  /**
   * colors ordered according to order of colors from outcome choice themes
   * {@link 'src/components/ChoiceSelector/ChoiceSelectorTheme.js'}
   */
  const colorSchema = {
    main: {
      0: ['rgba(255, 166, 84, 1)'],
      1: ['rgba(45, 203, 112, 1)'],
      2: ['rgba(248, 83, 251, 1)'],
      3: ['rgba(103, 81, 236, 1)'],
    },
    fill: {
      above: {
        0: 'rgba(255, 166, 84, 0)',
        1: 'rgba(45, 203, 112, 0)',
        2: 'rgba(248, 83, 251, 0)',
        3: 'rgba(103, 81, 236, 0)',
      },
    },
  };

  const datas = data.map((item, index) => {
    return Math.floor(item.data[0].y * 100);
  });
  const colors = data.map((item, index) => {
    return colorSchema.main[index];
  });

  return [
    {
      label: '',
      data: datas,
      backgroundColor: colors,
      borderColor: ['#120e27', '#120e27', '#120e27', '#120e27', '#120e27'],
      hoverOffset: 4,
    },
  ];
};
