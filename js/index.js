/**
 * @Author: Hexon
 * @Date: 2017/8/23 11:00
 * @Last Modified by:   Marte
 * @Last Modified time: 2017/8/23 11:00
 */



$(function() {
  $.get('../songs.json').then(function(response){
    let $latestMusic = $('.latestMusic .lists');
    let $loadingIcon = $('.latestMusic .loadingIcon');
    let items = response;
    items.forEach((item) => {
      let $li = $(`
      <li>
        <a href="./song.html?id=${item.id}" class="play-circle">
          <h3>${item.name}</h3>
          <p>
          <svg class="sq">
             <use xlink:href="#icon-sq"></use>
          </svg>
          演唱者-专辑
          </p>
          <svg>
            <use xlink:href="#icon-play-circle"></use>
          </svg>
        </a>
      </li>
        `);
      $latestMusic.append($li);
    });
    $loadingIcon.hide();
  });

  $('.siteNav').on('click', 'ol.tabItems>li', function(e) {
    let $li =$(e.currentTarget).addClass('active');
    $li.siblings().removeClass('active');
    let index = $li.index();
    $li.trigger('tabChange', index);
    $('.tabContent > li').eq(index).addClass('active').siblings().removeClass('active');
  });

  $('.siteNav').on('tabChange', function(e, index) {
    if (index === 1) {
      if ($('.tabContent > li').eq(index).attr('data-downloaded') === 'yes') {
        return;
      }
      $.get('../hotMusic.json').then((response) => {
        $('.tabContent > li').eq(index).attr('data-downloaded', 'yes');
        renderHotMusic(response);
      });
    } else if (index === 2) {
      if ($('.tabContent > li').eq(index).attr('data-downloaded') === 'yes') {
        return;
      }
      $.get('../musicSheet.json').then((response) => {
        $('.tabContent > li').eq(index).attr('data-downloaded', 'yes');
      });
    }
  })
});


function renderHotMusic(data) {
  let $items = $('.hotMusic > .musicList > .items');
  let $loadingIcon = $('.hotMusic .loadingIcon');
  data.forEach((d, index) => {
    index = (((index + 1) < 10) ? '0' : '') + (index+1);
    let $li = $(`
          <li>
            <a href="./song.html?id=${d.id}" class="play-circle">
              <span class="listNo">${index}</span>
              <div class="musicBrief">
                <h3>${d.name}</h3>
                <p>
                  <svg class="sq">
                    <use xlink:href="#icon-sq"></use>
                  </svg>
                  演唱者-专辑
                </p>
              </div>
              <svg>
                <use xlink:href="#icon-play-circle"></use>
              </svg>
            </a>
          </li>
        `);

    $items.append($li);
    if ($li.index() < 3) {
      $li.find('.listNo').addClass('hot');
    }
  });
  $loadingIcon.hide();
}

function getSearchResult() {
  let timer = undefined;
  $('input#searchSong').on('input', function(e) {
    let $input = $(e.currentTarget);
    let value = $input.val().trim();
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(function() {
      search((value)).then((result) => {
        timer = undefined;
        dispSearchResult(value, result);
      })
    }, 500)
  });
}

function dispSearchResult(value, dataArr) {
  let $searchResult = $('.search > .searchResult');
  let $hotSearch = $('.search > .hotSearch');
  let $results = $('.search > .searchResult > .results');
  $results.find('li').remove();
  if (value.length > 0 && dataArr.length > 0) {
    dataArr.forEach((item) => {
      let $li = $(`
          <li>
            <a href="./song.html?id=${item.id}">
            <svg>
              <use xlink:href="#icon-search"></use>
            </svg>
            <span>${item.name}</span></a>
          </li>
      `);
      $results.append($li);
    });
    $searchResult.addClass('active');
    $hotSearch.removeClass('active');
    if ($('.search > .searchResult > .inputWord').find('span').length === 0) {
      $('.search > .searchResult > .inputWord').append($(`<span></span>`));
    }
    $('.search > .searchResult > .inputWord').find('span').text(`"${value}"`);
    if ($results.find('li.noResult')) {
      $results.find('li.noResult').remove();
    }


  } else if(value.length === 0 && dataArr.length === 0){
    let $results = $('.search > .searchResult > .results');
    $results.find('li').remove();
    $('.search > .searchResult > .inputWord > span').remove();
    $searchResult.removeClass('active');
    $hotSearch.addClass('active');

    if ($results.find('li.noResult')) {
      $results.find('li.noResult').remove();
    }
  } else {
    $searchResult.addClass('active');
    $hotSearch.removeClass('active');

    if ($('.search > .searchResult > .inputWord').find('span').length === 0) {
      $('.search > .searchResult > .inputWord').append($(`<span></span>`));
    }
    $('.search > .searchResult > .inputWord').find('span').text(`"${value}"`);
    if ($results.find('li.noResult').length === 0) {
      $results.append(`<li class="noResult">没有结果</li>`)
    }
  }
}

function search(keyword) {
  return new Promise((resolve, reject) => {
    if (keyword.length) {
      let database = [
        {
          "id": 1,
          "url": "http://oqvj0lqwc.bkt.clouddn.com/%E8%BF%BD%E5%85%89%E8%80%85.mp3",
          "name": "追光者",
          "lrc":{"version":5,"lyric":"[00:00.00] 作曲 : 马敬\n[00:01.00] 作词 : 唐恬\n[00:09.320]编曲 : 黎偌天\n[00:10.110]制作人 : 黎偌天\n[00:11.920]吉他 : 劳国贤\n[00:13.700]弦乐 : 国际首席爱乐乐团\n[00:15.150]Bass : 大宇\n[00:16.460]监制 : 宋鹏飞\n[00:17.800]音乐出品发行公司 : 听见时代传媒\n[00:24.650]如果说你是海上的烟火\n[00:29.640]我是浪花的泡沫\n[00:33.200]某一刻你的光照亮了我\n[00:38.080]如果说你是遥远的星河\n[00:42.960]耀眼得让人想哭\n[00:48.450]我是追逐着你的眼眸\n[00:51.600]总在孤单时候眺望夜空\n[01:00.880]我可以跟在你身后\n[01:04.130]像影子追着光梦游\n[01:07.530]我可以等在这路口\n[01:10.870]不管你会不会经过\n[01:14.300]每当我为你抬起头\n[01:17.600]连眼泪都觉得自由\n[01:20.680]有的爱像阳光倾落边拥有边失去着\n[01:41.300]如果说你是夏夜的萤火\n[01:46.220]孩子们为你唱歌\n[01:49.930]那么我是想要画你的手\n[01:54.640]你看我多么渺小一个我\n[01:59.510]因为你有梦可做\n[02:05.120]也许你不会为我停留\n[02:08.360]那就让我站在你的背后\n[02:14.290]我可以跟在你身后\n[02:17.460]像影子追着光梦游\n[02:20.770]我可以等在这路口\n[02:24.110]不管你会不会经过\n[02:27.490]每当我为你抬起头\n[02:30.840]连眼泪都觉得自由\n[02:34.520]有的爱像大雨滂沱却依然相信彩虹\n[03:07.590]我可以跟在你身后\n[03:10.870]像影子追着光梦游\n[03:14.440]我可以等在这路口\n[03:17.580]不管你会不会经过\n[03:20.890]每当我为你抬起头\n[03:24.130]连眼泪都觉得自由\n[03:27.760]有的爱像大雨滂沱却依然相信彩虹\n"}
        },
        {
          "id": 2,
          "url": "http://oqvj0lqwc.bkt.clouddn.com/%E7%AB%A5%E8%AF%9D%E9%95%87.mp3",
          "name": "童话镇",
          "lrc":{"version":12,"lyric":"[00:00.00] 作曲 : 暗杠\n[00:01.00] 作词 : 竹君\n[00:17.000]编曲 : 暗杠\n[00:18.000]\n[00:19.200]器乐演奏：暗杠\n[00:20.000]和声编写：暗杠\n[00:23.000]听说白雪公主在逃跑\n[00:26.510]小红帽在担心大灰狼\n[00:29.810]听说疯帽喜欢爱丽丝\n[00:33.270]丑小鸭会变成白天鹅\n[00:36.750]听说彼得潘总长不大\n[00:40.060]杰克他有竖琴和魔法\n[00:43.480]听说森林里有糖果屋\n[00:46.660]灰姑娘丢了心爱的玻璃鞋\n[00:50.730]只有睿智的河水知道\n[00:53.600]白雪是因为贪玩跑出了城堡\n[00:57.590]小红帽有件抑制自己\n[01:00.590]变成狼的大红袍\n[01:03.990]总有一条蜿蜒在童话镇里七彩的河\n[01:11.050]沾染魔法的乖张气息\n[01:14.520]却又在爱里曲折\n[01:17.890]川流不息扬起水花\n[01:20.960]又卷入一帘时光入水\n[01:24.620]让所有很久很久以前\n[01:28.110]都走到幸福结局的时刻\n[01:47.110]听说睡美人被埋藏\n[01:50.440]小人鱼在眺望金殿堂\n[01:53.910]听说阿波罗变成金乌\n[01:57.220]草原有奔跑的剑齿虎\n[02:00.800]听说匹诺曹总说着谎\n[02:04.100]侏儒怪拥有宝石满箱\n[02:07.620]听说悬崖有颗长生树\n[02:10.840]红鞋子不知疲倦地在跳舞\n[02:14.440]只有睿智的河水知道\n[02:17.800]睡美人逃避了生活的煎熬\n[02:21.400]小人鱼把阳光抹成眼影\n[02:24.610]投进泡沫的怀抱\n[02:27.740]总有一条蜿蜒在童话镇里七彩的河\n[02:35.150]沾染魔法的乖张气息\n[02:38.480]却又在爱里曲折\n[02:41.960]川流不息扬起水花\n[02:45.010]又卷入一帘时光入水\n[02:48.650]让所有很久很久以前\n[02:51.960]都走到幸福结局的时刻\n[02:55.680]总有一条蜿蜒在童话镇里梦幻的河\n[03:02.480]分隔了理想分隔现实\n[03:05.820]又在前方的山口汇合\n[03:09.310]川流不息扬起水花\n[03:12.340]又卷入一帘时光入水\n[03:16.030]让所有很久很久以前\n[03:19.480]都走到幸福结局的时刻 又陌生\n[03:25.070]啊~~啊~~啊~~啊~~\n"}
        },
        {
          "id": 3,
          "url": "http://oqvj0lqwc.bkt.clouddn.com/%E5%A4%A7%E7%BA%A6%E5%9C%A8%E5%86%AC%E5%AD%A3.mp3",
          "name": "大约在冬季",
          "lrc":{"version":18,"lyric":"[00:00.00] 作曲 : 齐秦\n[00:01.00] 作词 : 齐秦\n[00:13.040]轻轻的我将离开你\n[00:15.900]请将眼角的泪拭去\n[00:19.190]漫漫长夜里 未来日子里\n[00:22.410]亲爱的你别为我哭泣\n[00:26.080]前方的路虽然太凄迷\n[00:28.670]请在笑容里为我祝福\n[00:32.030]虽然迎著风 虽然下著雨\n[00:35.380]我在风雨之中念著你\n[00:38.740]没有你的日子里\n[00:41.720]我会更加珍惜自己\n[00:45.400]没有我的岁月里\n[00:47.180]你要保重你自己\n[00:51.600]你问我何时归故里\n[00:55.330]我也轻声地问自己\n[00:57.980]不是在此时 不知在何时\n[01:01.270]我想大约会是在冬季\n[01:04.540]不是在此时 不知在何时\n[01:07.600]我想大约会是在冬季\n[01:24.300]轻轻的我将离开你\n[01:26.100]请将眼角的泪拭去\n[01:28.590]漫漫长夜里 未来日子里\n[01:33.840]亲爱的你别为我哭泣\n[01:37.090]前方的路虽然太凄迷\n[01:40.460]请在笑容里为我祝福\n[01:43.340]虽然迎著风 虽然下著雨\n[01:45.640]我在风雨之中念著你\n[01:50.270]没有你的日子里\n[01:52.830]我会更加珍惜自己\n[01:54.350]没有我的岁月里\n[01:59.350]你要保重你自己\n[02:03.030]你问我何时归故里\n[02:06.220]我也轻声地问自己\n[02:09.350]不是在此时 不知在何时\n[02:12.630]我想大约会是在冬季\n[02:15.900]不是在此时 不知在何时\n[02:18.900]我想大约会是在冬季\n[02:20.910]\n[03:00.830]没有你的日子里\n[03:03.470]我会更加珍惜自己\n[03:07.050]没有我的岁月里\n[03:08.640]\n[03:09.930]你要保重你自己\n[03:13.750]你问我何时归故里\n[03:16.480]我也轻声地问自己\n[03:19.580]不是在此时 不知在何时\n[03:23.000]我想大约会是在冬季\n[03:26.290]不是在此时 不知在何时\n[03:29.340]我想大约会是在冬季\n[03:32.790]不是在此时 不知在何时\n[03:35.940]我想大约会是在冬季\n"}
        },
      ];
      let result = database.filter((item) => item.name.indexOf(keyword) >= 0);
      setTimeout(()=>{
        resolve(result);
      }, (Math.random() * 500 + 500))
    } else {
      resolve("");
    }
  });
}

window.search = search;
getSearchResult();




