    // ファイルを読み込む関数
    function include(file, elementTagName) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', file, true);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          var elements = document.getElementsByTagName(elementTagName);
          if (elements.length > 0) {
            elements[0].innerHTML = xhr.responseText;
          }
        }
      };
      xhr.send();
    }

    // ヘッダーとフッターを読み込む
    include('include/header.html', 'header');
    include('include/footer.html', 'footer');
