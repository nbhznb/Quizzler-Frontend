import DOMPurify from 'dompurify';

export const sanitize = {
  text: (dirty) => {
    return DOMPurify.sanitize(dirty, { ALLOWED_TAGS: [] });
  },
  html: (dirty) => {
    return DOMPurify.sanitize(dirty, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],
      ALLOWED_ATTR: ['href']
    });
  }
};