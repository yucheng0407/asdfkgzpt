package net.ruixin.util.http;

import java.util.regex.Pattern;

/**
 * Web防火墙工具类
 *
 * @author Administrator
 */
public class WafKit {

    private static final Pattern scriptPattern1 = Pattern.compile("<script>(.*?)</script>", Pattern.CASE_INSENSITIVE);
    private static final Pattern scriptPattern2 = Pattern.compile("</script>", Pattern.CASE_INSENSITIVE);
    private static final Pattern scriptPattern3 = Pattern.compile("<script(.*?)>", Pattern.CASE_INSENSITIVE | Pattern.MULTILINE | Pattern.DOTALL);
    private static final Pattern scriptPattern4 = Pattern.compile("javascript:", Pattern.CASE_INSENSITIVE);
    private static final Pattern scriptPattern5 = Pattern.compile("vbscript:", Pattern.CASE_INSENSITIVE);
    private static final Pattern evalPattern = Pattern.compile("eval\\((.*?)\\)", Pattern.CASE_INSENSITIVE | Pattern.MULTILINE | Pattern.DOTALL);
    private static final Pattern expressionPattern = Pattern.compile("expression\\((.*?)\\)", Pattern.CASE_INSENSITIVE | Pattern.MULTILINE | Pattern.DOTALL);
    private static final Pattern onloadPattern = Pattern.compile("onload(.*?)=", Pattern.CASE_INSENSITIVE | Pattern.MULTILINE | Pattern.DOTALL);

    /**
     * 过滤XSS脚本内容
     *
     * @param value 待处理内容
     */
    static String stripXSS(String value) {
        String rlt = null;

        if (null != value) {
            // Avoid null characters
            rlt = value.replaceAll("", "");

            // Avoid anything between script tags
            rlt = scriptPattern1.matcher(rlt).replaceAll("");

            // Remove any lonesome </script> tag
            rlt = scriptPattern2.matcher(rlt).replaceAll("");

            // Remove any lonesome <script ...> tag
            rlt = scriptPattern3.matcher(rlt).replaceAll("");

            // Avoid javascript:... expressions
            rlt = scriptPattern4.matcher(rlt).replaceAll("");

            // Avoid vbscript:... expressions
            rlt = scriptPattern5.matcher(rlt).replaceAll("");

            // Avoid eval(...) expressions
            rlt = evalPattern.matcher(rlt).replaceAll("");

            // Avoid expression(...) expressions
            rlt = expressionPattern.matcher(rlt).replaceAll("");

            // Avoid onload= expressions
            rlt = onloadPattern.matcher(rlt).replaceAll("");
        }
        return rlt;
    }

    /**
     * 过滤SQL注入内容
     *
     * @param value 待处理内容
     */
    static String stripSqlInjection(String value) {
        return (null == value) ? null : value.replaceAll("('.+--)|(--)|(%7C)", "");
    }

    /**
     * 过滤SQL/XSS注入内容
     *
     * @param value 待处理内容
     */
    public static String stripSqlXSS(String value) {
        return stripXSS(stripSqlInjection(value));
    }

}
