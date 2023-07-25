const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const sections = 5;
const sectionWidth = video.width / sections;
const melodySynths = [];

for (let i = 0; i < sections; i++) {
  melodySynths.push(new Tone.PolySynth().toMaster());
}

tracking.ColorTracker.registerColor('motion', function(r, g, b) {
  return r > 50 && g < 100 && b < 100;
});

const tracker = new tracking.ColorTracker(['motion']);

tracking.track('#video', tracker, { camera: true });

tracker.on('track', function(event) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  event.data.forEach(function(rect) {
    ctx.strokeStyle = '#a64ceb';
    ctx.lineWidth = 2;
    ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
    const sectionIndex = Math.floor(rect.x / sectionWidth);
    playMelody(sectionIndex);
  });
});

function playMelody(sectionIndex) {

  const melodies = [
    ['C4', 'E4', 'G4', 'B4'],
    ['D4', 'F4', 'A4', 'C5'],
    ['E4', 'G4', 'B4', 'D5'],
    ['F4', 'A4', 'C5', 'E5'],
    ['G4', 'B4', 'D5', 'F5'],
  ];

  melodySynths[sectionIndex].triggerAttackRelease(melodies[sectionIndex], '4n');
}
