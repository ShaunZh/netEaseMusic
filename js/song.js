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
}

function songDeal(id, successFn, errorFn) {
  $.get('../songs.json').then(function(response) {
    let songs = response;
    let song = songs.filter((s) => parseInt(s.id) === id);
    console.log('song');
    successFn && successFn.apply(null, song);
    addEvent();
  });
}


function getSongId() {
  id = parseInt(location.href.match(/id=([^&])*/)[1]);
  return id;
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
  console.log(audio);
  audio.oncanplay = function () {
    audio.play();
    $('.disc-container').addClass('playing');
    dispSongName(song);
    let lyric = getLyric(song);
    dispLyric(lyric);
  };
}

$(function(){
  let songId = getSongId();
  songDeal(songId, playSong);
});
