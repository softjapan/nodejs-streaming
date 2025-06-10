import express from 'express';

const app = express();
const port = 3000;

app.use(express.static('dist/public'));

// 文字列をストリーミングで返すエンドポイント
app.get('/streaming', (req, res) => {
  // 接続が切断された場合も考慮
  req.on('close', () => {
    console.log('Client disconnected.');
  });

  // ヘッダーを設定
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  let count = 0;
  const intervalId = setInterval(() => {
    count++;
    const message = `メッセージ ${count}: ${new Date().toLocaleTimeString()}\n`;
    
    // データをチャンクとしてクライアントに送信
    res.write(message);
    console.log(`Sent: ${message.trim()}`);

    // 50回送信したらストリームを終了
    if (count >= 50) {
      clearInterval(intervalId);
      res.end('ストリームの終わりです。'); // 最後のメッセージを送り、接続を閉じる
      console.log('Stream ended.');
    }
  }, 1000); // 1秒ごとに送信
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});