# ChatGPTのように文字がリアルタイムで流れるストリーミング通信の仕組みを、実際のTypeScriptソースコードを使って説明する


# 仕組みの概要

1.  **サーバー側**: 特定のエンドポイントにリクエストが来ると、HTTPレスポンスをすぐには完了させません。代わりに、`res.write()`を使って文字列の断片（チャンク）を少しずつ送信します。全てのデータを送り終えたら、`res.end()`でストリームを閉じます。
2.  **クライアント側**: `fetch` APIでサーバーにリクエストを送り、レスポンスの`body`（`ReadableStream`）を取得します。このストリームからデータをチャンクごとに非同期で読み取り、受け取るたびに画面に表示します。


# Demo動画

https://github.com/user-attachments/assets/a7f143f2-84fa-4498-b1a8-769f9d4947b6

# 起動方法

```bash
git clone https://github.com/softjapan/nodejs-streaming.git
cd nodejs-streaming
npm install
npm run build
npm run start 
http://localhost:3000

```
