// =============================================
// Um Pato e um Sonho - main.js
// v0.0.7 — Joystick fix + HUD safe area guard
// Three.js r128 — PlaneGeometry (WebView fix)
// =============================================

const IMGS = {
  idle1:     "BASE64_REMOVIDO",
  idle2:     "BASE64_REMOVIDO",
  walk1:     "BASE64_REMOVIDO",
  walk2:     "BASE64_REMOVIDO",
  arvore:    "BASE64_REMOVIDO",
  rocha:     "BASE64_REMOVIDO",
  rabbit:    "BASE64_REMOVIDO",
  healthbar: "BASE64_REMOVIDO",
};

const WORLD_W      = 2400;
const WORLD_H      = 2400;
const PLAYER_SPEED = 180;
const ANIM_MS      = 120;

// ---- SAFE AREA (Android WebView fix) ----
let safeTop = 0, safeLeft = 0;
function calcSafeArea() {
  // v0.0.7 — guard: safe area nunca negativa e nunca maior que 20% da tela.
  const style = getComputedStyle(document.documentElement);
  const cssTop  = style.getPropertyValue('--sat').trim();
  const cssLeft = style.getPropertyValue('--sal').trim();
  const rawTop  = parseInt(cssTop)  || 0;
  const rawLeft = parseInt(cssLeft) || 0;
  const maxSafe = Math.round(window.innerHeight * 0.20);
  safeTop  = Math.max(0, Math.min(rawTop,  maxSafe));
  safeLeft = Math.max(0, Math.min(rawLeft, Math.round(window.innerWidth * 0.10)));
  // Fallback: estimativa conservadora apenas se tela notch detectada
  if (safeTop === 0 && window.innerHeight < window.screen.height * 0.96) {
    safeTop = Math.min(24, Math.round(window.innerHeight * 0.03));
  }
}

// ---- WEBGL CHECK ----
(function() {
  try {
    const c = document.createElement('canvas');
    if (!(c.getContext('webgl') || c.getContext('experimental-webgl'))) throw 0;
  } catch(e) {
    document.body.innerHTML = '<div style="color:#fff;font-family:monospace;padding:40px;text-align:center;margin-top:40vh">WebGL não disponível neste dispositivo.</div>';
    throw new Error('WebGL indisponível');
  }
})();

// ---- RENDERER ----
const renderer = new THREE.WebGLRenderer({ antialias:false, powerPreference:'high-performance', alpha:false });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x5a8f3c);
renderer.sortObjects = true;
document.getElementById('game-canvas').appendChild(renderer.domElement);

// ---- CAMERA ----
const VIEW_H = 400;
let VIEW_W = VIEW_H * (window.innerWidth / window.innerHeight);
const camera = new THREE.OrthographicCamera(-VIEW_W/2, VIEW_W/2, VIEW_H/2, -VIEW_H/2, 0.1, 2000);
camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);
const scene = new THREE.Scene();

// ---- TEXTURA NATIVA (WebView fix) ----
function loadTexNative(src) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => {
      const tex = new THREE.Texture(img);
      tex.magFilter = tex.minFilter = THREE.NearestFilter;
      tex.needsUpdate = true;
      resolve(tex);
    };
    img.onerror = () => {
      const cv = document.createElement('canvas'); cv.width = cv.height = 8;
      cv.getContext('2d').fillStyle = '#ff00ff'; cv.getContext('2d').fillRect(0,0,8,8);
      const t = new THREE.CanvasTexture(cv);
      t.magFilter = t.minFilter = THREE.NearestFilter;
      resolve(t);
    };
    img.src = src;
  });
}

function makeMesh(tex, w, h) {
  const mat = new THREE.MeshBasicMaterial({ map:tex, transparent:true, alphaTest:0.05, depthWrite:false, side:THREE.DoubleSide });
  return new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
}

// ---- GROUND ----
function makeGround() {
  const cv = document.createElement('canvas'); cv.width = cv.height = 256;
  const ctx = cv.getContext('2d');
  const cols = ['#4e7f34','#5a8f3c','#62973f','#4a7830','#5c9140'];
  ctx.fillStyle = '#5a8f3c'; ctx.fillRect(0,0,256,256);
  for (let i=0;i<600;i++) {
    ctx.fillStyle = cols[Math.floor(Math.random()*cols.length)];
    ctx.fillRect(Math.floor(Math.random()*64)*4, Math.floor(Math.random()*64)*4, 4, 4);
  }
  const t = new THREE.CanvasTexture(cv);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(WORLD_W/128, WORLD_H/128);
  t.magFilter = t.minFilter = THREE.NearestFilter;
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(WORLD_W, WORLD_H), new THREE.MeshBasicMaterial({map:t}));
  mesh.renderOrder = 0;
  scene.add(mesh);
}

// ---- HUD ----
const hudCanvas = document.getElementById('hud-canvas');
const hudCtx    = hudCanvas.getContext('2d');
let healthbarImg = null;
const MAX_HP = 100;
let playerHP = MAX_HP;
let showFPS  = false;
let lastFPS  = 0; let fpsTimer = 0; let frameCount = 0;

function resizeHud() {
  hudCanvas.width  = window.innerWidth;
  hudCanvas.height = window.innerHeight;
  calcSafeArea();
}
resizeHud();

function drawHUD(dt) {
  hudCtx.clearRect(0, 0, hudCanvas.width, hudCanvas.height);

  // Healthbar no topo-esquerdo, respeitando safe area
  if (healthbarImg) {
    const frames = 6;
    const fH     = healthbarImg.naturalHeight / frames;
    const fW     = healthbarImg.naturalWidth;
    const fi     = Math.min(frames-1, Math.floor((1 - playerHP/MAX_HP) * frames));
    const dW     = Math.min(200, window.innerWidth * 0.45);
    const dH     = dW * (fH / fW);
    // v0.0.7 — clamp: nunca desenha fora da tela
    const hx     = Math.max(0, safeLeft + 12);
    const hy     = Math.max(0, safeTop  + 10);
    hudCtx.imageSmoothingEnabled = false;
    hudCtx.drawImage(healthbarImg, 0, fi*fH, fW, fH, hx, hy, dW, dH);
  }

  // FPS counter (opcional)
  if (showFPS) {
    frameCount++;
    fpsTimer += dt;
    if (fpsTimer >= 1) { lastFPS = frameCount; frameCount = 0; fpsTimer = 0; }
    hudCtx.font = '12px monospace';
    hudCtx.fillStyle = '#fff';
    hudCtx.shadowColor = '#000';
    hudCtx.shadowBlur = 3;
    hudCtx.fillText('FPS: ' + lastFPS, safeLeft + 12, safeTop + 80);
    hudCtx.shadowBlur = 0;
  }
}

// ---- INIT ----
async function initGame() {
  calcSafeArea();

  const textures = {
    idle1:  await loadTexNative(IMGS.idle1),
    idle2:  await loadTexNative(IMGS.idle2),
    walk1:  await loadTexNative(IMGS.walk1),
    walk2:  await loadTexNative(IMGS.walk2),
    arvore: await loadTexNative(IMGS.arvore),
    rocha:  await loadTexNative(IMGS.rocha),
    rabbit: await loadTexNative(IMGS.rabbit),
  };

  healthbarImg = new Image();
  await new Promise(r => { healthbarImg.onload = r; healthbarImg.onerror = r; healthbarImg.src = IMGS.healthbar; });

  // Passa imagem idle ao inventário
  const idleImgEl = new Image();
  idleImgEl.src = IMGS.idle1;
  await new Promise(r => { idleImgEl.onload = r; idleImgEl.onerror = r; });
  Inventory.setIdleImg(idleImgEl);

  const ferrImg = new Image();
  ferrImg.src = "BASE64_REMOVIDO";
  await new Promise(r => { ferrImg.onload = r; ferrImg.onerror = r; });
  Inventory.setFerramentasImg(ferrImg);

  makeGround();

  // ---- Player ----
  const player = {
    mesh: makeMesh(textures.idle1, 48, 48),
    x:0, y:0, animTimer:0, animFrame:0,
    isMoving:false, facingLeft:false, w:28, h:28,
  };
  scene.add(player.mesh);

  // ---- Obstáculos: só árvores e pedras ----
  const obstacles = [];
  function spawnObs(type, x, y) {
    const isTree = type === 'arvore';
    const m = makeMesh(textures[type], isTree?90:72, isTree?90:60);
    m.position.set(x, y, 1);
    scene.add(m);
    obstacles.push({ mesh:m, x, y, w:isTree?28:36, h:isTree?20:28 });
  }
  [
    {t:'arvore',x:-300,y:200},{t:'arvore',x:250,y:300},
    {t:'arvore',x:-150,y:-350},{t:'arvore',x:400,y:-200},
    {t:'arvore',x:-450,y:100},{t:'arvore',x:100,y:-450},
    {t:'arvore',x:-200,y:450},{t:'arvore',x:500,y:150},
    {t:'arvore',x:-500,y:-250},{t:'arvore',x:350,y:450},
    {t:'arvore',x:-350,y:-500},{t:'arvore',x:600,y:-400},
    {t:'rocha',x:180,y:-180},{t:'rocha',x:-200,y:120},
    {t:'rocha',x:350,y:-50},{t:'rocha',x:-400,y:-150},
    {t:'rocha',x:50,y:320},{t:'rocha',x:-120,y:-280},
    {t:'rocha',x:280,y:380},{t:'rocha',x:-320,y:220},
  ].forEach(o => spawnObs(o.t, o.x, o.y));

  // ---- Coelhos decorativos ----
  const rabbits = [];
  [{x:120,y:220},{x:-180,y:-100},{x:320,y:-320}].forEach(r => {
    const m = makeMesh(textures.rabbit, 36, 36);
    m.position.set(r.x, r.y, 1);
    scene.add(m);
    rabbits.push({mesh:m, x:r.x, y:r.y});
  });

  // ---- Input ----
  const keys = {};
  window.addEventListener('keydown', e => { keys[e.code] = true; });
  window.addEventListener('keyup',   e => { keys[e.code] = false; });

  let joy = {active:false, startX:0, startY:0, dx:0, dy:0};
  const joyEl   = document.getElementById('joystick');
  const joyKnob = document.getElementById('joystick-knob');

  // v0.0.7 — touchstart no window para ampliar zona de detecção do joystick.
  // Ativa se o toque iniciar na metade esquerda + metade inferior da tela.
  window.addEventListener('touchstart', e => {
    const t = e.touches[0];
    const isJoyZone = t.clientX < window.innerWidth * 0.5 &&
                      t.clientY > window.innerHeight * 0.45;
    if (!isJoyZone) return;
    e.preventDefault();
    joy = {active:true, startX:t.clientX, startY:t.clientY, dx:0, dy:0};
    // DEBUG — remover após validação em dispositivo real:
    // console.log('[JOY] ativado em', t.clientX.toFixed(0), t.clientY.toFixed(0));
  }, {passive:false});
  window.addEventListener('touchmove', e => {
    if (!joy.active) return;
    e.preventDefault();
    const t = e.touches[0];
    const dx = t.clientX - joy.startX;
    const dy = t.clientY - joy.startY;
    const dist = Math.sqrt(dx*dx+dy*dy), max = 50;
    const cl = Math.min(dist, max);
    const ang = Math.atan2(dy, dx);
    joy.dx = Math.cos(ang)*cl/max;
    joy.dy = Math.sin(ang)*cl/max;
    joyKnob.style.transform = `translate(${Math.cos(ang)*cl}px,${Math.sin(ang)*cl}px)`;
  }, {passive:false});
  window.addEventListener('touchend', () => {
    joy = {active:false, startX:0, startY:0, dx:0, dy:0};
    joyKnob.style.transform = 'translate(0,0)';
  });

  function checkAABB(ax,ay,aw,ah,bx,by,bw,bh) {
    return Math.abs(ax-bx)<(aw+bw)/2 && Math.abs(ay-by)<(ah+bh)/2;
  }

  // ---- Game Loop ----
  let lastTime = performance.now();

  function update(dt) {
    let mx=0, my=0;
    if (keys['ArrowLeft'] ||keys['KeyA']) mx -= 1;
    if (keys['ArrowRight']||keys['KeyD']) mx += 1;
    if (keys['ArrowUp']   ||keys['KeyW']) my += 1;
    if (keys['ArrowDown'] ||keys['KeyS']) my -= 1;
    if (joy.active) { mx += joy.dx; my -= joy.dy; }
    if (Inventory.state.aberto) { mx = 0; my = 0; }

    const len = Math.sqrt(mx*mx+my*my);
    if (len > 1) { mx/=len; my/=len; }
    player.isMoving  = len > 0.05;
    if (mx < -0.05) player.facingLeft = true;
    if (mx >  0.05) player.facingLeft = false;

    const hW = WORLD_W/2-40, hH = WORLD_H/2-40;
    let nx = Math.max(-hW, Math.min(hW, player.x + mx*PLAYER_SPEED*dt));
    let ny = Math.max(-hH, Math.min(hH, player.y + my*PLAYER_SPEED*dt));

    let cX = false, cY = false;
    for (const o of obstacles) {
      if (checkAABB(nx, player.y, player.w, player.h, o.x, o.y, o.w, o.h)) { cX=true; break; }
    }
    if (!cX) player.x = nx;
    for (const o of obstacles) {
      if (checkAABB(player.x, ny, player.w, player.h, o.x, o.y, o.w, o.h)) { cY=true; break; }
    }
    if (!cY) player.y = ny;

    // Animação pato
    player.animTimer += dt*1000;
    if (player.animTimer >= ANIM_MS) { player.animTimer=0; player.animFrame=1-player.animFrame; }
    const k = player.isMoving
      ? (player.animFrame===0 ? 'walk1' : 'walk2')
      : (player.animFrame===0 ? 'idle1' : 'idle2');
    player.mesh.material.map = textures[k];
    player.mesh.material.needsUpdate = true;
    player.mesh.scale.x = player.facingLeft ? -1 : 1;
    player.mesh.position.set(player.x, player.y, 2);

    // Depth sort (y-sorting)
    [...obstacles, ...rabbits, {mesh:player.mesh, y:player.y}].forEach(o => {
      o.mesh.position.z = 1 + (500 - o.y) * 0.001;
    });

    // Camera segue jogador
    const hvW = VIEW_W/2, hvH = VIEW_H/2;
    camera.position.set(
      Math.max(-WORLD_W/2+hvW, Math.min(WORLD_W/2-hvW, player.x)),
      Math.max(-WORLD_H/2+hvH, Math.min(WORLD_H/2-hvH, player.y)),
      100
    );
  }

  function loop(now) {
    const dt = Math.min((now - lastTime)/1000, 0.05);
    lastTime = now;
    update(dt);
    renderer.render(scene, camera);
    drawHUD(dt);
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}

window.addEventListener('resize', () => {
  const w = window.innerWidth, h = window.innerHeight;
  renderer.setSize(w, h);
  VIEW_W = VIEW_H*(w/h);
  camera.left=-VIEW_W/2; camera.right=VIEW_W/2;
  camera.top=VIEW_H/2; camera.bottom=-VIEW_H/2;
  camera.updateProjectionMatrix();
  resizeHud();
});

initGame().catch(e => console.error('Erro init:', e));
