package net.ruixin.controller.plat.demo;


import net.ruixin.controller.BaseController;
import net.ruixin.util.data.AjaxReturn;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;


public class DxglHandler extends BaseController {

        //手机短信发送
    @ResponseBody
    @RequestMapping(value = "/sendMessage", method = RequestMethod.POST)
    public AjaxReturn sendMessage() {
        AjaxReturn ar = new AjaxReturn();
        try {
//            String[] PhoneNum = new String[1];
//            PhoneNum[0] = "tel:18895352311";
//            String URL = "http://10.129.1.200:8002/ws/services/ctcc_ema_wbs?wsdl";
//            String applicationID = "APP088";
//            String ecid = "defaultema";
//            ApiClient apiClient = ApiClient.getInstance(URL, applicationID, ecid);
//            boolean deliveryResponseRequest = true;
//            String extendCode = "51";
//            final byte messageFormat = 4;
//            final byte sendMethodType = 3;
//            String result = apiClient.sendSms(PhoneNum, "测试短信", deliveryResponseRequest, extendCode, messageFormat, sendMethodType);
//            if (result != null) {
//                ar.setSuccess(true).setData(1);
//            } else {
//                ar.setSuccess(false).setMsg("发送失败");
//            }
            String content="安徽宝翔企业邀请您参加于拟2016年10月27日在拟工地点举行的东方龙城地基基础专项施工方案评审，请在24小时内回复是否参加";
            String mobile="17605531994";
            String urlStr = "http://access.xx95.net:8886/Connect_Service.asmx/SendSms?epid=AHWH1184565&User_Name=admin&password=7edae3e2a2b0cd57&phone="+ mobile  +"&content=" + java.net.URLEncoder.encode(content, "UTF-8") + "";
            URL url = new URL(urlStr);
            HttpURLConnection huc = (HttpURLConnection) url.openConnection();
            StringBuilder result = new StringBuilder("");
            try {
                huc.setRequestMethod("GET");
                huc.connect();
                InputStream is = huc.getInputStream();
                int code = huc.getResponseCode();
                if (code == HttpURLConnection.HTTP_OK) {
                    byte[] buffer = new byte[4096];
                    int bytes;
                    while (true) {
                        bytes = is.read(buffer);
                        if (bytes <= 0) {
                            break;
                        }
                      //  BASE64Encoder enc=new BASE64Encoder();
                     //   result += enc.encode(buffer);//new String(buffer);
                        result.append(new String(buffer,"UTF-8")) ;
                    }
                    int idx = result.indexOf("<string xmlns=\"http://access.xx95.net:8886/\">");
                    if (idx != -1) {
                        result =new StringBuilder(result.substring(idx+"<string xmlns=\"http://access.xx95.net:8886/\">".length())) ;
                        result =new StringBuilder( result.substring(0, result.indexOf("<")));
                        handleResponse(result.toString());
                    }
                } else {
                    throw new Exception("HTTP调用失败，返回码" + code);
                }

            } finally {
                try {
                    huc.disconnect();
                } catch (Throwable ex) {
                }
            }
            ar.setSuccess(true).setData(1);


//            String httpUrl = "http://apis.baidu.com/xiaogg/holiday/holiday";
//            String httpArg = "d=20161001,20161005";
//            BufferedReader reader = null;
//            String result = null;
//            StringBuffer sbf = new StringBuffer();
//            httpUrl = httpUrl + "?" + httpArg;
//                URL url = new URL(httpUrl);
//                HttpURLConnection connection = (HttpURLConnection) url.openConnection();
//                connection.setRequestMethod("GET");
//                // 填入apikey到HTTP header
//                connection.setRequestProperty("apikey",  "67f62e1105a3b1fd54f95a67a95dc48f");
//                connection.connect();
//                InputStream is = connection.getInputStream();
//                reader = new BufferedReader(new InputStreamReader(is, "UTF-8"));
//                String strRead = null;
//                while ((strRead = reader.readLine()) != null) {
//                    sbf.append(strRead);
//                    sbf.append("\r\n");
//                }
//                reader.close();
//                result = sbf.toString();
        } catch (Exception e) {
            ar.setSuccess(false).setMsg("发送失败");
        }
        return ar;
    }

    private void handleResponse(String result) throws Exception {
        switch (result) {
            case "00":

                break;
            case "01":
                throw new Exception("发送短信失败！返回码" + result + "，错误描述：参数存在空值");
            case "02":
                throw new Exception("发送短信失败！返回码" + result + "，错误描述：用户鉴权失败");
            case "03":
                throw new Exception("发送短信失败！返回码" + result + "，错误描述：登录IP黑名单");
            case "99":
                throw new Exception("发送短信失败！返回码" + result + "，错误描述：服务器接收失败");
            default:
                throw new Exception("发送短信失败！返回码" + result + "，错误描述：未知错误" + result);
        }
    }
}
