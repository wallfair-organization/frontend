class Text {
  static linkifyIntextURLS(text, plainText = false) {
    if (!text) {
      return '';
    }

    let urls = text
      .split(' ')
      .filter(
        (snip) => snip.startsWith('http://') || snip.startsWith('https://')
      );

    const textMembers = [];
    let currentUninterpolated = text;

    const interpolator = plainText
      ? (u) => new URL(u).host
      : (u) => (
          <a href={u} target="_blank" rel="noreferrer">
            {new URL(u).host}
          </a>
        );

    for (let url of urls) {
      const [before, after] = currentUninterpolated.split(url);
      textMembers.push(before);
      textMembers.push(interpolator(url));
      currentUninterpolated = after;
    }

    if (currentUninterpolated && currentUninterpolated.length > 0) {
      textMembers.push(currentUninterpolated);
    }

    if (plainText) {
      return textMembers.join(' ').replace('  ', ' ');
    }

    let template = <></>;

    for (let member of textMembers) {
      template = (
        <>
          {template}
          {member}
        </>
      );
    }

    return template;
  }
  /**
   * @param {string} text
   */
  static toClipboard(text) {
    return navigator.clipboard.writeText(text);
  }
  /**
   * @param {string} number
   */
  static formatByONEConstant(number, decimalPlaces = 3) {
    const l = number.length;
    const ONE_length = 18;
    const decimal = number.substring(l - ONE_length, l - ONE_length + decimalPlaces);
    const whole = number.substring(0, l - ONE_length).padStart(1, '0');
    
    if(decimalPlaces === 0) {
      return whole;
    }

    return `${whole}.${decimal}`;

  }
}

export default Text;
