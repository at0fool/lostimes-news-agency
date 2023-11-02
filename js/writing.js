
// ページが読み込まれた際にローカルストレージから値を取得して表示
window.onload = function() {
    var title = document.getElementById("input_title");
    var textarea = document.getElementById("input_teatarea");
    // ローカルストレージから値を取得して表示
    var storedTitle = localStorage.getItem("savedTitle");
    var storedComment = localStorage.getItem("savedComment");
    if (storedTitle) {
        title.value = storedTitle;
    }
    if (storedComment) {
        textarea.value = storedComment;
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
    restoreState();
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
    var formattedDate = '<font color=#949494>' + year + '/' + month + '/' + day + " " + time + '</font>';

    // テキストエリアの現在の内容を取得
    var currentContent = textarea.value;

    // 新しい行を作成し、日付を追加
    var newContent = currentContent + '\n' + formattedDate;

    // テキストエリアに新しい内容を設定
    textarea.value = newContent;

    // スクロールバーを一番下にスクロール
    textarea.scrollTop = textarea.scrollHeight;
}


// htmlタグを文章中から除去して出力し、同時にローカルストレージに内容を保存
function output_btn() {
    var titleInput = document.getElementById("input_title");
    var commentInput = document.getElementById("input_teatarea");
    var titleOutput = document.getElementById("title_result");
    var commentOutput = document.getElementById("comment_result");
    var outputCount = document.getElementById("output_count");
    var titleValue = titleInput.value.trim();
    var commentValue = commentInput.value.trimEnd();

    // ローカルストレージに値を保存
    localStorage.setItem("savedTitle", titleValue);
    localStorage.setItem("savedComment", commentValue);
  
    // 変換前に存在していた改行コード（\n）の削除
    commentValue = commentValue.replace(/\n/g, '');
    // brかpの閉じタグがあれば\nの改行コードを追加
    commentValue = commentValue.replace(/(<br>|<\/br>|<br \/>|<\/p>)/g, "$&\n");
    // 文字数カウント用にhtmlコードや改行コードを削除
    var commentValueNoHtml = commentValue.replace(/(<([^>]+)>|\n)/ig, "");
    
    // 出力
    titleOutput.innerHTML = titleValue;
    commentOutput.innerHTML = commentValue;
    // 文字数出力
    outputCount.textContent = commentValueNoHtml.length.toString();
}

// フラットにした文章をコピーする
document.getElementById("title_result").addEventListener("click", function() {
    copy_result_text(this.textContent);
    alert("タイトルがコピーされました");
});

document.getElementById("comment_result").addEventListener("click", function() {
    copy_result_text(this.textContent);
    alert("本文がコピーされました");
});

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
    var outputTitle = document.getElementById("title_result").innerText.trim();
    var outputText = document.getElementById("comment_result").innerText.trim();
    var fileContent = "執筆日：" + day + "\n\n" + 
        "【htmlタグあり】\n" +
        "タイトル：" + inputTitle + "\n" +
        "本文：\n" + inputText + "\n" +
        "\n――――――――\n\n" +
        "【htmlタグなし】\n" +
        "タイトル：" + outputTitle + "\n" +
        "本文：\n" + outputText;
    // Blobオブジェクトを作成してテキストファイルを作成
    var blob = new Blob([fileContent], { type: "text/plain" });

    // ダウンロードリンクを生成
    var downloadLink = document.createElement("a");
    downloadLink.download = day + "_"  + outputTitle + ".txt"; // yy-mm-dd_タイトル.txtのファイル名で保存
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.click();

    // ローカルストレージから保存された値を削除
    localStorage.removeItem("savedTitle");
    localStorage.removeItem("savedComment");
}