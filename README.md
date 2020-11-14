# 老爸的私房帳戶

核心功能是讓老爸新增、修改與刪除「支出紀錄」


## 現有功能

- 在首頁一次瀏覽所有支出的清單
- 在首頁看到所有支出清單的總金額
- 新增一筆支出
- 編輯支出的所有屬性 (一次只能編輯一筆)
- 刪除任何一筆支出 (一次只能刪除一筆)
- 在首頁可以根據支出「類別」篩選支出；總金額的計算只會包括被篩選出來的支出總和。
- 加入使用者認證功能
- 除了現在的資料，使用者可以在每筆支出加上「商家 (merchant)」這個欄位
- 在首頁，使用者可以同時根據「類別」與「月份」來篩選支出；總金額的計算只會包括被篩選出來的支出總和

## 使用工具

- mongoDB: 6.4.1
- mongoose: 5.10.6
- Node.js: 6.4.1
- Express: 4.17.1
- Express-Handlebars: 5.1.0
- nodemon: 2.0.4
- body-parser: 1.19.0
- method-override: 3.0,


## 安裝

0.電腦需安裝mongoDB

1.開啟終端機(Terminal) cd 到存放專案本機位置並執行:

```
git clone https://github.com/derek800109/expense-tracker.git
``````

2.cd 至 expense-tracker 資料夾


3.初始化安裝套件

```
npm init   //安裝套件
```

```
npm run seed  //導入預設開支資訊
```


4.終端機顯示以下資訊代表成功與資料庫連接
mongoDB connected
done.

```
npm run dev  //啟動程式
```

```
Testing account:
Email: user1@example.com
Password: 12345678
```

5.終端機顯示以下資訊代表啟動成功
Express is running on http://localhost:3000
mongoDB connected

伺服器已經成功連線並運作於 http://localhost:3000