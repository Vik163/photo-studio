export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp(
      `(?:^|; )${name.replace(
        // eslint-disable-next-line no-useless-escape
        /([\.$?*|{}\(\)\[\]\\\/\+^])/g,
        "\\$1"
      )}=([^;]*)`
    )
  );

  return matches ? decodeURIComponent(matches[1]) : undefined;
}
