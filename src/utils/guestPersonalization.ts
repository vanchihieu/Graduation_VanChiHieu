export interface GuestGreeting {
  rawName: string | null;
  displayName: string;
  selfPronoun: string;
  guestPronoun: string;
  formalLine: string;
}

export function getGuestFromUrl(): GuestGreeting {
  if (typeof window === 'undefined') {
    return {
      rawName: null,
      displayName: 'Bạn quý của Hiếu',
      selfPronoun: 'mình',
      guestPronoun: 'bạn',
      formalLine: 'Thân mời bạn đến chung vui cùng Chí Hiếu',
    };
  }

  const params = new URLSearchParams(window.location.search);
  const raw =
    params.get('name') ||
    params.get('to') ||
    params.get('khach') ||
    params.get('guest') ||
    '';

  const cleaned = raw.trim().slice(0, 60);
  const customMode = params.get('p') || '';

  if (!cleaned) {
    return {
      rawName: null,
      displayName: 'Bạn quý của Hiếu',
      selfPronoun: 'mình',
      guestPronoun: 'bạn',
      formalLine: 'Thân mời bạn đến dự Lễ Tốt Nghiệp của Chí Hiếu',
    };
  }

  const lower = cleaned.toLowerCase();

  if (customMode === 'em' || lower.startsWith('anh ') || lower.startsWith('chị ')) {
    const title = lower.startsWith('anh ') ? 'anh' : lower.startsWith('chị ') ? 'chị' : 'anh/chị';
    return {
      rawName: cleaned,
      displayName: cleaned,
      selfPronoun: 'em Hiếu',
      guestPronoun: title,
      formalLine: `Trân trọng kính mời ${cleaned} đến chung vui cùng em Hiếu`,
    };
  }

  if (customMode === 'thayco' || lower.startsWith('thầy ') || lower.startsWith('cô ')) {
    const title = lower.startsWith('thầy ') ? 'Thầy' : lower.startsWith('cô ') ? 'Cô' : 'Thầy/Cô';
    return {
      rawName: cleaned,
      displayName: cleaned,
      selfPronoun: 'em',
      guestPronoun: title,
      formalLine: `Kính mời ${cleaned} đến dự Lễ Tốt Nghiệp của em Văn Chí Hiếu`,
    };
  }

  if (customMode === 'anh' || lower.startsWith('em ')) {
    return {
      rawName: cleaned,
      displayName: cleaned,
      selfPronoun: 'anh Hiếu',
      guestPronoun: 'em',
      formalLine: `Thân mời ${cleaned} đến chung vui Lễ Tốt Nghiệp cùng anh Hiếu`,
    };
  }

  return {
    rawName: cleaned,
    displayName: cleaned,
    selfPronoun: 'mình',
    guestPronoun: 'bạn',
    formalLine: `Thân mời ${cleaned} đến chung vui Lễ Tốt Nghiệp cùng Chí Hiếu`,
  };
}

