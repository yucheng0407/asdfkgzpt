package net.ruixin.service.qzld;

import net.ruixin.domain.gzl.GzlFb;

/**
 * @author zfk
 * @date 2019/4/18
 * @description 公共方法
 */
public interface ICommonService {

    /**
     * 根据发布内容生成发布标题
     * @param gzlFb
     * @return
     */
    String getGzlFbBt(GzlFb gzlFb);
}
