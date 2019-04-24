package net.ruixin.util.rule.matchingRules;

import net.ruixin.domain.plat.resource.SysResource;
import net.ruixin.util.exception.RuleException;
import net.ruixin.util.hibernate.BaseDao;
import net.ruixin.util.rule.SelfValidate;
import net.ruixin.util.tools.ObjectUtils;
import org.hibernate.Query;
import org.springframework.stereotype.Service;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * 资源验重
 */
@Service
public class CheckResUrlUnique extends BaseDao implements SelfValidate {

    @SuppressWarnings("unchecked")
    @Override
    public void validate(String propertyName, Object propertyValue, Map<String, Object> parameters, Object entity) throws RuleException {
        int count;
        try {
            Long targetId = ((SysResource) entity).getTargetId();
            if (null == targetId) {
                //单独写的url，需要验重
                Class clazz = entity.getClass();
                String clazzName = ObjectUtils.getRealClassName(entity);
                String hql = "select count(a) from " + clazzName + " a where a.sfyxSt = '1' and  a." + propertyName + " = ? ";
                Method m = clazz.getDeclaredMethod("getId");
                Long entityId = (Long) m.invoke(entity);
                if (entityId != null) {
                    hql += " and a.id<>" + entityId;
                }
                List<Object> params = new ArrayList<>();
                params.add(propertyValue);
                Query query = this.getSession().createQuery(hql);
                for (int i = 0; i < params.size(); i++) {
                    query.setParameter(i, params.get(i));
                }
                count = Integer.parseInt(query.uniqueResult().toString());
            } else {
                //指定的url，不需要验重
                count = 0;
            }
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
