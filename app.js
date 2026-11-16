
const state = { len: 20, wid: 15, gravelDepth: 4, sandDepth: 1, compaction: true };

function init() {
  const l = document.getElementById('patioLen');
  const w = document.getElementById('patioWid');
  const gd = document.getElementById('gravelDepth');
  const sd = document.getElementById('sandDepth');
  const cb = document.getElementById('compactionBuffer');

  l.addEventListener('input', e => { state.len = parseFloat(e.target.value)||0; calc(); });
  w.addEventListener('input', e => { state.wid = parseFloat(e.target.value)||0; calc(); });
  gd.addEventListener('input', e => { state.gravelDepth = parseFloat(e.target.value)||0; calc(); });
  sd.addEventListener('input', e => { state.sandDepth = parseFloat(e.target.value)||0; calc(); });
  cb.addEventListener('change', e => { state.compaction = e.target.checked; calc(); });
  calc();
}

function calc() {
  const area = state.len * state.wid;
  const perim = 2 * (state.len + state.wid);

  // Gravel: cu ft = area * (depth/12), cu yd = cu ft / 27
  let gravelCuFt = area * (state.gravelDepth / 12);
  if (state.compaction) gravelCuFt *= 1.20;
  const gravelYds = gravelCuFt / 27;
  const gravelTons = gravelYds * 1.4; // 1 cu yd of crushed run ≈ 1.4 tons

  // Sand: 1 cu yd ≈ 1.35 tons
  const sandCuFt = area * (state.sandDepth / 12);
  const sandYds = sandCuFt / 27;
  const sandTons = sandYds * 1.35;

  // Polymeric sand: approx 75 sq ft per 50lb bag
  const polyBags = Math.max(1, Math.ceil(area / 75));

  // Excavation depth: gravel + sand + typical 2.375" paver thickness
  const totalExcav = state.gravelDepth + state.sandDepth + 2.375;

  document.getElementById('gravelTons').textContent = gravelTons.toFixed(1);
  document.getElementById('gravelYards').textContent = `≈ ${gravelYds.toFixed(2)} Cubic Yards`;
  document.getElementById('sandTons').textContent = `${sandTons.toFixed(1)} Tons`;
  document.getElementById('sandYards').textContent = `≈ ${sandYds.toFixed(2)} Cu Yards`;
  document.getElementById('polyBags').textContent = `${polyBags} Bags`;
  document.getElementById('totalArea').textContent = `${Math.round(area)} sq ft`;
  document.getElementById('edgeRestraints').textContent = `${Math.round(perim)} Linear ft`;
  document.getElementById('excavDepth').textContent = `≈ ${totalExcav.toFixed(1)} Inches`;
  document.getElementById('geoFabric').textContent = `${Math.round(area * 1.10)} sq ft (+10%)`;
}
window.addEventListener('DOMContentLoaded', init);
