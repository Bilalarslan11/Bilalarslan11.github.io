export function upgradeImageUrl(url: string, targetW = 1920) {
  if (!url) return url;

  // Handle protocol-relative URLs
  let u = url.startsWith('//') ? 'https:' + url : url;

  // IGDB size token swap
  if (u.includes('images.igdb.com/igdb/image/upload/')) {
    return u.replace('/t_thumb/', '/t_cover_big/');
  }

  // IGN CDN query params: add or bump width/quality/dpr
  try {
    const obj = new URL(u);
    obj.searchParams.set('width', String(targetW));
    obj.searchParams.set('quality', '90');
    obj.searchParams.set('dpr', '2');
    return obj.toString();
  } catch {
    // Fallback: append query string if parsing failed
    const join = u.includes('?') ? '&' : '?';
    return `${u}${join}width=${targetW}&quality=90&dpr=2`;
  }
}

