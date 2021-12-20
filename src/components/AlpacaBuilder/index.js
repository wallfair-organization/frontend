import { useEffect, useState, memo, useRef } from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';
import AbViewStyles from './abViewStyles';
import {CATEGORIES, EXPORT_SIZE} from './data';
import DynamicSvg from './dynamicSvg';
import Button from 'components/Button';

const AlpacaBuilder = ({
  onExport,
  onCancel,
  downloadFileOnSave = false,
  props,
  layout,
  cancelLabel = 'Cancel',
  saveLabel = 'Save',
}) => {

  const [svgProperties, setSvgProperties] = useState({...props});
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const svgRef = useRef();
  const svgDownloader = useRef();

  useEffect(() => {
    if(!props || !props.chip) resetSvg(true);
    else setSvgProperties({...props});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  const resetSvg = (randomize) => {
    let p = {};
    for(let c of CATEGORIES){
      let style = randomize ? c.styles[Math.floor(Math.random() * c.styles.length)] : null;
      const colors = c.colors && (randomize ? c.colors[Math.floor(Math.random() * c.colors.length)] : null);
      if(c.optional){
        style = Math.random() < 0.5 ? style : null;
      }
      p[c.name] = {style, colors};
    }
    setSvgProperties(p);
  }

  const applyStyle = (categoryName, style) => {
    let p = {...svgProperties};
    p[categoryName] = style;
    setSvgProperties(p);
  }

  const renderSvg = () =>
    svgProperties && Object.keys(svgProperties)
    .map((catName, index) => {
      const current = {...svgProperties[catName]};
      if(!current.style) return null;
      const aliasColor = CATEGORIES.find(c => c.name === catName)?.useColorFrom;
      if(aliasColor){
        current.colors = [...svgProperties[aliasColor].colors];
      }
      const id = `svg_abuilder_${catName}_${index}`;
      return (<DynamicSvg key={id} id={id} current={current}/>);
    });

  const exportSvg = () => {

    try{
      var svg = svgRef.current;
      var canvas = svgDownloader.current;
      var fileName = `my_alpaca_${Math.floor(1000 + Math.random() * 9000)}.png`;
      canvas.width =EXPORT_SIZE;
      canvas.height=EXPORT_SIZE;
      var ctx = canvas.getContext('2d');
      var data = (new XMLSerializer()).serializeToString(svg);
      var DOMURL = window.URL || window.webkitURL || window;
      var img = new Image();
      //  var svgBlob = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
      //var url = DOMURL.createObjectURL(svgBlob);
      var url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent( data );

      img.onload = function () {
        ctx.drawImage(img, 0, 0, EXPORT_SIZE, EXPORT_SIZE);
        canvas.toBlob(blob => {
          blob.name = fileName;
          if(onExport){
            onExport({blob: blob, props: svgProperties});
          }
        });

        if(downloadFileOnSave){
          var imgURI = canvas
              .toDataURL('image/png')
              .replace('image/png', 'image/octet-stream');

          DOMURL.revokeObjectURL(url);
          var evt = new MouseEvent('click', {
            view: window,
            bubbles: false,
            cancelable: true
          });
          var a = document.createElement('a');
          a.setAttribute('download', fileName);
          a.setAttribute('href', imgURI);
          a.setAttribute('target', '_blank');
          a.dispatchEvent(evt);
        }
      };
      img.onerror = function(err) {console.log(err)};
      img.src = url;
    }catch(err){
      console.log(err);
    }
  };

  const renderCategoryBtn = (cat, index) => {
    const isSelected = selectedCategory && selectedCategory.name === cat.name;
    return (
      <span
        key={`abcat_${index}`}
        className={classNames(styles.category, isSelected ? styles.categorySelected : null)}
        onClick={()=> {setSelectedCategory(cat)}}>{cat.name}</span>
    );
  }

  return (
    <>
    <div
      className={classNames(
        styles.alpacaBuilder, layout === 'wide' ? styles.wide : null
      )}>
      <div className={styles.head}>
        <svg ref={svgRef} className={styles.svg} viewBox="0 0 512 512">
          <rect width="100%" height="100%" fill="transparent" />
          {renderSvg()}
        </svg>
        <span
          className={styles.secondaryAction}
          onClick={() => resetSvg(true)}>Randomize</span>

      </div>
      <div className={styles.categoriesRow}>
        {CATEGORIES?.map((c, index) => renderCategoryBtn(c, index))}
      </div>
      <AbViewStyles
        category={selectedCategory}
        showCategories={false}
        onStyleClick={applyStyle}
        current={svgProperties}
        ></AbViewStyles>

      <div className={styles.toolbar}>
          <span
            className={styles.secondaryAction}
            onClick={() => {if(onCancel) onCancel();}}>{cancelLabel}</span>
          <button
            className={styles.primaryAction}
            onClick={() => exportSvg()}>{saveLabel}</button>
        </div>
    </div>
    <canvas ref={svgDownloader} style={{visibility:"hidden", height:0}}></canvas>
    </>
  );
};

export default memo(AlpacaBuilder);
