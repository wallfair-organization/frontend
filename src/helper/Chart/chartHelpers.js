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

const dataErrorCuts = input => {
  const rounded = input.map(x => Math.floor(x));
  const afterRoundSum = rounded.reduce((pre, curr) => pre + curr, 0);
  const countMutableItems = rounded.filter(x => x >= 1).length;
  const errRate = 100 - afterRoundSum;
  const deduct = Math.ceil(errRate / countMutableItems);

  const biggest = [...rounded]
    .sort((a, b) => b - a)
    .slice(0, Math.min(Math.abs(errRate), countMutableItems));
  const result = rounded.map(x => {
    const indexOfX = biggest.indexOf(x);
    if (indexOfX >= 0) {
      x += deduct;
      biggest.splice(indexOfX, 1);
      return x;
    }
    return x;
  });
  return result;
};

export const calcDohnutDatasets = data => {
  /**
   * colors ordered according to order of colors from outcome choice themes
   * {@link 'src/components/ChoiceSelector/ChoiceSelectorTheme.js'}
   */
  const colorSchema = {
    main: {
      0: ['rgba(157, 255, 197, 1)'],
      1: ['rgba(172, 196, 255, 1)'],
      2: ['rgba(253, 142, 255, 1)'],
      3: ['rgba(255, 166, 84, 1)'],
    },
    fill: {
      above: {
        0: ['rgba(157, 255, 197, 0.2)'],
        1: ['rgba(172, 196, 255, 0.2)'],
        2: ['rgba(253, 142, 255, 0.2)'],
        3: ['rgba(255, 166, 84, 0.2)'],
      },
    },
  };

  const datas = data.map((item, index) => {
    return +item.data[item.data.length - 1].y * 100;
  });

  const colors = data.map((item, index) => {
    return colorSchema.main[index];
  });

  return [
    {
      label: '',
      data: dataErrorCuts(datas),
      backgroundColor: colors,
      borderColor: [
        'rgba(255,255,255, 0.2)',
        'rgba(255,255,255, 0.2)',
        'rgba(255,255,255, 0.2)',
        'rgba(255,255,255, 0.2)',
        'rgba(255,255,255, 0.2)',
      ],
      hoverOffset: 4,
    },
  ];
};
