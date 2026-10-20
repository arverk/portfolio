(() => {
  'use strict';

  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const ICON_EXT = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const ICON_ARROW = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const initials = s => String(s).split(' ').slice(0, 2).map(w => w[0] || '').join('').toUpperCase();
  const fallbackHTML = (label, title) => `<div class="fb"><b>${esc(initials(title))}</b><small>${esc(String(label).toUpperCase())}</small></div>`;
  const FB = 'onerror="this.closest(\'[data-fb]\').classList.add(\'is-fallback\')"';

   const projects = [
    { cat:'dashboard', label:'Dashboard', title:'Design Dashboard Absensi', desc:'Panel absensi untuk SMK Fadlun Nafis.', detail:'Membuat Design Dashboard Portal absensi untuk memantau kehadiran siswa secara real-time, menggantikan pencatatan manual di buku absen.', img:'assets/karya/karya-01.jpg', tool:'figma', design:'https://www.figma.com/design/aV1T74kCnoLecFulLOdJKS/SMK-FADLUN-NAFIS?node-id=36-2', github:'', website:'' },
    { cat:'web', label:'Web & Landing Page', title:'Website Informasi Sekolah', desc:'Website informasi untuk SMK Fadlun Nafis.', detail:'Website profil sekolah berisi informasi umum, program jurusan, dan berita kegiatan.', img:'assets/karya/karya-02.jpg', tool:'web', design:'', github:'https://github.com/setiawanarvin4-sketch/smk-fadlun-nafis', website:'https://smk.fadlunnafis.sch.id/' },
    { cat:'web', label:'Web & Landing Page', title:'Web Katalog Kopi Ranting', desc:'Katalog menu online untuk Kopi Ranting.', detail:'Website katalog menu supaya pelanggan bisa melihat daftar produk tanpa perlu bertanya langsung ke kasir.', img:'assets/karya/karya-03.jpg', tool:'web', design:'', github:'https://github.com/setiawanarvin4-sketch/kopi-ranting', website:'https://tgs-kopiranting.xo.je/' },
    { cat:'web', label:'Web & Landing Page', title:'ArvWear — Toko Online', desc:'Website toko online ArvWear dengan PHP Native', detail:'Membangun website toko online ArvWear menggunakan PHP Native dengan fitur katalog produk, detail produk, dan keranjang belanja. Tantangannya adalah membuat tampilan yang responsif dan alur belanja yang mudah digunakan.', img:'assets/karya/karya-25.jpg', tool:'web', design:'', github:'', website:'http://arvwear.42web.io/' },
    { cat:'social', label:'Sosial Media', title:'Feed Instagram jpra.football', desc:'Template matchday & line-up pemain.', detail:'Merancang dan membuat desain template feed Instagram jpra.football agar tampilan akun konsisten di setiap unggahan.', img:'assets/karya/karya-04.jpg', tool:'canva', design:'', github:'', website:'' },
    { cat:'social', label:'Sosial Media', title:'Konten Matchday jpra.football', desc:'Desain pertandingan untuk feed IG.', detail:'Desain khusus untuk pertandingan sepakbola yang diunggah setelah/sebelum laga mulai/selesai.', img:'assets/karya/karya-05.jpg', tool:'canva', design:'', github:'', website:'' },
    { cat:'social', label:'Sosial Media', title:'Personal Branding Dicky Kurniawan', desc:'Konten media sosial pemain Persijap Jepara.', detail:'Konten personal branding untuk media sosial Dicky Kurniawan, pemain Persijap Jepara, dengan desain visual yang profesional dan menarik.', img:'assets/karya/karya-06.jpg', tool:'canva', design:'https://www.canva.com/design/GANTI-LINK-CANVA/view', github:'', website:'' },
    { cat:'social', label:'Sosial Media', title:'Personal Branding Sudi Abdallah', desc:'Konten media sosial pemain Persijap Jepara.', detail:'Konten personal branding untuk media sosial pribadi Sudi Abdallah, pemain Persijap Jepara.', img:'assets/karya/karya-07.jpg', tool:'canva', design:'', github:'', website:'' },
    { cat:'dashboard', label:'Dashboard', title:'Dashboard Analytics Penjualan', desc:'Dashboard visual untuk memantau dan menganalisis data penjualan dengan mudah.', detail:'Dashboard untuk memantau data penjualan secara ringkas dan terstruktur agar lebih mudah dianalisis dan dipahami.', img:'assets/karya/karya-09.jpg', tool:'figma', design:'https://www.figma.com/design/QbwfbXr49KFMFtZ3oQ5JSU/Arvin-%7C-Semester-Genap?node-id=76-4&t=1MqrCIlzqNKMhhKR-0', github:'', website:'' },
    { cat:'dashboard', label:'Dashboard', title:'Dashboard Banner', desc:'Desain banner dashboard yang informatif dengan tata letak rapi dan visual menarik.', detail:'Desain banner dashboard yang mengutamakan tampilan visual yang menarik, tata letak yang rapi, dan penyampaian informasi yang jelas agar mudah dipahami oleh pengguna.', img:'assets/karya/karya-11.jpg', tool:'figma', design:'', github:'', website:'' },
    { cat:'branding', label:'Logo & Branding', title:'Design Logo', desc:'Merancang dan membuat logo jpra.football', detail:'Merancang logo jpra.football dengan identitas visual yang kuat dan modern untuk membangun branding sepak bola Jepara yang mudah dikenali.', img:'assets/karya/karya-12.jpg', tool:'figma', design:'', github:'', website:'' },
    { cat:'branding', label:'Logo & Branding', title:'Rebrand Sosial Media Manchester United', desc:'Membuat konsep rebranding media sosial Manchester United', detail:'Membuat konsep rebranding media sosial Manchester United dengan desain visual yang konsisten, modern, dan tetap mempertahankan identitas klub.', img:'assets/karya/karya-14.jpg', tool:'canva', design:'', github:'', website:'' },
    { cat:'print', label:'Banner & Poster', title:'Design Komposisi Produk', desc:'Menata elemen visual agar produk terlihat menarik dan lebih menonjol.', detail:'Membuat visual produk yang menarik dan tertata agar produk lebih menonjol serta mudah dikenali.', img:'assets/karya/karya-17.jpg', tool:'figma', design:'https://www.figma.com/design/QbwfbXr49KFMFtZ3oQ5JSU/Arvin-%7C-Semester-Genap?node-id=76-4&t=1MqrCIlzqNKMhhKR-0', github:'', website:'' },
    { cat:'print', label:'Banner & Poster', title:'Poster Turnamen Efootball', desc:'Membuat design untuk match efootball', detail:'Membuat poster turnamen eFootball dengan visual yang menarik, informasi kompetisi yang jelas, dan tata letak yang mudah dipahami.', img:'assets/karya/karya-19.jpg', tool:'canva', design:'', github:'', website:'' },
    { cat:'web', label:'Web & Landing Page', title:'Landing Page Coffe Shop', desc:'Membuat design landing page untuk sebuah website katalog coffe shop', detail:'Membangun landing page Kopi Ranting dengan desain modern untuk menampilkan menu, informasi kafe, dan memudahkan pelanggan melakukan pemesanan melalui WhatsApp.', img:'assets/karya/karya-20.jpg', tool:'figma', design:'', github:'', website:'' },
  ];

  const caseData = [
    { kicker:'Ghalih Antiq', title:'Website furniture untuk Ghalih Antiq',
      desc:'Berkolaborasi dengan Ghalih Antiq membuat website furniture yang menampilkan produk dengan rapi, dengan alur pemesanan langsung lewat WhatsApp agar calon pembeli bisa langsung bertanya dan memesan.',
      tags:['Website Furniture','Pemesanan WhatsApp','Front-End'],
      hero:'assets/work/ghalih-antiq-hero.jpg', mobile:'assets/work/ghalih-antiq-mobile.jpg',
      tool:'web', design:'', github:'', website:'https://ghalihantiq.site.je/', wa:'https://wa.me/62895340049726' },
    { kicker:'Kopi Ranting', title:'Website katalog untuk Kopi Ranting',
      desc:'Membangun website katalog untuk Kopi Ranting agar pelanggan bisa melihat daftar menu dan informasi produk secara online, tanpa perlu bertanya langsung ke kasir.',
      tags:['Web Katalog','UI Design','Front-End'],
      hero:'assets/work/kopi-ranting-hero.jpg', mobile:'assets/work/kopi-ranting-mobile.jpg',
      tool:'web', design:'', github:'https://github.com/setiawanarvin4-sketch/kopi-ranting', website:'http://tgs-kopiranting.xo.je/' },
    { kicker:'SMK Fadlun Nafis', title:'Website informasi & absensi siswa',
      desc:'Mengembangkan website informasi sekolah sekaligus sistem presensi siswa untuk SMK Fadlun Nafis, mempermudah pengelolaan data kehadiran yang sebelumnya dicatat manual.',
      tags:['Web Sekolah','Sistem Absensi','Dashboard'],
      hero:'assets/work/fadlun-nafis-hero.jpg', mobile:'assets/work/fadlun-nafis-mobile.jpg',
      tool:'web', design:'', github:'https://github.com/setiawanarvin4-sketch/smk-fadlun-nafis', website:'https://smk.fadlunnafis.sch.id' },
    { kicker:'Persijap Jepara', title:'Konten kreatif untuk pemain Persijap Jepara',
      desc:'Berkolaborasi dengan dua pemain Persijap Jepara, Dicky Kurniawan dan Sudi Abdallah, untuk membuat desain matchday dan konten personal branding yang mereka gunakan di media sosial masing-masing.',
      tags:['Matchday Design','Personal Branding','Social Media'],
      hero:'assets/work/persijap-jepara-hero.jpg', mobile:'assets/work/persijap-jepara-mobile.jpg',
      tool:'canva', design:'https://canva.link/match-day-arvin-erik-setiawan', github:'', website:'' },
    { kicker:'jpra.football', title:'Merancang feed Instagram jpra.football',
      desc:'Dipercaya jpra.football untuk merancang tampilan feed Instagram-nya — mulai dari template matchday, line-up pemain, hingga update hasil pertandingan, supaya akunnya terlihat konsisten.',
      tags:['Instagram Feed','Konten Olahraga','Template Design'],
      hero:'assets/work/jpra-football-hero.jpg', mobile:'assets/work/jpra-football-mobile.jpg',
      tool:'canva', design:'https://canva.link/fotball-jepara', github:'', website:'' },
  ];

  const testimonials = [
    { name:'Dicky Kurniawan', role:'Pemain Persijap Jepara', quote:'Sangat puas dengan hasil desainnya, Terima kasih banyak!', avatar:'assets/testimoni/avatar-01.jpg', proof:'assets/testimoni/bukti-01.jpg' },
    { name:'Sudi Abdallah', role:'Pemain Persijap Jepara', quote:'The design is exactly what I wanted.', avatar:'assets/testimoni/avatar-02.jpg', proof:'assets/testimoni/bukti-02.jpg' },
    { name:'jpra.football', role:'Pengelola Akun Instagram', quote:'Kami ingin bekerja sama untuk membuat desain di setiap postingan Instagram Jepara Football.', avatar:'assets/testimoni/avatar-03.jpg', proof:'assets/testimoni/bukti-03.jpg' },
  ];

  // Logo resmi. Setiap tool punya beberapa sumber (Simple Icons, lalu Iconify).
  // Kalau satu sumber gagal dimuat, otomatis mencoba sumber berikutnya, dan terakhir tampil inisial.
  const SI = 'https://cdn.simpleicons.org/';
  const IC = 'https://api.iconify.design/';
  const tools = [
    { name:'Illustrator', srcs:[SI+'adobeillustrator/FF9A00', IC+'logos/adobe-illustrator.svg', IC+'simple-icons/adobeillustrator.svg?color=%23FF9A00'] },
    { name:'Figma',       srcs:[SI+'figma/F24E1E', IC+'logos/figma.svg'] },
    { name:'Canva',       srcs:[SI+'canva/00C4CC', IC+'simple-icons/canva.svg?color=%2300C4CC', IC+'logos/canva.svg'] },
    { name:'VS Code',     srcs:[SI+'visualstudiocode/007ACC', IC+'logos/visual-studio-code.svg'] },
    { name:'GitHub',      srcs:[SI+'github/181717', IC+'simple-icons/github.svg?color=%23181717'] },
    { name:'HTML',        srcs:[SI+'html5/E34F26', IC+'logos/html-5.svg'] },
    { name:'CSS',         srcs:[SI+'css3/1572B6', IC+'logos/css-3.svg'] },
    { name:'JavaScript',  srcs:[SI+'javascript/F7DF1E', IC+'logos/javascript.svg'] },
    { name:'Vercel',      srcs:[SI+'vercel/000000', IC+'logos/vercel-icon.svg'] },
  ];
  // Pindah ke sumber logo berikutnya saat gambar gagal dimuat
  window.nextIcon = function(img){
    const list = img.dataset.srcs.split(' ');
    const n = (+img.dataset.n || 0) + 1;
    if (n < list.length){ img.dataset.n = n; img.src = list[n]; }
    else { img.style.display = 'none'; img.nextElementSibling.style.display = 'flex'; }
  };

  const tickerItems = ['Ghalih Antiq', 'Pemain Persijap Jepara', 'jpra.football', 'Kopi Ranting', 'SMK Fadlun Nafis'];

  /* ---------- CTA ---------- */
  function ctaHTML(item){
    const btns = [];
    if (item.wa) btns.push(`<a class="btn btn-primary" href="${esc(item.wa)}" target="_blank" rel="noopener noreferrer" aria-label="Pesan via WhatsApp (buka di tab baru)">Pesan via WhatsApp${ICON_EXT}</a>`);
    if (item.design && item.tool !== 'web'){
      const label = item.tool === 'figma' ? 'Lihat di Figma' : 'Lihat di Canva';
      btns.push(`<a class="btn btn-primary" href="${esc(item.design)}" target="_blank" rel="noopener noreferrer" aria-label="${label} (buka di tab baru)">${label}${ICON_EXT}</a>`);
    }
    if (item.website) btns.push(`<a class="btn btn-ghost" href="${esc(item.website)}" target="_blank" rel="noopener noreferrer" aria-label="Kunjungi website (buka di tab baru)">Kunjungi Website${ICON_EXT}</a>`);
    if (item.github)  btns.push(`<a class="btn btn-ghost" href="${esc(item.github)}" target="_blank" rel="noopener noreferrer" aria-label="Lihat di GitHub (buka di tab baru)">Lihat di GitHub${ICON_EXT}</a>`);
    return btns.join('');
  }

  /* ---------- RENDER ---------- */
  function renderTicker(){
    const items = [...tickerItems, ...tickerItems].map(t => `<span><b>${esc(t)}</b></span>`).join('');
    $('#tickerTrack').innerHTML = items;
  }

  function renderCases(){
    $('#caseList').innerHTML = caseData.map((c, i) => `
      <article class="case reveal">
        <div>
          <span class="case-kicker">${esc(c.kicker)}</span>
          <h3>${esc(c.title)}</h3>
          <p>${esc(c.desc)}</p>
          <div class="tags">${c.tags.map(t => `<span class="tag">${esc(t)}</span>`).join('')}</div>
          <button class="case-link" type="button" data-case="${i}">Lihat detail & tautan
            ${ICON_ARROW}</button>
        </div>
        <button class="case-mock" type="button" data-case="${i}" aria-label="Lihat detail ${esc(c.title)}">
          <div class="browser">
            <div class="browser-bar"><i></i><i></i><i></i></div>
            <div class="screen fit" data-fb style="--bg-img:url('${esc(c.hero)}')">
              <img src="${esc(c.hero)}" alt="Tampilan homepage ${esc(c.kicker)}" loading="lazy" ${FB} />
              ${fallbackHTML('homepage', c.kicker)}
            </div>
          </div>
          <div class="phone">
            <div class="screen fit" data-fb style="--bg-img:url('${esc(c.mobile)}')">
              <img src="${esc(c.mobile)}" alt="Tampilan mobile ${esc(c.kicker)}" loading="lazy" ${FB} />
              ${fallbackHTML('mobile', c.kicker)}
            </div>
          </div>
        </button>
      </article>`).join('');
  }

  function renderTestimonials(){
    $('#testiGrid').innerHTML = testimonials.map((t, i) => `
      <article class="testi spot reveal d${(i % 3) + 1}">
        <div class="testi-top">
          <div class="avatar" data-fb>
            <img src="${esc(t.avatar)}" alt="${esc(t.name)}" loading="lazy" ${FB} />
            ${fallbackHTML('', t.name)}
          </div>
          <div>
            <div class="testi-name">${esc(t.name)}</div>
            <div class="testi-role">${esc(t.role)}</div>
          </div>
        </div>
        <p class="testi-quote">"${esc(t.quote)}"</p>
        <button class="proof" type="button" data-proof="${i}">
          <span class="thumb" data-fb>
            <img src="${esc(t.proof)}" alt="" loading="lazy" ${FB} />
            <span class="fb" style="position:absolute;inset:0"><b style="font-size:11px">IMG</b></span>
          </span>
          Lihat bukti kolaborasi
        </button>
      </article>`).join('');
  }

  let activeFilter = 'all';
  function renderFilters(){
    const cats = [
      ['all','Semua'],['dashboard','Dashboard'],['branding','Logo & Branding'],['print','Banner & Poster'],
      ['social','Sosial Media'],['web','Web & Landing Page'],['app','Mobile App'],
    ];
    $('#filters').innerHTML = cats.map(([k, label]) =>
      `<button class="filter${k === 'all' ? ' active' : ''}" type="button" data-filter="${k}" aria-pressed="${k === 'all'}">${label}</button>`).join('');
  }

  function renderWork(){
    $('#workGrid').innerHTML = projects.map((p, i) => `
      <article class="work-card spot reveal" data-stagger="${(i % 6) * 80}" data-index="${i}" data-cat="${p.cat}" role="button" tabindex="0" aria-label="Lihat detail ${esc(p.title)}">
        <div class="thumb fit" data-fb style="--bg-img:url('${esc(p.img)}')">
          <img src="${esc(p.img)}" alt="${esc(p.title)}" loading="lazy" ${FB} />
          ${fallbackHTML(p.label, p.title)}
        </div>
        <div class="work-body">
          <span class="work-cat">${esc(p.label)}</span>
          <h4>${esc(p.title)}</h4>
          <p>${esc(p.desc)}</p>
          <span class="work-more">Lihat detail ${ICON_ARROW}</span>
        </div>
      </article>`).join('');
  }

  function renderTools(){
    $('#toolsGrid').innerHTML = tools.map((t, i) => `
      <div class="tool reveal d${(i % 3) + 1}">
        <div class="tool-badge">
          <img src="${t.srcs[0]}" data-srcs="${t.srcs.join(' ')}" data-n="0" alt="Logo ${esc(t.name)}"
               loading="lazy" decoding="async" onerror="nextIcon(this)" />
          <span class="fb" style="display:none"><b>${esc(initials(t.name))}</b></span>
        </div>
        <span>${esc(t.name)}</span>
      </div>`).join('');
  }

  /* ---------- FILTER ---------- */
  function applyFilter(key){
    activeFilter = key;
    $$('.filter').forEach(b => {
      const on = b.dataset.filter === key;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', String(on));
    });
    let shown = 0;
    $$('.work-card').forEach(card => {
      const show = key === 'all' || card.dataset.cat === key;
      card.classList.toggle('hidden', !show);
      if (show){ shown++; if (!reduceMotion){ card.classList.remove('anim'); void card.offsetWidth; card.classList.add('anim'); } }
    });
    $('#filterCount').textContent = `Menampilkan ${shown} karya`;
  }

  /* ---------- MODAL ---------- */
  const modal = $('#modal');
  let lastFocus = null;

  /* ---------- GALERI TAMBAHAN (otomatis) ----------
     Taruh gambar tambahan dengan pola nama -2, -3, dst. Contoh: karya-06-2.jpg, karya-06-3.jpg.
     Website mendeteksi file yang ada dan menampilkannya di pop-up. Tidak perlu ubah kode. */
  const EXTS = ['jpg', 'jpeg', 'png', 'webp'];
  const MAX_EXTRA = 11; // mendeteksi -2 sampai -12
  const probeCache = new Map();
  function probe(src){
    return new Promise(res => { const im = new Image(); im.onload = () => res(true); im.onerror = () => res(false); im.src = src; });
  }
  async function findExtras(base){
    if (probeCache.has(base)) return probeCache.get(base);
    const jobs = [];
    for (let k = 2; k <= MAX_EXTRA + 1; k++){
      jobs.push((async () => {
        for (const ext of EXTS){
          const src = `${base}-${k}.${ext}`;
          if (await probe(src)) return src;
        }
        return null;
      })());
    }
    const found = (await Promise.all(jobs)).filter(Boolean);
    probeCache.set(base, found);
    return found;
  }

  /* ---------- LIGHTBOX (pratinjau penuh, bisa geser) ---------- */
  const ICON_X = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
  const ICON_L = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15 6l-6 6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const ICON_R = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.id = 'lightbox';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.setAttribute('aria-label', 'Pratinjau gambar');
  lb.innerHTML = `
    <button class="lb-btn lb-close" type="button" aria-label="Tutup">${ICON_X}</button>
    <button class="lb-btn lb-prev" type="button" aria-label="Gambar sebelumnya">${ICON_L}</button>
    <img alt="" />
    <button class="lb-btn lb-next" type="button" aria-label="Gambar berikutnya">${ICON_R}</button>
    <span class="lb-count" aria-live="polite"></span>`;
  document.body.appendChild(lb);
  const lbImg = lb.querySelector('img');
  const lbCount = lb.querySelector('.lb-count');
  const lbPrev = lb.querySelector('.lb-prev');
  const lbNext = lb.querySelector('.lb-next');
  let lbList = [], lbIndex = 0, lbLastFocus = null, touchX = null;

  function lbShow(i){
    if (!lbList.length) return;
    lbIndex = (i + lbList.length) % lbList.length;
    lbImg.src = lbList[lbIndex];
    lbImg.alt = `Gambar ${lbIndex + 1} dari ${lbList.length}`;
    const multi = lbList.length > 1;
    lbCount.textContent = `${lbIndex + 1} / ${lbList.length}`;
    lbCount.hidden = !multi; lbPrev.hidden = !multi; lbNext.hidden = !multi;
  }
  function openLB(list, i){
    lbList = list;
    lbLastFocus = document.activeElement;
    lb.classList.add('open');
    lbShow(i);
    lb.querySelector('.lb-close').focus({ preventScroll: true });
  }
  function closeLB(){
    lb.classList.remove('open');
    lbImg.removeAttribute('src');
    if (lbLastFocus) lbLastFocus.focus({ preventScroll: true });
  }
  lb.querySelector('.lb-close').addEventListener('click', closeLB);
  lbPrev.addEventListener('click', e => { e.stopPropagation(); lbShow(lbIndex - 1); });
  lbNext.addEventListener('click', e => { e.stopPropagation(); lbShow(lbIndex + 1); });
  lb.addEventListener('click', e => { if (e.target === lb) closeLB(); });
  lb.addEventListener('pointerdown', e => { touchX = e.clientX; });
  lb.addEventListener('pointerup', e => {
    if (touchX === null) return;
    const dx = e.clientX - touchX; touchX = null;
    if (Math.abs(dx) > 50) lbShow(lbIndex + (dx < 0 ? 1 : -1));
  });
  // Didaftarkan lebih awal dari listener modal, dan menghentikan propagasi agar Esc tidak menutup modal sekaligus
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape'){ e.stopImmediatePropagation(); closeLB(); }
    else if (e.key === 'ArrowRight'){ e.stopImmediatePropagation(); lbShow(lbIndex + 1); }
    else if (e.key === 'ArrowLeft'){ e.stopImmediatePropagation(); lbShow(lbIndex - 1); }
  });

  /* ---------- MODAL ---------- */
  let modalToken = 0;
  let currentGallery = [];
  function galleryHTML(list, title, cat){
    return list.map((src, i) => `
      <button class="modal-gallery-item fit" type="button" data-fb data-gi="${i}" style="--bg-img:url('${esc(src)}')" aria-label="Perbesar gambar ${i + 1} dari ${list.length}">
        <img src="${esc(src)}" alt="${esc(title)} — gambar ${i + 1}" loading="lazy" ${FB} />
        ${fallbackHTML(cat, title)}
      </button>`).join('');
  }
  function renderGallery(list, title, cat){
    const wrap = $('#modalGalleryWrap');
    if (list.length > 1){
      wrap.hidden = false;
      $('#modalGallery').innerHTML = galleryHTML(list, title, cat);
    } else {
      wrap.hidden = true;
      $('#modalGallery').innerHTML = '';
    }
  }
  $('#modalMedia').addEventListener('click', () => openLB(currentGallery, 0));
  $('#modalGallery').addEventListener('click', e => {
    const b = e.target.closest('[data-gi]');
    if (b) openLB(currentGallery, +b.dataset.gi);
  });

  function openModal({ cat, title, desc, images, tags, item }){
    lastFocus = document.activeElement;
    const token = ++modalToken;
    const list = (images || []).filter(Boolean);
    const hero = list[0] || '';
    // pola nama dasar untuk mencari galeri tambahan, misalnya assets/karya/karya-06 atau assets/work/persijap-jepara
    const base = hero.replace(/(-hero)?\.(jpg|jpeg|png|webp)$/i, '');

    $('#modalCat').textContent = cat;
    $('#modalTitle').textContent = title;
    $('#modalDesc').textContent = desc;
    $('#modalMedia').innerHTML = `
      <div class="modal-fit" data-fb style="--bg-img:url('${esc(hero)}')">
        <img src="${esc(hero)}" alt="${esc(title)}" ${FB} />
        ${fallbackHTML(cat, title)}
      </div>`;
    $('#modalTags').innerHTML = (tags || []).map(t => `<span class="tag">${esc(t)}</span>`).join('');

    const cta = item ? ctaHTML(item) : '';
    $('#modalCta').innerHTML = cta;
    $('#modalCta').style.display = cta ? '' : 'none';

    currentGallery = list;
    renderGallery(list, title, cat);

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    modal.scrollTop = 0;
    $('#modalClose').focus({ preventScroll: true });

    if (base){
      findExtras(base).then(extra => {
        if (token !== modalToken || !extra.length) return;
        currentGallery = [...list, ...extra.filter(x => !list.includes(x))];
        renderGallery(currentGallery, title, cat);
      });
    }
  }

  function closeModal(){
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }

  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  $('#modalClose').addEventListener('click', closeModal);
  document.addEventListener('keydown', e => {
    if (!modal.classList.contains('open') || lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'Tab'){
      const f = $$('button, a[href]', modal).filter(el => el.offsetParent !== null);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
    }
  });

  /* ---------- EVENT DELEGATION ---------- */
  $('#workGrid').addEventListener('click', e => {
    const card = e.target.closest('.work-card'); if (!card) return;
    const p = projects[+card.dataset.index];
    openModal({ cat: p.label, title: p.title, desc: p.detail || p.desc, images: [p.img], tags: [p.label], item: p });
  });
  $('#workGrid').addEventListener('keydown', e => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('work-card')){ e.preventDefault(); e.target.click(); }
  });

  $('#caseList').addEventListener('click', e => {
    const el = e.target.closest('[data-case]'); if (!el) return;
    const c = caseData[+el.dataset.case];
    openModal({ cat: c.kicker, title: c.title, desc: c.desc, images: [c.hero, c.mobile], tags: c.tags, item: c });
  });

  $('#testiGrid').addEventListener('click', e => {
    const el = e.target.closest('[data-proof]'); if (!el) return;
    const t = testimonials[+el.dataset.proof];
    openModal({ cat: t.role, title: t.name, desc: 'Tangkapan layar atau foto pendukung kolaborasi.', images: [t.proof] });
  });

  $('#filters').addEventListener('click', e => {
    const b = e.target.closest('.filter'); if (b) applyFilter(b.dataset.filter);
  });

  /* ---------- HEADER / NAV ---------- */
  const menuBtn = $('#menuBtn'), panel = $('#mobilePanel');
  const setMenu = open => {
    panel.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
  };
  menuBtn.addEventListener('click', () => setMenu(!panel.classList.contains('open')));
  panel.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

  const sections = $$('main section[id]');
  const navLinks = $$('.nav-links a');
  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting){
        navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => navObserver.observe(s));

  const progress = $('#progress');
  const header = $('#top');
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.width = (max > 0 ? (scrollY / max) * 100 : 0) + '%';
    header.style.boxShadow = scrollY > 10 ? '0 10px 30px -18px rgba(0,0,0,.5)' : 'none';
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- REVEAL ---------- */
  const reveal = new IntersectionObserver((entries, obs) => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target, delay = +(el.dataset.stagger || 0);
      setTimeout(() => el.classList.add('in'), reduceMotion ? 0 : delay);
      obs.unobserve(el);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  function observeReveals(){ $$('.reveal:not(.in)').forEach(el => reveal.observe(el)); }

  /* ---------- TILT (desktop only, subtle) ---------- */
  if (matchMedia('(hover:hover) and (pointer:fine)').matches && !reduceMotion){
    document.addEventListener('pointermove', e => {
      const card = e.target.closest && e.target.closest('.case-mock');
      if (!card) return;
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      card.querySelector('.browser').style.transform = `perspective(900px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
    });
    document.addEventListener('pointerout', e => {
      const card = e.target.closest && e.target.closest('.case-mock');
      if (card) card.querySelector('.browser').style.transform = '';
    });
  }

  /* ---------- COPY EMAIL ---------- */
  const toast = $('#toast');
  let toastTimer;
  const showToast = msg => {
    toast.textContent = msg; toast.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
  };
  $('#copyEmail').addEventListener('click', async e => {
    const email = e.currentTarget.dataset.email;
    try { await navigator.clipboard.writeText(email); showToast('Email berhasil disalin'); }
    catch { showToast(email); }
  });

  /* ---------- THEME ---------- */
  $('#themeToggle').addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('portfolio-theme', next); } catch {}
    document.querySelector('meta[name="theme-color"]').setAttribute('content', next === 'dark' ? '#0B0C0D' : '#F6F4EF');
  });

  /* ---------- ANIMASI INTERAKTIF ---------- */
  const finePointer = matchMedia('(hover:hover) and (pointer:fine)').matches && !reduceMotion;

  // Gambar fade-in saat sudah dimuat
  const markLoaded = img => img.classList.add('loaded');
  document.addEventListener('load', e => { if (e.target instanceof HTMLImageElement) markLoaded(e.target); }, true);
  $$('img').forEach(img => { if (img.complete && img.naturalWidth > 0) markLoaded(img); });

  // Angka naik (counter) di chip hero
  function countUp(el){
    const to = +el.dataset.count, suffix = el.dataset.suffix || '';
    if (reduceMotion){ el.textContent = to + suffix; return; }
    const t0 = performance.now(), dur = 1400;
    const step = now => {
      const p = Math.min((now - t0) / dur, 1);
      el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    el.textContent = '0' + suffix;
    requestAnimationFrame(step);
  }
  const countObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(en => { if (en.isIntersecting){ countUp(en.target); obs.unobserve(en.target); } });
  }, { threshold: 0.6 });
  $$('[data-count]').forEach(el => countObserver.observe(el));

  // Efek ripple saat diklik / disentuh (sentuhan juga dapat umpan balik)
  if (!reduceMotion){
    document.addEventListener('pointerdown', e => {
      const el = e.target.closest('.btn, .filter, .icon-btn, .proof, .case-link, .back');
      if (!el) return;
      const r = el.getBoundingClientRect();
      const size = Math.max(r.width, r.height) * 2;
      const span = document.createElement('span');
      span.className = 'ripple';
      span.style.width = span.style.height = size + 'px';
      span.style.left = (e.clientX - r.left - size / 2) + 'px';
      span.style.top = (e.clientY - r.top - size / 2) + 'px';
      el.appendChild(span);
      span.addEventListener('animationend', () => span.remove());
    }, { passive: true });
  }

  // Tombol kembali ke atas
  const toTop = $('#toTop');
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));
  addEventListener('scroll', () => toTop.classList.toggle('show', scrollY > 600), { passive: true });

  // Efek khusus mouse (desktop): sorot kursor, tombol magnet, parallax foto hero
  if (finePointer){
    const glow = $('#cursorGlow');
    let gx = innerWidth / 2, gy = innerHeight / 2, tx = gx, ty = gy;
    addEventListener('pointermove', e => { tx = e.clientX; ty = e.clientY; glow.style.opacity = '1'; }, { passive: true });
    (function loop(){
      gx += (tx - gx) * 0.12; gy += (ty - gy) * 0.12;
      glow.style.transform = `translate(${gx}px, ${gy}px)`;
      requestAnimationFrame(loop);
    })();

    document.addEventListener('pointermove', e => {
      const t = e.target;
      const sp = t.closest && t.closest('.spot');
      if (sp){
        const r = sp.getBoundingClientRect();
        sp.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        sp.style.setProperty('--my', (e.clientY - r.top) + 'px');
      }
      const mg = t.closest && t.closest('.magnetic');
      if (mg){
        const r = mg.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * 0.25;
        const y = (e.clientY - (r.top + r.height / 2)) * 0.3;
        mg.style.transform = `translate(${x}px, ${y}px)`;
      }
    }, { passive: true });
    document.addEventListener('pointerout', e => {
      const mg = e.target.closest && e.target.closest('.magnetic');
      if (mg && !mg.contains(e.relatedTarget)) mg.style.transform = '';
    });

    const hero = $('#home'), heroPhoto = $('.hero-photo');
    hero.addEventListener('pointermove', e => {
      const r = hero.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      heroPhoto.style.transform = `translate(${x * -18}px, ${y * -14}px)`;
    });
    hero.addEventListener('pointerleave', () => { heroPhoto.style.transform = ''; });
  }

  /* ---------- INIT ---------- */
  $('#year').textContent = new Date().getFullYear();
  renderTicker();
  renderCases();
  renderTestimonials();
  renderFilters();
  renderWork();
  renderTools();
  applyFilter('all');
  observeReveals();
})();