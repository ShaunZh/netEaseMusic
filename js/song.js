// $(function() {
//   $.get('./lyric.json').then(function (object) {
//     let {lyric} = object;
//     console.log(lyric.split('\n'));
//   })
// })


function addEvent() {

  let audio = document.querySelector('.disc-container audio');
  $('.icon-pause').on('click', function () {
    audio.pause();
    $('.disc-container').removeClass('playing');
  });

  $('.icon-play').on('click', function () {
    audio.play();
    $('.disc-container').addClass('playing');
  });

  // 播放结束
  $(audio).on('ended', function() {
    $('.disc-container').removeClass('playing');
  })
}

function getSongId() {
  return  parseInt(location.href.match(/id=([^&])*/)[1]);
}

function getLyric(song) {
  if (song.hasOwnProperty('lrc') && song.lrc.hasOwnProperty('lyric')) {
    let lyric = song.lrc.lyric;
    let array = lyric.split('\n');
    let regex = /^\[(.+)\](.+)/;
    array = array.map(function (string, index) {
      let matches = string.match(regex);
      if (matches) {
        return {time: matches[1], words: matches[2]}
      }
    });
    return array
  }
  return "获取歌词失败";
}

function dispSongName(song) {
  if (typeof song.name === 'string') {
    $('.song-description>h1').text(song.name);
  }
}

function dispLyric(lyric) {
  let $lines = $('.lines');
  if (typeof lyric === 'string') {
    let $p = $('<p/>');
    $p.text(lyric);
    $lines.append($p);
    return
  }
  lyric.map(function (object) {
    if (!object) {return}
    let $p = $('<p/>');
    $p.attr('data-time', object.time).text(object.words);
    $lines.append($p);
  })
}

function playSong(song) {
  let audio = document.querySelector('.disc-container audio');
  audio.src = song.url;
  audio.oncanplay = function () {
    audio.play();
    $('.disc-container').addClass('playing');
    dispSongName(song);
    let lyric = getLyric(song);
    dispLyric(lyric);
    setInterval(() => {
      let seconds = audio.currentTime;
      let minutes = ~~(seconds / 60);
      let left = seconds - minutes * 60;
      let time = `${pad(minutes)}:${pad(left)}`;
      let $lines = $('.lines > p');
      let $whichLine;
      for (let i = 0; i < $lines.length; i++) {
        if ($lines[i+1] !== undefined && $lines.eq(i).attr('data-time') < time && $lines.eq(i + 1).attr('data-time') > time) {
          $whichLine = $lines.eq(i);
        }
      }
      if ($whichLine) {
        $whichLine.addClass('active').prev().removeClass('active');
        let top = $whichLine.offset().top;
        let linesTop = $('.lines').offset().top;
        let delta = top - linesTop - $('.lyric').height()/3;
        $('.lines').css('transform', `translateY(-${delta}px)`);
      }
    }, 300);
  };
}


function pad(number) {
  return number >= 10 ? number + '' : '0' + number;
}

function songDeal(id, successFn, errorFn) {
  $.get('./../songs.json').then(function(response) {
    let songs = response;
    let song = songs.filter((s) => parseInt(s.id) === id);
    successFn && successFn.apply(null, song);
    addEvent();
  });
}

$(function(){
  let songId = getSongId();
  songDeal(songId, playSong);
});
