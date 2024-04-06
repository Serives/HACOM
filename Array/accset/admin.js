var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);
// var tabs = $$(".tab-item");
// var panes = $$(".tab-pane");
// var tabline = $(".tab-item.active");
// console.log([tabline])
// var line = $(".line");
// line.style.left = tabline.offsetLeft + "px";
// line.style.width = tabline.offsetWidth + "px";
// tabs.forEach((tab, index, so) => {
//     var pane = panes[index];
//     tab.onclick = function () {
//         $(".tab-pane.active").classList.remove("active");
//         $(".tab-item.active").classList.remove("active");
//         line.style.left = this.offsetLeft + "px";
//         line.style.width = this.offsetWidth + "px";
//         tab.classList.add("active");
//         pane.classList.add("active");

//     }
// });
//
var nameMusic = $('.namePlayMusic');
var cdMusic = $('.cd-thumb');
var audioMusic = $('#audio');
var cd = $(".cd");
var btnPlay = $('.btn-toggle-play');
var play = $('.player');
var progressPersent = $('#progress');
var btnNext = $('.btn-next');
var btnPrev = $('.btn-prev');
var btnRest = $('.btn-repeat')
var btnRandom = $('.btn-random');
var app = {
    currentIndex: 0,
    isPlay: false,
    songs: [
        {
            name: "The Spectre",
            singer: "Alan Walker",
            img: "./accset/img/img__ms1.jpg",
            music: "./accset/music/y2mate.com - Alan Walker  The Spectre.mp3",
        },
        {
            name: "Love Me Like You Do",
            singer: "Ellie Goulding",
            img: "./accset/img/img_ms2.jpg",
            music: "./accset/music/y2mate.com - Love Me Like You Do  Ellie Goulding Lyrics  Vietsub.mp3",
        },
        {
            name: "Unstoppable",
            singer: "Sia",
            img: "./accset/img/img_ms3.jpg",
            music: "./accset/music/yt5s.io - Unstoppable - Sia (Lyrics + Vietsub) ♫ (128 kbps).mp3",
        }, {
            name: "East Of Eden",
            singer: "Zella Day",
            img: "./accset/img/img_ms4.jpg",
            music: "./accset/music/y2mate.com - Lyrics  Vietsub East Of Eden  Zella Day.mp3",
        }, {
            name: "Lyrics",
            singer: "Dynasty ",
            img: "./accset/img/img_ms5.jpg",
            music: "./accset/music/y2mate.com -  Vietsub  Lyrics  Dynasty  MIIA.mp3",
        }, {
            name: "Who I Am",
            singer: "Alan Walker Putri Ariani Peder Elias",
            img: "./accset/img/img_ms6.jpg",
            music: "./accset/music/y2mate.com - Alan Walker Putri Ariani Peder Elias  Who I Am  AW VIP Mix.mp3",
        },

    ],
    render: function () {
        var html = this.songs.map((song,index) => {
            return `
            <div class="song ${index === this.currentIndex ? 'active' : ''}">
                  <div class="thumb"
                      style="background-image: url('${song.img}')">
                  </div>
                  <div class="body">
                      <h3 class="title">${song.name}</h3>
                      <p class="author">${song.singer}</p>
                  </div>
                  <div class="option">
                      <i class="fas fa-ellipsis-h"></i>
                  </div>
              </div>
            `
        })
        $(".playlist").innerHTML = html.join("");
    },
    handlEvents: function () {

        var cdthump = cdMusic.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000,
            iterations: Infinity
        }
        );
        cdthump.pause();
        // xử lý khi khéo sẽ thu nhỏ cd
        var cdwidth = cd.offsetWidth
        document.onscroll = function () {
            var scroll = Math.round(document.documentElement.scrollY || window.scrollY);
            var widthnew = cdwidth - scroll;
            cd.style.width = cdwidth > 0 ? widthnew : 0;
            cd.style.opacity = widthnew / cdwidth;
        };
        // xử lý play
        btnPlay.onclick = function () {
            if (app.isPlay) {
                app.isPlay = false;
                audioMusic.pause();
                play.classList.remove('playing');
                cdthump.pause();

            }
            else {
                app.isPlay = true;
                audioMusic.play();
                play.classList.add('playing');
                cdthump.play();
            }
        }
        audioMusic.ontimeupdate = function () {
            if (audioMusic.duration) {
                progressPersent.value = audioMusic.currentTime / audioMusic.duration * 100;
            }
        }
        // thao tác tua
        progressPersent.onchange = function () {
            audioMusic.currentTime = progressPersent.value * audioMusic.duration / 100;
        }
        // khi nghe hết thì quay lại 
        audioMusic.onended =function(){
            btnNext.click();
        }
        // quay lại 
        btnRest.onclick=function(){
            audioMusic.currentTime = 0;
        }
        // Chuyển bài tiếp the hoặc bài trước
        btnNext.onclick = function () {
            app.nextSong();
            audioMusic.play();
           app.render();
        }
        btnPrev.onclick = function () {
            app.prevSong();
            audioMusic.play();
            app.render();

        }
        btnRandom.onclick=function(){
            var length = app.songs.length;
            var intRamdom = Math.floor(Math.random()*length);
            app.currentIndex = intRamdom;
            app.loadCurentMusic();
            audioMusic.play()
            app.render();

        }

    },
    nextSong: function () {
        if (app.currentIndex >= app.songs.length-1) {
            app.currentIndex = 0;
        }
        else {
            app.currentIndex++;
        }
        app.loadCurentMusic();
    },
    prevSong: function () {
        if (app.currentIndex > 0) {
            app.currentIndex--;
        }
        else {
            app.currentIndex = 0;
        }
        app.loadCurentMusic();
    },
    difineProperties: function () {
        Object.defineProperty(this, "currentSong", {
            get: function () {
                return this.songs[this.currentIndex];
            }
        })
    },
    loadCurentMusic: function () {
        nameMusic.textContent = this.currentSong.name;
        cdMusic.style.backgroundImage = `url('${app.currentSong.img}')`;
        audioMusic.src = app.currentSong.music;
    },
    start: function () {
        this.difineProperties(); // định nghĩa
        this.render(); // render ra data
        this.handlEvents(); //  thao tac người dùng 
        this.loadCurentMusic(); // load dữ liệu bài hát lên UI khi bắt đầu mở trang 
    }
}
app.start();