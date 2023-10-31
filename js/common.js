// ハンバーガーメニューを開く
function toggleSPMenu() {
    const headerSpArea = document.querySelector('.header_sp_area');
    const hamburgerBars = document.querySelectorAll('.hamburger_bar');
    const spLists = document.querySelectorAll('.sp_link_list');

    if (headerSpArea.classList.contains('open')) {
        // クリックされたらopenとis_activeを削除
        headerSpArea.classList.remove('open');
        spLists.forEach(bar => bar.classList.remove('is_active'));
        hamburgerBars.forEach(bar => bar.classList.remove('is_active'));
    } else {
        // クリックされたらopenを追加し、hamburger_barにis_activeを追加
        headerSpArea.classList.add('open');
        spLists.forEach(bar => bar.classList.add('is_active'));
        hamburgerBars.forEach(bar => bar.classList.add('is_active'));
    }
}
