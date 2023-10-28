// Pro češtinu
export const generateCzechName = (() => {
  const prefixes = [
    "Jedničková",
    "Dvojková",
    "Trojková",
    "Čtyřková",
    "Pětková",
    "Šestková",
    "Sedmičková",
    "Osmičková",
    "Devítková",
    "Desítková",
    "Jedenáctková",
    "Dvanáctková",
    "Třináctková",
    "Čtrnáctková",
    "Patnáctková",
    "Šestnáctková",
  ];
  return (base: number): string => {
    if (base <= 16) {
      return `${prefixes[base - 1]} soustava`;
    }
    return `${base}-ková soustava`;
  };
})();

// Pro angličtinu
export const generateEnglishName = (() => {
  const names = [
    "Unary",
    "Binary",
    "Ternary",
    "Quaternary",
    "Quinary",
    "Senary",
    "Septenary",
    "Octal",
    "Nonary",
    "Decimal",
    "Undecimal",
    "Duodecimal",
    "Tridecimal",
    "Tetradecimal",
    "Pentadecimal",
    "Hexadecimal",
  ];
  return (base: number): string => {
    if (base <= 16) {
      return names[base - 1];
    }
    return `${base}-base`;
  };
})();
