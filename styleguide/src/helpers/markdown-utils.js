export const headingNodeToSlug = mdNode => {
  const headingText = mdNode.children.join('');
  return headingTextToSlug(headingText);
};

export const headingTextToSlug = text => {
  return `${text}`.toLowerCase()
    .replace(/[^ a-zA-Z_0-9-]/g, '')
    .split(/[ ]+/)
    .join('-');
};