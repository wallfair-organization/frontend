import {ReactComponent as Chip1} from './svgs/Chip1.svg';
import {ReactComponent as Chip2} from './svgs/Chip2.svg';
import {ReactComponent as Chip3} from './svgs/Chip3.svg';
import {ReactComponent as Chip4} from './svgs/Chip4.svg';
import {ReactComponent as Chip5} from './svgs/Chip5.svg';

import {ReactComponent as Body1} from './svgs/Body1.svg';

import {ReactComponent as Mouth1} from './svgs/Mouth1.svg';
import {ReactComponent as Mouth2} from './svgs/Mouth2.svg';
import {ReactComponent as Mouth3} from './svgs/Mouth3.svg';
import {ReactComponent as Mouth4} from './svgs/Mouth4.svg';
import {ReactComponent as Mouth5} from './svgs/Mouth5.svg';
import {ReactComponent as Mouth6} from './svgs/Mouth6.svg';
import {ReactComponent as Mouth7} from './svgs/Mouth7.svg';
import {ReactComponent as Mouth8} from './svgs/Mouth8.svg';

import {ReactComponent as Hair1} from './svgs/Hair1.svg' ;
import {ReactComponent as Hair2} from './svgs/Hair2.svg' ;
import {ReactComponent as Hair3} from './svgs/Hair3.svg' ;
import {ReactComponent as Hair4} from './svgs/Hair4.svg' ;
import {ReactComponent as Hair5} from './svgs/Hair5.svg' ;
import {ReactComponent as Hair6} from './svgs/Hair6.svg' ;
import {ReactComponent as Hair7} from './svgs/Hair7.svg' ;
import {ReactComponent as Hair8} from './svgs/Hair8.svg' ;
import {ReactComponent as Hair9} from './svgs/Hair9.svg' ;

import {ReactComponent as Eyes1} from './svgs/Eyes1.svg' ;
import {ReactComponent as Eyes2} from './svgs/Eyes2.svg' ;
import {ReactComponent as Eyes3} from './svgs/Eyes3.svg' ;
import {ReactComponent as Eyes4} from './svgs/Eyes4.svg' ;
import {ReactComponent as Eyes5} from './svgs/Eyes5.svg' ;
import {ReactComponent as Eyes6} from './svgs/Eyes6.svg' ;
import {ReactComponent as Eyes7} from './svgs/Eyes7.svg' ;
import {ReactComponent as Eyes8} from './svgs/Eyes8.svg' ;
import {ReactComponent as Eyes9} from './svgs/Eyes9.svg' ;
import {ReactComponent as Eyes10} from './svgs/Eyes10.svg' ;

import {ReactComponent as Glasses1} from './svgs/Glasses1.svg' ;
import {ReactComponent as Glasses2} from './svgs/Glasses2.svg' ;
import {ReactComponent as Glasses3} from './svgs/Glasses3.svg' ;
import {ReactComponent as Glasses4} from './svgs/Glasses4.svg' ;
import {ReactComponent as Glasses5} from './svgs/Glasses5.svg' ;
import {ReactComponent as Glasses6} from './svgs/Glasses6.svg' ;
import {ReactComponent as Glasses7} from './svgs/Glasses7.svg' ;

import {ReactComponent as Clothes1} from './svgs/Clothes1.svg' ;
import {ReactComponent as Clothes2} from './svgs/Clothes2.svg' ;
import {ReactComponent as Clothes3} from './svgs/Clothes3.svg' ;
import {ReactComponent as Clothes4} from './svgs/Clothes4.svg' ;
import {ReactComponent as Clothes5} from './svgs/Clothes5.svg' ;
import {ReactComponent as Clothes6} from './svgs/Clothes6.svg' ;

const allComponents = {
  Chip1, Chip2, Chip3, Chip4, Chip5,
  Body1,
  Mouth1,Mouth2,Mouth3,Mouth4,Mouth5,Mouth6,Mouth7,Mouth8,
  Hair1,Hair2,Hair3,Hair4,Hair5,Hair6,Hair7,Hair8,Hair9,
  Eyes1,Eyes2,Eyes3,Eyes4,Eyes5,Eyes6,Eyes7,Eyes8,Eyes9,Eyes10,
  Glasses1,Glasses2,Glasses3,Glasses4,Glasses5,Glasses6,Glasses7,
  Clothes1,Clothes2,Clothes3,Clothes4,Clothes5,Clothes6,
 };

const DynamicSvg = ({ id, current, ...rest }) => {
    if(!current) return null;
    const { style, colors } = current
    const Component = allComponents[style];
    if(!Component) {
      console.error(`The style ${style} doesn't have an svg defined in the AlpacaBuilder>svgs react svg components.`)
      return null;
    }
    if(!style) return null;
    let stringBuilder = ['','',''];
    // override the fill color with css selector #id #abColor_1_1 ... #id #abColor_1_10
    if(colors){
      const times = 10;
      for(let i=0; i<=times; i++){
        const des = i === 0 ? '':`_${i}`;
        stringBuilder[0]+= `#${id} #abColor_1${des}`;
        stringBuilder[1]+= `#${id} #abColor_2${des}`;
        stringBuilder[2]+= `#${id} #abColor_3${des}`;
        const continuation1 = i === times ?  `{fill:${colors[0]}}`: ', ';
        const continuation2 = i === times ?  `{fill:${colors[1] || colors[0]}}`: ', ';
        const continuation3 = i === times ?  `{fill:${colors[0]}}`: ', ';
        stringBuilder[0]+= continuation1;
        stringBuilder[1]+= continuation2;
        stringBuilder[2]+= continuation3;
      }
    }
    return (
      <svg id={id} key={id} {...rest}>
        <style>
          {stringBuilder.join(' ')}
        </style>
        <Component {...rest}/>
      </svg>
    );
};

export default DynamicSvg;
