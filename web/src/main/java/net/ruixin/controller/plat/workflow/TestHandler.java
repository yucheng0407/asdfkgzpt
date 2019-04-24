package net.ruixin.controller.plat.workflow;

import net.ruixin.controller.BaseController;
import net.ruixin.domain.plat.workflow.test.Teacher;
import net.ruixin.service.plat.workflow.IWorkflowInstanceService;
import net.ruixin.service.plat.workflow.impl.TeacherService;
import net.ruixin.util.data.AjaxReturn;
import net.ruixin.util.data.FlowParam;
import net.ruixin.util.paginate.FastPagination;
import net.ruixin.util.resolver.FormModel;
import net.ruixin.util.resolver.SearchModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

/**
 * 测试
 */
@Controller
@RequestMapping("/workflow/test")
public class TestHandler extends BaseController {
    @Autowired
    private TeacherService teacherService;
    @Autowired
    private IWorkflowInstanceService workflowInstanceService;
    /**
     * 分页查询流程表单
     *
     * @param map 参数集
     * @return AjaxReturn
     */
    @ResponseBody
    @RequestMapping(value = "/getTeacherList")
    public AjaxReturn getTeacherList(@SearchModel Object map) {
        ((Map) map).put("userId", super.getCurrentUserId());
        FastPagination fastPagination = teacherService.getTeacherList((Map) map);
        return success().setData(fastPagination);
    }

    /**
     * 新增、修改表单数据
     *
     * @param teacher 教师
     * @param param   流程参数
     * @return ar
     */
    @ResponseBody
    @RequestMapping(value = "/saveTeacher")
    public AjaxReturn saveTeacher(@FormModel Teacher teacher, @FormModel FlowParam param) {
        //保存业务数据，并返回ID
        Long id = teacherService.save(teacher);
        //流程参数封装对象
        Map<String, Object> flowParam = new HashMap<>();
        //封装业务数据ID
        flowParam.put("ywDataId", id);
        //根据环节序号、请假时长，更改流程变量实例(大于16h，需要经理审批)
        if (param.getSort() == 2 && teacher.getQjsc() > 16) {
            //封装流程变量
            flowParam.put("wfVars", "SFJLSP:2");
            //原更新流程变量值的方式 现可以不在此处调用
//            workflowInstanceService.initVariable(param, "SFJLSP", "2");
        }
        //原更新业务数据ID、流程实例标题的方式 现可以不在此处调用
//        workflowInstanceService.updateWorkflowInstanceData(param,id,teacher.getName() + "请假流程");
        //封装流程实例标题
        flowParam.put("wfTitle", teacher.getName() + "请假流程");
        //返回流程参数封装对象(业务数据ID、流程变量、流程实例标题)
        return success().setData(flowParam);
    }

    /**
     * 删除表单数据
     *
     * @param id 表单ID
     * @return ar
     */
    @ResponseBody
    @RequestMapping(value = "/delTeacher")
    public AjaxReturn delTeacher(Long id) {
        teacherService.del(id);
        return success();
    }

    /**
     * 获取表单数据
     *
     * @param id 表单ID
     * @return ar
     */
    @ResponseBody
    @RequestMapping(value = "/getTeacher")
    public AjaxReturn getTeacher(Long id) {
        return success().setData(teacherService.get(id));
    }
}