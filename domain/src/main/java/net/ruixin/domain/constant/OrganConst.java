package net.ruixin.domain.constant;

/**
 * 组织机构常量池
 *
 * @author Pitcher
 */
public interface OrganConst {
    /**
     * 机构树
     */
    String ORGAN = "o";
    /**
     * 机构用户树
     */
    String ORGAN_USER = "ou";
    /**
     * 机构用户树
     */
    String ORGAN_POST = "op";
    /**
     * 机构用户树
     */
    String ORGAN_POST_USER = "opu";
    /**
     * 树的种类
     */
    String KIND = "kind";

    /**
     * 无岗位一人一机构
     */
    String NO_POST_SINGLE_ORGAN = "np-so";
    /**
     * 无岗位一人多机构
     */
    String NO_POST_MULTI_ORGAN = "np-mo";
    /**
     * 有岗位一人一机构
     */
    String YES_POST_SINGLE_ORGAN = "yp-so";
    /**
     * 有岗位一人多机构
     */
    String YES_POST_MULTI_ORGAN = "yp-mo";


}
