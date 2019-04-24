package net.ruixin.controller.plat.main;

import cn.afterturn.easypoi.excel.ExcelExportUtil;
import cn.afterturn.easypoi.excel.entity.ExportParams;
import cn.afterturn.easypoi.excel.entity.params.ExcelExportEntity;
import com.google.common.collect.Maps;
import net.ruixin.aop.ApplicationContextListener;
import net.ruixin.controller.BaseController;
import net.ruixin.domain.constant.Const;
import net.ruixin.domain.plat.auth.ShiroUser;
import net.ruixin.domain.plat.organ.SysUser;
import net.ruixin.service.plat.dictionary.ExcelDictHandler;
import net.ruixin.service.plat.organ.IUserService;
import net.ruixin.util.shiro.ShiroKit;
import net.ruixin.util.cache.Cache;
import net.ruixin.util.cache.CacheKit;
import net.ruixin.util.data.AjaxReturn;
import net.ruixin.util.http.HttpKit;
import net.ruixin.util.json.JacksonUtil;
import net.ruixin.util.paginate.FastPagination;
import net.ruixin.util.resolver.SearchArgumentsResolver;
import net.ruixin.util.support.DateTimeKit;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.method.HandlerMethod;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.OutputStream;
import java.lang.reflect.Method;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/main")
public class MainController extends BaseController {
    //获取菜单
    @Autowired
    private IUserService userService;

    @Autowired
    private ExcelDictHandler excelDictHandler;

    /**
     * 获取当前用户菜单权限
     */
    @ResponseBody
    @RequestMapping("/getUserMenus")
    public AjaxReturn getUserMenus(HttpSession session) {
        return new AjaxReturn(true, session.getAttribute("userMenus"));
    }

    /**
     * 修改密码
     *
     * @param oldPwd 原密码
     * @param newPwd 新密码
     * @return
     */
    @ResponseBody
    @RequestMapping("/changePwd")
    public AjaxReturn changePwd(String oldPwd, String newPwd) {
//        ShiroUser shiroUser = (ShiroUser) getSession().getAttribute(Const.USER_SESSION_KEY);
        ShiroUser shiroUser = ShiroKit.getUser();
        SysUser user = userService.getUserByLoginName(shiroUser.getAccount());
        //不使用md5加密方式
        if ("false".equals(CacheKit.get(Cache.CONFIG, "MD5"))) {
            if (user.getLoginPwd().equals(oldPwd)) {
                user.setLoginPwd(newPwd);
                userService.saveUser(user);
                return success().setMsg("修改成功");
            } else {
                return error().setMsg("原密码不正确");
            }
        } else if ("true".equals(CacheKit.get(Cache.CONFIG, "MD5"))) {
            if (user.getLoginPwd().equals(ShiroKit.md5Nosalt(oldPwd))) {
                user.setLoginPwd(ShiroKit.md5Nosalt(newPwd));
                userService.saveUser(user);
                return success().setMsg("修改成功");
            } else {
                return error().setMsg("原密码不正确");
            }
        } else {
            return error();
        }

    }

    @ResponseBody
    @RequestMapping("/resetPwd")
    public AjaxReturn resetPwd(String userIds) {
        String pwd = CacheKit.get(Cache.CONFIG, "defaultPassword");
        userService.resetPwd(pwd, userIds);
        return success();
    }

    @ResponseBody
    @RequestMapping("/getShiroUserInfo")
    public AjaxReturn getShiroUserInfo() {
        return success().setData(getShiroUser());
    }

    /**
     * 切换皮肤
     *
     * @param skin
     * @return
     */
    @ResponseBody
    @RequestMapping("/changeSkin")
    public AjaxReturn changeSkin(String skin) {
        CacheKit.put(Cache.USER, "selectSkin", skin);
        return success();
    }

    /**
     * 检查mapping是否存在
     *
     * @param url：不包含项目路径的
     * @return
     */
    @ResponseBody
    @RequestMapping("/checkHasMapping")
    public AjaxReturn checkHasMapping(String url) {
        return success().setData(HttpKit.checkHasMapping(url));
    }

    /**
     * 导出列表
     *
     * @param url     查询地址
     * @param params  列表搜索条件参数
     * @param columns 列表列配置
     */
    @RequestMapping("/exportGrid")
    @ResponseBody
    public void exportGrid(String url, String params, String columns) {
        HandlerMethod handlerMethod = ApplicationContextListener.urlMap.get(url);
        if (null != handlerMethod) {
            Object handler = handlerMethod.getBean();
            Method method = handlerMethod.getMethod();
            List<Map<String, String>> success = null;
            Map map = Maps.newHashMap();
            HttpServletResponse response = HttpKit.getResponse();
            try (OutputStream out = response.getOutputStream();) {
                SearchArgumentsResolver.parseMap(map, params);
                Object result = method.invoke(ApplicationContextListener.getBean((String) handler), map);
                if (null != result && result instanceof AjaxReturn) {
                    Object data = ((AjaxReturn) result).getData();
                    if (null != data && data instanceof FastPagination)
                        success = ((FastPagination) data).getRows();
                }
                if (null != success) {
                    List<Map<String, Object>> columnMap = JacksonUtil.readValue(columns, List.class);
                    List<ExcelExportEntity> entity = getExcelExportEntity(columnMap);
                    ExportParams ep = new ExportParams();
                    ep.setDictHandler(excelDictHandler);
                    Workbook workbook = ExcelExportUtil.rxExportExcel(ep, entity, success);
                    response.setContentType("application/octet-stream");
                    response.setHeader("content-disposition", "attachment;filename=" + URLEncoder.encode("导出" + DateTimeKit.format(new Date(), "yyyyMMddHHmmss") + ".xls", "utf-8"));
                    workbook.write(out);
                    out.flush();
                }
            } catch (Exception e) {
                throw new RuntimeException("列表导出失败", e);
            }
        }
    }

    private List<ExcelExportEntity> getExcelExportEntity(List<Map<String, Object>> columnMap) {
        List<ExcelExportEntity> entity = new ArrayList<>();
        for (Map<String, Object> column : columnMap) {
            entity.add(convertEntity(column));
        }
        return entity;
    }

    private ExcelExportEntity convertEntity(Map<String, Object> column) {
        ExcelExportEntity excelentity;
        //构造ExcelExportEntity
        if (column.containsKey("id")) {
            excelentity = new ExcelExportEntity(column.get("title").toString(), column.get("id").toString());
        } else {
            excelentity = new ExcelExportEntity(column.get("title").toString());
        }
        //指定渲染类型
        if (column.containsKey("renderer")) {
            String renderer = column.get("renderer").toString();
            switch (renderer) {
                case "Dict":
                    excelentity.setDict(column.get("dictCode").toString());
                    break;
                case "Date":
                    excelentity.setFormat(column.get("format").toString());
                    break;
                default:
                    break;
            }
        }
        //指定rownum，指定title行合并
        if (column.containsKey("rowNum")) {
            excelentity.setTitleRowNumber(Integer.parseInt(column.get("rowNum").toString()));
        }
        //递归处理children
        if (column.containsKey("children")) {
            List<Map<String, Object>> columnMapChild = (List<Map<String, Object>>) column.get("children");
            List<ExcelExportEntity> childExcelExportEntity = new ArrayList<ExcelExportEntity>();
            for (Map<String, Object> columnChild : columnMapChild) {
                childExcelExportEntity.add(convertEntity(columnChild));
            }
            excelentity.setList(childExcelExportEntity);
        }
        return excelentity;
    }
}
