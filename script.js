const stepCountDisplay = document.getElementById('step-count');
const distanceCountDisplay = document.getElementById('distance-count');
const statusDisplay = document.getElementById('status');
const startButton = document.getElementById('start-button');

let stepCount = 0;
let previousY = null;
let threshold = 2;
const stepLength = 0.762; 

function startCountingSteps() {
  if ('Accelerometer' in window) {
    try {
      let accelerometer = new Accelerometer({ frequency: 10 });
      
      accelerometer.addEventListener('reading', () => {
        let y = accelerometer.y;
        
        if (previousY !== null) {
          if (Math.abs(y - previousY) > threshold) {
            stepCount++;
            stepCountDisplay.textContent = stepCount;

            
            let distance = (stepCount * stepLength).toFixed(2);
            distanceCountDisplay.textContent = distance;
          }
        }
        
        previousY = y;
      });
      
      accelerometer.start();
      statusDisplay.textContent = 'Sensor aktif, mulai menghitung langkah!';
      statusDisplay.style.color = "#70ff70";
    } catch (error) {
      statusDisplay.textContent = 'Terjadi kesalahan saat mengaktifkan Sensor.';
      statusDisplay.style.color = "#ff7070";
    }
  } else {
    statusDisplay.textContent = 'Perangkat Kamu tidak mendukung sensor.';
    statusDisplay.style.color = "#ff7070";
  }
}

startButton.addEventListener('click', startCountingSteps);
