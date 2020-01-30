$(function() {
  // スマホナビ
  $(".header__button").on("click", function() {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
      $(".header__wrapper")
        .addClass("close")
        .removeClass("open");
    } else {
      $(this).addClass("active");
      $(".header__wrapper")
        .addClass("open")
        .removeClass("close");
    }
  });

  $(".nav li a").on("click", function() {
    $(".header__button").removeClass("active");
    $(".header__wrapper").removeClass("open");
  });

  // スマホナビ

  // close
  var position = $("#works").offset().top;

  $("#close_btn").click(function() {
    $("html,body").animate(
      {
        scrollTop: position
      },
      {
        queue: false
      }
    );
  });
  // close

  // works
  var mediaQuery = matchMedia("(max-width: 1000px)");
  // ページが読み込まれた時に実行
  handle(mediaQuery);

  // ウィンドウサイズが変更されても実行されるように
  mediaQuery.addListener(handle);

  function handle(mq) {
    if (mq.matches) {
      // ウィンドウサイズが1000px以下のとき
      // 表示させる要素の総数をlengthメソッドで取得
      var $numberListLen = $(".works__left article").length;
      // デフォルトの表示数
      var defaultNum = 3;
      // ボタンクリックで追加表示させる数
      var addNum = 3;
      // 現在の表示数
      var currentNum = 0;

      $(".works__left").each(function() {
        // moreボタンを表示し、closeボタンを隠す
        $(this)
          .find("#more_btn")
          .show();
        $(this)
          .find("#close_btn")
          .hide();

        // defaultNumの数だけ要素を表示
        // defaultNumよりインデックスが大きい要素は隠す
        $(this)
          .find("article:not(:lt(" + defaultNum + "))")
          .hide();

        // 初期表示ではデフォルト値が現在の表示数となる
        currentNum = defaultNum;

        // moreボタンがクリックされた時の処理
        $("#more_btn").click(function() {
          // 現在の表示数に追加表示数を加えていく
          currentNum += addNum;

          // 現在の表示数に追加表示数を加えた数の要素を表示する
          $(this)
            .parent()
            .find("article:lt(" + currentNum + ")")
            .slideDown();

          // 表示数の総数よりcurrentNumが多い=全て表示された時の処理
          if ($numberListLen <= currentNum) {
            // 現在の表示数をデフォルト表示数へ戻す
            currentNum = defaultNum;
            // インデックス用の値をセット
            indexNum = currentNum - 1;

            // moreボタンを隠し、closeボタンを表示する
            $("#more_btn").hide();
            $("#close_btn").show();

            // closeボタンがクリックされた時の処理
            $("#close_btn").click(function() {
              // デフォルト数以降=インデックスがindexNumより多い要素は非表示にする
              $(this)
                .parent()
                .find("article:gt(" + indexNum + ")")
                .slideUp();

              // closeボタンを隠し、moreボタンを表示する
              $(this).hide();
              $("#more_btn").show();
            });
          }
        });
      });
    } else {
      // それ以外
      $(".works__contents").on("click", function() {
        var list = $(this).html();
        $(".works__right").stop(true);
        $.when(
          $(".works__right").animate(
            { opacity: 0 },
            { duration: 200, easing: "swing" }
          )
        ).done(function() {
          $(".works__right")
            .html(list)
            .animate({ opacity: 1 }, { duration: 400, easing: "swing" });
        });
      });
    }
  }
  // works
});
