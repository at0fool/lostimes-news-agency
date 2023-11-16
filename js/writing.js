
// ページが読み込まれた際にローカルストレージから値を取得して表示
window.onload = function() {
    var title = document.getElementById("input_title");
    var textarea = document.getElementById("input_teatarea");
    var name1 = document.getElementById("input_user_a");
    var name2 = document.getElementById("input_user_b");
    // ローカルストレージから値を取得して表示
    var storedTitle = localStorage.getItem("savedTitle");
    var storedComment = localStorage.getItem("savedComment");
    var storedName1 = localStorage.getItem("savedName1");
    var storedName2 = localStorage.getItem("savedName2");
    if (storedTitle) {
        title.value = storedTitle;
    }
    if (storedComment) {
        textarea.value = storedComment;
    }
    if (storedName1) {
        name1.value = storedName1;
    }
    if (storedName2) {
        name2.value = storedName2;
    }
}

// jsのタグ追加を元に戻す
var previousState;
function saveState() {
    var textarea = document.getElementById("input_teatarea");
    previousState = textarea.value;
}

function restoreState() {
    var textarea = document.getElementById("input_teatarea");
    textarea.value = previousState;
    textarea.focus();
}

function undo() {
    var textarea = document.getElementById("input_teatarea");
    var scrollTop = textarea.scrollTop;
    restoreState();
    textarea.scrollTop = scrollTop;
}

// htmlタグを追加する
function all_br_set(){
    saveState();
    var textarea = document.getElementById("input_teatarea");
    var text = textarea.value;
    var textWithBrTags = text.replace(/\n/g, "<br />\n");

    // テキストエリアに置き換えたテキストを設定
    textarea.value = textWithBrTags;
}

function br_set() {
    saveState();
    var textarea = document.getElementById("input_teatarea");
    var startPos = textarea.selectionStart;
    var endPos = textarea.selectionEnd;
    var text = textarea.value;
    var newText;

    if (startPos !== endPos) {
        // テキストが選択されている場合
        var selectedText = text.substring(startPos, endPos);
        newText = text.substring(0, startPos) + "<br />" + selectedText + "<br />" + text.substring(endPos, text.length);
        textarea.value = newText;
        textarea.setSelectionRange(startPos, endPos + 11);
    } else {
        // テキストが選択されていない場合
        newText = text.substring(0, startPos) + "<br />" + text.substring(endPos, text.length);
        textarea.value = newText;
        textarea.setSelectionRange(startPos + 6, startPos + 6);
    }

    textarea.focus();
}

function b_set() {
    saveState();
    var textarea = document.getElementById("input_teatarea");
    var scrollTop = textarea.scrollTop; // 1. 現在のスクロール位置を保存
    var startPos = textarea.selectionStart;
    var endPos = textarea.selectionEnd;
    var text = textarea.value;
    var newText = text.substring(0, startPos) + "<b>" + text.substring(startPos, endPos) + "</b>" + text.substring(endPos, text.length);
    textarea.value = newText;
    textarea.focus();
    textarea.setSelectionRange(startPos, endPos + 7);
    textarea.scrollTop = scrollTop; // 2. スクロール位置を復元
}

function u_set() {
    saveState();
    var textarea = document.getElementById("input_teatarea");
    var scrollTop = textarea.scrollTop;
    var startPos = textarea.selectionStart;
    var endPos = textarea.selectionEnd;
    var text = textarea.value;
    var newText = text.substring(0, startPos) + "<u>" + text.substring(startPos, endPos) + "</u>" + text.substring(endPos, text.length);
    textarea.value = newText;
    textarea.focus();
    textarea.setSelectionRange(startPos, endPos + 7);
    textarea.scrollTop = scrollTop;
}

function color_set() {
    saveState();
    var textarea = document.getElementById("input_teatarea");
    var scrollTop = textarea.scrollTop;
    var startPos = textarea.selectionStart;
    var endPos = textarea.selectionEnd;
    var text = textarea.value;
    var pickcolor_area = document.getElementById("pick_color");
    var pickcolor = pickcolor_area.value;
    var newText = text.substring(0, startPos) + "<font color=" + pickcolor + ">" + text.substring(startPos, endPos) + "</font>" + text.substring(endPos, text.length);
    textarea.value = newText;
    textarea.focus();
    textarea.setSelectionRange(startPos, endPos + 7);
    textarea.scrollTop = scrollTop;
}

function insert_data() {
    saveState();
    var textarea = document.getElementById("input_teatarea");

    // 日付
    var today = new Date();
    var year = today.getFullYear();
    var month = String(today.getMonth() + 1).padStart(2, '0');
    var day = String(today.getDate()).padStart(2, '0');
    var hour = String(today.getHours()).padStart(2, '0');
    var min = String(today.getMinutes()).padStart(2, '0');
    var time = hour + ":" + min;
    var formattedDate = "\n" + year + '/' + month + '/' + day + " " + time;

    // テキストエリアの現在の内容を取得
    var currentContent = textarea.value;
    // 新しい行を作成し、日付を追加
    var newContent = currentContent + '\n' + formattedDate;
    // テキストエリアに新しい内容を設定
    textarea.value = newContent;
    // スクロールバーを一番下にスクロール
    textarea.scrollTop = textarea.scrollHeight;
}

function insert_name() {
    saveState();
    var textarea = document.getElementById("input_teatarea");

    // 名取得
    var name1 = document.getElementById("input_user_a").value;
    var name2 = document.getElementById("input_user_b").value;
    if(name1 && name2){
        var name = name1 + name2;
    }else if(name1){
        var name = name1;
    }else if(name2){
        var name = name2;
    }else{
        var name = "匿名";
    }
    
    // テキストエリアの現在の内容を取得
    var currentContent = textarea.value;
    
    // 新しい行を作成し、執筆者名を追加
    var newContent = currentContent + '\n\n' + '(記事執筆：' + name + ")";
    
    // テキストエリアに新しい内容を設定
    textarea.value = newContent;
    
    // スクロールバーを一番下にスクロール
    textarea.scrollTop = textarea.scrollHeight;
}


// ローカルストレージに内容を保存
function writing_save() {
    var titleInput = document.getElementById("input_title");
    var commentInput = document.getElementById("input_teatarea");
    var name1 = document.getElementById("input_user_a").value;
    var name2 = document.getElementById("input_user_b").value;
    var titleValue = titleInput.value.trimEnd();
    var commentValue = commentInput.value.trimEnd();

    // ローカルストレージに値を保存
    localStorage.setItem("savedTitle", titleValue);
    localStorage.setItem("savedComment", commentValue);
    localStorage.setItem("savedName1", name1);
    localStorage.setItem("savedName2", name2);

    // 「保存済み」に変更
    var saveButton = document.getElementById("save_btn");
    saveButton.value = "保存済み";

    // 3秒後にボタンを元に戻す
    setTimeout(function() {
        saveButton.value = "一時保存";
    }, 500);
}

// フラットにした文章をコピーする
function cp_title() {
    // Get the input element by its id
    var inputElement = document.getElementById("input_title");
    inputElement.select();
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    alert("タイトルがコピーされました");
}

function cp_contents() {
    var inputElement = document.getElementById("input_teatarea");
    inputElement.select();
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    alert("本文がコピーされました");
}

function copy_result_text(text) {
    const el = document.createElement("textarea");
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
}

// 入力中の文字数管理
var inputTextarea = document.getElementById("input_teatarea");
var inputCount = document.getElementById("input_count");

inputTextarea.addEventListener("input", update_textcount);
document.addEventListener("click", function(event) {
    if (event.target !== inputTextarea) {
        update_textcount();
    }
});

function update_textcount() {
    var text = inputTextarea.value.replace(/(<([^>]+)>|\n)/ig, "");;
    var count = text.length;
    inputCount.textContent = count.toString();
}

// txtファイルで記事の内容を保存
function dl_news() {
    var day = new Date().toLocaleDateString('sv-SE')
    // テキストファイルの内容を取得
    var inputTitle = document.getElementById("input_title").value.trim();
    var inputText = document.getElementById("input_teatarea").value.trim();
    var fileContent = "執筆日：" + day + "\n\n" + 
        "タイトル：" + inputTitle + "\n" +
        "本文：\n" + inputText + "\n" +
        "\n――――――――\n\n";
    // Blobオブジェクトを作成してテキストファイルを作成
    var blob = new Blob([fileContent], { type: "text/plain" });

    // ダウンロードリンクを生成
    var downloadLink = document.createElement("a");
    downloadLink.download = day + "_"  + inputTitle + ".txt"; // yy-mm-dd_タイトル.txtのファイル名で保存
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.click();
}

function btn_17() {
    var comment_area = document.getElementsByClassName('comment_input')[0];
    var w_btn_a = document.getElementById('width_btn_a');
    var w_btn_b = document.getElementById('width_btn_b');

    // スマートフォンからのアクセスかどうかを判定
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    w_btn_a.style.display = 'none';
    w_btn_b.style.display = 'block';

    // 判定結果に基づいて異なる横幅を設定
    if (isMobile) {
        comment_area.style.width = '278px';  // スマートフォンの場合
    } else {
        comment_area.style.width = '288px';  // スマートフォン以外の場合
    }
}

function btn_default(){
    var comment_area = document.getElementsByClassName('comment_input')[0];
    var w_btn_a = document.getElementById('width_btn_a');
    var w_btn_b = document.getElementById('width_btn_b');
    w_btn_a.style.display = 'block';
    w_btn_b.style.display = 'none';

    comment_area.style.width = '100%';
}

// フラットにした文章をコピーする
function cp_tweet() {
    var inputtitle = document.getElementById("input_title");
    var name1 = document.getElementById("input_user_a").value;
    var tweet = '【NEWS】『' + inputtitle + '』\n NEWSを更新しました。AppStoreよりNEWSアプリをダウンロードの上ご覧ください。(' + name1 +')';
    tweet.select();
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    alert("タイトルがコピーされました");
}

function cp_tweet() {
    var inputtitle = document.getElementById("input_title").value;
    var name1 = document.getElementById("input_user_a").value;
    var name2 = document.getElementById("input_user_b").value;name ="";
    if(name1){
        var name = '(' + name1 +')';
    }else if(name2){
        var name = '(' + name2 +')';
    }
    var tweet = '【NEWS】『' + inputtitle + '』\n NEWSを更新しました。AppStoreよりNEWSアプリをダウンロードの上ご覧ください。' + name;
    // テキストエリアを作成し、内容を設定
    var textArea = document.createElement("textarea");
    textArea.value = tweet;

    // 範囲外にコピー元となるテキストエリアを生成
    textArea.style.position = "absolute";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.select();

    // コピー操作を実行
    document.execCommand("copy");

    // 不要なテキストエリアを削除
    document.body.removeChild(textArea);

    alert("ツイート文言がコピーされました");
}
