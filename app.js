const STORAGE_KEY = 'pro_business_card_studio_v3_clean';

const CONTACT_CATALOG = [
  { label: '전화 (Phone)', value: 'fa-solid fa-phone' },
  { label: '이메일 (Mail)', value: 'fa-solid fa-envelope' },
  { label: '웹사이트 (Web)', value: 'fa-solid fa-globe' },
  { label: '디스코드 (Discord)', value: 'fa-brands fa-discord' },
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

// 2. 뷰 전환 (앞면 단독 정면 뷰 포함)
function switchView(mode) {
  const wrap = document.getElementById('stageWrap');
  const front = document.getElementById('card-front-wrap');
  const back = document.getElementById('card-back-wrap');

  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  if (mode === 'flat-front') {
    document.getElementById('tabFlatFront')?.classList.add('active');
    wrap.classList.remove('mockup-3d');
    front.style.display = 'block';
    back.style.display = 'none';
  } else if (mode === 'flat-back') {
    document.getElementById('tabFlatBack')?.classList.add('active');
    wrap.classList.remove('mockup-3d');
    front.style.display = 'none';
    back.style.display = 'block';
  } else if (mode === 'mockup-3d') {
    document.getElementById('tabMockup3D')?.classList.add('active');
    wrap.classList.add('mockup-3d');
    front.style.display = 'block';
    back.style.display = 'block';
  } else if (mode === 'flat-both') {
    document.getElementById('tabFlatBoth')?.classList.add('active');
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
  if (typeof updateFrontCard === 'function') updateFrontCard();
  saveStateToLocal();
}

function updateLayoutVars() {
  const map = [
    ['rPadY', 'vPadY', '--pad-y', 'px'],
    ['rPadX', 'vPadX', '--pad-x', 'px'],
    ['rLeftRatio', 'vLeftRatio', '--left-col-ratio', '%'],
    ['rDivGap', 'vDivGap', '--divider-gap', 'px'],
    ['rDivW', 'vDivW', '--divider-w', 'px'],
    ['rDivH', 'vDivH', '--divider-h', '%'],
    ['rNameSz', 'vNameSz', '--name-size', 'px'],
    ['rSubNameSz', 'vSubNameSz', '--sub-name-size', 'px'],
    ['rConSz', 'vConSz', '--con-font-size', 'px'],
    ['rMicroSz', 'vMicroSz', '--micro-font-size', 'px'],
    ['rNameTrk', 'vNameTrk', '--name-track', 'px'],
    ['rConGap', 'vConGap', '--contact-gap', 'px'],
    ['rQrSz', 'vQrSz', '--qr-size', 'px']
  ];
  const root = document.documentElement;
  map.forEach(([inId, valId, cssVar, unit]) => {
    const el = document.getElementById(inId);
    if (!el) return;
    const val = el.value;
    const badge = document.getElementById(valId);
    if (badge) badge.textContent = val + unit;
    root.style.setProperty(cssVar, val + unit);
  });

  renderCustomQR();
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

// [추가] 개별 슬라이더 초기화 & 50:50 정중앙 대칭 맞춤 함수
function resetSingleSlider(id, defaultVal) {
  const el = document.getElementById(id);
  if (el) {
    el.value = defaultVal;
    updateLayoutVars();
  }
}

function centerAlignLayout() {
  document.getElementById('rLeftRatio').value = 50; // 좌우 정확히 50:50 대칭
  document.getElementById('rPadX').value = 56;
  document.getElementById('rPadY').value = 50;
  document.getElementById('rDivGap').value = 38;
  document.getElementById('rDivH').value = 90;
  updateLayoutVars();
}

function resetLayoutVars() {
  document.getElementById('rPadY').value = 50;
  document.getElementById('rPadX').value = 56;
  document.getElementById('rLeftRatio').value = 56;
  document.getElementById('rDivGap').value = 38;
  document.getElementById('rDivW').value = 1.2;
  document.getElementById('rDivH').value = 92;
  document.getElementById('rNameSz').value = 24;
  document.getElementById('rNameTrk').value = -0.5;
  document.getElementById('rConGap').value = 11;
  document.getElementById('rQrSz').value = 142;
  updateLayoutVars();
}

function resetIconOffsets(target) {
  if (!target || target === 'c') {
    const c = document.getElementById('rCIconY');
    if (c) c.value = 0;
  }
  if (!target || target === 's') {
    const s = document.getElementById('rSIconY');
    if (s) s.value = 0;
  }
  updateDecorations();
}

// 5. 틈새 제로(Seamless) 클래식 정사각 & html2canvas 완벽 호환 QR 엔진
function renderCustomQRSvgString() {
  const url = document.getElementById('inQrUrl')?.value.trim() || 'https://example.com';
  const acc = document.getElementById('cAcc')?.value || '#181818';
  const qrSz = document.getElementById('rQrSz')?.value || 142;

  const qr = qrcode(0, 'M');
  qr.addData(url);
  qr.make();
  const count = qr.getModuleCount();

  let pathData = '';
  for (let r = 0; r < count; r++) {
    for (let c = 0; c < count; c++) {
      if (qr.isDark(r, c)) {
        pathData += `M${c},${r}h1v1h-1z `;
      }
    }
  }

  // width, height 속성을 명시해야 html2canvas(PNG/PDF 저장)가 멈추지 않음!
  return `<svg width="${qrSz}" height="${qrSz}" viewBox="0 0 ${count} ${count}" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">
    <path d="${pathData}" fill="${acc}" />
  </svg>`;
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

// 슬라이더 단일 리셋 보강 (레이아웃 + 장식 슬라이더 모두 호환)
function resetSingleSlider(id, defaultVal) {
  const el = document.getElementById(id);
  if (el) {
    el.value = defaultVal;
    updateLayoutVars();
    updateDecorations();
  }
}

// 연락처 아이콘별 영문 마이크로 코드 매핑
function getContactPrefixCode(iconClass) {
  if (iconClass.includes('phone')) return 'T.';
  if (iconClass.includes('envelope')) return 'E.';
  if (iconClass.includes('globe')) return 'W.';
  if (iconClass.includes('discord')) return 'DC.';
  if (iconClass.includes('instagram')) return 'IG.';
  if (iconClass.includes('soundcloud')) return 'SC.';
  if (iconClass.includes('youtube')) return 'YT.';
  if (iconClass.includes('spotify')) return 'SP.';
  if (iconClass.includes('comment')) return 'M.';
  if (iconClass.includes('location')) return 'L.';
  return '•';
}

// 6. 명함 콘텐츠 렌더링 (클린 심볼 단독 고정 & 연락처 프리픽스 지원)
function renderCardContent() {
  const stageEn = document.getElementById('inStage')?.value.trim() || '';
  const stageKr = document.getElementById('inStageKr')?.value.trim() || '';
  const real = document.getElementById('inReal')?.value.trim() || '';
  const nameStyle = document.getElementById('selNameStyle')?.value || 'two-line';
  const microLabel = document.getElementById('inMicroLabel')?.value.trim() || '';
  const serviceMode = document.getElementById('selServiceMode')?.value || 'dia-inline';
  const servicesRaw = document.getElementById('inServices')?.value || '';
  const cPrefixMode = document.getElementById('selContactPrefix')?.value || 'none';
  const socialHandle = document.getElementById('inSocialHandle')?.value || '';
  const stageSepMode = document.getElementById('selStageSep')?.value || 'space';
  let stageSepHtml = '';
  if (stageKr) {
    if (stageSepMode === 'dia') stageSepHtml = `<span class="stage-sep-mark">◆</span>`;
    else if (stageSepMode === 'dot') stageSepHtml = `<span class="stage-sep-mark">·</span>`;
    else if (stageSepMode === 'slash') stageSepHtml = `<span class="stage-sep-mark">/</span>`;
  }

  const nameGroup = document.getElementById('outBackNameGroup');
  let nameHtml = '';

  if (nameStyle === 'two-line') {
    nameHtml = `<div class="name-line-main">
      <span class="back-stage-en">${stageEn}</span>
      ${stageSepHtml}
      ${stageKr ? `<span class="back-stage-kr">${stageKr}</span>` : ''}
    </div>
    ${real ? `<div class="back-real-name-tag">${real}</div>` : ''}`;
  } else if (nameStyle === 'inline-all') {
    nameHtml = `<div class="name-line-main">
      <span class="back-stage-en">${stageEn}</span>
      ${stageSepHtml}
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

  const microEl = document.getElementById('outMicroLabel');
  microEl.textContent = microLabel;
  microEl.style.display = microLabel ? 'block' : 'none';

  const sContainer = document.getElementById('outServicesContainer');
  sContainer.innerHTML = '';

  const rawLines = servicesRaw.split('\n').map(l => l.trim()).filter(Boolean);
  const allTokens = servicesRaw.split(/[\n,·/|]+/).map(s => s.trim()).filter(Boolean);

  if (serviceMode === 'dia-inline' || serviceMode === 'slash-modern' || serviceMode === 'pipe-clean') {
    const stack = document.createElement('div');
    stack.className = 'srv-lines-stack';

    rawLines.forEach((lineText, lineIdx) => {
      const lineItems = lineText.split(/[,·/|]+/).map(s => s.trim()).filter(Boolean);
      if (lineItems.length === 0) return;

      const row = document.createElement('div');
      row.className = 'srv-line-row' + (lineIdx > 0 ? ' sub-line' : '');

      lineItems.forEach((item, idx) => {
        const word = document.createElement('span');
        word.textContent = item;
        row.appendChild(word);

        if (idx < lineItems.length - 1) {
          const sep = document.createElement('span');
          if (serviceMode === 'dia-inline') {
            sep.className = 'srv-sep-dia';
            sep.textContent = '◆';
          } else if (serviceMode === 'slash-modern') {
            sep.className = 'srv-sep-slash';
            sep.textContent = '/';
          } else {
            sep.className = 'srv-sep-pipe';
            sep.textContent = '│';
          }
          row.appendChild(sep);
        }
      });
      stack.appendChild(row);
    });
    sContainer.appendChild(stack);

  } else if (serviceMode === 'track-2col' || serviceMode === 'track-3col') {
    const grid = document.createElement('div');
    grid.className = 'srv-track-grid' + (serviceMode === 'track-3col' ? ' cols-3' : '');
    allTokens.forEach((tok, idx) => {
      const num = String(idx + 1).padStart(2, '0');
      const item = document.createElement('div');
      item.className = 'srv-track-item';
      item.innerHTML = `<span class="srv-track-num">${num}</span><span>${tok}</span>`;
      grid.appendChild(item);
    });
    sContainer.appendChild(grid);

  } else if (serviceMode === 'accent-bar') {
    const barBox = document.createElement('div');
    barBox.className = 'srv-accent-bar';
    rawLines.forEach((lineText, lineIdx) => {
      const lineItems = lineText.split(/[,·/|]+/).map(s => s.trim()).filter(Boolean);
      const row = document.createElement('div');
      row.className = 'srv-line-row' + (lineIdx > 0 ? ' sub-line' : '');
      row.textContent = lineItems.join('  ·  ');
      barBox.appendChild(row);
    });
    sContainer.appendChild(barBox);
  }

  // 좌측 연락처 (심볼 단독 고정 + 기호 톤다운 디테일)
  const toneMode = document.getElementById('selContactTone')?.value || 'subtle';
  const cList = document.getElementById('outContactList');
  cList.innerHTML = '';
  contacts.forEach(c => {
    const row = document.createElement('div');
    row.className = 'contact-row';
    let prefixHtml = '';
    if (cPrefixMode === 'code') {
      prefixHtml = `<span class="c-prefix">${getContactPrefixCode(c.icon)}</span>`;
    } else if (cPrefixMode === 'dot') {
      prefixHtml = `<span class="c-prefix">•</span>`;
    }

    let formattedText = escapeXml(c.text);
    if (toneMode === 'subtle') {
      // 하이픈(-), 골뱅이(@), 슬래시(/), www. 등을 은은하게 처리해 핵심 숫자와 아이디 강조
      formattedText = formattedText
        .replace(/([-@/])/g, '<span class="tone-sub">$1</span>')
        .replace(/^(www\.)/i, '<span class="tone-sub">$1</span>');
    }

    row.innerHTML = `<span class="c-icon-box"><i class="${c.icon}"></i></span>${prefixHtml}<span class="c-text">${formattedText}</span>`;
    cList.appendChild(row);
  });

  // 우측 소셜 바 (심볼 단독 고정)
  const hEl = document.getElementById('outSocialHandle');
  hEl.textContent = socialHandle;
  hEl.style.display = socialHandle.trim() ? 'inline-flex' : 'none';

  const sBox = document.getElementById('outSocialIcons');
  sBox.innerHTML = '';
  socials.forEach(ic => {
    const b = document.createElement('span');
    b.className = 's-badge';
    b.innerHTML = `<i class="${ic}"></i>`;
    sBox.appendChild(b);
  });

  saveStateToLocal();
}

// 7. 다이아몬드 세로선 디테일 & 꾸밈 요소 반영
function updateDecorations() {
  const cOff = document.getElementById('rCIconY')?.value || 0;
  const sOff = document.getElementById('rSIconY')?.value || 0;
  const iconSz = document.getElementById('rIconSz')?.value || 13;
  const diaSz = document.getElementById('rDiaSz')?.value || 8;
  const srvSz = document.getElementById('rSrvSz')?.value || 12;
  const srvGap = document.getElementById('rSrvGap')?.value || 5;

  if (document.getElementById('vCIconY')) document.getElementById('vCIconY').textContent = cOff + 'px';
  if (document.getElementById('vSIconY')) document.getElementById('vSIconY').textContent = sOff + 'px';
  if (document.getElementById('vIconSz')) document.getElementById('vIconSz').textContent = iconSz + 'px';
  if (document.getElementById('vDiaSz')) document.getElementById('vDiaSz').textContent = diaSz + 'px';
  if (document.getElementById('vSrvSz')) document.getElementById('vSrvSz').textContent = srvSz + 'px';
  if (document.getElementById('vSrvGap')) document.getElementById('vSrvGap').textContent = srvGap + 'px';

  const root = document.documentElement;
  root.style.setProperty('--c-icon-offset-y', cOff + 'px');
  root.style.setProperty('--s-icon-offset-y', sOff + 'px');
  root.style.setProperty('--symbol-size', iconSz + 'px');
  root.style.setProperty('--dia-size', diaSz + 'px');
  root.style.setProperty('--srv-font-size', srvSz + 'px');
  root.style.setProperty('--srv-row-gap', srvGap + 'px');

  const diaType = document.getElementById('selDiaType')?.value || 'solid';
  const nameRule = document.getElementById('selNameRule')?.value || 'dia-rule';
  const qrCaption = document.getElementById('selQrCaption')?.value || 'SCAN TO LISTEN ↗';
  const socialCap = document.getElementById('selSocialCap')?.value || 'line';
  const frameStyle = document.getElementById('selFrameStyle')?.value || 'corner-bracket';
  const qrFrame = document.getElementById('selQrFrame')?.value || 'framed';
  const widget = document.getElementById('selMusicWidget')?.value || 'player';
  const stampText = document.getElementById('inTopStamp')?.value.trim() || '';

  // 1) 중앙 다이아몬드 세로선 (폰트에 따라 작아지지 않는 진짜 기하학 도형 사용)
  const divLine = document.getElementById('outDividerLine');
  const gemEl = document.getElementById('outDividerGem');
  if (divLine && gemEl) {
    divLine.className = 'back-divider-line' + (diaType === 'fade-dia' ? ' fade-dia' : '');
    gemEl.className = 'divider-gem' + (diaType === 'double-gem' ? ' double-gem' : '');

    if (diaType === 'solid' || diaType === 'fade-dia') {
      gemEl.innerHTML = '<span class="true-diamond"></span>';
    } else if (diaType === 'hollow') {
      gemEl.innerHTML = '<span class="true-diamond hollow"></span>';
    } else if (diaType === 'triple') {
      gemEl.innerHTML = '<span class="true-diamond sm" style="opacity:0.55"></span><span class="true-diamond"></span><span class="true-diamond sm" style="opacity:0.55"></span>';
    } else if (diaType === 'double-gem') {
      gemEl.innerHTML = '<span><span class="true-diamond"></span></span><span><span class="true-diamond"></span></span>';
    }
  }

  // 2) 이름 하단 포인트 룰
  const ruleEl = document.getElementById('outNameRule');
  if (ruleEl) ruleEl.className = 'decor-name-rule' + (nameRule !== 'none' ? ' ' + nameRule : '');

  // 3) QR 상단 캡션 태그
  const capEl = document.getElementById('outQrCaption');
  if (capEl) {
    capEl.textContent = qrCaption === 'none' ? '' : qrCaption;
    capEl.style.display = qrCaption === 'none' ? 'none' : 'block';
  }

  // 4) QR ↔ 소셜 구분 캡
  const sCapEl = document.getElementById('outSocialCap');
  if (sCapEl) {
    sCapEl.className = 'social-cap ' + socialCap;
    sCapEl.textContent = socialCap === 'dia' ? '• ◆ •' : '';
  }

  // 5) 외곽 프레임 & QR 프레임
  const frameEl = document.getElementById('outDecorFrame');
  if (frameEl) frameEl.className = 'decor-frame' + (frameStyle !== 'none' ? ' ' + frameStyle : '');

  const qrEl = document.getElementById('outQrBox');
  if (qrEl) qrEl.className = 'qr-box' + (qrFrame !== 'none' ? ' ' + qrFrame : '');

  // 6) 상단 스튜디오 스탬프
  const stEl = document.getElementById('outTopStamp');
  if (stEl) {
    stEl.textContent = stampText;
    stEl.className = 'decor-top-stamp' + (stampText ? ' active' : '');
  }

  // 7) 뮤직 그래픽 위젯 (다이아몬드 노브 플레이어 / 파형 / 피아노 / 타임코드)
  const wEl = document.getElementById('outMusicWidget');
  if (wEl) {
    if (widget === 'player') {
      const playCur = document.getElementById('inPlayCur')?.value || '01:28';
      const playEnd = document.getElementById('inPlayEnd')?.value || '03:42';
      const playPos = document.getElementById('rPlayPos')?.value || 42;
      if (document.getElementById('vPlayPos')) {
        document.getElementById('vPlayPos').textContent = playPos + '%';
      }
      wEl.innerHTML = `<div class="mini-player-bar">
        <span>${escapeXml(playCur)}</span>
        <div class="player-track">
          <div class="player-fill" style="width:${playPos}%"></div>
          <div class="player-knob" style="left:${playPos}% !important"></div>
        </div>
        <span>${escapeXml(playEnd)}</span>
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
    } else if (widget === 'timecode') {
      wEl.innerHTML = `<div class="mini-player-bar" style="letter-spacing:1px;">
        <span>REC ● 00:01:28:14</span>
        <span style="opacity:0.4;">//</span>
        <span>MASTER</span>
      </div>`;
    } else {
      wEl.innerHTML = '';
    }
  }
  saveStateToLocal();
}

// 8. 자동 저장 및 JSON 프리셋 입출력
function collectCurrentState() {
  const g = id => document.getElementById(id)?.value;
  return {
   uploadedLogoDataUrl: uploadedLogoDataUrl,
   selStageSep: g('selStageSep'),
   selContactTone: g('selContactTone'),
   inPlayCur: g('inPlayCur'),
   inPlayEnd: g('inPlayEnd'),
   rPlayPos: g('rPlayPos'),
   selFrontColorMode: g('selFrontColorMode'),
   cFBg: g('cFBg'),
   cFMain: g('cFMain'),
   cFSub: g('cFSub'),
   cFAcc: g('cFAcc'),
   selFrontLogoMode: g('selFrontLogoMode'),
   rFLogoSz: g('rFLogoSz'),
   selLogoFilter: g('selLogoFilter'),
   selFrontLayout: g('selFrontLayout'),
   selFrontLine: g('selFrontLine'),
   inFrontMainText: g('inFrontMainText'),
   inFrontSubText: g('inFrontSubText'),
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
    selContactPrefix: g('selContactPrefix'),
    rIconSz: g('rIconSz'),
    inQrUrl: g('inQrUrl'),
    selQrModule: g('selQrModule'),
    selQrEye: g('selQrEye'),
    selQrCaption: g('selQrCaption'),
    inSocialHandle: g('inSocialHandle'),
    selSocialCap: g('selSocialCap'),
    rCIconY: g('rCIconY'),
    rSIconY: g('rSIconY'),
    selDiaType: g('selDiaType'),
    rDiaSz: g('rDiaSz'),
    selNameRule: g('selNameRule'),
    selMusicWidget: g('selMusicWidget'),
    selQrFrame: g('selQrFrame'),
    selFrameStyle: g('selFrameStyle'),
    inTopStamp: g('inTopStamp'),
    contacts: contacts,
    socials: socials
  };
}

function applyStateObject(st) {
  if (!st) return;
  if (st.uploadedLogoDataUrl) uploadedLogoDataUrl = st.uploadedLogoDataUrl;
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

// 9. PNG / 순수 벡터(앞+뒤 SVG) / 인쇄용 양면 PDF 완벽 내보내기
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
  }, 150);
}



// 모든 아이콘(FontAwesome)과 특수기호(◆, ◇, •, ↗)를 폰트가 아닌 100% 순수 SVG 벡터 도형으로 그리는 사전
const ICON_SVG_PATHS = {
  'fa-phone': '<path fill="currentColor" d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/>',
  'fa-envelope': '<path fill="currentColor" d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/>',
  'fa-globe': '<path fill="currentColor" d="M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64H348.7c2.2 20.4 3.3 41.8 3.3 64zm28.8-64H503.9c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64H380.8c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32H376.7c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0H167.7c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0H18.6C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192H131.2c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64H8.1C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6H344.3c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352H135.3zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6H493.4z"/>',
  'fa-discord': '<path fill="currentColor" d="M524.5 69.8a1.5 1.5 0 0 0 -.8-.7A485.1 485.1 0 0 0 404.1 32a1.8 1.8 0 0 0 -1.9 .9 337.5 337.5 0 0 0 -14.9 30.6 447.8 447.8 0 0 0 -134.4 0 309.5 309.5 0 0 0 -15.1-30.6 1.9 1.9 0 0 0 -1.9-.9A483.7 483.7 0 0 0 116.1 69.1a1.7 1.7 0 0 0 -.8 .7C39.1 183.7 18.2 294.7 28.4 404.4a2 2 0 0 0 .8 1.4A487.7 487.7 0 0 0 176 479.9a1.9 1.9 0 0 0 2.1-.7A348.2 348.2 0 0 0 208.1 430.4a1.9 1.9 0 0 0 -1-2.6 321.2 321.2 0 0 1 -45.9-21.9 1.9 1.9 0 0 1 -.2-3.1c3.1-2.3 6.2-4.7 9.1-7.1a1.8 1.8 0 0 1 1.9-.3c96.2 43.9 200.4 43.9 295.5 0a1.8 1.8 0 0 1 1.9 .2c2.9 2.4 6 4.9 9.1 7.2a1.9 1.9 0 0 1 -.2 3.1 301.4 301.4 0 0 1 -45.9 21.8 1.9 1.9 0 0 0 -1 2.6 391.1 391.1 0 0 0 30 48.8 1.9 1.9 0 0 0 2.1 .7A486 486 0 0 0 610.7 405.7a1.9 1.9 0 0 0 .8-1.4C623.7 277.6 590.9 167.5 524.5 69.8zM222.5 337.6c-29 0-52.8-26.6-52.8-59.2S193.1 219.1 222.5 219.1c29.7 0 53.3 26.8 52.8 59.2C275.3 311 251.9 337.6 222.5 337.6zm195.4 0c-29 0-52.8-26.6-52.8-59.2S388.4 219.1 417.9 219.1c29.7 0 53.3 26.8 52.8 59.2C470.7 311 447.5 337.6 417.9 337.6z"/>',
  'fa-instagram': '<path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>',
  'fa-soundcloud': '<path fill="currentColor" d="M111.4 256.3l5.8 65-5.8 68.3c-.3 2.5-2.2 4.4-4.4 4.4s-4.2-1.9-4.2-4.4l-5.6-68.3 5.6-65c0-2.5 1.9-4.4 4.2-4.4 2.2 0 4.1 1.9 4.4 4.4zm21.4-19.2l5.6 84.2-5.6 68.3c-.3 2.5-1.9 4.4-4.2 4.4-2.5 0-4.2-1.9-4.4-4.4l-5.6-68.3 5.6-84.2c.3-2.5 1.9-4.4 4.4-4.4 2.2 0 3.9 1.9 4.2 4.4zm21.4-12.5l5.8 96.7-5.8 68.3c-.3 2.5-2.2 4.4-4.4 4.4s-4.2-1.9-4.4-4.4l-5.6-68.3 5.6-96.7c.3-2.5 2.2-4.4 4.4-4.4s4.1 1.9 4.4 4.4zm21.7 3.1l5.6 93.6-5.6 68.3c-.3 2.5-2.2 4.4-4.4 4.4-2.5 0-4.2-1.9-4.4-4.4l-5.6-68.3 5.6-93.6c.3-2.5 1.9-4.7 4.4-4.7 2.2 0 4.1 2.2 4.4 4.7zm22 10.8l5.3 82.8-5.3 68.3c-.3 2.8-2.2 4.7-4.7 4.7s-4.4-1.9-4.7-4.7l-5.3-68.3 5.3-82.8c.3-2.8 2.2-4.7 4.7-4.7s4.4 1.9 4.7 4.7zm299.1 59.2c-6.7 0-13.1 1.4-19.2 3.9-15.8-64.7-73.9-112.8-143.3-112.8-18.6 0-36.7 3.6-53.1 10.6-6.4 2.5-8.1 5-8.1 10v202.2c0 5.3 4.2 9.7 9.4 10h214.2c45.3 0 82-36.7 82-81.9 0-45.3-36.7-82-81.9-82z"/>',
  'fa-youtube': '<path fill="currentColor" d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z"/>',
  'fa-spotify': '<path fill="currentColor" d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm100.7 364.9c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4zm26.9-65.6c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm31-76.2c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3z"/>',
  'fa-comment': '<path fill="currentColor" d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4l0 0 0 0 0 0 0 0 .3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z"/>',
  'fa-location-dot': '<path fill="currentColor" d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/>',
  'fa-facebook-f': '<path fill="currentColor" d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z"/>',
  'fa-twitter': '<path fill="currentColor" d="M459.4 151.7c.3 4.5 .3 9.1 .3 13.6 0 138.7-105.6 298.6-298.6 298.6-59.5 0-114.7-17.2-161.1-47.1 8.4 1 16.6 1.3 25.3 1.3 49.1 0 94.2-16.6 130.3-44.8-46.1-1-84.8-31.2-98.1-72.8 6.5 1 13 1.6 19.8 1.6 9.4 0 18.8-1.3 27.6-3.6-48.1-9.7-84.1-52-84.1-103v-1.3c14 7.8 30.2 12.7 47.4 13.3-28.3-18.8-46.8-51-46.8-87.4 0-19.5 5.2-37.4 14.3-53 51.7 63.7 129.3 105.3 216.4 109.8-1.6-7.8-2.6-15.9-2.6-24 0-57.8 46.8-104.9 104.9-104.9 30.2 0 57.5 12.7 76.7 33.1 23.7-4.5 46.5-13.3 66.6-25.3-7.8 24.4-24.4 44.8-46.1 57.8 21.1-2.3 41.6-8.1 60.4-16.2-14.3 20.8-32.2 39.3-52.6 54.3z"/>',
  'fa-x-twitter': '<path fill="currentColor" d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/>',
  'fa-itunes-note': '<path fill="currentColor" d="M499.1 6.3c8.1 6 12.9 15.6 12.9 25.7v72V368c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6V147L192 223.8V432c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6V200 128c0-14.1 9.3-26.6 22.8-30.7l320-96c9.7-2.9 20.2-1.1 28.3 5z"/>',
  'fa-tiktok': '<path fill="currentColor" d="M448 209.9a210.1 210.1 0 0 1 -122.8-39.3V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.6 74.6 0 1 0 52.2 71.2V0l88 0a121.2 121.2 0 0 0 1.9 22.2h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.1z"/>',
  'fa-backward-step': '<path fill="currentColor" d="M267.5 440.6c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4l-192 160L64 241V96c0-17.7-14.3-32-32-32S0 78.3 0 96V416c0 17.7 14.3 32 32 32s32-14.3 32-32V271l11.5 9.6 192 160z"/>',
  'fa-play': '<path fill="currentColor" d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/>',
  'fa-forward-step': '<path fill="currentColor" d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4l192 160L256 241V96c0-17.7 14.3-32 32-32s32 14.3 32 32V416c0 17.7-14.3 32-32 32s-32-14.3-32-32V271l-11.5 9.6-192 160z"/>'
};

// 화면의 모든 <i> 아이콘과 특수문자(◆, ↗ 등)를 캡처 직전 순수 SVG 도형으로 변환하여 [☒] 깨짐을 100% 차단!
function convertIconsAndSymbolsToPureSVG(rootEl) {
  const backup = [];

  // 1) 모든 FontAwesome <i> 태그를 순수 인라인 <svg>로 치환
  rootEl.querySelectorAll('i').forEach(iconEl => {
    const cls = iconEl.className || '';
    const matchKey = Object.keys(ICON_SVG_PATHS).find(k => cls.includes(k));
    if (matchKey) {
      const computed = window.getComputedStyle(iconEl);
      const sz = computed.fontSize || '13px';
      const color = computed.color || 'currentColor';
      const vb = matchKey === 'fa-discord' ? '0 0 640 512' : (matchKey === 'fa-youtube' ? '0 0 576 512' : (matchKey === 'fa-facebook-f' ? '0 0 320 512' : '0 0 512 512'));

      const svgSpan = document.createElement('span');
      svgSpan.style.cssText = `display:inline-flex;align-items:center;justify-content:center;width:${sz};height:${sz};color:${color};`;
      svgSpan.innerHTML = `<svg viewBox="${vb}" style="width:100%;height:100%;display:block;fill:currentColor;">${ICON_SVG_PATHS[matchKey]}</svg>`;

      backup.push({ parent: iconEl.parentNode, orig: iconEl, temp: svgSpan });
      iconEl.parentNode.replaceChild(svgSpan, iconEl);
    }
  });

  // 2) 텍스트 노드 안의 특수기호(◆, ◇, ↗)가 [☒]로 깨지거나 작아지지 않도록 SVG 도형으로 치환
  const diaElements = rootEl.querySelectorAll('.srv-sep-dia, .front-line-gem, .front-symbol-mark, #outQrCaption');
  diaElements.forEach(el => {
    const oldHtml = el.innerHTML;
    if (oldHtml.includes('◆') || oldHtml.includes('◇') || oldHtml.includes('↗')) {
      backup.push({ el, oldHtml });
      const computed = window.getComputedStyle(el);
      const sz = parseFloat(computed.fontSize) || 8;
      const diamondSvg = `<svg viewBox="0 0 10 10" style="width:${sz}px;height:${sz}px;display:inline-block;vertical-align:middle;fill:currentColor;"><polygon points="5,0 10,5 5,10 0,5"/></svg>`;
      const hollowSvg = `<svg viewBox="0 0 10 10" style="width:${sz}px;height:${sz}px;display:inline-block;vertical-align:middle;fill:none;stroke:currentColor;stroke-width:1.4;"><polygon points="5,1 9,5 5,9 1,5"/></svg>`;
      const arrowSvg = `<svg viewBox="0 0 10 10" style="width:${sz}px;height:${sz}px;display:inline-block;vertical-align:middle;fill:none;stroke:currentColor;stroke-width:1.5;"><path d="M2,8 L8,2 M4,2 L8,2 L8,6"/></svg>`;

      el.innerHTML = oldHtml
        .replace(/◆/g, diamondSvg)
        .replace(/◇/g, hollowSvg)
        .replace(/↗/g, arrowSvg);
    }
  });

  return () => {
    backup.forEach(item => {
      if (item.temp && item.parent) {
        item.parent.replaceChild(item.orig, item.temp);
      } else if (item.el) {
        item.el.innerHTML = item.oldHtml;
      }
    });
  };
}

async function captureCardToDataUrl(targetEl, scaleRatio = 3) {
  await document.fonts.ready;
  const restoreIcons = convertIconsAndSymbolsToPureSVG(targetEl);
  try {
    return await htmlToImage.toPng(targetEl, {
      pixelRatio: scaleRatio,
      cacheBust: true,
      skipFonts: false
    });
  } finally {
    restoreIcons();
  }
}

function exportRasterPNG(targetId, label) {
  const target = document.getElementById(targetId);
  if (!target) return;
  const prevDisp = target.style.display;
  target.style.display = 'block';

  prepareForCleanCapture(async (restore) => {
    try {
      const dataUrl = await captureCardToDataUrl(target, 3);
      const a = document.createElement('a');
      const name = document.getElementById('inStage')?.value.trim() || 'Card';
      a.download = `${name}_명함_${label}_인쇄용.png`;
      a.href = dataUrl;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.error('PNG 캡처 오류:', err);
      alert('이미지 저장 중 오류가 발생했습니다: ' + err.message);
    } finally {
      target.style.display = prevDisp;
      restore();
    }
  });
}


// 초고해상도 PNG DataURL을 인쇄소 입고용 무손실급 JPEG(품질 98%)로 변환 (45MB -> 1MB 다이어트)
function compressDataUrlToHighResJpeg(pngDataUrl, bgColor = '#ffffff') {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const cvs = document.createElement('canvas');
      cvs.width = img.width;
      cvs.height = img.height;
      const ctx = cvs.getContext('2d');
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, cvs.width, cvs.height);
      ctx.drawImage(img, 0, 0);
      resolve(cvs.toDataURL('image/jpeg', 0.98));
    };
    img.src = pngDataUrl;
  });
}

// 인쇄소 입고용 양면 PDF 저장 (용량 최적화 & 400 DPI급 유지)
function exportPrintPDF() {
  prepareForCleanCapture(async (restore) => {
    const frontEl = document.getElementById('card-front-wrap');
    const backEl = document.getElementById('card-back-wrap');
    const origFrontDisp = frontEl.style.display;
    const origBackDisp = backEl.style.display;

    frontEl.style.display = 'block';
    backEl.style.display = 'block';

    try {
      const bleedPx = parseFloat(document.getElementById('selBleed')?.value || 16.8);
      const bleedMm = bleedPx / 8.4;
      const wMm = 90 + (bleedMm * 2);
      const hMm = 50 + (bleedMm * 2);

      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: [wMm, hMm],
        compress: true
      });

      // 1페이지: 앞면 캡처 후 고밀도 JPEG 압축 삽입
      const frontPng = await captureCardToDataUrl(frontEl, 4);
      const fBg = getComputedStyle(document.documentElement).getPropertyValue('--f-card-bg').trim() || '#223E33';
      const frontJpeg = await compressDataUrlToHighResJpeg(frontPng, fBg);
      pdf.addImage(frontJpeg, 'JPEG', 0, 0, wMm, hMm, undefined, 'FAST');

      // 2페이지: 뒷면 캡처 후 고밀도 JPEG 압축 삽입
      pdf.addPage([wMm, hMm], 'landscape');
      const backPng = await captureCardToDataUrl(backEl, 4);
      const bBg = document.getElementById('cBg')?.value || '#F1FBF5';
      const backJpeg = await compressDataUrlToHighResJpeg(backPng, bBg);
      pdf.addImage(backJpeg, 'JPEG', 0, 0, wMm, hMm, undefined, 'FAST');

      const name = document.getElementById('inStage')?.value.trim() || 'Card';
      pdf.save(`${name}_인쇄소입고용_양면명함(${wMm}x${hMm}mm).pdf`);
    } catch (err) {
      alert('PDF 생성 중 오류가 발생했습니다: ' + err.message);
    } finally {
      frontEl.style.display = origFrontDisp;
      backEl.style.display = origBackDisp;
      restore();
    }
  });
}






// ================= 앞면(Front) 로고 업로드 및 렌더링 =================
let uploadedLogoDataUrl = '';

function handleLogoUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    uploadedLogoDataUrl = e.target.result;
    const modeSel = document.getElementById('selFrontLogoMode');
    if (modeSel) modeSel.value = 'upload';

    // 업로드된 로고 이미지의 모서리(0,0) 원본 픽셀 색상을 직접 추출하여 앞면 배경색과 100% 일치시킴!
    const img = new Image();
    img.onload = () => {
      const cvs = document.createElement('canvas');
      cvs.width = 1;
      cvs.height = 1;
      const ctx = cvs.getContext('2d');
      ctx.drawImage(img, 0, 0, 1, 1, 0, 0, 1, 1);
      const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;

      // 투명 배경(PNG)이 아니라 배경색이 있는 로고라면 그 색상을 앞면 배경색으로 즉시 자동 적용!
      if (a > 200) {
        const hex = '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
        const colMode = document.getElementById('selFrontColorMode');
        const fBgInput = document.getElementById('cFBg');
        if (colMode) colMode.value = 'custom';
        if (fBgInput) fBgInput.value = hex;
      }
      updateFrontCard();
    };
    img.src = uploadedLogoDataUrl;
  };
  reader.readAsDataURL(file);
}


function resetSingleFront(id, defaultVal) {
  const el = document.getElementById(id);
  if (el) {
    el.value = defaultVal;
    updateFrontCard();
  }
}

function updateFrontCard() {
  const fColMode = document.getElementById('selFrontColorMode')?.value || 'custom';
  const pickerWrap = document.getElementById('frontColorPickersWrap');
  if (pickerWrap) {
    pickerWrap.style.display = fColMode === 'custom' ? 'grid' : 'none';
  }

  let fBg, fMain, fSub, fAcc;
  if (fColMode === 'sync') {
    // 뒷면 색상과 100% 동일하게 동기화
    fBg = document.getElementById('cBg')?.value || '#ffffff';
    fMain = document.getElementById('cMain')?.value || '#161616';
    fSub = document.getElementById('cSub')?.value || '#767676';
    fAcc = document.getElementById('cAcc')?.value || '#181818';
  } else if (fColMode === 'invert') {
    // 뒷면과 반전 대비 (뒷면 배경색을 앞면 글자색으로, 뒷면 글자색을 앞면 배경색으로)
    fBg = document.getElementById('cMain')?.value || '#161616';
    fMain = document.getElementById('cBg')?.value || '#ffffff';
    fSub = document.getElementById('cSub')?.value || '#9ca3af';
    fAcc = document.getElementById('cBg')?.value || '#ffffff';
  } else {
    // 앞면 개별 지정 컬러피커 값 사용
    fBg = document.getElementById('cFBg')?.value || '#141517';
    fMain = document.getElementById('cFMain')?.value || '#f3f4f6';
    fSub = document.getElementById('cFSub')?.value || '#9ca3af';
    fAcc = document.getElementById('cFAcc')?.value || '#e5e7eb';
  }

  if (document.getElementById('hFBg')) document.getElementById('hFBg').textContent = fBg.toUpperCase();
  if (document.getElementById('hFMain')) document.getElementById('hFMain').textContent = fMain.toUpperCase();
  if (document.getElementById('hFSub')) document.getElementById('hFSub').textContent = fSub.toUpperCase();
  if (document.getElementById('hFAcc')) document.getElementById('hFAcc').textContent = fAcc.toUpperCase();

  const root = document.documentElement;
  root.style.setProperty('--f-card-bg', fBg);
  root.style.setProperty('--f-text-main', fMain);
  root.style.setProperty('--f-text-sub', fSub);
  root.style.setProperty('--f-accent', fAcc);

  const logoMode = document.getElementById('selFrontLogoMode')?.value || 'monogram';
  const logoSz = document.getElementById('rFLogoSz')?.value || 64;
  const logoFilter = document.getElementById('selLogoFilter')?.value || 'none';
  const layout = document.getElementById('selFrontLayout')?.value || 'center-logo';
  const lineStyle = document.getElementById('selFrontLine')?.value || 'dia-center';
  const mainTxt = document.getElementById('inFrontMainText')?.value.trim() ?? 'AIDEN KIM';
  const subTxt = document.getElementById('inFrontSubText')?.value.trim() ?? '';
  const frameStyle = document.getElementById('selFrameStyle')?.value || 'corner-bracket';

  if (document.getElementById('vFLogoSz')) {
    document.getElementById('vFLogoSz').textContent = logoSz + 'px';
  }
  root.style.setProperty('--f-logo-size', logoSz + 'px');


  // 앞면 전체 구도 클래스 적용
  const trimFront = document.getElementById('trim-front');
  if (trimFront) {
    trimFront.className = 'card-trim-box f-layout-' + layout.toLowerCase();
  }

  // 앞면 외곽 프레임도 뒷면과 통일
  const fFrame = document.getElementById('outFrontFrame');
  if (fFrame) {
    fFrame.className = 'decor-frame' + (frameStyle !== 'none' ? ' ' + frameStyle : '');
  }

  // 로고 영역 렌더링
  const logoArea = document.getElementById('outFrontLogoArea');
  if (logoArea) {
    logoArea.style.display = logoMode === 'none' ? 'none' : 'flex';
    if (logoMode === 'upload') {
      if (uploadedLogoDataUrl) {
        const filterCls = logoFilter !== 'none' ? ' ' + logoFilter : '';
        logoArea.innerHTML = `<img src="${uploadedLogoDataUrl}" class="front-uploaded-logo${filterCls}" alt="Logo" />`;
      } else {
        logoArea.innerHTML = `<div class="front-monogram-badge"><span>LOGO</span></div>`;
      }
    } else if (logoMode === 'monogram') {
      const st = (mainTxt || document.getElementById('inStage')?.value || 'A').trim();
      const initials = st.split(/\s+/).map(w => w[0]).join('').substring(0, 2).toUpperCase();
      logoArea.innerHTML = `<div class="front-monogram-badge"><span>${initials}</span></div>`;
    } else if (logoMode === 'symbol') {
      logoArea.innerHTML = `<div class="front-symbol-mark">◆</div>`;
    } else {
      logoArea.innerHTML = '';
    }
  }

  // 앞면 텍스트 및 부가정보 렌더링
  const fStage = document.getElementById('outFrontStage');
  const fRole = document.getElementById('outFrontRole');
  if (fStage) {
    fStage.textContent = mainTxt;
    fStage.style.display = mainTxt ? 'block' : 'none';
  }
  if (fRole) {
    fRole.textContent = subTxt;
    fRole.style.display = subTxt ? 'block' : 'none';
  }

  // 앞면 하단 포인트 라인
  const lineBox = document.getElementById('outFrontLineBox');
  if (lineBox) {
    lineBox.className = 'front-line-box ' + lineStyle;
    if (lineStyle === 'dia-center' || lineStyle === 'dia-end') {
      lineBox.innerHTML = `<span class="front-line-gem">◆</span>`;
    } else {
      lineBox.innerHTML = '';
    }
  }

  saveStateToLocal();
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
  updateFrontCard();
};

// 일반 16:9 모니터부터 21:9 / 32:9 울트라와이드 모니터까지 완벽 지원하는 1:1 실물 크기 보정
function toggleActualSize() {
  const wrap = document.getElementById('stageWrap');
  const btn = document.getElementById('tabActualSize');
  const isActivating = !wrap.classList.contains('actual-size');

  wrap.classList.toggle('actual-size', isActivating);
  btn?.classList.toggle('active', isActivating);

  let calBar = document.getElementById('actualSizeCalibrator');
  if (!isActivating) {
    if (calBar) calBar.style.display = 'none';
    document.querySelectorAll('.card-bleed-container').forEach(el => {
      el.style.transform = '';
      el.style.margin = '';
    });
    return;
  }

  if (!calBar) {
    calBar = document.createElement('div');
    calBar.id = 'actualSizeCalibrator';
    calBar.style.cssText = 'position:sticky;top:62px;margin:8px auto 0;z-index:35;background:rgba(22,23,26,0.94);border:1px solid #38bdf8;padding:7px 14px;border-radius:8px;display:flex;align-items:center;gap:12px;font-size:11.5px;color:#e2e8f0;box-shadow:0 8px 20px rgba(0,0,0,0.45);';
    const savedInch = localStorage.getItem('user_monitor_inch') || '34';
    calBar.innerHTML = `
      <span style="color:#38bdf8;font-weight:700;"><i class="fa-solid fa-ruler-combined"></i> 실물 90×50mm 보정:</span>
      <label style="display:flex;align-items:center;gap:5px;">
        모니터 대각선 크기
        <input type="number" id="inMonitorInch" value="${savedInch}" min="11" max="57" step="0.5" style="width:52px;background:#121316;border:1px solid #475569;color:#fff;padding:3px 6px;border-radius:4px;font-size:11.5px;text-align:center;" oninput="applyTruePhysicalScale()"> 인치
      </label>
      <span id="outDetectedRes" style="font-size:10.5px;color:#94a3b8;font-family:monospace;"></span>
      <span style="opacity:0.35;">|</span>
      <label style="display:flex;align-items:center;gap:6px;" title="신용카드(가로 85.6mm)나 명함(90mm)을 화면에 대고 미세조절 가능">
        미세조절
        <input type="range" id="rCalScale" min="0.25" max="0.85" step="0.005" value="0.45" style="width:90px;" oninput="applyManualCalScale(this.value)">
        <span id="vCalScale" style="font-family:monospace;color:#818cf8;width:38px;">45%</span>
      </label>
    `;
    const stage = document.querySelector('.studio-stage');
    stage.insertBefore(calBar, wrap);
  } else {
    calBar.style.display = 'flex';
  }

  applyTruePhysicalScale();
}

function applyTruePhysicalScale() {
  const inch = parseFloat(document.getElementById('inMonitorInch')?.value) || 34;
  localStorage.setItem('user_monitor_inch', inch);

  // screen.width와 screen.height는 와이드 모니터(21:9, 32:9 등)의 실제 가로/세로 CSS 픽셀 비율을 그대로 반영함
  const cssW = window.screen.width;
  const cssH = window.screen.height;
  const cssDiag = Math.sqrt(cssW * cssW + cssH * cssH);

  // 1인치(25.4mm)당 CSS 픽셀 수 = 대각선 CSS 픽셀 / 모니터 인치
  const cssPixelsPerMm = (cssDiag / inch) / 25.4;

  // 감지된 와이드 해상도 및 비율 표시
  const resEl = document.getElementById('outDetectedRes');
  if (resEl) {
    const dpr = window.devicePixelRatio || 1;
    resEl.textContent = `(${Math.round(cssW * dpr)}×${Math.round(cssH * dpr)})`;
  }

  // 명함 재단선 가로폭(756px)이 정확히 90mm가 되는 배율 산출
  const target90mmInCssPx = 90 * cssPixelsPerMm;
  const exactScale = Math.min(Math.max(target90mmInCssPx / 756, 0.25), 0.95);

  const slider = document.getElementById('rCalScale');
  if (slider) slider.value = exactScale.toFixed(3);
  applyManualCalScale(exactScale);
}

function applyManualCalScale(scaleVal) {
  const s = parseFloat(scaleVal);
  const badge = document.getElementById('vCalScale');
  if (badge) badge.textContent = Math.round(s * 100) + '%';

  const vMargin = -Math.round((1 - s) * 210);
  document.querySelectorAll('.card-bleed-container').forEach(el => {
    el.style.transform = `scale(${s})`;
    el.style.transformOrigin = 'center center';
    el.style.margin = `${vMargin}px 0`;
  });
}

// [복원] 연락처 및 플레이어 텍스트 안전 변환 함수
function escapeXml(unsafe) {
  return String(unsafe || '').replace(/[<>&'"]/g, c => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}
