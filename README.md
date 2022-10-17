# Hylove Sample Site

## Build with
### Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

### Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Quick Start
1. set environment veriables or use `.env` at source root
```shell
# 使用mock auth機制取代登入驗證
VITE_MOCK_AUTH=true
VITE_MOCK_USERNAME=user
VITE_MOCK_PASSWORD=user

# 設定API host路徑
VITE_APP_ENDPOINT=https://your.api.endpoint/api/v1/
```
2. install dependency via npm
```shell
npm install
```
3. run dev environment
```shell
npm run dev
```


## Build dist for production
```shell
npm run build
```

## API Spec
All api endpoints use same request body like following json data. 
```javascript
"beforeBrainData": {
      "Good Signal Quality(0-100)": [int], 
      "Attention": [int], 
      "Meditation": [int], 
      "Delta": [int], 
      "Theta": [int], 
      "Low Alpha": [int], 
      "High Alpha": [int], 
      "Low Beta": [int], 
      "High Beta": [int], 
      "Low Gamma": [int], 
      "High Gamma": [int], 
    },
    "afterBrainData": {
      "Good Signal Quality(0-100)": [int], 
      "Attention": [int], 
      "Meditation": [int], 
      "Delta": [int], 
      "Theta": [int], 
      "Low Alpha": [int], 
      "High Alpha": [int], 
      "Low Beta": [int], 
      "High Beta": [int], 
      "Low Gamma": [int], 
      "High Gamma": [int], 
    }
```
### Basic raw data
基本特徵數值與折線圖資料
- Method: POST
- Path: /analysis/brain_features
- response:
```
[
{
"name":"attention",
"data":[
{
"name":"前測",
"avg":float,
"amplitude":float,
"series":[[int, int], ...]
},
{
"name":"後測",
"avg":float,
"amplitude":float,
"series":[[int, int], ...]
}
]
},
{
"name":"meditation",
"data":[
{
"name":"前測",
"avg":float,
"amplitude":float,
"series":[[int, int], ...]
},
{
"name":"後測",
"avg":float,
"amplitude":float,
"series":[[int, int], ...]
}
]
},
...
{
"name":"low gamma",
"data":[
{
"name":"前測",
"avg":float,
"amplitude":float,
"series":[[int, int], ...]
},
{
"name":"後測",
"avg":float,
"amplitude":float,
"series":[[int, int], ...]
}
]
}
```
### Compared data
前後測數值比較
- Method: POST
- Path: /analysis/compared_features
- response:
```
[
{
"name":"attention",
"comparedData":{
"avg":{
"before":float,
"after":float,
"beforeAfter":float,
"afterBefore":float
},
"amplitude":{
"before":float,
"after":float
},
"amplitudeAvg":{
"before":float,
"after":float
}
}
},
...
{
"name":"highGamma",
"comparedData":{
"avg":{
"before":float,
"after":float,
"beforeAfter":float,
"afterBefore":float
},
"amplitude":{
"before":float,
"after":float
},
"amplitudeAvg":{
"before":float,
"after":float
}
}
}
]
```
### Ore 礦物結晶驗證模式
- Method: POST
- Path: /ore
- response
```
{
    "delta":"該結晶體對靈性修行增強幫助無變化",
    "theta":"該結晶體對靈感與創作力增強沒有幫助",
    "lowAlpha":"該結晶體對心靈放鬆與創作力沒有幫助",
    "highAlpha":"該結晶體對創新與專注力沒有幫助",
    "lowBeta":"該結晶體對思考與執行力非常有幫助",
    "highBeta":"該結晶體對激動與焦慮降壓明顯有幫助",
    "lowGamma":"該結晶體對降低煩躁與憂鬱非常有幫助",
    "highGamma":"該結晶體對減壓與放鬆心情非常有幫助"
}
```

由於資料量大與版面篇幅，詳細回傳資料可參考瀏覽器的「檢查」>「網路」查看範例資料格式，也可搭配原始碼查看網頁資料呈現方式。
