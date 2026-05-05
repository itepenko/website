(() => {
  const record = document.querySelector('.record');
  const silophone = document.querySelector('.silophone');
  const playBtn = document.getElementById('record-play');
  const shareBtn = document.getElementById('record-share');
  const clearBtn = document.getElementById('record-clear');

  const shareOverlay = document.getElementById('share-overlay');
  const shareTitleEl = document.getElementById('share-card-title');
  const shareEmojiEl = document.getElementById('share-card-emoji');
  const shareCopyBtn = document.getElementById('share-copy');
  const shareCloseBtn = document.getElementById('share-close');
  const shareNativeBtn = document.getElementById('share-native');

  /** @returns {string} */
  let lastShareText = '';

  const syncRecordWidthToImage = () => {
    if (!record || !silophone) return;
    const w = silophone.getBoundingClientRect().width;
    if (w > 0) record.style.maxWidth = `${w}px`;
  };


  if (silophone) {
    if (silophone.complete) syncRecordWidthToImage();
    silophone.addEventListener('load', syncRecordWidthToImage);
  }
  window.addEventListener('resize', syncRecordWidthToImage);

  const s1 = document.querySelector('.buttons .button:nth-child(1)');
  const s2 = document.querySelector('.buttons .button:nth-child(2)');
  const s3 = document.querySelector('.buttons .button:nth-child(3)');
  const s4 = document.querySelector('.buttons .button:nth-child(4)');
  const s5 = document.querySelector('.buttons .button:nth-child(5)');
  const s6 = document.querySelector('.buttons .button:nth-child(6)');
  const s7 = document.querySelector('.buttons .button:nth-child(7)');
  const s8 = document.querySelector('.buttons .button:nth-child(8)');
  const s9 = document.querySelector('.buttons .button:nth-child(9)');
  const s10 = document.querySelector('.buttons .button:nth-child(10)');
  const s11 = document.querySelector('.buttons .button:nth-child(11)');
  const s12 = document.querySelector('.buttons .button:nth-child(12)');
  const s13 = document.querySelector('.buttons .button:nth-child(13)');
  const s14 = document.querySelector('.buttons .button:nth-child(14)');
  const s15 = document.querySelector('.buttons .button:nth-child(15)');

  if (!s1 && !s2 && !s3 && !s4 && !s5 && !s6 && !s7 && !s8 && !s9 && !s10 && !s11 && !s12 && !s13 && !s14 && !s15) return;

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  const ctx = new AudioContextClass();
  const mix = ctx.createGain();
  mix.gain.value = 1;
  mix.connect(ctx.destination);

  const urlsByKey = {
    g1: 'sound/colors/cut/G1.MP3',
    a1: 'sound/colors/cut/A1.MP3',
    b1: 'sound/colors/cut/B1.MP3',
    c1: 'sound/colors/cut/C1.MP3',
    d1: 'sound/colors/cut/D1.MP3',
    e1: 'sound/colors/cut/E1.MP3',
    f1: 'sound/colors/cut/F1.MP3',
    g2: 'sound/colors/cut/2/G2.MP3',
    a2: 'sound/colors/cut/2/A2.MP3',
    b2: 'sound/colors/cut/2/B2.MP3',
    c2: 'sound/colors/cut/2/C2.MP3',
    d2: 'sound/colors/cut/2/D2.MP3',
    e2: 'sound/colors/cut/2/E2.MP3',
    f2: 'sound/colors/cut/2/F2.MP3',
    g3: 'sound/colors/cut/2/G3.MP3',
  };

  const buffers = new Map();
  const loading = new Map();
  const loadBuffer = async (key) => {
    if (buffers.has(key)) return buffers.get(key);
    if (loading.has(key)) return loading.get(key);
    const url = urlsByKey[key];
    if (!url) return null;

    const p = (async () => {
      const res = await fetch(url);
      const arr = await res.arrayBuffer();
      const buf = await ctx.decodeAudioData(arr);
      buffers.set(key, buf);
      loading.delete(key);
      return buf;
    })().catch((e) => {
      loading.delete(key);
      // eslint-disable-next-line no-console
      console.error('Failed to load', key, url, e);
      return null;
    });

    loading.set(key, p);
    return p;
  };

  const ensureContextRunning = async () => {
    if (ctx.state !== 'running') {
      try {
        await ctx.resume();
      } catch {
        // ignore
      }
    }
  };

  const playKeyAt = async (key, whenSec = ctx.currentTime) => {
    await ensureContextRunning();
    const buf = await loadBuffer(key);
    if (!buf) return null;

    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.connect(mix);
    src.start(whenSec);
    return src;
  };

 
  const history = [];
  let recordStartMs = null;

  const addToRecord = (buttonEl, key) => {
    if (!record || !buttonEl) return;

    const square = document.createElement('div');
    square.className = 'record-item';
    square.style.backgroundColor = getComputedStyle(buttonEl).backgroundColor;
    square.dataset.note = key;
    record.appendChild(square);
  };

  const onNoteClick = (buttonEl, key) => {
    if (!urlsByKey[key]) return;

    const now = Date.now();
    if (recordStartMs == null) recordStartMs = now;
    const atMs = Math.max(0, now - recordStartMs);
    history.push({ key, atMs });

    // immediate play (real-time)
    void playKeyAt(key);
    addToRecord(buttonEl, key);
  };

  s1?.addEventListener('click', () => onNoteClick(s1, 'g1'));
  s2?.addEventListener('click', () => onNoteClick(s2, 'a1'));
  s3?.addEventListener('click', () => onNoteClick(s3, 'b1'));
  s4?.addEventListener('click', () => onNoteClick(s4, 'c1'));
  s5?.addEventListener('click', () => onNoteClick(s5, 'd1'));
  s6?.addEventListener('click', () => onNoteClick(s6, 'e1'));
  s7?.addEventListener('click', () => onNoteClick(s7, 'f1'));

  s8?.addEventListener('click', () => onNoteClick(s8, 'g2'));
  s9?.addEventListener('click', () => onNoteClick(s9, 'a2'));
  s10?.addEventListener('click', () => onNoteClick(s10, 'b2'));
  s11?.addEventListener('click', () => onNoteClick(s11, 'c2'));
  s12?.addEventListener('click', () => onNoteClick(s12, 'd2'));
  s13?.addEventListener('click', () => onNoteClick(s13, 'e2'));
  s14?.addEventListener('click', () => onNoteClick(s14, 'f2'));

  s15?.addEventListener('click', () => onNoteClick(s15, 'g3'));

  let isPlaying = false;
  let stopPlayback = null;
  let playbackTimers = [];
  let playingIndex = -1;

  const letterEmoji = {
    g: '🔵',
    a: '⚪',
    b: '🟣',
    c: '🔴',
    d: '🟠',
    e: '🟡',
    f: '🟢',
  };

  const keyToEmoji = (key) => {
    const ch = String(key || '').trim().charAt(0).toLowerCase();
    return letterEmoji[ch] || '🎵';
  };

  const buildMelodyEmoji = () => history.map(({ key }) => keyToEmoji(key)).join('');

  const getSongTitle = () => document.querySelector('.song h1')?.textContent?.trim() || 'Melody';

  const openShareOverlay = () => {
    if (!shareOverlay || !shareTitleEl || !shareEmojiEl) return;

    const title = getSongTitle();
    const melody = buildMelodyEmoji();

    shareTitleEl.textContent = title;
    shareEmojiEl.textContent = melody || '…';

    lastShareText = `${title}\n${melody}`.trim();
    shareOverlay.hidden = false;
    if (shareNativeBtn) shareNativeBtn.hidden = !navigator.share;
  };

  const closeShareOverlay = () => {
    if (!shareOverlay) return;
    shareOverlay.hidden = true;
  };

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeShareOverlay();
  });

  shareOverlay?.addEventListener('click', (e) => {
    if (e.target === shareOverlay) closeShareOverlay();
  });

  shareCopyBtn?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(lastShareText || buildMelodyEmoji());
    } catch {
      // ignore
    }
  });

  shareCloseBtn?.addEventListener('click', () => closeShareOverlay());

  shareBtn?.addEventListener('click', async () => {
    openShareOverlay();
  });

  shareNativeBtn?.addEventListener('click', async () => {
    if (!navigator.share) return;
    try {
      await navigator.share({
        title: getSongTitle(),
        text: lastShareText || `${getSongTitle()}\n${buildMelodyEmoji()}`.trim(),
      });
    } catch {
    }
  });

  const clearPlayingIndicator = () => {
    if (!record) return;
    record.querySelectorAll('.record-item.is-playing').forEach((el) => el.classList.remove('is-playing'));
    playingIndex = -1;
  };

  const setPlayingIndicator = (index) => {
    if (!record) return;
    clearPlayingIndicator();
    const items = record.querySelectorAll('.record-item');
    const el = items[index];
    if (!el) return;
    el.classList.add('is-playing');
    playingIndex = index;
  };

  playBtn?.addEventListener('click', async () => {
    if (isPlaying) return;
    if (history.length === 0) return;

    isPlaying = true;
    if (playBtn) playBtn.disabled = true;

    try {
      await ensureContextRunning();
      clearPlayingIndicator();

      // timers for UI indicator in sync with audio schedule
      const baseMsForUi = history[0]?.atMs ?? 0;
      playbackTimers = history.map(({ atMs }, idx) =>
        window.setTimeout(() => setPlayingIndicator(idx), Math.max(0, atMs - baseMsForUi))
      );

      // schedule all notes relative to "now"
      const baseMs = history[0]?.atMs ?? 0;
      const startAt = ctx.currentTime + 0.05;
      const sources = [];

      for (const { key, atMs } of history) {
        const whenSec = startAt + (atMs - baseMs) / 1000;
        // eslint-disable-next-line no-await-in-loop
        const src = await playKeyAt(key, whenSec);
        if (src) sources.push(src);
      }

      stopPlayback = () => {
        for (const s of sources) {
          try { s.stop(); } catch { /* ignore */ }
        }
      };

      // wait until the last note should be over (rough estimate)
      const last = history[history.length - 1];
      const lastBuf = await loadBuffer(last.key);
      const totalMs = (last.atMs - baseMs) + Math.ceil(((lastBuf?.duration ?? 1) + 0.1) * 1000);
      await new Promise((r) => setTimeout(r, totalMs));
    } finally {
      isPlaying = false;
      if (playBtn) playBtn.disabled = false;
      stopPlayback = null;
      playbackTimers.forEach((t) => clearTimeout(t));
      playbackTimers = [];
      clearPlayingIndicator();
    }
  });

  clearBtn?.addEventListener('click', () => {
    // stop playback immediately (if it is running)
    try { stopPlayback?.(); } catch { /* ignore */ }
    history.length = 0;
    recordStartMs = null;
    if (record) record.innerHTML = '';
    playbackTimers.forEach((t) => clearTimeout(t));
    playbackTimers = [];
    clearPlayingIndicator();
  });

  const btn = document.getElementById('share-copy');
  const tooltip = document.getElementById('copy-tooltip');

  btn.addEventListener('click', async () => {
  
    tooltip.classList.add('show');

    setTimeout(() => {
      tooltip.classList.remove('show');
    }, 1500);
  });
  
})();

