const STORAGE_KEY = 'pro_business_card_studio_v3_clean';

const CONTACT_CATALOG = [
  { label: '전화 (Phone)', value: 'fa-solid fa-phone' },
  { label: '이메일 (Mail)', value: 'fa-solid fa-envelope' },
  { label: '웹사이트 (Web)', value: 'fa-solid fa-globe' },
  { label: '인스타그램', value: 'fa-brands fa-instagram' },
  { label: '사운드클라우드', value: 'fa-brands fa-soundcloud' },
  { label: '유튜브', value: 'fa-brands fa-youtube' },
  { label: '스포티파이', value: 'fa-brands fa-spotify' },
  { label: '카카오톡/메신저', value: 'fa-solid fa-comment' },
  { label: '스튜디오 위치', value: 'fa-solid fa-location-dot' }
];

const SOCIAL_CATALOG = [
  { label: 'Facebook (f)', value: 'fa-brands fa-facebook-f' },
  { label: 'Instagram', value: 'fa-brands fa-instagram' },
  { label: 'Twitter (Bird)', value: 'fa-brands fa-twitter' },
  { label: 'X (Twitter)', value: 'fa-brands fa-x-twitter' },
  { label: 'YouTube', value: 'fa-brands fa-youtube' },
  { label: 'SoundCloud', value: 'fa-brands fa-soundcloud' },
  { label: 'Spotify', value: 'fa-brands fa-spotify' },
  { label: 'Apple Music', value: 'fa-brands fa-itunes-note' },
  { label: 'TikTok', value: 'fa-brands fa-tiktok' }
];

let contacts = [
  { icon: 'fa-solid fa-phone', text: '+82 10-1234-5678' },
  { icon: 'fa-solid fa-envelope', text: 'contact@aidenkim.studio' },
  { icon: 'fa-solid fa-globe', text: 'www.aidenkim-music.com' }
];

let socials = [
  'fa-brands fa-facebook-f',
  'fa-brands fa-instagram',
  'fa-brands fa-twitter'
];

// 1. 인쇄 설정 (도련 & 재단선 가이드)
function updatePrintSettings() {
  const bleedVal = parseFloat(document.getElementById('selBleed').value);
  const guidesMode = document.getElementById('selGuides').value;
  document.documentElement.style.setProperty('--bleed-px', bleedVal + 'px');

  const wrap = document.getElementById('stageWrap');
  if (guidesMode === 'show') {
    wrap.classList.add('show-guides');
  } else {
    wrap.classList.remove('show-guides');
  }
  saveStateToLocal();
}

// 2. 뷰 전환
function switchView(mode) {
  const wrap = document.getElementById('stageWrap');
  const front = document.getElementById('card-front-wrap');
  const back = document.getElementById('card-back-wrap');

  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  if (mode === 'flat-back') {
    document.getElementById('tabFlatBack').classList.add('active');
    wrap.classList.remove('mockup-3d');
    front.style.display = 'none';
    back.style.display = 'block';
  } else if (mode === 'mockup-3d') {
    document.getElementById('tabMockup3D').classList.add('active');
    wrap.classList.add('mockup-3d');
    front.style.display = 'block';
    back.style.display = 'block';
  } else if (mode === 'flat-both') {
    document.getElementById('tabFlatBoth').classList.add('active');
    wrap.classList.remove('mockup-3d');
    front.style.display = 'block';
    back.style.display = 'block';
  }
}

// 3. 색상 및 레이아웃 슬라이더 동기화
function setColors(bg, main, sub, acc) {
  document.getElementById('cBg').value = bg;
  document.getElementById('cMain').value = main;
  document.getElementById('cSub').value = sub;
  document.getElementById('cAcc').value = acc;
  onColorInput();
}

function onColorInput() {
  const bg = document.getElementById('cBg').value;
  const main = document.getElementById('cMain').value;
  const sub = document.getElementById('cSub').value;
  const acc = document.getElementById('cAcc').value;

  document.getElementById('hBg').textContent = bg.toUpperCase();
  document.getElementById('hMain').textContent = main.toUpperCase();
  document.getElementById('hSub').textContent = sub.toUpperCase();
  document.getElementById('hAcc').textContent = acc.toUpperCase();

  const r = document.documentElement;
  r.style.setProperty('--card-bg', bg);
  r.style.setProperty('--text-main', main);
  r.style.setProperty('--text-sub', sub);
  r.style.setProperty('--accent', acc);

  renderCustomQR();
  saveStateToLocal();
}

function updateLayoutVars() {
  const padY = document.getElementById('rPadY').value;
  const padX = document.getElementById('rPadX').value;
  const leftRatio = document.getElementById('rLeftRatio').value;
  const divGap = document.getElementById('rDivGap').value;
  const divW = document.getElementById('rDivW').value;
  const divH = document.getElementById('rDivH').value;
  const nameSz = document.getElementById('rNameSz').value;
  const nameTrk = document.getElementById('rNameTrk').value;
  const conGap = document.getElementById('rConGap').value;
  const qrSz = document.getElementById('rQrSz').value;
  const font = document.getElementById('selFont').value;

  document.getElementById('vPadY').textContent = padY + 'px';
  document.getElementById('vPadX').textContent = padX + 'px';
  document.getElementById('vLeftRatio').textContent = leftRatio + '%';
  document.getElementById('vDivGap').textContent = divGap + 'px';
  document.getElementById('vDivW').textContent = divW + 'px';
  document.getElementById('vDivH').textContent = divH + '%';
  document.getElementById('vNameSz').textContent = nameSz + 'px';
  document.getElementById('vNameTrk').textContent = nameTrk + 'px';
  document.getElementById('vConGap').textContent = conGap + 'px';
  document.getElementById('vQrSz').textContent = qrSz + 'px';

  const r = document.documentElement;
  r.style.setProperty('--pad-y', padY + 'px');
  r.style.setProperty('--pad-x', padX + 'px');
  r.style.setProperty('--left-ratio', leftRatio + '%');
  r.style.setProperty('--divider-gap', divGap + 'px');
  r.style.setProperty('--divider-width', divW + 'px');
  r.style.setProperty('--divider-height', divH + '%');
  r.style.setProperty('--name-size', nameSz + 'px');
  r.style.setProperty('--name-tracking', nameTrk + 'px');
  r.style.setProperty('--contact-gap', conGap + 'px');
  r.style.setProperty('--qr-size', qrSz + 'px');
  r.style.setProperty('--font-family', font);

  saveStateToLocal();
}

// 4. 드래그 앤 드롭 컨트롤 리스트
function renderContactSortable() {
  const box = document.getElementById('contactSortableList');
  box.innerHTML = '';
  contacts.forEach((item, idx) => {
    const row = document.createElement('div');
    row.className = 'sortable-item';
    row.dataset.index = idx;

    const handle = document.createElement('span');
    handle.className = 'drag-handle';
    handle.innerHTML = '<i class="fa-solid fa-grip-vertical"></i>';

    const sel = document.createElement('select');
    sel.className = 'inp';
    sel.style.width = '122px';
    sel.style.flexShrink = '0';
    CONTACT_CATALOG.forEach(opt => {
      const o = document.createElement('option');
      o.value = opt.value;
      o.textContent = opt.label;
      if (opt.value === item.icon) o.selected = true;
      sel.appendChild(o);
    });
    sel.onchange = e => {
      contacts[idx].icon = e.target.value;
      renderCardContent();
    };

    const inp = document.createElement('input');
    inp.type = 'text';
    inp.className = 'inp';
    inp.value = item.text;
    inp.oninput = e => {
      contacts[idx].text = e.target.value;
      renderCardContent();
    };

    const del = document.createElement('button');
    del.className = 'btn-del';
    del.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    del.onclick = () => {
      contacts.splice(idx, 1);
      renderContactSortable();
      renderCardContent();
    };

    row.appendChild(handle);
    row.appendChild(sel);
    row.appendChild(inp);
    row.appendChild(del);
    box.appendChild(row);
  });
}

function addContactItem() {
  contacts.push({ icon: 'fa-brands fa-instagram', text: '@aidenkim_official' });
  renderContactSortable();
  renderCardContent();
}

function renderSocialSortable() {
  const box = document.getElementById('socialSortableList');
  box.innerHTML = '';
  socials.forEach((val, idx) => {
    const row = document.createElement('div');
    row.className = 'sortable-item';
    row.dataset.index = idx;

    const handle = document.createElement('span');
    handle.className = 'drag-handle';
    handle.innerHTML = '<i class="fa-solid fa-grip-vertical"></i>';

    const sel = document.createElement('select');
    sel.className = 'inp';
    SOCIAL_CATALOG.forEach(opt => {
      const o = document.createElement('option');
      o.value = opt.value;
      o.textContent = opt.label;
      if (opt.value === val) o.selected = true;
      sel.appendChild(o);
    });
    sel.onchange = e => {
      socials[idx] = e.target.value;
      renderCardContent();
    };

    const del = document.createElement('button');
    del.className = 'btn-del';
    del.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    del.onclick = () => {
      socials.splice(idx, 1);
      renderSocialSortable();
      renderCardContent();
    };

    row.appendChild(handle);
    row.appendChild(sel);
    row.appendChild(del);
    box.appendChild(row);
  });
}

function addSocialItem() {
  socials.push('fa-brands fa-soundcloud');
  renderSocialSortable();
  renderCardContent();
}

function initSortables() {
  new Sortable(document.getElementById('contactSortableList'), {
    handle: '.drag-handle',
    animation: 150,
    ghostClass: 'sortable-ghost',
    onEnd: (evt) => {
      const moved = contacts.splice(evt.oldIndex, 1)[0];
      contacts.splice(evt.newIndex, 0, moved);
      renderContactSortable();
      renderCardContent();
    }
  });

  new Sortable(document.getElementById('socialSortableList'), {
    handle: '.drag-handle',
    animation: 150,
    ghostClass: 'sortable-ghost',
    onEnd: (evt) => {
      const moved = socials.splice(evt.oldIndex, 1)[0];
      socials.splice(evt.newIndex, 0, moved);
      renderSocialSortable();
      renderCardContent();
    }
  });
}

// 5. 커스텀 아트 QR코드 엔진
function isFinderPattern(r, c, count) {
  if (r < 7 && c < 7) return true;
  if (r < 7 && c >= count - 7) return true;
  if (r >= count - 7 && c < 7) return true;
  return false;
}

function renderCustomQRSvgString() {
  const url = document.getElementById('inQrUrl').value.trim() || 'https://example.com';
  const acc = document.getElementById('cAcc').value;
  const bg = document.getElementById('cBg').value;
  const modStyle = document.getElementById('selQrModule').value;
  const eyeStyle = document.getElementById('selQrEye').value;
  const logoType = document.getElementById('selQrLogo').value;

  const qr = qrcode(0, 'H');
  qr.addData(url);
  qr.make();
  const count = qr.getModuleCount();

  const centerStart = Math.floor(count * 0.36);
  const centerEnd = Math.ceil(count * 0.64);

  let svg = `<svg viewBox="0 0 ${count} ${count}" xmlns="http://www.w3.org/2000/svg">`;

  for (let r = 0; r < count; r++) {
    for (let c = 0; c < count; c++) {
      if (isFinderPattern(r, c, count)) continue;
      if (logoType !== 'none' && r >= centerStart && r < centerEnd && c >= centerStart && c < centerEnd) continue;

      if (qr.isDark(r, c)) {
        if (modStyle === 'dots') {
          svg += `<circle cx="${c + 0.5}" cy="${r + 0.5}" r="0.43" fill="${acc}"/>`;
        } else if (modStyle === 'rounded') {
          svg += `<rect x="${c + 0.06}" y="${r + 0.06}" width="0.88" height="0.88" rx="0.28" fill="${acc}"/>`;
        } else {
          svg += `<rect x="${c}" y="${r}" width="1.02" height="1.02" fill="${acc}"/>`;
        }
      }
    }
  }

  const eyeCoords = [
    { x: 0, y: 0 },
    { x: count - 7, y: 0 },
    { x: 0, y: count - 7 }
  ];

  eyeCoords.forEach(pos => {
    if (eyeStyle === 'circle') {
      svg += `<circle cx="${pos.x + 3.5}" cy="${pos.y + 3.5}" r="3" fill="none" stroke="${acc}" stroke-width="1"/>`;
      svg += `<circle cx="${pos.x + 3.5}" cy="${pos.y + 3.5}" r="1.5" fill="${acc}"/>`;
    } else if (eyeStyle === 'rounded') {
      svg += `<rect x="${pos.x + 0.5}" y="${pos.y + 0.5}" width="6" height="6" rx="1.6" fill="none" stroke="${acc}" stroke-width="1"/>`;
      svg += `<rect x="${pos.x + 2}" y="${pos.y + 2}" width="3" height="3" rx="0.8" fill="${acc}"/>`;
    } else {
      svg += `<rect x="${pos.x + 0.5}" y="${pos.y + 0.5}" width="6" height="6" fill="none" stroke="${acc}" stroke-width="1"/>`;
      svg += `<rect x="${pos.x + 2}" y="${pos.y + 2}" width="3" height="3" fill="${acc}"/>`;
    }
  });

  if (logoType !== 'none') {
    const mid = count / 2;
    const boxSize = (centerEnd - centerStart);
    svg += `<rect x="${centerStart + 0.2}" y="${centerStart + 0.2}" width="${boxSize - 0.4}" height="${boxSize - 0.4}" rx="1.8" fill="${bg}" stroke="${acc}" stroke-width="0.65"/>`;

    let symbol = '♫';
    if (logoType === 'play') symbol = '▶';
    else if (logoType === 'star') symbol = '★';
    else if (logoType === 'initial') {
      const st = document.getElementById('inStage').value.trim();
      symbol = st ? st.charAt(0).toUpperCase() : 'A';
    }

    svg += `<text x="${mid}" y="${mid + (boxSize * 0.22)}" text-anchor="middle" fill="${acc}" font-size="${boxSize * 0.58}" font-weight="700" font-family="sans-serif">${symbol}</text>`;
  }

  svg += `</svg>`;
  return svg;
}

function renderCustomQR() {
  const box = document.getElementById('outQrBox');
  try {
    box.innerHTML = renderCustomQRSvgString();
  } catch (e) {
    box.innerHTML = '';
  }
  saveStateToLocal();
}

// 6. 명함 콘텐츠 렌더링 (3중 이름 지원)
function renderCardContent() {
  const stageEn = document.getElementById('inStage')?.value.trim() || '';
  const stageKr = document.getElementById('inStageKr')?.value.trim() || '';
  const real = document.getElementById('inReal')?.value.trim() || '';
  const nameStyle = document.getElementById('selNameStyle')?.value || 'two-line';
  const frontRole = document.getElementById('inFrontRole')?.value || '';
  const microLabel = document.getElementById('inMicroLabel')?.value.trim() || '';
  const serviceMode = document.getElementById('selServiceMode')?.value || 'text';
  const servicesRaw = document.getElementById('inServices')?.value || '';
  const cIconStyle = document.getElementById('selContactIconStyle')?.value || 'underlined';
  const socialHandle = document.getElementById('inSocialHandle')?.value || '';
  const socialStyle = document.getElementById('selSocialStyle')?.value || 'solid';

  // 앞면
  document.getElementById('outFrontStage').textContent = stageEn;
  const fReal = document.getElementById('outFrontReal');
  const frontSubParts = [stageKr, real].filter(Boolean).join(' · ');
  fReal.textContent = frontSubParts;
  fReal.style.display = frontSubParts ? 'inline' : 'none';
  document.getElementById('outFrontRole').textContent = frontRole;

  // 뒷면 3중 이름
  const nameGroup = document.getElementById('outBackNameGroup');
  let nameHtml = '';

  if (nameStyle === 'two-line') {
    nameHtml = `<div class="name-line-main">
      <span class="back-stage-en">${stageEn}</span>
      ${stageKr ? `<span class="back-stage-kr">${stageKr}</span>` : ''}
    </div>
    ${real ? `<div class="back-real-name-tag">${real}</div>` : ''}`;
  } else if (nameStyle === 'inline-all') {
    nameHtml = `<div class="name-line-main">
      <span class="back-stage-en">${stageEn}</span>
      ${stageKr ? `<span class="back-stage-kr">${stageKr}</span>` : ''}
      ${real ? `<span class="name-sep-dot">|</span><span class="back-real-name-tag">${real}</span>` : ''}
    </div>`;
  } else if (nameStyle === 'bracket') {
    const subJoined = [stageKr, real].filter(Boolean).join(' / ');
    nameHtml = `<div class="name-line-main">
      <span class="back-stage-en">${stageEn}</span>
      ${subJoined ? `<span class="back-real-name-tag">(${subJoined})</span>` : ''}
    </div>`;
  } else if (nameStyle === 'en-top') {
    const subJoined = [stageKr, real].filter(Boolean).join('  |  ');
    nameHtml = `<div class="name-line-main"><span class="back-stage-en">${stageEn}</span></div>
    ${subJoined ? `<div class="back-real-name-tag">${subJoined}</div>` : ''}`;
  }
  nameGroup.innerHTML = nameHtml;

  // 마이크로 캡션
  const microEl = document.getElementById('outMicroLabel');
  microEl.textContent = microLabel;
  microEl.style.display = microLabel ? 'block' : 'none';

  // 서비스 목록
  const sContainer = document.getElementById('outServicesContainer');
  sContainer.innerHTML = '';
  if (serviceMode === 'text') {
    const d = document.createElement('div');
    d.className = 'back-services-text';
    d.textContent = servicesRaw;
    sContainer.appendChild(d);
  } else {
    const wrap = document.createElement('div');
    wrap.className = 'service-pills';
    servicesRaw.split(/[\n,·/]+/).map(s => s.trim()).filter(Boolean).forEach(tok => {
      const sp = document.createElement('span');
      sp.className = 'service-pill';
      sp.textContent = tok;
      wrap.appendChild(sp);
    });
    sContainer.appendChild(wrap);
  }

  // 연락처
  const cList = document.getElementById('outContactList');
  cList.innerHTML = '';
  contacts.forEach(c => {
    const row = document.createElement('div');
    row.className = 'contact-row';
    let icCls = 'c-icon-box';
    if (cIconStyle === 'underlined' && (c.icon.includes('phone') || c.icon.includes('envelope'))) {
      icCls += ' underlined';
    } else if (cIconStyle === 'boxed') {
      icCls += ' boxed';
    }
    row.innerHTML = `<span class="${icCls}"><i class="${c.icon}"></i></span><span class="c-text">${c.text}</span>`;
    cList.appendChild(row);
  });

  // 소셜 바
  const hEl = document.getElementById('outSocialHandle');
  hEl.textContent = socialHandle;
  hEl.style.display = socialHandle.trim() ? 'inline-flex' : 'none';

  const sBox = document.getElementById('outSocialIcons');
  sBox.innerHTML = '';
  socials.forEach(ic => {
    const b = document.createElement('span');
    b.className = 's-badge' + (socialStyle !== 'solid' ? ' ' + socialStyle : '');
    b.innerHTML = `<i class="${ic}"></i>`;
    sBox.appendChild(b);
  });

  if (document.getElementById('selQrLogo')?.value === 'initial') {
    renderCustomQR();
  }
  saveStateToLocal();
}

// 7. 아이콘 세로 영점 조절 & 그래픽 꾸미기 요소 반영
function updateDecorations() {
  const cOff = document.getElementById('rCIconY')?.value || 0;
  const sOff = document.getElementById('rSIconY')?.value || 0;
  if (document.getElementById('vCIconY')) document.getElementById('vCIconY').textContent = cOff + 'px';
  if (document.getElementById('vSIconY')) document.getElementById('vSIconY').textContent = sOff + 'px';
  document.documentElement.style.setProperty('--c-icon-offset-y', cOff + 'px');
  document.documentElement.style.setProperty('--s-icon-offset-y', sOff + 'px');

  const wm = document.getElementById('selWatermark')?.value || 'none';
  const divStyle = document.getElementById('selDivStyle')?.value || 'solid';
  const frameStyle = document.getElementById('selFrameStyle')?.value || 'none';
  const bgPat = document.getElementById('selBgPattern')?.value || 'none';
  const qrFrame = document.getElementById('selQrFrame')?.value || 'framed';
  const widget = document.getElementById('selMusicWidget')?.value || 'player';
  const stampText = document.getElementById('inTopStamp')?.value.trim() || '';

  const wmEl = document.getElementById('outWatermark');
  if (wmEl) wmEl.innerHTML = wm === 'none' ? '' : `<i class="${wm}"></i>`;

  const divEl = document.getElementById('outDividerLine');
  if (divEl) divEl.className = 'back-divider-line' + (divStyle !== 'solid' ? ' ' + divStyle : '');

  const frameEl = document.getElementById('outDecorFrame');
  if (frameEl) frameEl.className = 'decor-frame' + (frameStyle !== 'none' ? ' ' + frameStyle : '');

  const patEl = document.getElementById('outBgPattern');
  if (patEl) patEl.className = 'decor-bg-pattern' + (bgPat !== 'none' ? ' ' + bgPat : '');

  const qrEl = document.getElementById('outQrBox');
  if (qrEl) qrEl.className = 'qr-box' + (qrFrame === 'framed' ? ' framed' : '');

  const stEl = document.getElementById('outTopStamp');
  if (stEl) {
    stEl.textContent = stampText;
    stEl.className = 'decor-top-stamp' + (stampText ? ' active' : '');
  }

  const wEl = document.getElementById('outMusicWidget');
  if (wEl) {
    if (widget === 'player') {
      wEl.innerHTML = `<div class="mini-player-bar">
        <span>01:28</span>
        <div class="player-track"><div class="player-fill"></div><div class="player-knob"></div></div>
        <span>03:42</span>
        <i class="fa-solid fa-backward-step" style="font-size:8px"></i>
        <i class="fa-solid fa-play" style="font-size:8px"></i>
        <i class="fa-solid fa-forward-step" style="font-size:8px"></i>
      </div>`;
    } else if (widget === 'wave') {
      const h = [4, 9, 13, 6, 11, 14, 7, 4, 10, 13, 5, 8, 14, 6, 4, 9, 11, 5, 12, 7, 4];
      wEl.innerHTML = `<div class="wave-bars">${h.map(v => `<span style="height:${v}px"></span>`).join('')}</div>`;
    } else if (widget === 'piano') {
      wEl.innerHTML = `<div class="piano-keys">
        <span class="black"></span><span class="black"></span><span></span>
        <span class="black"></span><span class="black"></span><span class="black"></span><span></span>
        <span class="black"></span><span class="black"></span><span style="border-right:none"></span>
      </div>`;
    } else {
      wEl.innerHTML = '';
    }
  }
  saveStateToLocal();
}

// 8. 자동 저장 및 JSON 프리셋 입출력 (신규 필드 완벽 포함)
function collectCurrentState() {
  const g = id => document.getElementById(id)?.value;
  return {
    bleed: g('selBleed'),
    guides: g('selGuides'),
    cBg: g('cBg'),
    cMain: g('cMain'),
    cSub: g('cSub'),
    cAcc: g('cAcc'),
    rPadY: g('rPadY'),
    rPadX: g('rPadX'),
    rLeftRatio: g('rLeftRatio'),
    rDivGap: g('rDivGap'),
    rDivW: g('rDivW'),
    rDivH: g('rDivH'),
    rNameSz: g('rNameSz'),
    rNameTrk: g('rNameTrk'),
    rConGap: g('rConGap'),
    rQrSz: g('rQrSz'),
    selFont: g('selFont'),
    inStage: g('inStage'),
    inStageKr: g('inStageKr'),
    inReal: g('inReal'),
    selNameStyle: g('selNameStyle'),
    inFrontRole: g('inFrontRole'),
    inMicroLabel: g('inMicroLabel'),
    selServiceMode: g('selServiceMode'),
    inServices: g('inServices'),
    selContactIconStyle: g('selContactIconStyle'),
    inQrUrl: g('inQrUrl'),
    selQrModule: g('selQrModule'),
    selQrEye: g('selQrEye'),
    selQrLogo: g('selQrLogo'),
    inSocialHandle: g('inSocialHandle'),
    selSocialStyle: g('selSocialStyle'),
    rCIconY: g('rCIconY'),
    rSIconY: g('rSIconY'),
    selMusicWidget: g('selMusicWidget'),
    selQrFrame: g('selQrFrame'),
    selBgPattern: g('selBgPattern'),
    selWatermark: g('selWatermark'),
    selDivStyle: g('selDivStyle'),
    selFrameStyle: g('selFrameStyle'),
    inTopStamp: g('inTopStamp'),
    contacts: contacts,
    socials: socials
  };
}

function applyStateObject(st) {
  if (!st) return;
  const setVal = (id, v) => {
    const el = document.getElementById(id);
    if (v !== undefined && el) el.value = v;
  };
  Object.keys(st).forEach(k => {
    if (k !== 'contacts' && k !== 'socials') setVal(k, st[k]);
  });
  if (st.bleed !== undefined) setVal('selBleed', st.bleed);
  if (st.guides !== undefined) setVal('selGuides', st.guides);

  if (Array.isArray(st.contacts)) contacts = st.contacts;
  if (Array.isArray(st.socials)) socials = st.socials;

  renderContactSortable();
  renderSocialSortable();
  updatePrintSettings();
  onColorInput();
  updateLayoutVars();
  renderCardContent();
  renderCustomQR();
  updateDecorations();
}

function saveStateToLocal() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(collectCurrentState()));
  } catch (e) {}
}

function exportPresetJSON() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(collectCurrentState(), null, 2));
  const a = document.createElement('a');
  const name = document.getElementById('inStage').value.trim() || 'Card';
  a.href = dataStr;
  a.download = `${name}_명함프리셋.json`;
  a.click();
}

function importPresetJSON(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      applyStateObject(JSON.parse(e.target.result));
    } catch (err) {
      alert('유효한 프리셋 JSON 파일이 아닙니다.');
    }
  };
  reader.readAsText(file);
}

function resetToDefault() {
  if (confirm('모든 설정을 초기 기본값으로 되돌리시겠습니까?')) {
    localStorage.removeItem(STORAGE_KEY);
    location.reload();
  }
}

// 9. PNG / 순수 벡터(SVG) / 인쇄용 PDF 내보내기
function prepareForCleanCapture(callback) {
  const wrap = document.getElementById('stageWrap');
  const hadGuides = wrap.classList.contains('show-guides');
  const hadMockup = wrap.classList.contains('mockup-3d');

  wrap.classList.remove('show-guides');
  wrap.classList.remove('mockup-3d');

  setTimeout(() => {
    callback(() => {
      if (hadGuides) wrap.classList.add('show-guides');
      if (hadMockup) wrap.classList.add('mockup-3d');
    });
  }, 120);
}

function exportRasterPNG(targetId, label) {
  const target = document.getElementById(targetId);
  const prevDisp = target.style.display;
  target.style.display = 'block';

  prepareForCleanCapture((restore) => {
    html2canvas(target, { scale: 3, useCORS: true, backgroundColor: null }).then(canvas => {
      const a = document.createElement('a');
      const name = document.getElementById('inStage').value.trim() || 'Card';
      a.download = `${name}_명함_${label}_인쇄용.png`;
      a.href = canvas.toDataURL('image/png');
      a.click();
      target.style.display = prevDisp;
      restore();
    });
  });
}

function escapeXml(unsafe) {
  return (unsafe || '').replace(/[<>&'"]/g, c => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

function exportPureVectorSVG() {
  const bleedPx = parseFloat(document.getElementById('selBleed').value);
  const bleedMm = bleedPx / 8.4;
  const totalW = 90 + (bleedMm * 2);
  const totalH = 50 + (bleedMm * 2);

  const bg = document.getElementById('cBg').value;
  const main = document.getElementById('cMain').value;
  const sub = document.getElementById('cSub').value;
  const acc = document.getElementById('cAcc').value;

  const padX = parseFloat(document.getElementById('rPadX').value) / 8.4;
  const padY = parseFloat(document.getElementById('rPadY').value) / 8.4;
  const leftRatio = parseFloat(document.getElementById('rLeftRatio').value) / 100;
  const divW = parseFloat(document.getElementById('rDivW').value) / 8.4;
  const divH = parseFloat(document.getElementById('rDivH').value) / 100;
  const qrMm = parseFloat(document.getElementById('rQrSz').value) / 8.4;

  const stageEn = document.getElementById('inStage').value.trim();
  const stageKr = document.getElementById('inStageKr').value.trim();
  const real = document.getElementById('inReal').value.trim();
  const micro = document.getElementById('inMicroLabel').value.trim();
  const servicesLines = document.getElementById('inServices').value.split('\n');
  const handle = document.getElementById('inSocialHandle').value;

  const x0 = bleedMm + padX;
  const y0 = bleedMm + padY;
  const innerH = 50 - (padY * 2);
  const innerW = 90 - (padX * 2);
  const divX = bleedMm + padX + (innerW * leftRatio);
  const divLen = innerH * divH;
  const divY1 = bleedMm + (50 - divLen) / 2;

  const qrInnerSvg = renderCustomQRSvgString()
    .replace('<svg ', `<svg x="${divX + ((90 - padX - (divX - bleedMm) - qrMm) / 2)}" y="${bleedMm + (50 - qrMm - 5) / 2}" width="${qrMm}" height="${qrMm}" `);

  let svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${totalW}mm" height="${totalH}mm" viewBox="0 0 ${totalW} ${totalH}">
  <rect x="0" y="0" width="${totalW}" height="${totalH}" fill="${bg}"/>
  <text x="${x0}" y="${y0 + 3.2}" fill="${main}" font-family="Plus Jakarta Sans, Pretendard, sans-serif" font-size="3.1" font-weight="800">${escapeXml(stageEn)} <tspan font-size="2.1" font-weight="600">${escapeXml(stageKr)}</tspan> <tspan fill="${sub}" font-size="1.6" font-weight="400">${real ? '| ' + escapeXml(real) : ''}</tspan></text>
`;

  let curY = y0 + 6.8;
  if (micro) {
    svgContent += `  <text x="${x0}" y="${curY}" fill="${acc}" opacity="0.6" font-family="sans-serif" font-size="1.1" font-weight="700" letter-spacing="0.2">${escapeXml(micro)}</text>\n`;
    curY += 2.2;
  }

  servicesLines.forEach(line => {
    svgContent += `  <text x="${x0}" y="${curY}" fill="${sub}" font-family="Pretendard, sans-serif" font-size="1.55">${escapeXml(line)}</text>\n`;
    curY += 2.4;
  });

  let conY = bleedMm + 50 - padY - ((contacts.length - 1) * 2.8);
  contacts.forEach(c => {
    svgContent += `  <text x="${x0}" y="${conY}" fill="${main}" font-family="Plus Jakarta Sans, Pretendard, sans-serif" font-size="1.55">${escapeXml(c.text)}</text>\n`;
    conY += 2.8;
  });

  svgContent += `  <line x1="${divX}" y1="${divY1}" x2="${divX}" y2="${divY1 + divLen}" stroke="${acc}" stroke-width="${divW}"/>\n`;
  svgContent += `  ${qrInnerSvg}\n`;

  const rightCenterX = divX + ((bleedMm + 90 - padX - divX) / 2);
  svgContent += `  <text x="${rightCenterX}" y="${bleedMm + (50 + qrMm) / 2 + 2.5}" text-anchor="middle" fill="${main}" font-family="Plus Jakarta Sans, sans-serif" font-size="1.45">${escapeXml(handle)}</text>\n`;

  if (bleedMm > 0) {
    svgContent += `  <g id="Trim_Guide_Layer" opacity="0.35">
    <rect x="${bleedMm}" y="${bleedMm}" width="90" height="50" fill="none" stroke="#ff0000" stroke-width="0.1" stroke-dasharray="1,1"/>
  </g>\n`;
  }

  svgContent += `</svg>`;

  const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${stageEn || 'Card'}_명함_순수벡터(${totalW}x${totalH}mm).svg`;
  a.click();
}

function exportPrintPDF() {
  const bleedPx = parseFloat(document.getElementById('selBleed').value);
  const bleedMm = bleedPx / 8.4;
  const wMm = 90 + (bleedMm * 2);
  const hMm = 50 + (bleedMm * 2);

  const frontEl = document.getElementById('card-front-wrap');
  const backEl = document.getElementById('card-back-wrap');
  const prevFront = frontEl.style.display;
  const prevBack = backEl.style.display;

  frontEl.style.display = 'block';
  backEl.style.display = 'block';

  prepareForCleanCapture(async (restore) => {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: [wMm, hMm]
    });

    const canvasBack = await html2canvas(backEl, { scale: 4, useCORS: true });
    pdf.addImage(canvasBack.toDataURL('image/png'), 'PNG', 0, 0, wMm, hMm);

    pdf.addPage([wMm, hMm], 'landscape');
    const canvasFront = await html2canvas(frontEl, { scale: 4, useCORS: true });
    pdf.addImage(canvasFront.toDataURL('image/png'), 'PNG', 0, 0, wMm, hMm);

    const name = document.getElementById('inStage').value.trim() || 'Card';
    pdf.save(`${name}_인쇄소입고용_양면명함(${wMm}x${hMm}mm).pdf`);

    frontEl.style.display = prevFront;
    backEl.style.display = prevBack;
    restore();
  });
}

// 초기 실행
window.onload = () => {
  initSortables();
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      applyStateObject(JSON.parse(saved));
      return;
    } catch (e) {}
  }
  renderContactSortable();
  renderSocialSortable();
  updatePrintSettings();
  onColorInput();
  updateLayoutVars();
  renderCardContent();
  renderCustomQR();
  updateDecorations();
};
