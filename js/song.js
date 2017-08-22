// $(function() {
//   $.get('./lyric.json').then(function (object) {
//     let {lyric} = object;
//     console.log(lyric.split('\n'));
//   })
// })

let audioUrl = "//oqvj0lqwc.bkt.clouddn.com/%E5%A4%A7%E7%BA%A6%E5%9C%A8%E5%86%AC%E5%AD%A3.mp3";

function getLyric() {
  $.get('../data/lyric.json').then(function (object) {
    let lyric = object.lrc.lyric;
    let array = lyric.split('\n');
    let regex = /^\[(.+)\](.+)/;
    array = array.map(function (string, index) {
      let matches = string.match(regex);
      if (matches) {
        return {time: matches[1], words: matches[2]}
      }
    });
    let $lines = $('.lines')
    array.map(function (object) {
      if (!object) {return}
      let $p = $('<p/>');
      $p.attr('data-time', object.time).text(object.words);
      $lines.append($p);
    })

  });
  let audio = document.createElement('audio');
  audio.src = audioUrl;
  audio.oncanplay = function () {
    audio.play();
    $('.disc-container').addClass('playing');
  };

  $('.icon-pause').on('click', function () {
    console.log('pause');
    audio.pause();
    $('.disc-container').removeClass('playing');
  });

  $('.icon-play').on('click', function () {
    audio.play();
    $('.disc-container').addClass('playing');
  });
}
getLyric();
