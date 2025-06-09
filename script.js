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

  players.forEach(track => {
    const audio = track.querySelector('audio');
    const button = track.querySelector('button');
    const icon = button.querySelector('i');
    const progressBar = track.querySelector('.progress-bar');
    const progress = track.querySelector('.progress');
    const currentTimeEl = track.querySelector('.current-time');
    const durationEl = track.querySelector('.duration');

    // Atualiza o tempo
    audio.addEventListener('loadedmetadata', () => {
      durationEl.textContent = formatTime(audio.duration);
    });

    audio.addEventListener('timeupdate', () => {
      currentTimeEl.textContent = formatTime(audio.currentTime);
      const percent = (audio.currentTime / audio.duration) * 100;
      progress.style.width = percent + '%';
    });

    // Clique na barra para buscar
    progressBar.addEventListener('click', (e) => {
      const width = progressBar.clientWidth;
      const clickX = e.offsetX;
      const duration = audio.duration;
      audio.currentTime = (clickX / width) * duration;
    });

    // Clique no botão play/pause
    button.addEventListener('click', () => {
      // Pausa todos os outros áudios
      players.forEach(p => {
        const otherAudio = p.querySelector('audio');
        const otherIcon = p.querySelector('i');
        if (otherAudio !== audio) {
          otherAudio.pause();
          otherAudio.currentTime = 0;
          otherIcon.classList.remove('bi-pause-fill');
          otherIcon.classList.add('bi-caret-right-fill');
        }
      });

      // Toca ou pausa este áudio
      if (audio.paused) {
        audio.play();
        icon.classList.remove('bi-caret-right-fill');
        icon.classList.add('bi-pause-fill');
      } else {
        audio.pause();
        icon.classList.remove('bi-pause-fill');
        icon.classList.add('bi-caret-right-fill');
      }
    });

    // Quando termina, reseta o botão
    audio.addEventListener('ended', () => {
      icon.classList.remove('bi-pause-fill');
      icon.classList.add('bi-caret-right-fill');
    });

  });

  function formatTime(seconds) {
    const min = Math.floor(seconds / 60) || 0;
    const sec = Math.floor(seconds % 60) || 0;
    return `${min}:${sec.toString().padStart(2, '0')}`;
  }
