let index = 0;
const slides = document.querySelectorAll(".slide");

function showSlide(i) {
  slides.forEach(slide => slide.classList.remove("active"));
  slides[i].classList.add("active");
}

function nextSlide() {
  index = (index + 1) % slides.length;
  showSlide(index);
}

setInterval(nextSlide, 2000); // Troca a cada 2 segundos

//Animação de rolagem
document.querySelectorAll('.nav-link a').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        window.scrollTo({
          top: target.offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  //Seletor da nav
  
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
  link.addEventListener('click', function() {
    // Remove 'active' de todos os nav-links
    navLinks.forEach(l => l.classList.remove('active'));
    
    // Adiciona 'active' no <li> clicado
    this.classList.add('active');
  });
});


//Tocar a música
 
  const players = document.querySelectorAll('.track');
  const voltarBtn = document.querySelector('.botao.voltar');
  const pauseBtn = document.querySelector('.botao.pause');
  const pularBtn = document.querySelector('.botao.pular');

  let currentTrackIndex = 0;

  function formatTime(seconds) {
    const min = Math.floor(seconds / 60) || 0;
    const sec = Math.floor(seconds % 60) || 0;
    return `${min}:${sec.toString().padStart(2, '0')}`;
  }

  function stopAllExcept(indexToKeep) {
    players.forEach((track, i) => {
      const audio = track.querySelector('audio');
      const icon = track.querySelector('button i');
      if (i !== indexToKeep) {
        audio.pause();
        audio.currentTime = 0;
        icon.classList.remove('bi-pause-fill');
        icon.classList.add('bi-caret-right-fill');
      }
    });
  }

  function playTrack(index) {
    const track = players[index];
    const audio = track.querySelector('audio');
    const icon = track.querySelector('button i');

    stopAllExcept(index);

    audio.play();
    icon.classList.remove('bi-caret-right-fill');
    icon.classList.add('bi-pause-fill');
    currentTrackIndex = index;
  }

  function pauseTrack(index) {
    const track = players[index];
    const audio = track.querySelector('audio');
    const icon = track.querySelector('button i');

    audio.pause();
    icon.classList.remove('bi-pause-fill');
    icon.classList.add('bi-caret-right-fill');
  }

  // Setup de cada track
  players.forEach((track, index) => {
    const audio = track.querySelector('audio');
    const button = track.querySelector('button');
    const icon = button.querySelector('i');
    const progressBar = track.querySelector('.progress-bar');
    const progress = track.querySelector('.progress');
    const currentTimeEl = track.querySelector('.current-time');
    const durationEl = track.querySelector('.duration');

    audio.addEventListener('loadedmetadata', () => {
      durationEl.textContent = formatTime(audio.duration);
    });

    audio.addEventListener('timeupdate', () => {
      currentTimeEl.textContent = formatTime(audio.currentTime);
      const percent = (audio.currentTime / audio.duration) * 100;
      progress.style.width = percent + '%';
    });

    progressBar.addEventListener('click', (e) => {
      const width = progressBar.clientWidth;
      const clickX = e.offsetX;
      audio.currentTime = (clickX / width) * audio.duration;
    });

    button.addEventListener('click', () => {
      if (audio.paused) {
        playTrack(index);
      } else {
        pauseTrack(index);
      }
    });

    audio.addEventListener('ended', () => {
      icon.classList.remove('bi-pause-fill');
      icon.classList.add('bi-caret-right-fill');
    });
  });

  // Botão de voltar
  voltarBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + players.length) % players.length;
    playTrack(currentTrackIndex);
  });

  // Botão de pular
  pularBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % players.length;
    playTrack(currentTrackIndex);
  });

  // Botão de pause/play principal
  pauseBtn.addEventListener('click', () => {
    const currentTrack = players[currentTrackIndex];
    const audio = currentTrack.querySelector('audio');

    if (audio.paused) {
      playTrack(currentTrackIndex);
      pauseBtn.querySelector('i').classList.remove('bi-play-fill');
      pauseBtn.querySelector('i').classList.add('bi-pause-fill');
    } else {
      pauseTrack(currentTrackIndex);
      pauseBtn.querySelector('i').classList.remove('bi-pause-fill');
      pauseBtn.querySelector('i').classList.add('bi-play-fill');
    }
  });

  