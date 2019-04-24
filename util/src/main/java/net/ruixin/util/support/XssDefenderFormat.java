package net.ruixin.util.support;

import org.apache.commons.text.StringEscapeUtils;
import org.beetl.core.Format;

/**
 * @author Administrator
 */
public class XssDefenderFormat implements Format {

    @Override
    public Object format(Object data, String pattern) {
        if(data==null){
            return null;
        }

        if(data instanceof String){
            String js = (String)data;
            return StringEscapeUtils.escapeHtml4(js);
        }else{
            return data;
        }
    }

}