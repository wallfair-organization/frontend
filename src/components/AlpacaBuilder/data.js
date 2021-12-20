export const EXPORT_SIZE = 512;

export const CATEGORIES = [{
    name: 'chip',
    path: '/images/alpaca-builder/elements/',
    previewInTiles: true,
    styles: ['Chip1', 'Chip2', 'Chip3', 'Chip4', 'Chip5'],
    colors:[
      ['#29313D','#346553'],['#29313D','#ffffff'],['#29313D','#B43F3F'],
      ['#E6B71A','#ffffff'],['#D78A23','#ffffff'],['#3D0937','#ffffff'],
      ['#29313D','#7067AC'],['#093D2F','#ffffff'],['#29313D','#C96EBF'],
      ['#29313D','#D78A23'],['#29313D','#3F89B4']
    ]
  },{
    name: 'body',
    path: '/images/alpaca-builder/elements/',
    styles: ['Body1'],
    colors:[
      ['#FEFFAD','#FEFFCF'],['#FFFFFF','#F5F5F5'],['#FFCECE','#FFADAD'],
      ['#B5FFC9','#99FFB4'],['#FFADAD','#FF8585'],['#CECBCE','#BAB5BA'],
      ['#346553','#2A5142'],['#29313D','#181D25'],['#B43F3F','#973535'],
      ['#EDCA5A','#E6B71A'],['#E2A350','#D78A23'],['#6A1060','#3D0937'],
      ['#141414','#000000'],['#7067AC','#585091'],['#106A52','#093D2F'],
      ['#C96EBF','#BD4CB0'],['#D78A23','#C17B1F'],['#3F89B4','#357397'],
      ['#E6B71A','#CAA016'],
    ]
  },{
    name: 'hair',
    path: '/images/alpaca-builder/elements/',
    styles: ['Hair2', 'Hair3', 'Hair4', 'Hair6', 'Hair7', 'Hair8', 'Hair9'],
    colors:[
      ['#FEFFAD'],['#FFFFFF'],['#FFCECE'],
      ['#B5FFC9'],['#FFADAD'],['#CECBCE'],
      ['#346553'],['#29313D'],['#B43F3F'],
      ['#EDCA5A'],['#E2A350'],['#6A1060'],
      ['#141414'],['#7067AC'],['#106A52'],
      ['#C96EBF'],['#D78A23'],['#3F89B4'],
      ['#E6B71A'],
    ]
  },{
    name: 'eyes',
    styles: ['Eyes1', 'Eyes3', 'Eyes4', 'Eyes5', 'Eyes6', 'Eyes7', 'Eyes8', 'Eyes9'],
    path: '/images/alpaca-builder/elements/',
  },{
    name: 'mouth',
    styles: ['Mouth1', 'Mouth2', 'Mouth3', 'Mouth4', 'Mouth5', 'Mouth6', 'Mouth7', 'Mouth8'],
    path: '/images/alpaca-builder/elements/',
    useColorFrom: 'body'
  },{
    name: 'glasses',
    styles: ['Glasses1', 'Glasses2', 'Glasses3', 'Glasses4', 'Glasses5', 'Glasses6', 'Glasses7'],
    path: '/images/alpaca-builder/elements/',
    optional: true,
  },{
    name: 'clothes',
    styles: ['Clothes1', 'Clothes2', 'Clothes3', 'Clothes4', 'Clothes5', 'Clothes6'],
    path: '/images/alpaca-builder/elements/',
    optional: true,
  },
];

/**
 * Returns the full url of the image based on the category name and style name
 * @param  {} categoryName
 * @param  {} styleName
 */
export const buildImagePath = (categoryName, styleName) => {
  if(!categoryName || !styleName) return null;
  const basePath = CATEGORIES.find(c => c.name === categoryName)?.path;
  const svgPath = `${basePath}${styleName}.svg`;
  return basePath ? svgPath : null;
}
