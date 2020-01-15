function FormatTechs(techsArray) {
  const ArrayFormatted = techsArray.split(',').map(tech => tech.trim())

  return ArrayFormatted;
}

export default FormatTechs;