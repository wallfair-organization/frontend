class SelectionHelper {
  static get(currentValue, mapping, fallback, typeCompare = true) {
    const mappingValues = Object.keys(mapping);

    for (const mappingValue of mappingValues) {
      if (
        typeCompare
          ? mappingValue === currentValue
          : // eslint-disable-next-line eqeqeq
            mappingValue == currentValue
      ) {
        return mapping[currentValue];
      }
    }

    return fallback;
  }
}

export default SelectionHelper;
