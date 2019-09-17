const paginator = (items, itemCount) => {
  const sections = [];
  let section = [];
  let count = 0;

  items.forEach(element => {
    section.push(element);
    count++;
    if (section.length === itemCount || count === items.length) {
      sections.push(section);
      section = [];
    }
  });
  return sections;
};

export default paginator;
