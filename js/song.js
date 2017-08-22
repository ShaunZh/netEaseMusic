// $(function() {
//   $.get('./lyric.json').then(function (object) {
//     let {lyric} = object;
//     console.log(lyric.split('\n'));
//   })
// })


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
  audio.src ="http://m10.music.126.net/20170822150457/e215e0292b3255ecd0ab4985a434bd25/ymusic/e1db/9abe/8b0a/b5deceec956392e4eae421dac085a564.mp3";
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
