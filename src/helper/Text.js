class Text {
  static linkifyIntextURLS(text, plainText = false) {
    const urls = text
      .split(' ')
      .filter(
        snip => snip.startsWith('http://') || snip.startsWith('https://')
      );

    const textMembers = [];
    let currentUninterpolated = text;

    const interpolator = plainText
      ? u => new URL(u).host
      : u => (
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

    if (currentUninterpolated.length > 0) {
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
}

export default Text;
