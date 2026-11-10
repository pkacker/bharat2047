const commitments = TOPICS.map((_,index)=>{const {short,title,description}=localizedTopic(index);return [short,title,description]});

const stage=document.getElementById('wheelStage'), chakra=document.getElementById('chakra');

let angle=0,selected=-1,playing=true,dragging=false,lastPointerAngle=0,moved=false,categoriesExpanded=false;
let soundEnabled=storedPreference('sound','on')!=='off',audioContext,audioUnlocked=false;
const mod=(n,m)=>(n%m+m)%m;
function renderCategories(index){const list=document.getElementById('categoryList'),toggle=document.getElementById('categoryToggle'),values=categoriesFor(index);list.replaceChildren();(categoriesExpanded?values:values.slice(0,2)).forEach(label=>{const chip=document.createElement('span');chip.className='category-chip';chip.textContent=label;list.append(chip)});list.classList.toggle('expanded',categoriesExpanded);toggle.textContent=t(categoriesExpanded?'seeLess':'seeMore');toggle.setAttribute('aria-expanded',String(categoriesExpanded))}
function updateSelection(){const next=mod(Math.round(angle/15),24);if(next===selected)return;selected=next;categoriesExpanded=false;renderCategories(next);document.getElementById('focusCounter').textContent=`${String(next+1).padStart(2,'0')} / 24`;document.getElementById('focusNumber').textContent=String(next+1).padStart(2,'0');document.getElementById('focusTitle').textContent=commitments[next][1];document.getElementById('focusDescription').textContent=commitments[next][2];document.getElementById('startTest').href=`test.html?topic=${next}`;document.getElementById('knowMore').href=`learn.html?topic=${next}`;const panel=document.getElementById('focusPanel');panel.classList.remove('arrive');if(!dragging){void panel.offsetWidth;panel.classList.add('arrive')}stage.setAttribute('aria-valuenow',next+1);stage.setAttribute('aria-valuetext',commitments[next][1])}
function setAngle(value){angle=value;chakra.style.transform=`rotate(${angle}deg)`;updateSelection()}
function setPlaying(value){playing=value;document.getElementById('playIcon').textContent=value?'Ⅱ':'▶';document.getElementById('playLabel').textContent=t(value?'pauseWheel':'resumeWheel');document.getElementById('playPause').setAttribute('aria-label',t(value?'pauseWheel':'resumeWheel'))}
function tick(){if(!soundEnabled||!audioUnlocked)return;try{audioContext ||= new (window.AudioContext||window.webkitAudioContext)();if(audioContext.state==='suspended')audioContext.resume();const o=audioContext.createOscillator(),g=audioContext.createGain(),t=audioContext.currentTime;o.type='sine';o.frequency.setValueAtTime(780,t);o.frequency.exponentialRampToValueAtTime(420,t+.045);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.045,t+.004);g.gain.exponentialRampToValueAtTime(.0001,t+.065);o.connect(g).connect(audioContext.destination);o.start(t);o.stop(t+.07)}catch{}}
function enableAudioFromGesture(){audioUnlocked=true;if(soundEnabled){try{audioContext ||= new (window.AudioContext||window.webkitAudioContext)();if(audioContext.state==='suspended')audioContext.resume()}catch{}}}
window.addEventListener('soundpreferencechange',event=>{soundEnabled=event.detail.enabled;if(soundEnabled){enableAudioFromGesture();tick()}});
document.getElementById('playPause').addEventListener('click',()=>{setPlaying(!playing);enableAudioFromGesture()});
document.getElementById('categoryToggle').addEventListener('click',()=>{setPlaying(false);categoriesExpanded=!categoriesExpanded;renderCategories(selected)});
function pointerAngle(e){const r=stage.getBoundingClientRect();return Math.atan2(e.clientY-(r.top+r.height/2),e.clientX-(r.left+r.width/2))*180/Math.PI}
stage.addEventListener('pointerdown',e=>{dragging=true;moved=false;lastPointerAngle=pointerAngle(e);stage.setPointerCapture(e.pointerId);stage.classList.add('dragging');setPlaying(false);enableAudioFromGesture()});
stage.addEventListener('pointermove',e=>{if(!dragging)return;const current=pointerAngle(e);let delta=current-lastPointerAngle;delta=((delta+540)%360)-180;lastPointerAngle=current;if(Math.abs(delta)>2)moved=true;setAngle(angle+delta)});
function finishDrag(){if(!dragging)return;dragging=false;stage.classList.remove('dragging');setAngle(Math.round(angle/15)*15);if(moved)tick()}
stage.addEventListener('pointerup',finishDrag);stage.addEventListener('pointercancel',finishDrag);
stage.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowDown','ArrowRight','ArrowUp','Home','End',' '].includes(e.key)){e.preventDefault();setPlaying(false);if(e.key==='Home')setAngle(0);else if(e.key==='End')setAngle(345);else if(e.key!==' ')setAngle(Math.round(angle/15)*15+(e.key==='ArrowRight'||e.key==='ArrowUp'?15:-15));tick()}});
setInterval(()=>{if(playing&&!dragging){setAngle(Math.round(angle/15)*15+15);tick()}},1000);

stage.setAttribute('aria-label',t('wheelAria'));
document.getElementById('focusPanel').setAttribute('aria-label',t('selectedAria'));

function countdown(){const now=new Date(),target=new Date(2047,7,15);let years=0,months=0,days=0;if(now<target){let cursor=new Date(now.getFullYear(),now.getMonth(),now.getDate());while(new Date(cursor.getFullYear()+1,cursor.getMonth(),cursor.getDate())<=target){cursor.setFullYear(cursor.getFullYear()+1);years++}while(new Date(cursor.getFullYear(),cursor.getMonth()+1,cursor.getDate())<=target){cursor.setMonth(cursor.getMonth()+1);months++}days=Math.round((target-cursor)/86400000)}document.getElementById('years').textContent=String(years).padStart(2,'0');document.getElementById('months').textContent=String(months).padStart(2,'0');document.getElementById('days').textContent=String(days).padStart(2,'0')}
countdown();setInterval(countdown,3600000);setAngle(0);
