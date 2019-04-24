package net.ruixin.util.tools;

import net.sourceforge.pinyin4j.PinyinHelper;
import net.sourceforge.pinyin4j.format.HanyuPinyinCaseType;
import net.sourceforge.pinyin4j.format.HanyuPinyinOutputFormat;
import net.sourceforge.pinyin4j.format.HanyuPinyinToneType;
import net.sourceforge.pinyin4j.format.HanyuPinyinVCharType;
import net.sourceforge.pinyin4j.format.exception.BadHanyuPinyinOutputFormatCombination;

/**
 * 汉字转拼音
 */
public class ConvertPinyinUtil {
    /**
     * 汉字转全拼
     *
     * @param str 转化字符串
     * @return String
     */
    public static String getPinyin(String str) {
        if (str == null || str.length() == 0) {
            return "";
        }
        char[] t1;
        t1 = str.toCharArray();
        String[] t2;
        //设置汉字拼音输出的格式
        HanyuPinyinOutputFormat t3 = new HanyuPinyinOutputFormat();
        // 小写
        t3.setCaseType(HanyuPinyinCaseType.LOWERCASE);
        // 不带声调
        t3.setToneType(HanyuPinyinToneType.WITHOUT_TONE);
        //u转v
        t3.setVCharType(HanyuPinyinVCharType.WITH_V);
        StringBuilder t4 = new StringBuilder();
        for (char aT1 : t1) {
            // 判断是否为汉字字符
            if (Character.toString(aT1).matches("[\\u4E00-\\u9FA5]+")) {
                // 将汉字的几种全拼都存到t2数组中
                try {
                    t2 = PinyinHelper.toHanyuPinyinStringArray(aT1, t3);
                    // 取出该汉字全拼的第一种读音并连接到字符串t4后
                    t4.append(t2[0]);
                } catch (BadHanyuPinyinOutputFormatCombination badHanyuPinyinOutputFormatCombination) {
                    //错误不处理
                    badHanyuPinyinOutputFormatCombination.printStackTrace();
                }
            } else {
                // 如果不是汉字字符，直接取出字符并连接到字符串t4后
                t4.append(Character.toString(aT1));
            }
        }
        return t4.toString();
    }

    /**
     * 汉字转简拼
     *
     * @param str 转化字符串
     * @return String
     */
    public static String getPinYinHeadChar(String str) {
        StringBuilder convert = new StringBuilder();
        if (str == null || str.length() == 0) {
            return convert.toString();
        }
        for (int j = 0; j < str.length(); j++) {
            char word = str.charAt(j);
            // 提取汉字的首字母
            String[] pinyinArray = PinyinHelper.toHanyuPinyinStringArray(word);
            if (pinyinArray != null) {
                convert.append(pinyinArray[0].charAt(0));
            } else {
                convert.append(word);
            }
        }
        return convert.toString().toUpperCase();
    }
}
