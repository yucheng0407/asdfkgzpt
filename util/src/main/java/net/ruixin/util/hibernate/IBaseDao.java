package net.ruixin.util.hibernate;

import net.ruixin.util.paginate.FastPagination;

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * baseDao接口
 */
@SuppressWarnings({"unused", "WeakerAccess"})
public interface IBaseDao<T> {

//---------------------------------------------------------------------实体基本CRUD操作 4

    /**
     * 删除实体
     *
     * @param id 实体对象主键
     */
    void delete(Serializable id);

    /**
     * 级联删除
     *
     * @param id 实体对象主键
     */
    void deleteCascade(Serializable id);

    /**
     * 保存或更新实体, 实体没有主键时保存，否则更新
     *
     * @param entity 实体对象
     */
    void saveOrUpdate(T entity);

    /**
     * 批量删除实体
     *
     * @param ids 实体主键集合
     */
    void deleteBatch(String ids);

    /**
     * 批量保存或更新实体, 实体没有主键时保存，否则更新
     *
     * @param entities 实体集合
     */
    void saveOrUpdateBatch(Collection<T> entities);

//---------------------------------------------------------------------获取单个实体对象 7

    /**
     * 通过主键信息获取实体对象
     *
     * @param id 主键ID
     * @return 单个实体
     */
    T get(Serializable id);

    /**
     * 通过主键信息获取有效实体对象
     *
     * @param id 主键ID
     * @return 单个实体
     */
    T getValid(Serializable id);

    /**
     * 获取单个实体，根据HQL查询语句及参数获取。
     * 说明：如果获取部分字段，需要根据部分字段创建新的构造函数
     *
     * @param queryString 查询语句
     * @param params      可选的查询参数，可变参数形式
     * @return 单个实体，如果查询结果有多个，则返回第一个实体
     */
    T getByHql(CharSequence queryString, Object... params);

    /**
     * 获取单个实体，根据HQL查询语句及参数获取。
     * 说明：如果获取部分字段，需要根据部分字段创建新的构造函数
     *
     * @param queryString 查询语句
     * @param params      可选的查询参数，map形式
     * @return 单个实体，如果查询结果有多个，则返回第一个实体
     */
    T getByHql(CharSequence queryString, Map<String, ?> params);

    /**
     * 通过Sql语句查询，返回实体对象
     * 说明：该方法必须使用 select * 的方式获取实体的所有属性，且实体必须受hibernate管理
     * 优势：支持级联的关联查询
     *
     * @param sql    查询sql
     * @param params 查询参数可变参数形式
     * @return 单个实体
     */
    T getBySql(CharSequence sql, Object... params);

    /**
     * 通过Sql语句查询，返回实体对象
     * 说明：该方法必须使用 select * 的方式获取实体的所有属性，且实体必须受hibernate管理
     * 优势：支持级联的关联查询
     *
     * @param sql    查询sql
     * @param params 查询参数map形式
     * @return 单个实体
     */
    T getBySql(CharSequence sql, Map<String, ?> params);

    /**
     * 通过Sql语句查询map集合，通过反射封装进实体对象
     * 优势：支持查询部分属性，封装进实体
     *
     * @param sql    查询sql
     * @param params 查询参数可变参数形式
     * @return 单个实体
     */
    T getBySqlNative(CharSequence sql, Object... params);

    /**
     * 通过Sql语句查询map集合，通过反射封装进实体对象
     * 优势：支持查询部分属性，封装进实体
     *
     * @param sql    查询sql
     * @param params 查询参数map形式
     * @return 单个实体
     */
    T getBySqlNative(CharSequence sql, Map<String, ?> params);

//---------------------------------------------------------------------获取实体集合对象 6

    /**
     * 查询实体列表
     *
     * @param queryString 查询语句
     * @param params      可选的查询参数，可变参数形式
     * @return 实体列表
     */
    List<T> findListByHql(CharSequence queryString, Object... params);

    /**
     * 查询实体列表
     *
     * @param queryString 查询语句
     * @param params      可选的查询参数，map形式
     * @return 实体列表
     */
    List<T> findListByHql(CharSequence queryString, Map<String, ?> params);

    /**
     * 通过Sql语句查询map，返回实体对象列表
     *
     * @param sql    查询sql
     * @param params 查询参数可变参数形式
     * @return 实体列表
     */
    List<T> getListBySql(CharSequence sql, Object... params);

    /**
     * 通过Sql语句查询map，返回实体对象列表
     *
     * @param sql    查询sql
     * @param params 查询参数map形式
     * @return 实体列表
     */
    List<T> getListBySql(CharSequence sql, Map<String, ?> params);

    /**
     * 通过属性快速查实体对象
     *
     * @param name  实体的属性名
     * @param value 属性值
     * @return 实体列表
     */
    List<T> findByProperty(String name, Object value);

    /**
     * 通过属性map查找实体集合
     *
     * @param conditionMap 实体的属性集合，属性名：属性值
     * @return 实体列表
     */
    List<T> findByProperty(Map<String, ?> conditionMap);

//---------------------------------------------------------------------执行更新语句 2

    /**
     * 执行数据库更新操作
     *
     * @param sql sql语句
     * @return 更新的记录条数
     */
    int executeSqlUpdate(CharSequence sql, Object... args);

    /**
     * 执行数据库更新操作
     *
     * @param hql hql语句
     * @return 更新的记录条数
     */
    int executeHqlUpdate(CharSequence hql, Object... args);

//---------------------------------------------------------------------快速分页查询 2

    /**
     * sql分页查询
     * （与前端列表控件结合使用）
     *
     * @param queryString 查询sql语句
     * @param params      sql查询参数
     * @param pageParam   分页查询参数
     * @return FastPagination
     */
    FastPagination getPaginationBySql(CharSequence queryString, List params, Map pageParam);

    /**
     * sql分页查询
     * （个性查询使用）
     *
     * @param queryString 查询sql语句
     * @param params      sql查询参数
     * @param startPage   开始页
     * @param endPage     结束页
     * @param pageSize    页条目
     * @param getTotal    是否获取总数
     * @return FastPagination
     */
    FastPagination getPaginationBySql(CharSequence queryString, List params, int startPage, int endPage,
                                      int pageSize, boolean getTotal);

    /**
     * hql分页查询
     * （与前端列表控件结合使用）
     *
     * @param queryString 查询sql语句
     * @param params      sql查询参数
     * @param pageParam   分页查询参数
     * @return FastPagination
     */
    FastPagination getPaginationByHql(CharSequence queryString, List params, Map pageParam);

    /**
     * sql分页查询
     * （个性查询使用）
     *
     * @param queryString 查询sql语句
     * @param params      sql查询参数
     * @param startPage   开始页
     * @param endPage     结束页
     * @param pageSize    页条目
     * @param getTotal    是否获取总数
     * @return FastPagination
     */
    FastPagination getPaginationByHql(CharSequence queryString, List params, int startPage, int endPage,
                                      int pageSize, boolean getTotal);

    //---------------------------------------------------------------------调用存储过程 3

    /**
     * 快速分页查询
     *
     * @param queryString
     * @param params
     * @param pageIndex
     * @param pageSize
     * @return
     */
    FastPagination simpleFastPage(CharSequence queryString, List params, int pageIndex, int pageSize);

    /**
     * 执行带输出参数存储过程
     *
     * @param callSql      存储过程名称
     * @param inParameters 输入参数
     * @return 返回值
     */
    String prepareCallAndReturn(final CharSequence callSql, final Object... inParameters);

    /**
     * 执行带输出参数存储过程
     *
     * @param callSql      存储过程名称
     * @param inParameters 输入参数
     * @return 返回值
     */
    List prepareCallAndReturnList(final CharSequence callSql, final Object... inParameters);

    /**
     * 执行不带输出参数存储过程
     *
     * @param callSql      存储过程名称
     * @param inParameters 输入参数
     */
    void prepareCallNoReturn(final CharSequence callSql, final Object... inParameters);

    /**
     * 执行不带输出参数存储过程(入参为clob类型)
     *
     * @param callSql      存储过程名称
     * @param inParameters 输入参数
     * @param indexs       clob类型参数在数组中的下标
     */
    void prepareCallNoReturnClob(final CharSequence callSql, final int[] indexs, final Object... inParameters);

    /**
     * 定制输出的存储过程
     *
     * @param callSql      存储过程名称
     * @param inParameters 输入参数
     * @param outTypeList  输出类型
     * @return 输出List
     */
    List<Object> prepareCallAndReturnCustom(final CharSequence callSql, final List<Object> inParameters, final List<Integer> outTypeList);

    /**
     * 执行返回list的存储函数
     *
     * @param callSql      sql
     * @param inParameters sql绑定参数
     * @return list
     */
    List<Map<String, Object>> callFuncAndReturnList(final CharSequence callSql, final Object... inParameters);

    /**
     * 获取标准系统时间（目前是数据库时间）
     *
     * @return
     */
    Date getSysDate();
}