// GASのウェブアプリURLをここに設定
const GAS_URL = "AKfycbwn4bLZutcrDZ9tUFXmMMTOT3xMvYcL8jdt6M7wTFpkfFnhnojCG-uW2SZKm5kikF-S";

// 人間証明の状態管理
let isHuman = false;

// Cloudflare Turnstileが成功した時に呼ばれるコールバック関数
function onSuccess(token) {
    isHuman = true;
    console.log("Human verified.");
}

async function sendData(inputId, type) {
    // 人間証明チェック
    if (!isHuman) {
        alert("人間であることを証明（チェックボックス）してくれ！");
        return;
    }

    const val = document.getElementById(inputId).value;
    if (!val) {
        alert("入力欄が空だぜ。");
        return;
    }

    try {
        // GASへPOST送信
        await fetch(GAS_URL, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ type: type, value: val })
        });
        alert("送信完了したぜ。");
        // 送信後、入力欄を空にする（任意）
        document.getElementById(inputId).value = "";
    } catch (e) {
        console.error(e);
        alert("エラーが発生した。通信を確認してくれ。");
    }
}
