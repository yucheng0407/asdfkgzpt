package net.ruixin.util.rule.matchingRules;

import net.ruixin.enumerate.plat.OperatingStatus;
import net.ruixin.util.exception.RuleException;
import net.ruixin.util.hibernate.BaseDao;
import net.ruixin.util.rule.SelfValidate;
import net.ruixin.util.tools.ObjectUtils;
import org.hibernate.Query;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * 验证表单设计key唯一
 */
@Service
public class CheckFormDesignUnique extends BaseDao implements SelfValidate {

    @SuppressWarnings("unchecked")
    @Override
    public void validate(String propertyName, Object propertyValue, Map<String, Object> parameters, Object entity) throws RuleException {
        int count;
        try {
            String clazzName = ObjectUtils.getRealClassName(entity);
            String hql = "select count(a) from " + clazzName + " a where 1=1 ";
            Long entityId = (Long) getValue("id", entity);
            if (entityId != null) {
                hql += " and a.id<>" + entityId;
            }
            hql += " and  a." + propertyName + " = ?";
            List<Object> params = new ArrayList<>();
            params.add(propertyValue);
            Query query = this.getSession().createQuery(hql);
            for (int i = 0; i < params.size(); i++) {
                query.setParameter(i, params.get(i));
            }
            count = Integer.parseInt(query.uniqueResult().toString());
        } catch (Exception e) {
            throw new RuleException("验重时，数据库查询失败," + e);
        }
        if (count != 0) {
            throw new RuleException("该" + parameters.get("name") + "已存在");
        }
    }

    /**
     * 根据属性名获取属性值
     *
     * @param propertyName 属性名
     * @param entity       实体
     * @return 属性值
     */
    private Object getValue(String propertyName, Object entity) throws Exception {
        java.lang.reflect.Field field = entity.getClass().getDeclaredField(propertyName);
        field.setAccessible(true);
        return field.get(entity);
    }
}
