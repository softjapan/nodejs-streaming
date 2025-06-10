const outputElement = document.getElementById('output');

async function startStreaming() {
  try {
    const response = await fetch('/streaming'); // サーバーのエンドポイントにリクエスト

    if (!response.body) {
      throw new Error('Response body is null');
    }

    // レスポンスボディをReadableStreamとして取得
    const reader = response.body.getReader();
    // UTF-8のテキストとしてデコードするためのデコーダー
    const decoder = new TextDecoder('utf-8');

    // ストリームからデータを読み続ける
    while (true) {
      const { done, value } = await reader.read();

      // ストリームが終了したらループを抜ける
      if (done) {
        console.log('Stream finished.');
        break;
      }
      
      // 受け取ったデータ (Uint8Array) を文字列に変換
      const chunk = decoder.decode(value, { stream: true });
      if (outputElement) {
        outputElement.textContent += chunk;
      }
      console.log('Received chunk:', chunk);
    }
  } catch (error) {
    console.error('Streaming failed:', error);
    if (outputElement) {
        outputElement.textContent += '\nエラーが発生しました。';
    }
  }
}

startStreaming();