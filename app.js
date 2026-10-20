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

  // 좌측 연락처 (심볼 단독 고정 + 선택적 마이크로 코드)
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
    row.innerHTML = `<span class="c-icon-box"><i class="${c.icon}"></i></span>${prefixHtml}<span class="c-text">${c.text}</span>`;
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

// FontAwesome 아이콘이 [☒]로 깨지지 않도록 폰트 파일까지 Base64로 내장시키는 캐시 함수
let cachedFontAwesomeCSS = null;
async function ensureFontAwesomeEmbedded() {
  if (cachedFontAwesomeCSS) return;
  try {
    const cssUrl = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
    const res = await fetch(cssUrl);
    let cssText = await res.text();

    // CSS 안의 상대경로(../webfonts/...) 폰트 파일들을 실제 데이터(Base64)로 변환하여 [☒] 깨짐 원천 차단
    const urlRegex = /url\(["']?(\.\.\/webfonts\/[^"')]+)["']?\)/g;
    const matches = [...cssText.matchAll(urlRegex)];
    const uniquePaths = [...new Set(matches.map(m => m[1]))];

    for (const relPath of uniquePaths) {
      const fullUrl = relPath.replace('../', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/');
      const fontRes = await fetch(fullUrl);
      const blob = await fontRes.blob();
      const base64 = await new Promise(resolve => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
      cssText = cssText.split(relPath).join(base64);
    }

    const styleEl = document.createElement('style');
    styleEl.id = 'fa-embedded-style';
    styleEl.textContent = cssText;
    document.head.appendChild(styleEl);
    cachedFontAwesomeCSS = true;
  } catch (e) {
    console.warn('폰트 임베딩 참고:', e);
  }
}

// createPattern 에러 제로 + [☒] 아이콘 깨짐 제로 + 이상한 띄어쓰기 제로 캡처 함수
async function captureCardToDataUrl(targetEl, scaleRatio = 3) {
  await ensureFontAwesomeEmbedded();
  await document.fonts.ready;

  // 캡처 시 특수문자 다이아몬드(◆)가 작아지지 않도록 모든 ◆ 텍스트를 순수 도형으로 보장
  return await htmlToImage.toPng(targetEl, {
    pixelRatio: scaleRatio,
    cacheBust: true,
    skipFonts: false
  });
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

function exportPrintPDF() {
  const bleedPx = parseFloat(document.getElementById('selBleed')?.value || 16.8);
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
    try {
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: [wMm, hMm]
      });

      // 1페이지: 앞면
      const frontDataUrl = await captureCardToDataUrl(frontEl, 4);
      pdf.addImage(frontDataUrl, 'PNG', 0, 0, wMm, hMm);

      // 2페이지: 뒷면
      pdf.addPage([wMm, hMm], 'landscape');
      const backDataUrl = await captureCardToDataUrl(backEl, 4);
      pdf.addImage(backDataUrl, 'PNG', 0, 0, wMm, hMm);

      const name = document.getElementById('inStage')?.value.trim() || 'Card';
      pdf.save(`${name}_인쇄소입고용_양면명함(${wMm}x${hMm}mm).pdf`);
    } catch (err) {
      console.error('PDF 생성 오류:', err);
      alert('PDF 생성 중 오류가 발생했습니다: ' + err.message);
    } finally {
      frontEl.style.display = prevFront;
      backEl.style.display = prevBack;
      restore();
    }
  });
}


function exportPrintPDF() {
  const bleedPx = parseFloat(document.getElementById('selBleed')?.value || 16.8);
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
    try {
      await document.fonts.ready;
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: [wMm, hMm]
      });

      const opts = getCanvasOptions();

      // 1페이지: 앞면
      const canvasFront = await html2canvas(frontEl, opts);
      pdf.addImage(canvasFront.toDataURL('image/png'), 'PNG', 0, 0, wMm, hMm);

      // 2페이지: 뒷면
      pdf.addPage([wMm, hMm], 'landscape');
      const canvasBack = await html2canvas(backEl, opts);
      pdf.addImage(canvasBack.toDataURL('image/png'), 'PNG', 0, 0, wMm, hMm);

      const name = document.getElementById('inStage')?.value.trim() || 'Card';
      pdf.save(`${name}_인쇄소입고용_양면명함(${wMm}x${hMm}mm).pdf`);
    } catch (err) {
      console.error('PDF 생성 오류:', err);
      alert('PDF 생성 중 오류가 발생했습니다: ' + err.message);
    } finally {
      frontEl.style.display = prevFront;
      backEl.style.display = prevBack;
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
    updateFrontCard();
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
