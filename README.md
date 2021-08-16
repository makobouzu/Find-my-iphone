# Find-my-iphone
Link icloud, spreadsheet, and mapbox, and record iphone's location information &amp; history in spreadsheet.  

<img src="https://img.shields.io/badge/Chrome-Passing-gre.svg?logo=Google%20Chrome&amp;style=plastic">

## PREPARE
```
git clone git@github.com:makobouzu/Find-my-iphone.git
cd find-my-iphone
npm install
```

```
touch .env
```
### .env file include
+ PORT
+ APPLE_ID
+ PASSWORD
+ SPREADSHEET_ID
  + `https://docs.google.com/spreadsheets/d/XXXXXXXXXXXXXXXXXXXXXXXXXXX/edit#gid=0` -> SPREADSHEET_ID="XXXXXXXXXXXXXXXXXXXXXXXXXXX"
+ SHIFT_WORKSHEET_ID 
  + `https://docs.google.com/spreadsheets/d/XXXXXXXXXXXXXXXXXXXXXXXXXXX/edit#gid=0` -> SHIFT_WORKSHEET_ID="0"

### Enable Google Spreadsheet API  
Go to [Google Cloud Platform](https://console.cloud.google.com/home) -> Create new Project -> Go to "APIとサービス" -> Click "APIとサービスの有効化" -> Enable Google Sheets API  

Click "認証情報を作成" -> 使用するAPI=Google Sheets API & アクセスするデータの種類=アプリケーションデータ(いいえ、使用しません) -> Write service account(ロール=編集者) -> "完了"  

Click "XXXX-XXX@XXXXXXXXX.gserviceaccount.com" in サービスアカウント -> Click "鍵を追加(新しい鍵を作成)" in キー -> Download json -> rename credentials.json & mv ./routes 

Share E-mail(client_email: XXX@XXXXXX.gserviceaccount.com in credentials.json) in Spreadsheet settings -> 編集者

* Reference  
  * [GoogleスプレッドシートからNode.jsでシフトデータを読み出す方法](https://www.twilio.com/blog/load-data-from-google-spreadsheet-jp)  

### Create Mapbox Access Token  
Sign in [mapbox](https://account.mapbox.com/auth/signin/) -> Copy default public token -> Paste mapboxgl.accessToken in index.js:4

* Reference
  * [mapbox reference](https://docs.mapbox.com/help/getting-started/access-tokens/)  

## RUN
```
cd find-my-iphone
npm run devStart
```

